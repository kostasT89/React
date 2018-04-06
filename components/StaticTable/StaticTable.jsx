import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Column } from 'fixed-data-table';
import tap from 'lodash/tap';

import StaticTableCell from '../StaticTableCell/StaticTableCell';
import GenericHeaderCell from '../GenericHeaderCell/GenericHeaderCell';

import {
  defaultCellWidth,
  staticTableCellHeight,
} from '../../config/properties';

import './StaticTable.scss';

export default class StaticTable extends Component {

  static propTypes = {
    optionalClass: PropTypes.string,
    model: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    onHeaderClick: PropTypes.func,
    onCellClick: PropTypes.func,
    containerWidth: PropTypes.number,
    containerHeight: PropTypes.number,
  };

  static _generateInitialColumnWidths(headers) {
    return tap({}, blankObj => headers.forEach(
      header => blankObj[header] = defaultCellWidth) // eslint-disable-line
    );
  }

  static _configureHeaderCell(column, onClick) {
    const { header, mapping, isSortable } = column;
    return {
      header,
      mapping,
      onClick,
      isSortable
    };
  }

  constructor(props) {
    super(props);
    this.state = this._getInitialState();
  }

  _getInitialState() {
    const { columns } = this.props;
    const fieldNames = columns.map(col => col.columnKey);
    return {
      columnWidths: StaticTable._generateInitialColumnWidths(fieldNames)
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
      model
    } = this.props;

    return {
      width: containerWidth,
      height: containerHeight,
      rowHeight: staticTableCellHeight,
      rowsCount: model.length,
      headerHeight: staticTableCellHeight,
      isColumnResizing: false,
      onColumnResizeEndCallback: ::this._onColumnResizeEndCallback
    };
  }

  _configureTableCell(col, model) {
    const { type, icon } = col;
    return {
      model,
      onClick: this.props.onCellClick,
      type,
      icon
    };
  }

  _generateColumns(cols, model) {
    const { columnWidths } = this.state;
    return cols.map((col, colIdx) => {
      // Column component config
      const { onHeaderClick } = this.props;
      const genericHeaderCellProps = StaticTable._configureHeaderCell(col, onHeaderClick);
      const genericTableCellProps = this._configureTableCell(col, model);
      // Other props:
      const columnProps = {
        key: colIdx,
        columnKey: col.columnKey || colIdx,
        mapping: col.mapping,
        isResizable: col.isResizable || true,
        width: col.colWidth || columnWidths[col.columnKey],
        minWidth: 100,
        align: col.align || 'center',
        flexGrow: col.flexGrow || 0
      };
      return (
        <Column header={<GenericHeaderCell {...genericHeaderCellProps} />}
                cell={<StaticTableCell {...genericTableCellProps} />}
                {...columnProps} />
      );
    });
  }


  render() {
    const {
      optionalClass,
      model,
      columns
    } = this.props;
    // Configure props:
    const tableProps = this._configureTable();
    // Generate columns:
    const cols = this._generateColumns(columns, model);
    return (
      <div className={`lc-static-table ${optionalClass}`}>
        <Table {...tableProps}>
          {cols}
        </Table>
      </div>
    );
  }
}
