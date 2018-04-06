// Global Deps
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import values from 'lodash/values';
import moment from 'moment';
import { extendMoment } from 'moment-range';
// Local Deps
import cms from '../../config/messages';
import Routes from '../../constants/Routes';
// Utils
import {
        calculateNinetyDayPastDate,
        convertMillisecondsToDays
      } from '../../utils/dateUtils';
import { importTransactionsForEnabledAccounts } from '../../utils/transactionUtils';
import {
        importIncomesForEnabledAccounts,
        importBillsForEnabledAccounts
      } from '../../utils/connectUtils';
// Components
import ProgressBarGroup from '../../components/ProgressBarGroup/ProgressBarGroup';
import FieldsetsAccordion from '../../components/FieldsetsAccordion/FieldsetsAccordion';
import FinancialSnapshot from '../../components/FinancialSnapshot/FinancialSnapshot';
import GenericButton from '../../components/GenericButton/GenericButton';
import LoadingHexagon from '../../components/LoadingHexagon/LoadingHexagon';
// Actions
import {
        createIncomeSummary,
        noIncomesFound,
        updateIncome,
      } from '../../actions/incomeBillSummary';

class IncomeSummary extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    summary: PropTypes.object.isRequired,
    incomesNotFound: PropTypes.bool.isRequired,
    hasAttemptedIncomeImport: PropTypes.bool.isRequired,
    hasAttemptedTransactionsImport: PropTypes.bool.isRequired,
    readyToLoadPage: PropTypes.bool.isRequired,
    enabledAccounts: PropTypes.array.isRequired
  };

  static momentRange = extendMoment(moment);

  componentDidMount() {
    const {
      readyToLoadPage,
      hasAttemptedTransactionsImport,
      hasAttemptedIncomeImport,
      dispatch,
      enabledAccounts
    } = this.props;
    if (readyToLoadPage && !hasAttemptedTransactionsImport) {
      importTransactionsForEnabledAccounts(enabledAccounts, dispatch);
    }
    if (readyToLoadPage && hasAttemptedTransactionsImport && hasAttemptedIncomeImport) {
      const today = moment();
      const dateStart = calculateNinetyDayPastDate(today);
      const dateEnd = today;
      dispatch(createIncomeSummary({
        dateStart,
        dateEnd
      }));
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      summary,
      dispatch,
      hasAttemptedIncomeImport,
      hasAttemptedTransactionsImport,
      readyToLoadPage,
      enabledAccounts
    } = this.props;
    // Initialize:
    const today = moment();
    const dateStart = calculateNinetyDayPastDate(today);
    const dateEnd = today;
    // Page is "ready" when accounts have been fetched by page wrapper component
    if (readyToLoadPage !== nextProps.readyToLoadPage) {
      importTransactionsForEnabledAccounts(enabledAccounts, dispatch);
    }
    // Check if we need to import income (occurs after transaction import)
    if (hasAttemptedTransactionsImport !== nextProps.hasAttemptedTransactionsImport) {
      importIncomesForEnabledAccounts({
        enabledAccounts,
        dispatch,
        dateStart,
        dateEnd
      });
      // We can't guarantee that a user will visit the Bills Summary page,
      // so we import those here as well:
      importBillsForEnabledAccounts({
        enabledAccounts,
        dispatch,
        dateStart,
        dateEnd
      });
    }
    // After importing income, we create a summary
    if (hasAttemptedTransactionsImport &&
      nextProps.hasAttemptedIncomeImport !== hasAttemptedIncomeImport) {
      dispatch(createIncomeSummary({
        dateStart,
        dateEnd
      }));
    }
    if (hasAttemptedIncomeImport &&
      nextProps.summary !== summary) {
      const { fieldsets } = nextProps.summary;
      if (isEmpty(fieldsets)) return dispatch(noIncomesFound());
    }
  }

  _onToggle = (e) => {
    const { currentTarget } = e;
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const status = currentTarget.value;
    const id = currentTarget.name;
    const { fieldsets } = this.props.summary;
    const oldFieldset = fieldsets[id];
    const updatedFieldset = {
      ...oldFieldset,
      isVariable: status
    };
    return updateIncome(updatedFieldset);
  }


  render() {
    const {
      summary: {
        fieldsets,
        totalActualAmountThisMonth,
        totalAnticipatedMonthlyAmount
      },
      dispatch,
      incomesNotFound,
      hasAttemptedTransactionsImport
    } = this.props;
    const { momentRange } = IncomeSummary;
    const fieldsetsArray = values(fieldsets);
    const isLoading = !incomesNotFound && !fieldsets;
    const loadingText = hasAttemptedTransactionsImport ?
      cms['loading.incomeSummary'] :
      cms['loading.importTransactions'];
    const today = moment();
    const summaryDateStart = calculateNinetyDayPastDate(today);
    const summaryDateEnd = today;
    const range = momentRange.range(summaryDateStart, summaryDateEnd);
    const numberOfDays = convertMillisecondsToDays(range.valueOf());

    return (
      <div className="lc-income-summary">
        {/* <!--FINANCIAL SNAPSHOT--> */}
        <FinancialSnapshot />

        {/* <!--CONTENT--> */}
        <div className="lc-income-summary__content">

          {/* <!--NAV MENU--> */}
          <div className="lc-income-summary__menu">
            <Link className="lc-income-summary__link">
              <GenericButton className="lc-button--blue"
                text={cms['billIncomeSummary.button.income']} />
            </Link>
            <Link className="lc-income-summary__link lc-income-summary__link--shadow"
                  to={Routes.billSummary}>
              <GenericButton className=""
                text={cms['billIncomeSummary.button.expenses']} />
            </Link>
          </div>

          <div className="lc-row medium-11">

            {/* <!--HEADER--> */}
            <h1 className="lc-income-summary__header">
              {cms['incomeSummary.header']}
            </h1>
            {/* <!--SUBTEXT--> */}
            <div className="lc-income-summary__subtext">
              {cms['billIncomeSummary.text']}
            </div>

            {/* <!--PROGRESS BAR--> */}
            {(!isLoading && !isEmpty(fieldsetsArray)) &&
              <ProgressBarGroup total={totalAnticipatedMonthlyAmount}
                labelAmount={totalAnticipatedMonthlyAmount}
                meterAmount={totalActualAmountThisMonth}
                amountTextChange={cms['progressBarGroup.actualText']}
                label={cms['incomeSummary.progressBar.title']} />
            }

            {/* <!--ACCORDION--> */}
            {isLoading ? <LoadingHexagon text={loadingText} /> :
              incomesNotFound ?
                <div className="lc-income-summary__message">
                  {cms['incomeSummary.message.noIncomesFound']}
                </div> :
                <FieldsetsAccordion fieldsetGroups={fieldsetsArray}
                  dispatch={dispatch}
                  onToggle={this._onToggle}
                  numberOfDays={numberOfDays} />}

            {/* <!--TEXT--> */}
            <div className="lc-income-summary__text">
              {cms['billIncomeSummary.note']}
            </div>

            {/* <!--BUTTONS CONTAINER--> */}
            <div className="lc-income-summary__button-container">
              <Link className="lc-income-summary__link" to={Routes.transactions}>
                <GenericButton className=""
                  text={cms['billIncomeSummary.button.left']} />
              </Link>
              <Link className="lc-income-summary__link" to={Routes.connect}>
                <GenericButton className="lc-button--blue-secondary"
                  text={cms['billIncomeSummary.button.middle']} />
              </Link>
              <Link className="lc-income-summary__link" to={Routes.transactionsSummary}>
                <GenericButton className="lc-button--blue"
                  text={cms['billIncomeSummary.button.right']} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ incomeSummary }) {
  return {
    ...incomeSummary,
  };
}

export default connect(mapStateToProps)(IncomeSummary);
