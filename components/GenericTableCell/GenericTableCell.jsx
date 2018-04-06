import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { formatMoney } from 'accounting';
// Local Deps:
import keyCodes from '../../constants/enums/keyCodes';
import inputTypes from '../../constants/enums/inputTypes';
import LookupButton from '../../components/Form/LookupButton/LookupButton';
import FontAwesomeIcon from '../FontAwesomeIcon/FontAwesomeIcon';

import {
  formatDateInputForDisplay
} from '../../utils/dateUtils';

import './GenericTableCell.scss';

export default class GenericTableCell extends Component {

  static propTypes = {
    rowIndex: PropTypes.number, // Provided by fixed-data-table
    colIndex: PropTypes.number,
    model: PropTypes.array.isRequired,
    onBlur: PropTypes.func,
    onSave: PropTypes.func,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onToggle: PropTypes.func,
    fieldType: PropTypes.string,
    lookupKey: PropTypes.string,
    icon: PropTypes.string,
    isPassword: PropTypes.bool,
    isEditable: PropTypes.bool.isRequired,
    isToggleable: PropTypes.bool,
    isDelete: PropTypes.bool,
    onNonEditClick: PropTypes.func,
    onLookupClick: PropTypes.func,
    selectOptions: PropTypes.object,
    selectOrder: PropTypes.array,
    editingRecordId: PropTypes.oneOfType([
     React.PropTypes.string,
     React.PropTypes.number
    ]),
    editingRecordValue: PropTypes.any,
    editingRecordMapping: PropTypes.string,
    showSelectCarets: PropTypes.bool,
  };

  static _renderText(value) {
    return (
      <div>{value}</div>
    );
  }

  static _renderSelectText(selectedOptionKey, selectedOptions, showSelectCarets) {
    if (selectedOptionKey && selectedOptions) {
      const selectedOption = selectedOptions[selectedOptionKey];
      const value = (typeof selectedOption === 'string') ?
        selectedOption :
        selectedOption && selectedOption.value;
        if (showSelectCarets) {
          return (
            <div className="lc-generic-cell__select-text">
              <div className="lc-generic-cell__icon">
                <FontAwesomeIcon icon="chevron-down" />
              </div>
              <div className="lc-generic-cell__value">
                {value}
              </div>
            </div>
          );
        }
        return (<div className="lc-generic-cell__select-text">{value}</div>);
    }
    return GenericTableCell._renderText('');
  }

  static _createDisplayValue(value, fieldType) {
    switch (fieldType) {
      case inputTypes.date:
        return formatDateInputForDisplay(value);
      case inputTypes.currency:
        return `${formatMoney(value)}`;
      case inputTypes.number:
      case inputTypes.text:
      default:
        return value;
    }
  }

