import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import inputTypes from '../../constants/enums/inputTypes';
import FontAwesomeIcon from '../FontAwesomeIcon/FontAwesomeIcon';
import {
  formatDateInputForDisplay
} from '../../utils/dateUtils';
import './StaticTableCell.scss';

export default class StaticTableCell extends Component {

  static propTypes = {
    rowIndex: PropTypes.number, // Provided by fixed-data-table
    columnKey: PropTypes.oneOfType([ // Forwarded by fixed-data-table from col config
      PropTypes.string,
      PropTypes.number
    ]),
    model: PropTypes.array.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.string,
    icon: PropTypes.string
  };

  static _renderText(value) {
    return (
      <div>{value}</div>
    );
  }

  static _createDisplayValue(item, mapping, type, icon) {
    const value = get(item, mapping, '');

    switch (type) {
      case inputTypes.date:
        return formatDateInputForDisplay();
      case inputTypes.currency:
        return `$${value}`;
      case inputTypes.icon:
        return (<FontAwesomeIcon icon={icon} />);
      case inputTypes.number:
      case inputTypes.text:
      default:
        return value;
    }
  }

  _onCellClick() {
    const {
      onClick,
      model,
      rowIndex,
      columnKey
    } = this.props;
    const item = model[rowIndex];
    if (onClick) {
      onClick(item, rowIndex, columnKey, model);
    }
  }

  _renderCellContent(item) {
    const {
      type,
      columnKey,
      icon
    } = this.props;
    const displayValue = StaticTableCell._createDisplayValue(item, columnKey, type, icon);
    return StaticTableCell._renderText(displayValue);
  }

  render() {
    const {
      model,
      rowIndex,
      columnKey
    } = this.props;
    const item = model[rowIndex];
    return (
      <div onClick={::this._onCellClick}
        className={`lc-generic-table-cell lc-generic-table-cell--row-${rowIndex}` +
                   `lc-generic-table-cell--col-${columnKey}`}>
        <div className="content-wrapper lc-generic-table-cell__content">
          {this._renderCellContent(item)}
        </div>
      </div>
    );
  }
}
