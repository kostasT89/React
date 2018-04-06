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
  subtractDurationFromMoment,
  addDurationToMoment
} from '../../utils/dateUtils';
// Components
import ComparisonTableAccordion from '../../components/ComparisonTableAccordion/ComparisonTableAccordion';
import FinancialSnapshot from '../../components/FinancialSnapshot/FinancialSnapshot';
import LoadingHexagon from '../../components/LoadingHexagon/LoadingHexagon';
import GenericNavButton from '../../components/GenericNavButton/GenericNavButton';
// Actions
import { createComparisonSummary } from '../../actions/global/finance';

class ComparisonTableSection extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    comparisonSummary: PropTypes.object.isRequired,
    hasFetchedComparisonSummary: PropTypes.bool.isRequired,
    transactionsNotFound: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      query: PropTypes.object
    })
  };

  componentWillMount() {
    const {
      location: {
        query: {
          lastDate
        }
      }
    } = this.props;
    const today = lastDate ? moment(lastDate) : moment();
    this.setState({ lastDate: today });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { lastDate } = this.state;
    const dateStart = subtractDurationFromMoment(lastDate, 3, 'month');
    const dateEnd = lastDate;
    // Fetch finance summary for current month:
    dispatch(createComparisonSummary({
      dateStart,
      dateEnd
    }));
  }

  _onToggle = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    return;
  }

  _onClickPrevMonth = () => {
    const {
      dispatch,
    } = this.props;
    const { lastDate } = this.state;

    const dateStart = subtractDurationFromMoment(lastDate, 4, 'month');
    const dateEnd = subtractDurationFromMoment(lastDate, 1, 'month');

    this.setState({ lastDate: dateEnd });
    dispatch(createComparisonSummary({
      dateStart,
      dateEnd
    }));
  }

  _onClickNextMonth = () => {
    const {
      dispatch,
    } = this.props;
    const { lastDate } = this.state;

    const today = moment();
    const dateEnd = addDurationToMoment(lastDate, 1, 'month');
    if (today.isAfter(dateEnd)) { // Check if current date is now
      const dateStart = subtractDurationFromMoment(lastDate, 2, 'month');

      this.setState({ lastDate: dateEnd });
      dispatch(createComparisonSummary({
        dateStart,
        dateEnd
      }));
    }
  }

  render() {
    const {
      comparisonSummary,
      transactionsNotFound,
      hasFetchedComparisonSummary,
      dispatch
    } = this.props;

    const { lastDate } = this.state;
    const isLoading = !hasFetchedComparisonSummary && !transactionsNotFound;
    const loadingText = 'Preparing your finance comparison tables...this could take a minute';
    const today = getTodayAndFormat('LL');

    return (
      <div className="lc-finance-comparison-table-secton">
        {/* <!--FINANCIAL SNAPSHOT--> */}
        <FinancialSnapshot />

        {/* <!--CONTENT--> */}
        <div className="lc-finance-comparison-table-secton__content">

          {/* <!--BUTTON NAV--> */}
          <div className="lc-finance-comparison-table-secton__nav">
            <div className="lc-finance-comparison-table-secton__nav-item">
              <GenericNavButton className="lc-button--left lc-button--white"
                                route={Routes.finances}
                                text={cms['financeSection.button.currentTransactions']} />
            </div>
            <div className="lc-finance-comparison-table-secton__nav-item">
              <GenericNavButton className="lc-button--left lc-button--blue"
                                route={Routes.financeComparison}
                                text={cms['financeSection.button.monthlyComparisons']} />
            </div>
            <div className="lc-finance-comparison-table-secton__nav-item">
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
              <h1 className="lc-finance-comparison-table-secton__header">
                {cms['financeSection.comparisonTable.header'](today)}
              </h1>

              {/* <!--LOADING HEXAGON--> */}
              {isLoading && <LoadingHexagon text={loadingText} />}

              {/* <!--TRANSACTIONS NOT FOUND--> */}
              {!isLoading && transactionsNotFound &&
                <div className="lc-finance-comparison-table-secton__message">
                  {cms['financeSection.message.noTransactionsFound']}
                </div>
              }

              {/* <!--INCOME -- ACCORDIONS--> */}
              {!isLoading && !transactionsNotFound &&
                <div className="lc-finance-comparison-table-secton__accordion-container">
                  <ComparisonTableAccordion summary={comparisonSummary.income}
                    dispatch={dispatch}
                    onToggle={this._onToggle}
                    title={cms['financeSection.section.income']}
                    lastDate={lastDate}
                    onNext={this._onClickNextMonth}
                    onPrev={this._onClickPrevMonth}
                    isDateRow={true}
                    mainCategory="income" />
                  <ComparisonTableAccordion summary={comparisonSummary.uncategorizedIncome}
                    dispatch={dispatch}
                    onToggle={this._onToggle}
                    title={cms['financeSection.section.uncategorizedIncome']}
                    lastDate={lastDate}
                    mainCategory="uncategorizedIncome" />
                </div>}

              {/* <!--BILL ACCORDIONS -- ACCORDIONS--> */}
              {!isLoading && !transactionsNotFound &&
                <div className="lc-finance-comparison-table-secton__accordion-container">
                  <ComparisonTableAccordion summary={comparisonSummary.recurringCharges}
                    dispatch={dispatch}
                    onToggle={this._onToggle}
                    title={cms['financeSection.section.recurringCharges']}
                    lastDate={lastDate}
                    isDateRow={true}
                    mainCategory="recurringCharges" />
                </div>}

              {/* <!--PEREX ACCORDIONS -- ACCORDIONS--> */}
              {!isLoading && !transactionsNotFound &&
                <div className="lc-finance-comparison-table-secton__accordion-container">
                  <ComparisonTableAccordion summary={comparisonSummary.livingExpenses}
                    dispatch={dispatch}
                    onToggle={this._onToggle}
                    title={cms['financeSection.section.livingExpenses']}
                    lastDate={lastDate}
                    isDateRow={true}
                    mainCategory="livingExpenses" />
                  <ComparisonTableAccordion summary={comparisonSummary.uncategorizedExpenses}
                    dispatch={dispatch}
                    onToggle={this._onToggle}
                    title={cms['financeSection.section.uncategorized']}
                    lastDate={lastDate}
                    mainCategory="uncategorizedExpenses" />
                  <ComparisonTableAccordion summary={comparisonSummary.savingsTransfers}
                    dispatch={dispatch}
                    onToggle={this._onToggle}
                    title={cms['financeSection.section.savingsTransfers']}
                    lastDate={lastDate}
                    mainCategory="savingsTransfers" />
                  <ComparisonTableAccordion summary={comparisonSummary.transfers}
                    dispatch={dispatch}
                    onToggle={this._onToggle}
                    title={cms['financeSection.section.transfers']}
                    lastDate={lastDate}
                    mainCategory="transfers" />
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
  return {
    ...financeSection
  };
}

export default connect(mapStateToProps)(ComparisonTableSection);