  static _renderSwitch(id, value, mapping) {
    const inputId = `${mapping}-${id}`;
    return (
      <div className="switch small lc-switch lc-generic-table-cell__switch">
        <input onClick={e => e.stopPropagation()}
               className="switch-input"
               id={inputId}
               type="checkbox"
               defaultChecked={value} />
        <label className="switch-paddle" htmlFor={inputId}>
          <span className="show-for-sr">{value}</span>
        </label>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._onCellClick = this._onCellClick.bind(this);
  }

  _handleKeyPress(keyCode, value) {
    const {
      onBlur,
      onSave,
      editingRecordValue,
    } = this.props;

    // TODO - @mari: figure out if this code is useful for saving onClick()
    // eslint-disable-next-line
    const valuesAreDifferent = editingRecordValue !== value;

     if (keyCode === keyCodes.escape) {
       onBlur();
     }
     else if (keyCode === keyCodes.enter) {
       // onBlur();
       onSave();
     }
 }

  _renderSelect(selectedOptionKey) {
    const {
      onBlur,
      onSave,
      selectOptions,
      selectOrder
    } = this.props;

    const selectedValue = selectedOptionKey === null ? selectOrder[0].key : selectedOptionKey;
    return (
      <select value={selectedValue}
              onBlur={onBlur}
              onChange={e => onSave(e.target.value)}
              onKeyDown={e => this._handleKeyPress(e.keyCode)}
              autoFocus>
        {
          selectOrder.map((key) => {
            const selectOption = selectOptions[key];
            const value = (typeof selectOption === 'string') ?
              selectOption :
              selectOption && selectOption.value;
            const disabled = selectOption.disabled || false;
            return (
              <option key={key} value={key} disabled={disabled}>{value}</option>
            );
          })
        }
      </select>
    );
  }

  _renderTextInput(value) {
    const {
      onBlur,
      onChange,
      fieldType,
    } = this.props;

    return (
      <input type={fieldType}
       value={value}
       onBlur={onBlur}
       onChange={e => onChange(e.target.value)}
       onKeyDown={e => this._handleKeyPress(e.keyCode, value)}
       autoFocus />
    );
  }

  _renderCurrencyInput(value) {
    const {
      onBlur,
      onChange,
    } = this.props;

    return (
      <input type="number"
       min="0.01"
       step=".01"
       value={value}
       onBlur={onBlur}
       onChange={e => onChange(e.target.value)}
       onKeyDown={e => this._handleKeyPress(e.keyCode, value)}
       autoFocus />
    );
  }

  _renderNumberInput(value) {
    const {
      onBlur,
      onChange,
    } = this.props;

    return (
      <input type="number"
       min="1"
       step="any"
       value={value}
       onBlur={onBlur}
       onChange={e => onChange(e.target.value)}
       onKeyDown={e => this._handleKeyPress(e.keyCode, value)}
       autoFocus />
    );
  }

  _renderLookUp(value) {
    const {
      lookupKey,
      onLookupClick
    } = this.props;

    return (
      <div>
        {value}
        {lookupKey && <LookupButton onClick={onLookupClick}
          lookupKey={lookupKey}
          optionalClassName="generic-lookup-button" />}
      </div>
    );
  }

  _onCellClick() {
    const {
      onToggle,
      onClick,
      onNonEditClick,
      model,
      rowIndex,
      isToggleable,
      isPassword,
      isEditable,
      isDelete,
    } = this.props;

    const { id, value, mapping, notEditableOveride } = model[rowIndex];
    if (isToggleable && isEditable) {
      onToggle(id, mapping);
    }
    else if (isPassword && isEditable) {
      onClick(id, mapping, '');
    }
    else if (isEditable && !notEditableOveride) {
     onClick(id, mapping, value);
    }
    else if (isDelete) {
      onNonEditClick(id);
    }
    else {
      // onNonEditClick(id);
    }
  }

  _renderCellContent(id, value, mapping) {
    const {
      isEditable,
      editingRecordMapping,
      editingRecordId,
      editingRecordValue,
      fieldType,
      selectOptions,
      icon,
      showSelectCarets
    } = this.props;

    const isEditing = isEditable &&
      editingRecordMapping === mapping &&
      editingRecordId === id;

    // If not editing, go ahead and render simple text
    if (!isEditing) {
      switch (fieldType) {
        case inputTypes.switch:
          return GenericTableCell._renderSwitch(id, value, mapping);
        case inputTypes.select:
          return GenericTableCell._renderSelectText(value, selectOptions, showSelectCarets);
        case inputTypes.icon:
          return (<FontAwesomeIcon icon={icon} />);
        default: {
          const displayValue = GenericTableCell._createDisplayValue(value, fieldType);
          return GenericTableCell._renderText(displayValue);
        }
      }
    }

    const currentValue = editingRecordValue || value;
    // If editing, determine which input to show:
    switch (fieldType) {
      case inputTypes.select:
        return this._renderSelect(currentValue);
      case inputTypes.currency:
        return this._renderCurrencyInput(currentValue);
      case inputTypes.number:
        return this._renderNumberInput(currentValue);
      case inputTypes.lookup:
        return this._renderLookup(currentValue);
      case inputTypes.switch:
        return GenericTableCell._renderSwitch(id, currentValue, mapping);
      case inputTypes.text:
      default:
        return this._renderTextInput(currentValue);
    }
  }

  render() {
    const {
      model,
      rowIndex,
      colIndex,
      isEditable,
      isToggleable,
      editingRecordMapping,
      editingRecordId,
    } = this.props;
    const { id, value, mapping } = model[rowIndex];
    const isOnActiveRow = id === editingRecordId;
    const isEditing = isEditable &&
      editingRecordMapping === mapping &&
      isOnActiveRow;
    return (
      <div onClick={this._onCellClick}
        className={cx(
          `lc-generic-table-cell lc-generic-table-cell--row-${rowIndex} lc-generic-table-cell--col-${colIndex}`, {
            'lc-generic-table-cell--editable': isEditable || isToggleable,
            'lc-generic-table-cell--editing': isEditing,
            'lc-generic-table-cell--active-row': isOnActiveRow
        })}>
        <div className="content-wrapper lc-generic-table-cell__content">
          {this._renderCellContent(id, value, mapping)}
        </div>
      </div>
    );
  }
}
