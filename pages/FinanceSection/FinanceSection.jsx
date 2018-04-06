// Global Deps
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
// Local Deps
import cms from '../../config/messages';
import Routes from '../../constants/Routes';
// Utils
import {
  // getFirstOfMonth,
  getTodayAndFormat,
  subtractDurationFromMoment
} from '../../utils/dateUtils';
// Components
import FinanceAccordion from '../../components/FinanceAccordion/FinanceAccordion';
import FinancialSnapshot from '../../components/FinancialSnapshot/FinancialSnapshot';
import LoadingHexagon from '../../components/LoadingHexagon/LoadingHexagon';
import ProgressBarGroup from '../../components/ProgressBarGroup/ProgressBarGroup';
import GenericNavButton from '../../components/GenericNavButton/GenericNavButton';
// Actions
import { createFinanceSummary } from '../../actions/global/finance';
import { getPerExAnalysis } from '../../actions/global/analysis';

class FinanceSection extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    financeSummary: PropTypes.object.isRequired,
    hasFetchedFinanceSummary: PropTypes.bool.isRequired,
    hasFetchedPerExSummary: PropTypes.bool.isRequired,
    incomeSummary: PropTypes.object.isRequired,
    billSummary: PropTypes.object.isRequired,
    perExSummary: PropTypes.object.isRequired,
    transactionsNotFound: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const {
      dispatch,
    } = this.props;
    const today = moment();
    // const dateStart = getFirstOfMonth(today);
    const dateStart = subtractDurationFromMoment(today, 1, 'month');
    const dateEnd = today;
    // Fetch finance summary for current month:
    dispatch(createFinanceSummary({
      dateStart,
      dateEnd
    }));
    // Fetch data for progress bars:
    dispatch(getPerExAnalysis());
  }

  _onToggle = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    return;
  }

  render() {
    const {
      financeSummary,
      incomeSummary,
      billSummary,
      perExSummary,
      transactionsNotFound,
      hasFetchedFinanceSummary,
      hasFetchedPerExSummary,
      dispatch,
    } = this.props;

    const isLoading = !hasFetchedFinanceSummary && !transactionsNotFound;
    const loadingText = 'Preparing your finance summary...this could take a minute';
    const today = getTodayAndFormat('LL');

    return (
      <div className="lc-finance-section">
        {/* <!--FINANCIAL SNAPSHOT--> */}
        <FinancialSnapshot />

        {/* <!--CONTENT--> */}
        <div className="lc-finance-section__content">

          {/* <!--BUTTON NAV--> */}
          <div className="lc-finance-section__nav">
            <div className="lc-finance-section__nav-item">
              <GenericNavButton className="lc-button--left lc-button--blue"
                                route={Routes.finances}
                                text={cms['financeSection.button.currentTransactions']} />
            </div>
            <div className="lc-finance-section__nav-item">
              <GenericNavButton className="lc-button--left lc-button--white"
                                route={Routes.financeComparison}
                                text={cms['financeSection.button.monthlyComparisons']} />
            </div>
            <div className="lc-finance-section__nav-item">
              <GenericNavButton className="lc-button--left lc-button--white"
                                route={Routes.transactions}
                                text={cms['financeSection.button.allTransactions']} />
            </div>
          </div>

          {/* <!--GRID--> */}
          <div className="lc-row row">
            <div className={'lc-column lc-column--no-float column small-10 small-offset-1' +
             ' lc-table-dimensions-parent--width lc-table-dimensions-parent--height'}>

              {/* <!--HEADER--> */}
              <h1 className="lc-finance-section__header">
                {cms['financeSection.header'](today)}
              </h1>
              {/* <!--SUBTEXT--> */}
              <div className="lc-finance-section__subtext">
                {cms['financeSection.text']}
              </div>

              {/* <!--LOADING HEXAGON--> */}
              {isLoading && <LoadingHexagon text={loadingText} />}

              {/* <!--TRANSACTIONS NOT FOUND--> */}
              {!isLoading && transactionsNotFound &&
                <div className="lc-finance-section__message">
                  {cms['financeSection.message.noTransactionsFound']}
                </div>
              }

              {/* <!--INCOME -- PROGRESS BAR--> */}
              {(!isLoading && hasFetchedPerExSummary) &&
                <ProgressBarGroup total={incomeSummary.totalAnticipatedMonthlyAmount}
                  labelAmount={incomeSummary.totalAnticipatedMonthlyAmount}
                  meterAmount={incomeSummary.totalActualAmountThisMonth}
                  label={cms['financeSection.bar.income']}
                  className="lc-progress-bar-group--green lc-progress-bar-group--income" />
              }
              {/* <!--INCOME -- ACCORDIONS--> */}
              {!isLoading && !transactionsNotFound &&
                <div className="lc-finance-section__accordion-container">
                  <FinanceAccordion summary={financeSummary.income}
                    dispatch={dispatch}
                    onToggle={this._onToggle}
                    title={cms['financeSection.section.income']} />
                  <FinanceAccordion summary={financeSummary.uncategorizedIncome}
                    dispatch={dispatch}
                    onToggle={this._onToggle}
                    title={cms['financeSection.section.uncategorizedIncome']} />
                </div>}

              {/* <!--BILLS -- PROGRESS BAR--> */}
              {(!isLoading && hasFetchedPerExSummary) &&
                <ProgressBarGroup total={billSummary.totalAnticipatedMonthlyAmount}
                  labelAmount={billSummary.totalAnticipatedMonthlyAmount}
                  meterAmount={billSummary.totalActualAmountThisMonth}
                  label={cms['financeSection.bar.bills']}
                  className="lc-progress-bar-group--blue lc-progress-bar-group--bills" />
              }
              {/* <!--BILL ACCORDIONS -- ACCORDIONS--> */}
              {!isLoading && !transactionsNotFound &&
                <div className="lc-finance-section__accordion-container">
                  <FinanceAccordion summary={financeSummary.recurringCharges}
                    dispatch={dispatch}
                    onToggle={this._onToggle}
                    title={cms['financeSection.section.recurringCharges']} />
                </div>}

              {/* <!--PEREX -- PROGRESS BAR--> */}
              {(!isLoading && hasFetchedPerExSummary) &&
                <ProgressBarGroup total={perExSummary.totalAnticipatedMonthlyAmount}
                  labelAmount={perExSummary.totalAnticipatedMonthlyAmount}
                  meterAmount={perExSummary.totalActualAmountThisMonth}
                  label={cms['financeSection.bar.perEx']}
                  className="lc-progress-bar-group--orange lc-progress-bar-group--perex" />
              }
              {/* <!--PEREX ACCORDIONS -- ACCORDIONS--> */}
              {!isLoading && !transactionsNotFound &&
                <div className="lc-finance-section__accordion-container">
                  <FinanceAccordion summary={financeSummary.livingExpenses}
                    dispatch={dispatch}
                    onToggle={this._onToggle}
                    title={cms['financeSection.section.livingExpenses']} />
                  <FinanceAccordion summary={financeSummary.uncategorizedExpenses}
                    dispatch={dispatch}
                    onToggle={this._onToggle}
                    title={cms['financeSection.section.uncategorized']} />
                  <FinanceAccordion summary={financeSummary.savingsTransfers}
                    dispatch={dispatch}
                    onToggle={this._onToggle}
                    title={cms['financeSection.section.savingsTransfers']} />
                  <FinanceAccordion summary={financeSummary.transfers}
                    dispatch={dispatch}
                    onToggle={this._onToggle}
                    title={cms['financeSection.section.transfers']} />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ financeSection }) {
  return financeSection;
}

export default connect(mapStateToProps)(FinanceSection);
