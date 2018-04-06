// Global Deps
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
        Accordion,
        AccordionItem,
        AccordionItemTitle,
        AccordionItemBody,
      } from 'react-accessible-accordion';
// Local Deps
import FontAwesomeIcon from '../FontAwesomeIcon/FontAwesomeIcon';
import TransactionsTable from '../TransactionsTable/wrappers/FieldsetTransactionsTableWrapper';
import { DAYS_PER_MONTH } from '../../config/properties';
import {
        fields,
        headerHeight,
        rowHeight,
        containerHeightTolerance
      } from '../../config/incomeBillSummaryTransactions';
import { formatCurrency } from '../../utils/stringUtils';
import { calculateAverageSpendingPerMonth } from '../../utils/transactionUtils';

class FieldsetsAccordion extends Component {

  _generateItem(fieldsetGroup, idx, numberOfDays) {
    const {
      fieldset: {
        isVariable,
        id,
        name,
        // frequency
      },
      transactions,
    } = fieldsetGroup;
    const numberOfMonths = Math.round(numberOfDays / DAYS_PER_MONTH);
    const monthAverage = calculateAverageSpendingPerMonth(transactions, numberOfMonths);
    const containerHeight =
      (rowHeight * transactions.length) + headerHeight + containerHeightTolerance;

    const { dispatch, onToggle } = this.props;
    return (
      <AccordionItem className="lc-accordion-item lc-table-dimensions-parent--width" key={idx}>
        <AccordionItemTitle className="lc-accordion-item__title">
          <div className="lc-column column small-1">
            <FontAwesomeIcon icon="chevron-down" />
            <FontAwesomeIcon icon="chevron-up" />
          </div>
          <div className="lc-column column small-4">
            <div className="lc-accordion-item__text lc-accordion-item__text--left-align">
              {name}
            </div>
          </div>
          <div className="lc-column column small-3">
            <div className="lc-accordion-item__text">
              Average Monthly Amount
            </div>
          </div>
          <div className="lc-column column small-2">
            <div className="lc-accordion-item__text">
              {formatCurrency(monthAverage)}
            </div>
          </div>
          <div className="lc-column">
            <label className="lc-accordion-item__text lc-checkbox"
              htmlFor={id.toString()}>
              Variable
              <input className="lc-accordion-item__checkbox"
                     type="checkbox"
                     onChange={onToggle}
                     value={isVariable}
                     defaultChecked={isVariable}
                     name={id.toString()} />
              <span className="checkmark" />
            </label>
          </div>
        </AccordionItemTitle>
        <AccordionItemBody>
          <div className="lc-accordion-item__body">
            <TransactionsTable transactions={transactions}
              fields={fields}
              dispatch={dispatch}
              headerHeight={headerHeight}
              rowHeight={rowHeight}
              containerHeight={containerHeight}
              className="lc-transactions-table-3" />
          </div>
        </AccordionItemBody>
      </AccordionItem>
    );
  }

  render() {
    const {
      className,
      fieldsetGroups,
      accordion,
      numberOfDays
    } = this.props;

    return (
      <Accordion className={`lc-accordion ${className}`}
                 accordion={accordion}>
        {fieldsetGroups.map((fieldsetGroup, idx) => (
          this._generateItem(fieldsetGroup, idx, numberOfDays)
        ))}
      </Accordion>
    );
  }
}

FieldsetsAccordion.defaultProps = {
  accordion: false
};

FieldsetsAccordion.propTypes = {
  className: PropTypes.string,
  accordion: PropTypes.bool,
  dispatch: PropTypes.func,
  onToggle: PropTypes.func.isRequired,
  numberOfDays: PropTypes.number.isRequired,
  fieldsetGroups: PropTypes.arrayOf(PropTypes.shape({
    averageMonthlyAmount: PropTypes.oneOfType([
      PropTypes.number.isRequired,
      PropTypes.string.isRequired
    ]),
    fieldset: PropTypes.object.isRequired,
    transactions: PropTypes.array.isRequired
  })).isRequired
};

export default FieldsetsAccordion;
