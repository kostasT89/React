import React, { Component } from 'react';
import PropTypes from 'prop-types';
import set from 'lodash/set';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import orderBy from 'lodash/orderBy';
import isEmpty from 'lodash/isEmpty';
// Local Deps
import { saveTransaction } from '../../actions/global/transactions';
import GenericTable from '../../components/GenericTable/GenericTable';
import { idMapping } from '../../config/transactionsTable';
import cms from '../../config/messages';
import { checkIfTransactionMustUpsertFieldset } from '../../utils/transactionUtils';

export default class TransactionsTable extends Component {

  static propTypes = {
    className: PropTypes.string,
    transactions: PropTypes.array,
    fields: PropTypes.array,
    dispatch: PropTypes.func,
    notFoundMessage: PropTypes.string,
    containerWidth: PropTypes.number,
    containerHeight: PropTypes.number,
    rowHeight: PropTypes.number,
    headerHeight: PropTypes.number,
    showSelectCarets: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = this._getInitialState();
  }

  _getInitialState() {
    const { transactions } = this.props;
    return {
      transactions,
      editingRecordId: null,
      editingRecordValue: null,
      editingRecordMapping: null,
      prevEditingRecordId: null
    };
  }

  _sortByHeader(headerMapping, sortDir) {
    const { transactions } = this.state;
    const transactionsCopy = cloneDeep(transactions);
    const sortedTransactions = orderBy(
      transactionsCopy,
      transaction => get(transaction, headerMapping),
      [sortDir]
    );
    this.setState({
      transactions: sortedTransactions
    });
}

  _updateStateWithField(manualValue, manualMapping, manualRecordId) {
    return new Promise((resolve) => {
      const {
        editingRecordId,
        editingRecordValue,
        editingRecordMapping,
        transactions
      } = this.state;
      // If params are not manually passed in, default to state
      const value = manualValue || editingRecordValue;
      const fieldMapping = manualMapping || editingRecordMapping;
      const recordId = manualRecordId || editingRecordId;
      // Find transaction that was edited:
      const editedTransaction = transactions.find(
        trans => (get(trans, idMapping) === recordId)
      );
      // If the value has not changed, return.
      if (value === editedTransaction[fieldMapping]) {
        return resolve(recordId);
      }
      /*
      * Apply single transaction edit to matching transactions in the state.
      * This give a snappy visual que to the user of what is actually taking much
      * longer to accomplish with a request to the BE
      */
      const editedTransactions = transactions.map((trans) => {
        const isDirectMatch = trans.id === recordId;
        // If a propagating value has been changed, change other matching transactions
        const propagatingValueHasChanged = checkIfTransactionMustUpsertFieldset(
          editingRecordMapping,
          trans
        ); // eslint-disable-line max-len
        const hasMatchingName = trans.name === editedTransaction.name;
        const hasMatchingMerchant = trans.merchantId === editedTransaction.merchantId;
        if (isDirectMatch ||
          (propagatingValueHasChanged && hasMatchingName && hasMatchingMerchant)) {
           const copy = { ...trans };
           set(copy, fieldMapping, value);
           return copy;
        }
        return trans;
      });
      // Re-render component
      return this.setState(
        { transactions: editedTransactions },
        () => resolve(recordId) // callback function (after state change)
      );
    })
    .then((recordId) => {
      this._persistRecord(recordId);
      this._clearCurrentEditingRecord(recordId);
    });
  }

  _clearCurrentEditingRecord(manualRecordId) {
    return new Promise((resolve) => {
      const {
        editingRecordId,
        editingRecordValue,
        editingRecordMapping,
      } = this._getInitialState();
      // Store prev editing record id for future use
      const stateCopy = { ...this.state };
      const prevEditingRecordId = manualRecordId || stateCopy.editingRecordId;

      this.setState({
        editingRecordId,
        editingRecordValue,
        editingRecordMapping,
        prevEditingRecordId
      }, () => {
        resolve();
      });
    });
  }

  _editRecordValue(newValue) {
    this.setState({ editingRecordValue: newValue });
  }

  _enterEditRecordMode(editingRecordId, editingRecordMapping, editingRecordValue) {
    return new Promise((resolve) => {
      this.setState({
        editingRecordId,
        editingRecordMapping,
        editingRecordValue,
      }, () => resolve());
    });
  }

  _persistRecord(recordId) {
    const { dispatch } = this.props;
    const { transactions, editingRecordMapping } = this.state;
    const transactionToPersist = transactions.find(
      transaction => transaction[idMapping] === recordId
    );
    // Update db (this will propagate necessary values on the BE for the db)
    dispatch(saveTransaction(transactionToPersist, editingRecordMapping));
  }

  _toggleFieldValue(editingRecordId, toggleMapping) {
    const {
      transactions
    } = this.state;
    const transaction = transactions.find(
      trans => trans[idMapping] === editingRecordId
    );
    const toggleState = !get(transaction, toggleMapping);
    // Return
    return this._enterEditRecordMode(
      editingRecordId,
      toggleMapping,
      toggleState
    )
    /*
    * We need to allow time for ngAnimate to move the toggle switch to the
    * other side before we update the state (and initiate a rewrite)
    */
    .then(() => setTimeout(() => (
      this._updateStateWithField(toggleState)
      /*
      * Conditional logic for the TransactionTable toggle only:
      * We want the frequency field to be driven by the toggle
      */
      .then(() => {
        if (toggleState) {
         return this._updateStateWithField('monthly', 'frequency', editingRecordId);
        }
        return this._updateStateWithField(null, 'frequency', editingRecordId);
      })
    ), 500));
  }

  _configureTable() {
    const {
      editingRecordId,
      editingRecordValue,
      editingRecordMapping,
      transactions,
    } = this.state;

    const {
      fields,
      containerHeight,
      containerWidth,
      headerHeight,
      rowHeight,
      showSelectCarets = false
     } = this.props;
    return {
      showSelectCarets,
      containerHeight,
      containerWidth,
      headerHeight,
      rowHeight,
      model: transactions,
      fields,
      rowIdMapping: idMapping,
      onHeaderClick: ::this._sortByHeader,
      editingData: {
        editingRecordId,
        editingRecordValue,
        editingRecordMapping
      },
      interactionFunctions: {
        onBlur: ::this._clearCurrentEditingRecord,
        onSave: ::this._updateStateWithField,
        onClick: ::this._enterEditRecordMode,
        onChange: ::this._editRecordValue,
        onToggle: ::this._toggleFieldValue
      }
    };
  }

  render() {
    const {
      transactions,
      notFoundMessage,
      containerHeight,
      containerWidth,
      className = ''
    } = this.props;
    const message = notFoundMessage || cms['transactionsTable.notFound'];
    const isReadyToRenderTable = !isEmpty(transactions) && containerHeight && containerWidth;

    let tableProps;
    if (isReadyToRenderTable) {
      tableProps = this._configureTable();
    }

    return (
      <div className={`lc-transactions-table ${className}`}>
        {isReadyToRenderTable ? <GenericTable {...tableProps} /> :
        <div className="lc-transactions-table__message">
          {message}
        </div>
        }
      </div>
    );
  }
}
