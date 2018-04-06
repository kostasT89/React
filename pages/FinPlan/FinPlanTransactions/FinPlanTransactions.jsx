// Global Deps
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import moment from 'moment';
// Local Deps
import cms from '../../../config/messages';
import {
        defaultPaginationPage,
        defaultPaginationCount,
      } from '../../../config/properties';
import Routes from '../../../constants/Routes';
import { fields } from '../../../config/transactionsTable';
// Utils
import { forwardTo } from '../../../utils/navigationUtils';
import { calculateNinetyDayPastDate } from '../../../utils/dateUtils';
import { populateFinPlanTransactionsRoute } from '../../../utils/routeUtils';
// Actions
import { getTransactionsByUser } from '../../../actions/global/transactions';
import { updateFinPlanBreadcrumb } from '../../../actions/global/finPlan/finPlanBreadcrumbs';
import FinPlanSummaryPageType from '../../../config/finPlanSummaryPageType';
// Components
import TransactionsTableComponent from '../../../components/TransactionsTable/TransactionsTable';
import LoadingHexagon from '../../../components/LoadingHexagon/LoadingHexagon';
import GenericNavButton from '../../../components/GenericNavButton/GenericNavButton';
import Pagination from '../../../components/Pagination/Pagination';
import FinancialSnapshot from '../../../components/FinancialSnapshot/FinancialSnapshot';
import FinancialPlanBreadcrumb
  from '../../../components/FinancialPlanBreadcrumb/FinancialPlanBreadcrumb';
import FinPlanHOC from '../../../hoc/FinPlanHOC/FinPlanHOC';
import FinancialPlanSummaryNavMenu from '../../../components/FinancialPlanSummaryNavMenu/FinancialPlanSummaryNavMenu';

// CONST
const showCarets = true;

class FinPlanTransactions extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    finPlanId: PropTypes.number,
    transactions: PropTypes.array.isRequired,
    totalCount: PropTypes.number.isRequired,
    isFetchingTransactions: PropTypes.bool.isRequired,
    previousStep: PropTypes.object,
    currentStep: PropTypes.object,
    furthestStep: PropTypes.object,
    isFetchingFinPlan: PropTypes.bool,
    location: PropTypes.shape({
      query: PropTypes.object.isRequired
    }).isRequired,
    isFinPlanSubmitted: PropTypes.bool.isRequired
  };

  static _requestTransactionsData({ location, dispatch }) {
    // Dates:
    const today = moment();
    const pastDate = calculateNinetyDayPastDate(today);
    const dateEnd = today;
    const dateStart = pastDate;
    // Pagination:
    const page = get(location, 'query.page', defaultPaginationPage);
    const count = get(location, 'query.count', defaultPaginationCount);

    dispatch(getTransactionsByUser({
      dateStart,
      dateEnd,
      page,
      count
    }));
  }

  static _configurePagination({
    totalCount,
    count,
    activePage,
    onPageChange
  }) {
    // If there are no transactions available, we shouldn't show pagination.
    if (totalCount < 1) { return {}; }
    const numberOfItemsPerPage = count || defaultPaginationCount;
    return {
      activePage: Number(activePage),
      itemsCountPerPage: Number(numberOfItemsPerPage),
      totalItemsCount: totalCount,
      onChange: onPageChange
    };
  }

  componentDidMount() {
    const {
      dispatch,
      location,
    } = this.props;

    const { _requestTransactionsData } = FinPlanTransactions;
    _requestTransactionsData({
      location,
      dispatch
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      dispatch,
      location,
      currentStep,
      previousStep,
      finPlanId
    } = nextProps;

    const { _requestTransactionsData } = FinPlanTransactions;
    if (location.query !== this.props.location.query) {
      _requestTransactionsData({ location, dispatch });
    }
    // Update breadcrumbs:
    const pageHasNeverBeenVisited = currentStep && !currentStep.isVisited;
    const previousPageIsComplete = previousStep && previousStep.isCompleted;
    if (finPlanId && pageHasNeverBeenVisited && previousPageIsComplete) {
      dispatch(updateFinPlanBreadcrumb({
        ...currentStep,
        isVisited: true,
        isCompleted: true,
      }, finPlanId));
    }
  }

  _handlePageChange(pageNumber) {
    const { location } = this.props;
    const count = get(location, 'query.count', defaultPaginationCount);
    const url = populateFinPlanTransactionsRoute({
      page: pageNumber,
      count
    });
    forwardTo(url);
  }

  render() {
    const {
      _configurePagination
    } = FinPlanTransactions;
    const {
      dispatch,
      transactions,
      totalCount,
      isFetchingTransactions,
      isFetchingFinPlan,
      currentStep,
      furthestStep,
      location,
      isFinPlanSubmitted
    } = this.props;
    const page = get(location, 'query.page', defaultPaginationPage);
    const count = get(location, 'query.count', defaultPaginationCount);

    // Configure Pagination
    const paginationConfig = _configurePagination({
      totalCount,
      count,
      activePage: page,
      onPageChange: pageNumber => this._handlePageChange(pageNumber)
    });
    // Configure Table
    const tableConfig = {
      dispatch,
      transactions,
      fields,
      showCarets
    };

    return (
      <div className="lc-transactions-page lc-fin-plan-page animated fadeIn">
        {/* <!--FINANCIAL SNAPSHOT--> */}
        <FinancialSnapshot />
        <div className="lc-transactions-page__content lc-table-dimensions-parent--width lc-table-dimensions-parent--height">
          <div className="lc-row">
            {/* <!--NAV MENU -->  */}
            { isFinPlanSubmitted &&
              <FinancialPlanSummaryNavMenu pageType={FinPlanSummaryPageType.finPlanDataPage} /> }
            {/* <!--BREADCRUMB -->  */}
            {!isFetchingFinPlan &&
              <FinancialPlanBreadcrumb currentStep={currentStep}
                furthestStep={furthestStep} />
            }
            {/* <!--HEADER--> */}
            <h1 className="lc-transactions-page__header lc-fin-plan__header">
              {cms['transactions.header']}
            </h1>
            {/* <!--TEXT--> */}
            <div className="lc-transactions-page__text">
              {cms['transactions.text']}
            </div>
            {/* <!--TRANSACTIONS TABLE--> */}
            <div className="lc-transactions-page__table">
              {isFetchingTransactions ?
                <LoadingHexagon /> :
                <TransactionsTableComponent {...tableConfig} />
              }
            </div>
            {/* <!--NOTE-->} */}
            <div className="lc-transactions-page__note">
              {cms['transactions.note']}
            </div>
            {/* <!--PAGINATION--> */}
            <div className="lc-column lc-column--pagination columns medium-12">
              {totalCount > 0 && <Pagination {...paginationConfig} /> }
            </div>
            {/* <!--BUTTONS--> */}
            <div className="lc-row row lc-fin-plan__buttons">
              <GenericNavButton className="lc-button--left lc-button--white"
                                route={Routes.finPlanLiabilities}
                                text={cms['button.previous']} />
              <GenericNavButton className="lc-button--right lc-button--blue"
                  route={Routes.finPlanBills}
                  text={cms['button.next']} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.finPlanTransactions,
    isFinPlanSubmitted: state.finPlan.isFinPlanSubmitted
  };
}

export default FinPlanHOC(connect(mapStateToProps)(FinPlanTransactions));
