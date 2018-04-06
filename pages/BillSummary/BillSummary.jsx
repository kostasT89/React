// Global Deps
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import values from 'lodash/values';
import moment from 'moment';
// Local Deps
import cms from '../../config/messages';
import Routes from '../../constants/Routes';
// Utils
import { calculateNinetyDayPastDate } from '../../utils/dateUtils';
import { importTransactionsForEnabledAccounts } from '../../utils/transactionUtils';
import {
        importBillsForEnabledAccounts,
        importIncomesForEnabledAccounts
      } from '../../utils/connectUtils';
// Components
import ProgressBarGroup from '../../components/ProgressBarGroup/ProgressBarGroup';
import FieldsetsAccordion from '../../components/FieldsetsAccordion/FieldsetsAccordion';
import FinancialSnapshot from '../../components/FinancialSnapshot/FinancialSnapshot';
import GenericButton from '../../components/GenericButton/GenericButton';
import LoadingHexagon from '../../components/LoadingHexagon/LoadingHexagon';
// Actions
import {
        createBillSummary,
        noBillsFound,
        updateBill
      } from '../../actions/incomeBillSummary';

class BillSummary extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    summary: PropTypes.object.isRequired,
    billsNotFound: PropTypes.bool.isRequired,
    hasAttemptedBillImport: PropTypes.bool.isRequired,
    hasAttemptedTransactionsImport: PropTypes.bool.isRequired,
    readyToLoadPage: PropTypes.bool.isRequired,
    enabledAccounts: PropTypes.array.isRequired
  };

  componentDidMount() {
    const {
      readyToLoadPage,
      hasAttemptedTransactionsImport,
      hasAttemptedBillImport,
      dispatch,
      enabledAccounts
    } = this.props;
    if (readyToLoadPage && !hasAttemptedTransactionsImport) {
      importTransactionsForEnabledAccounts(enabledAccounts, dispatch);
    }
    if (readyToLoadPage && hasAttemptedTransactionsImport && hasAttemptedBillImport) {
      const today = moment();
      const dateStart = calculateNinetyDayPastDate(today);
      const dateEnd = today;
      dispatch(createBillSummary({
        dateStart,
        dateEnd
      }));
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      summary,
      dispatch,
      hasAttemptedBillImport,
      hasAttemptedTransactionsImport,
      readyToLoadPage,
      enabledAccounts
    } = this.props;
    const today = moment();
    const dateStart = calculateNinetyDayPastDate(today);
    const dateEnd = today;
    // Page is "ready" when accounts have been fetched by page wrapper component
    if (readyToLoadPage !== nextProps.readyToLoadPage) {
      importTransactionsForEnabledAccounts(enabledAccounts, dispatch);
    }
    // Check if we need to import bills (occurs after transaction import)
    if (hasAttemptedTransactionsImport !== nextProps.hasAttemptedTransactionsImport) {
      importBillsForEnabledAccounts({
        enabledAccounts,
        dispatch,
        dateStart,
        dateEnd
      });
      // We can't guarantee that a user will visit the Bills Summary page,
      // so we import those here as well:
      importIncomesForEnabledAccounts({
        enabledAccounts,
        dispatch,
        dateStart,
        dateEnd
      });
    }
    // After importing bills, we create a summary
    if (nextProps.hasAttemptedBillImport !== hasAttemptedBillImport) {
      dispatch(createBillSummary({
        dateStart,
        dateEnd
      }));
    }
    if (nextProps.summary !== summary) {
      const { fieldsets } = nextProps.summary;
      if (isEmpty(fieldsets)) return dispatch(noBillsFound());
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
    return updateBill(updatedFieldset);
  }

  render() {
    const {
      summary: {
        fieldsets,
        totalActualAmountThisMonth,
        totalAnticipatedMonthlyAmount,
      },
      hasAttemptedTransactionsImport,
      dispatch,
      billsNotFound
    } = this.props;

    const fieldsetsArray = values(fieldsets);
    const isLoading = !billsNotFound && !fieldsets;
    const loadingText = hasAttemptedTransactionsImport ?
      cms['loading.importTransactions'] :
      cms['loading.billSummary'];

    return (
      <div className="lc-bill-summary">
        {/* <!--FINANCIAL SNAPSHOT--> */}
        <FinancialSnapshot />

        {/* <!--CONTENT--> */}
        <div className="lc-bill-summary__content">
          {/* <!--NAV MENU--> */}
          <div className="lc-bill-summary__menu">
            <Link className="lc-bill-summary__link lc-bill-summary__link--shadow"
                  to={Routes.incomeSummary}>
              <GenericButton className=""
                text={cms['billIncomeSummary.button.income']} />
            </Link>
            <Link className="lc-bill-summary__link">
              <GenericButton className="lc-button--blue"
                text={cms['billIncomeSummary.button.expenses']} />
            </Link>
          </div>

          <div className="lc-row medium-11">
            {/* <!--HEADER--> */}
            <h1 className="lc-bill-summary__header">
              {cms['billSummary.header']}
            </h1>

            {/* <!--SUBTEXT--> */}
            <div className="lc-bill-summary__subtext">
              {cms['billIncomeSummary.text']}
            </div>

            {/* <!--PROGRESS BAR--> */}
            {(!isLoading && !isEmpty(fieldsetsArray)) &&
              <ProgressBarGroup total={totalAnticipatedMonthlyAmount}
                labelAmount={totalAnticipatedMonthlyAmount}
                meterAmount={totalActualAmountThisMonth}
                amountTextChange={cms['progressBarGroup.actualText']}
                label={cms['billSummary.progressBar.title']} />
            }

            {/* <!--ACCORDION--> */}
            {isLoading ? <LoadingHexagon text={loadingText} /> :
              billsNotFound ?
                <div className="lc-bill-summary__message">
                  {cms['billSummary.message.noBillsFound']}
                </div> :
                <FieldsetsAccordion fieldsetGroups={fieldsetsArray}
                  dispatch={dispatch}
                  onToggle={this._onToggle} />}

            {/* <!--TEXT--> */}
            <div className="lc-bill-summary__text">
              {cms['billIncomeSummary.note']}
            </div>

            {/* <!--BUTTONS CONTAINER--> */}
            <div className="lc-bill-summary__button-container">
              <Link className="lc-bill-summary__link" to={Routes.transactions}>
                <GenericButton className=""
                  text={cms['billIncomeSummary.button.left']} />
              </Link>
              <Link className="lc-bill-summary__link" to={Routes.connect}>
                <GenericButton className="lc-button--blue-secondary"
                  text={cms['billIncomeSummary.button.middle']} />
              </Link>
              <Link className="lc-bill-summary__link" to={Routes.transactionsSummary}>
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

function mapStateToProps({ billSummary }) {
  return {
    ...billSummary,
  };
}

export default connect(mapStateToProps)(BillSummary);
