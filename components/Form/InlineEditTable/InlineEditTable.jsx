// Global Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import set from 'lodash/set';
import get from 'lodash/get';
import Dimensions from 'react-dimensions';
// Components
import finPlanSchemas from '../../../schemas/finPlanSchemas';
import GenericTable from '../../../components/GenericTable/GenericTable';
import { dimensionsFunctions } from '../../../schemas/tables/inlineEditTableSchema';
// Constants
const date = 'date';
const frequency = 'frequency';

const _isRestrictedFieldType = fieldType => [date, frequency].includes(fieldType);

class InlineEditTable extends Component {

  static propTypes = {
    items: PropTypes.array,
    idMapping: PropTypes.any,
    updateItem: PropTypes.func,
    columns: PropTypes.array,
    containerHeightOveride: PropTypes.any,
    containerHeight: PropTypes.any,
    containerWidth: PropTypes.any,
    onCellClick: PropTypes.func,
    rowHeight: PropTypes.any,
    allowEmpty: PropTypes.bool,
    ignoreManualValues: PropTypes.bool,
    uneditableFieldKey: PropTypes.string,
    schemaType: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = this._getInitialState();
  }

  _getInitialState() {
    const { items } = this.props;
    return {
      items,
      editingRecordId: null,
      editingRecordValue: null,
      editingRecordMapping: null,
      prevEditingRecordId: null
    };
  }

  _checkEditingRecordEditability(editingRecordId, editingRecordMapping) {
    const editingItem = this.props.items.find(item => item.id === editingRecordId);
    const uneditableFieldKeys = get(editingItem, 'uneditableFieldKeys', []);
    return !uneditableFieldKeys.includes(editingRecordMapping);
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

  _updateStateWithField = (manualValue, manualMapping, manualRecordId) => (
    new Promise((resolve) => {
      const {
        editingRecordId,
        editingRecordValue,
        editingRecordMapping,
      } = this.state;
      const {
        idMapping,
        items,
        ignoreManualValues
      } = this.props;
      // If params are not manually passed in, default to state
      const value = ignoreManualValues ? editingRecordValue : (manualValue || editingRecordValue);
      const fieldMapping = ignoreManualValues ? editingRecordMapping : (manualMapping || editingRecordMapping); // eslint-disable-line
      const recordId = ignoreManualValues ? editingRecordId : (manualRecordId || editingRecordId);
      // Find Item that was edited:
      const editedItem = items.find(item => (get(item, idMapping) === recordId));
      // If the value has not changed, return.
      if (editedItem && value === editedItem[fieldMapping]) { return resolve(recordId); }
      /*
      * Apply single item edit to matching item in the state.
      * This give a snappy visual que to the user of what is actually taking much
      * longer to accomplish with a request to the BE
      */
      const editedItems = items.map((item) => {
        const isDirectMatch = item.id === editingRecordId;
        const hasMatchingId = editedItem && item.id === editedItem.id;
        if (isDirectMatch ||
          (hasMatchingId)) {
           const copy = { ...item };
           set(copy, fieldMapping, value);
           return copy;
        }
        return item;
      });
      // Re-render component
      return this.setState(
        { items: editedItems },
        () => resolve(recordId) // callback function (after state change)
      );
    })
    .then((tableRecordId) => {
      this._persistRecord(tableRecordId);
      this._clearCurrentEditingRecord(tableRecordId);
    })
  );

  _editRecordValue = (newValue) => {
    let value = newValue;
    // NOTE: There is currently an issue with fields reverting to their original values
    // Setting the value to an empty string solves the problem but i'd love to find a more
    // Robust solution
    if (!value && this.props.allowEmpty) { value = ' '; }
    this.setState({ editingRecordValue: value });
  };

  _enterEditRecordMode = (editingRecordId, editingRecordMapping, editingRecordVal) => {
    const { uneditableFieldKey } = this.props;

    let shouldAllowEdit = true;
    let editingRecordValue = editingRecordVal;
    const schema = finPlanSchemas[this.props.schemaType];

    // i.e if this is a brand new entry that has not been saved and the user is clicking on it for
    // the first time we want
    if (schema &&
       schema[editingRecordMapping] === editingRecordValue &&
       !_isRestrictedFieldType(editingRecordMapping)) {
         editingRecordValue = ' ';
       }

    if (uneditableFieldKey) {
      shouldAllowEdit = editingRecordMapping !== uneditableFieldKey;
      if (!shouldAllowEdit) {
        shouldAllowEdit = this._checkEditingRecordEditability(
          editingRecordId,
          editingRecordMapping
        );
      }
    }

    if (shouldAllowEdit) {
      return new Promise((resolve) => {
        this.setState({
          editingRecordId,
          editingRecordMapping,
          editingRecordValue,
        }, () => resolve());
      });
    }
  };

  _persistRecord(recordId) {
    const {
      updateItem,
      idMapping,
    } = this.props;
    const {
      items,
    } = this.state;
    if (typeof recordId !== 'number') {
      return this._clearCurrentEditingRecord(recordId);
    }
    const itemToPersist = items.find(
      item => item[idMapping] === recordId
    );
    // Update db (this will propagate necessary values on the BE for the db)
    if (updateItem) {
      updateItem(itemToPersist);
    }
  }

  _configureTable() {
    const {
      editingRecordId,
      editingRecordValue,
      editingRecordMapping,
    } = this.state;
    const {
      columns,
      containerHeightOveride,
      containerHeight,
      containerWidth,
      idMapping,
      items,
      onCellClick,
      rowHeight,
     } = this.props;

    return {
      containerHeight: containerHeightOveride || containerHeight,
      model: items,
      containerWidth,
      fields: columns,
      rowIdMapping: idMapping,
      rowHeight,
      editingData: {
        editingRecordId,
        editingRecordValue,
        editingRecordMapping
      },
      interactionFunctions: {
        onBlur: this._updateStateWithField,
        onSave: this._updateStateWithField,
        onClick: this._enterEditRecordMode,
        onChange: this._editRecordValue,
        onNonEditClick: onCellClick,
      }
    };
  }

  render() {
    const tableProps = this._configureTable();
    return (
      <div className="lc-inline-edit-table">
        <GenericTable {...tableProps} />
      </div>
    );
  }

}

export default Dimensions({
  getHeight: dimensionsFunctions.getHeight,
  getWidth: dimensionsFunctions.getWidth
})(InlineEditTable);
