import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import orderBy from 'lodash/orderBy';
import isEmpty from 'lodash/isEmpty';
import Dimensions from 'react-dimensions';

import StaticTable from '../../components/StaticTable/StaticTable';
import cms from '../../config/messages';

export class SimpleTableComponent extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    notFoundMessage: PropTypes.string,
    onCellClick: PropTypes.func,
    containerWidth: PropTypes.number,
    containerHeight: PropTypes.number,
    allowEmpty: PropTypes.bool,
  };

  _sortByHeader(headerMapping, sortDir) {
    const { items } = this.props;
    const itemsCopy = cloneDeep(items);
    const sortedItems = orderBy(
      itemsCopy,
      transaction => get(transaction, headerMapping),
      [sortDir]
    );
    this.setState({
      items: sortedItems
    });
  }

  _onCellClick(item, rowIndex, columnKey, model) {
    const { onCellClick } = this.props;
    if (onCellClick) {
      onCellClick(item, rowIndex, columnKey, model);
    }
  }

  _configureTable(model) {
    const {
      columns,
      containerHeight,
      containerWidth,
     } = this.props;

    return {
      containerHeight,
      containerWidth,
      model,
      columns,
      onHeaderClick: ::this._sortByHeader,
      onCellClick: ::this._onCellClick,
    };
  }

  render() {
    const {
      items,
      notFoundMessage,
      allowEmpty,
    } = this.props;
    const message = notFoundMessage || cms['itemsTable.notFound'];

    let tableProps;
    if (!isEmpty(items) || allowEmpty) {
      tableProps = this._configureTable(items);
    }
    return (
      <div className="lc-simple-table">
        {!isEmpty(items) || allowEmpty ? <StaticTable {...tableProps} /> :
        <div className="lc-simple-table__message">
          {message}
        </div>
        }
      </div>
    );
  }
}

export default Dimensions()(SimpleTableComponent);
