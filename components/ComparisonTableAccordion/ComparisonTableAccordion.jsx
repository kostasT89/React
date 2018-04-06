// Global Deps
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import moment from 'moment';
import { Link } from 'react-router';

// Local Deps
import { fisecalCategories } from '../../constants/enums/yodleeCategories';
import { formatCurrency } from '../../utils/stringUtils';
import { groupBySummaryForComparisonTable } from '../../utils/financeUtils';
import {
  subtractDurationFromMomentAndFormat,
  addDurationToMoment,
  subtractDurationFromMoment,
  formatMoment
} from '../../utils/dateUtils';
import DurationTypes from '../../constants/enums/durationTypes';
import cms from '../../config/messages';
import Routes from '../../constants/Routes';

class ComparisonTableAccordion extends Component {

  static _generateItem(category, categoryData, idx, lastDate, mainCategory) {
    const oneMonthAgo = subtractDurationFromMoment(lastDate, 1, 'month');
    const twoMonthsAgo = subtractDurationFromMoment(lastDate, 2, 'month');
    return (
      <div className="lc-accordion-item__title" key={idx}>
        <div className="lc-accordion-title__content">
          <div className="lc-column column small-6">
            <div className="lc-accordion-item__text lc-accordion-item__text--left-align">
              {get(fisecalCategories, `${category}.value`)}
            </div>
          </div>
          <div className="lc-column column small-2">
            <Link key={idx}
                to={{
                  pathname: Routes.comparisonTransactions,
                  query: {
                    startDate: formatMoment(moment(twoMonthsAgo).startOf('month'), 'YYYY-MM-DD'),
                    endDate: formatMoment(moment(twoMonthsAgo).endOf('month'), 'YYYY-MM-DD'),
                    lastDate: formatMoment(moment(lastDate), 'YYYY-MM-DD'),
                    subCategory: category,
                    mainCategory
                  },
                }} >
              <div className="lc-accordion-item__text">
                {formatCurrency(categoryData[2].total)}
              </div>
            </Link>
          </div>
          <div className="lc-column column small-2">
            <Link key={idx}
                to={{
                  pathname: Routes.comparisonTransactions,
                  query: {
                    startDate: formatMoment(moment(oneMonthAgo).startOf('month'), 'YYYY-MM-DD'),
                    endDate: formatMoment(moment(oneMonthAgo).endOf('month'), 'YYYY-MM-DD'),
                    lastDate: formatMoment(moment(lastDate), 'YYYY-MM-DD'),
                    subCategory: category,
                    mainCategory
                  },
                }} >
              <div className="lc-accordion-item__text">
                {formatCurrency(categoryData[1].total)}
              </div>
            </Link>
          </div>
          <div className="lc-column column small-2">
            <Link key={idx}
                to={{
                  pathname: Routes.comparisonTransactions,
                  query: {
                    startDate: formatMoment(moment(lastDate).startOf('month'), 'YYYY-MM-DD'),
                    endDate: formatMoment(moment(lastDate).endOf('month'), 'YYYY-MM-DD'),
                    lastDate: formatMoment(moment(lastDate), 'YYYY-MM-DD'),
                    subCategory: category,
                    mainCategory
                  },
                }} >
              <div className="lc-accordion-item__text">
                {formatCurrency(categoryData[0].total)}
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  static _addAmountSensitiveClass(amount) {
    if (amount > 0) return 'lc-accridion-item__text--positive';
    return '';
  }

  render() {
    const {
      className,
      summary,
      title,
      lastDate,
      onNext,
      onPrev,
      mainCategory,
      isDateRow
    } = this.props;
    const { _addAmountSensitiveClass } = ComparisonTableAccordion;
    const categories = Object.keys(summary);
    const noEmptyCategories = {};
    categories.forEach((category) => {
      if (summary[category]) noEmptyCategories[category] = summary[category];
    });
    const comparisonSummary = groupBySummaryForComparisonTable(noEmptyCategories, lastDate);
    const availableCategories = Object.keys(comparisonSummary);
    const { _generateItem } = ComparisonTableAccordion;
    // Calculate the total value
    const totalAmounts = Array(3);
    availableCategories.forEach((category) => {
      comparisonSummary[category].forEach((data, idx) => {
        totalAmounts[idx] = (totalAmounts[idx] || 0) + parseFloat(data.total);
      });
    });

    const today = moment();
    const dateEnd = addDurationToMoment(lastDate, 1, 'month');
    const isLastDate = !today.isAfter(dateEnd);

    return (
      <div className="lc-finance-comparison-accordion">
        {isDateRow &&
          <div className="lc-finance-comparison-date_row">
            {/* Month Selector */}
            {onPrev && onNext &&
              <div className="lc-column column small-offset-3 small-3 lc-accordion-item__text">
                {cms['financeSection.comparisonTable.monthSelection']}
              </div>
            }
            <div className={`lc-column column small-offset-${onPrev && onNext ? 0 : 6}
                     small-2 lc-accordion-item__text lc-date-header`}>
              {onPrev &&
                <a className="lc-left" onClick={onPrev}>
                  <div className="lc-triangle-left" />
                </a>
              }
              {subtractDurationFromMomentAndFormat({
                  dateMoment: lastDate,
                  duration: 2,
                  durationType: DurationTypes.months,
                  format: 'MMM YYYY'
                })}
            </div>
            <div className="lc-column column small-2 lc-accordion-item__text">
              {subtractDurationFromMomentAndFormat({
                  dateMoment: lastDate,
                  duration: 1,
                  durationType: DurationTypes.months,
                  format: 'MMM YYYY'
                })}
            </div>
            <div className="lc-column column small-2 lc-accordion-item__text lc-date-header">
              {onNext &&
                <a className="lc-right" onClick={onNext}>
                  <div className={`lc-triangle-right ${isLastDate ? 'lc-disable' : ''}`} />
                </a>
              }
              {subtractDurationFromMomentAndFormat({
                  dateMoment: lastDate,
                  duration: 0,
                  durationType: DurationTypes.months,
                  format: 'MMM YYYY'
                })}
            </div>
          </div>
        }
        <div className="lc-finance-comparison-accordion__section-title">
          <div className="lc-column column small-6 lc-addcordion-header__text">
            {title}
          </div>
          <div className={'lc-column column small-2 lc-accordion-item__text '
            + `${_addAmountSensitiveClass(totalAmounts[2])}`}>
            {`${formatCurrency((totalAmounts[2] || 0).toFixed(2))}`}
          </div>
          <div className={'lc-column column small-2 lc-accordion-item__text '
            + `${_addAmountSensitiveClass(totalAmounts[1])}`}>
            {`${formatCurrency((totalAmounts[1] || 0).toFixed(2))}`}
          </div>
          <div className={'lc-column column small-2 lc-accordion-item__text '
            + `${_addAmountSensitiveClass(totalAmounts[0])}`}>
            {`${formatCurrency((totalAmounts[0] || 0).toFixed(2))}`}
          </div>
        </div>
        <div className={`lc-finance-comparison-accordion__accordion ${className}`} >
          {availableCategories.map((category, idx) => (
            _generateItem(category, comparisonSummary[category], idx, lastDate, mainCategory)
          ))}
        </div>
      </div>
    );
  }
}

ComparisonTableAccordion.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  summary: PropTypes.object.isRequired,
  lastDate: PropTypes.object,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  mainCategory: PropTypes.string,
  isDateRow: PropTypes.bool
};

export default ComparisonTableAccordion;
