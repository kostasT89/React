import React, { Component } from 'react';
import PropTypes from 'prop-types';
import set from 'lodash/set';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import orderBy from 'lodash/orderBy';
import isEmpty from 'lodash/isEmpty';
import Dimensions from 'react-dimensions';
// Local Deps
import { upsertTransactionFieldset } from '../../actions/global/transactionFieldsets';
import GenericTable from '../../components/GenericTable/GenericTable';
import { idMapping } from '../../config/fieldsetsTable';
import cms from '../../config/messages';
import { checkIfTransactionMustUpsertFieldset } from '../../utils/transactionUtils';
import { dimensionsFunctions } from '../../schemas/tables/fieldsetsTableSchema';

export class FieldsetsTable extends Component {

  static propTypes = {
    fieldsets: PropTypes.array.isRequired,
    fields: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    notFoundMessage: PropTypes.string,
    containerWidth: PropTypes.number,
    containerHeight: PropTypes.number,
    showSelectCarets: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = this._getInitialState();
  }

  _getInitialState() {
    const { fieldsets } = this.props;
    return {
      fieldsets,
      editingRecordId: null,
      editingRecordValue: null,
      editingRecordMapping: null,
      prevEditingRecordId: null
    };
  }

  _sortByHeader(headerMapping, sortDir) {
    const { fieldsets } = this.state;
    const fieldsetsCopy = cloneDeep(fieldsets);
    const sortedTransactions = orderBy(
      fieldsetsCopy,
      fieldset => get(fieldset, headerMapping),
      [sortDir]
    );
    this.setState({
      fieldsets: sortedTransactions
    });
}

  _updateStateWithField(manualValue, manualMapping, manualRecordId) {
    return new Promise((resolve) => {
      const {
        editingRecordId,
        editingRecordValue,
        editingRecordMapping,
        fieldsets
      } = this.state;
      // If params are not manually passed in, default to state
      const value = manualValue || editingRecordValue;
      const fieldMapping = manualMapping || editingRecordMapping;
      const recordId = manualRecordId || editingRecordId;
      // Find fieldset that was edited:
      const editedTransaction = fieldsets.find(
        trans => (get(trans, idMapping) === recordId)
      );
      // If the value has not changed, return.
      if (value === editedTransaction[fieldMapping]) {
        return resolve(recordId);
      }
      /*
      * Apply single fieldset edit to matching fieldsets in the state.
      * This give a snappy visual que to the user of what is actually taking much
      * longer to accomplish with a request to the BE
      */
      const editedTransactions = fieldsets.map((trans) => {
        const isDirectMatch = trans.id === recordId;
        // If a propagating value has been changed, change other matching fieldsets
        const propagatingValueHasChanged = checkIfTransactionMustUpsertFieldset(editingRecordMapping, trans); // eslint-disable-line max-len
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
        { fieldsets: editedTransactions },
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
    const { fieldsets, editingRecordMapping } = this.state;
    const fieldsetToPersist = fieldsets.find(
      fieldset => fieldset[idMapping] === recordId
    );
    // Update db (this will propagate necessary values on the BE for the db)
    dispatch(upsertTransactionFieldset(fieldsetToPersist, editingRecordMapping));
  }

  _toggleFieldValue(editingRecordId, toggleMapping) {
    const {
      fieldsets
    } = this.state;
    const fieldset = fieldsets.find(
      trans => trans[idMapping] === editingRecordId
    );
    const toggleState = !get(fieldset, toggleMapping);
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
      fieldsets
    } = this.state;

    const {
      fields,
      containerHeight,
      containerWidth,
      showSelectCarets = false
     } = this.props;

    return {
      containerHeight,
      containerWidth,
      model: fieldsets,
      fields,
      showSelectCarets,
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
    const { fieldsets, notFoundMessage } = this.props;
    const message = notFoundMessage || cms['fieldsetsTable.notFound'];

    let tableProps;
    if (!isEmpty(fieldsets)) {
      tableProps = this._configureTable();
    }

    return (
      <div className="lc-fieldsets-table">
        {!isEmpty(fieldsets) ? <GenericTable {...tableProps} /> :
        <div className="lc-fieldsets-table__message">
          {message}
        </div>
        }
      </div>
    );
  }
}

// See react-dimensions for the best way to configure
// https://github.com/digidem/react-dimensions
export default Dimensions({
  getHeight: dimensionsFunctions.getHeight,
  getWidth: dimensionsFunctions.getWidth
})(FieldsetsTable);
