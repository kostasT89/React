// Global Deps:
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VirtualList from 'react-tiny-virtual-list';
import moment from 'moment';
import cx from 'classnames';
// Local Deps:
import {
        maxListLength,
        defaultListItemHeight,
        shortDefaultDateFormat,
        dbDateFormat
      } from '../../config/properties';
import { formatCurrency } from '../../utils/stringUtils';
import {
        convertDateFromDbToLocalFormat,
        createTodayMoment
      } from '../../utils/dateUtils';
// Components:
class TransactionsList extends Component {

  _renderItem = ({ index, style }) => {
    const { transactions } = this.props;
    const transaction = transactions[index];
    const {
      date,
      name,
      amount
    } = transaction;
    const dateMoment = moment(date, dbDateFormat);
    const today = createTodayMoment();
    const isInPast = dateMoment.isBefore(today);
    const formattedDate = convertDateFromDbToLocalFormat(date, shortDefaultDateFormat);
    const formattedAmount = formatCurrency(amount);
    const textStyle = { lineHeight: `${style.height}px` };

    return (
      <div key={index} style={style}
        className={cx('lc-transactions-list__item',
                    { 'lc-transactions-list__item--past': isInPast })}>
        {/* <!-- DATE --> */}
        <div className="lc-column columns small-3">
          <div className="lc-transactions-list__text lc-transactions-list__text--date"
               style={textStyle}>
            {formattedDate}
          </div>
        </div>
        {/* <!-- NAME --> */}
        <div className="lc-column columns small-6">
          <div className="lc-transactions-list__text"
               style={textStyle}>
            {name}
          </div>
        </div>
        {/* <!-- AMOUNT --> */}
        <div className="lc-column columns small-3">
          <div className="lc-transactions-list__text lc-transactions-list__text--currency"
               style={textStyle}>
            {formattedAmount}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { transactions, className } = this.props;
    const classNameValue = className || '';
    const itemSize = defaultListItemHeight;
    const itemCount = transactions.length;
    const height = transactions.length < maxListLength ?
      (transactions.length * itemSize) :
      itemSize * maxListLength;
    return (
      <VirtualList className={`lc-transactions-list ${classNameValue}`}
                   width="100%"
                   height={height}
                   itemCount={itemCount}
                   itemSize={itemSize}
                   renderItem={this._renderItem} />
   );
  }
}

TransactionsList.propTypes = {
  transactions: PropTypes.array.isRequired,
  className: PropTypes.string
};

export default TransactionsList;
