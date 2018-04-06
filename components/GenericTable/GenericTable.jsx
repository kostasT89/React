import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Column } from 'fixed-data-table';
import tap from 'lodash/tap';
import get from 'lodash/get';

import GenericTableCell from '../GenericTableCell/GenericTableCell';
import GenericHeaderCell from '../GenericHeaderCell/GenericHeaderCell';

import {
  defaultCellWidth,
  defaultCellHeight,
} from '../../config/properties';

import './GenericTable.scss';

export default class GenericTable extends Component {

  static propTypes = {
    showSelectCarets: PropTypes.bool,
    optionalClass: PropTypes.string,
    model: PropTypes.array.isRequired,
    fields: PropTypes.array.isRequired,
    editingData: PropTypes.shape({
      editingRecordId: PropTypes.oneOfType([ // eslint-disable-line
        React.PropTypes.string,
        React.PropTypes.number
      ]),
      editingRecordValue: PropTypes.oneOfType([ // eslint-disable-line
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.bool
      ]),
      editingRecordMapping: PropTypes.string // eslint-disable-line
    }),
    interactionFunctions: PropTypes.shape({
      onBlur: PropTypes.func, // eslint-disable-line
      onSave: PropTypes.func, // eslint-disable-line
      onClick: PropTypes.func, // eslint-disable-line
      onChange: PropTypes.func, // eslint-disable-line
      onToggle: PropTypes.func // eslint-disable-line
    }),
    rowIdMapping: PropTypes.string.isRequired,
    onHeaderClick: PropTypes.func,
    containerWidth: PropTypes.number,
    containerHeight: PropTypes.number,
    rowHeight: PropTypes.number,
    headerHeight: PropTypes.number
  };

  static _generateInitialColumnWidths(headers) {
    return tap({}, blankObj => headers.forEach(
      header => blankObj[header] = defaultCellWidth) // eslint-disable-line
    );
  }

  static _configureHeaderCell(field, onClick) {
    const {
      header,
      isActive,
      mapping,
      isSortable,
    } = field;
    return {
      header,
      mapping,
      isActive,
      onClick,
      isSortable,
    };
  }

  constructor(props) {
    super(props);
    this.state = this._getInitialState();
  }

  _getInitialState() {
    const { fields } = this.props;
    const fieldNames = fields.map(field => field.name);
    return {
      columnWidths: GenericTable._generateInitialColumnWidths(fieldNames)
    };
  }

  _onColumnResizeEndCallback(newColumnWidth, columnKey) {
    this.setState(({ columnWidths }) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth,
      }
    }));
  }

  _configureTable() {
    const {
      containerWidth,
      containerHeight,
      model,
      rowHeight,
      headerHeight
    } = this.props;

    return {
      width: containerWidth,
      height: containerHeight,
      rowHeight: rowHeight || defaultCellHeight,
      headerHeight: headerHeight || defaultCellHeight,
      rowsCount: model.length,
      isColumnResizing: false,
      onColumnResizeEndCallback: ::this._onColumnResizeEndCallback
    };
  }

  _configureTableCell(field, modelData, colIndex) {
    const {
      rowIdMapping,
      interactionFunctions,
      editingData,
      showSelectCarets
    } = this.props;

    const model = modelData.map(data => ({
      id: data[rowIdMapping],
      value: field.mapping ? get(data, field.mapping) : false,
      mapping: field.mapping,
      notEditableOveride: data.notEditableOveride,
    }));
    return {
      model,
      colIndex,
      showSelectCarets,
      mapping: field.mapping,
      fieldType: field.fieldType,
      isEditable: !!field.isEditable,
      isPassword: !!field.isPassword,
      isToggleable: !!field.isToggleable,
      ...editingData,
      ...interactionFunctions,
      lookupKey: field.lookupKey,
      selectOptions: field.selectOptions,
      selectOrder: field.selectOrder,
      ...field,
    };
  }

  _generateColumns(fields, data) {
    const { columnWidths } = this.state;
    return fields.map((field, colIdx) => {
      const { onHeaderClick } = this.props;
      const genericHeaderCellProps = GenericTable._configureHeaderCell(field, onHeaderClick);
      const genericTableCellProps = this._configureTableCell(field, data, colIdx);
      const isResizable = field.isResizable || true;
      const colWidth = field.colWidth || columnWidths[field.name];
      const align = field.align || 'center';
      const flexGrow = field.flexGrow || 0;
      return (
        <Column key={colIdx}
                header={<GenericHeaderCell {...genericHeaderCellProps} />}
                cell={<GenericTableCell {...genericTableCellProps} />}
                width={colWidth}
                minWidth={100}
                columnKey={field.name}
                isResizable={isResizable}
                align={align}
                flexGrow={flexGrow} />
      );
    });
  }


  render() {
    const {
      optionalClass,
      model,
      fields
    } = this.props;

    // Configure props:
    const tableProps = this._configureTable();
    // Generate columns:
    const columns = this._generateColumns(fields, model);
    return (
      <div className={`lc-generic-table ${optionalClass}`}>
        <Table {...tableProps}>
          {columns}
        </Table>
      </div>
    );
  }
}
