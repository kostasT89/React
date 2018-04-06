// Global Deps
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import {
        Accordion,
        AccordionItem,
        AccordionItemTitle,
        AccordionItemBody,
      } from 'react-accessible-accordion';
// Local Deps
import { fields } from '../../config/financeTransactions';
import { fisecalCategories } from '../../constants/enums/yodleeCategories';
import { formatCurrency } from '../../utils/stringUtils';
// Components
import TransactionsTableComponent from '../TransactionsTable/wrappers/FinanceTransactionsTableWrapper';
import LoadingWave from '../LoadingWave/LoadingWave';

class FinanceAccordion extends Component {

  _generateItem(category, categoryData, idx) {
    const { dispatch } = this.props;
    const {
      transactions,
      total
    } = categoryData;

    const transactionTableRowHeight = 57; // Height of transaction table cell
    const tableBottomPadding = 2;
    const transationTableHeight =
      (transactionTableRowHeight * (categoryData.transactions.length + 1)) + tableBottomPadding;
    return (
      <AccordionItem key={idx}>
        <AccordionItemTitle className="lc-accordion-item__title">
          <div className="lc-accordion-title__content">
            <div className="lc-column column small-8">
              <div className="lc-accordion-item__text lc-accordion-item__text--left-align">
                {get(fisecalCategories, `${category}.value`)}
              </div>
            </div>
            <div className="lc-column column small-4">
              <div className="lc-accordion-item__text">
                {formatCurrency(total)}
              </div>
            </div>
          </div>
        </AccordionItemTitle>
        <AccordionItemBody>
          <div className="lc-accordion-item__body">
            {isEmpty(transactions) ?
              <LoadingWave /> :
              <TransactionsTableComponent transactions={transactions}
                fields={fields}
                dispatch={dispatch}
                containerHeight={transationTableHeight}
                className="lc-transactions-table-2" />}
          </div>
        </AccordionItemBody>
      </AccordionItem>
    );
  }

  render() {
    const {
      className,
      summary,
      accordion,
      title
    } = this.props;
    const categories = Object.keys(summary);
    const noEmptyCategories = {};
    categories.forEach((category) => {
      if (summary[category]) noEmptyCategories[category] = summary[category];
    });
    const availableCategories = Object.keys(noEmptyCategories);

    return (
      !isEmpty(availableCategories) ?
        <div className="lc-finance-accordion">
          <div className="lc-finance-accordion__section-title">
            {title}
          </div>
          <Accordion className={`lc-finance-accordion__accordion ${className}`}
                    accordion={accordion}>
            {availableCategories.map((category, idx) => (
                this._generateItem(category, noEmptyCategories[category], idx)
            ))}
          </Accordion>
        </div>
        :
        <div />
    );
  }
}

FinanceAccordion.defaultProps = {
  accordion: false
};

FinanceAccordion.propTypes = {
  className: PropTypes.string,
  accordion: PropTypes.bool,
  dispatch: PropTypes.func,
  title: PropTypes.string,
  summary: PropTypes.object.isRequired
};

export default FinanceAccordion;
