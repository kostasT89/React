// Global Deps
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import moment from 'moment';
// Local Deps
import cms from '../../config/messages';
import {
        defaultPaginationPage,
        defaultPaginationCount
      } from '../../config/properties';
import { fields } from '../../config/transactionsTable';
import Routes from '../../constants/Routes';
// Utils
import { forwardTo } from '../../utils/navigationUtils';
import { populateTransactionsRoute } from '../../utils/routeUtils';
// Components
import TransactionsTableComponent from '../../components/TransactionsTable/wrappers/TransactionsTableWrapper';
import LoadingHexagon from '../../components/LoadingHexagon/LoadingHexagon';
import Pagination from '../../components/Pagination/Pagination';
// Actions
import { createComparisonSummary } from '../../actions/global/finance';

class ComparisonTransactions extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    comparisonSummary: PropTypes.object.isRequired,
    hasFetchedComparisonSummary: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      query: PropTypes.object.isRequired
    }).isRequired
  };

  static _configureTable(tableConfig) {
    if (isEmpty(tableConfig.transactions)) { return {}; }
    return {
      transactions: tableConfig.transactions,
      dispatch: tableConfig.dispatch,
      fields: tableConfig.fields
    };
  }

  static _configurePagination({
    totalCount,
    count,
    activePage,
    onPageChange
  }) {
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
      location: {
        query: {
          startDate,
          endDate
        }
      },
      hasFetchedComparisonSummary
    } = this.props;

    if (!hasFetchedComparisonSummary) {
      dispatch(createComparisonSummary({
        dateStart: moment(startDate),
        dateEnd: moment(endDate)
      }));
    }
  }

  _handlePageChange(pageNumber) {
    const { location } = this.props;
    const count = get(location, 'query.count', defaultPaginationCount);
    const url = populateTransactionsRoute({
      page: pageNumber,
      count
    });
    forwardTo(url);
  }

  render() {
    const {
      _configureTable,
      _configurePagination
    } = ComparisonTransactions;
    const {
      dispatch,
      comparisonSummary,
      hasFetchedComparisonSummary,
      location
    } = this.props;

    const {
      startDate,
      endDate,
      lastDate,
      mainCategory,
      subCategory
    } = location.query;

    let allTransactions = [];
    if (hasFetchedComparisonSummary) {
      allTransactions = comparisonSummary[mainCategory][subCategory] ?
        comparisonSummary[mainCategory][subCategory].transactions : [];
    }
    const transactions = allTransactions.filter(trans => (
      !moment(trans.date).isBefore(moment(startDate))
       && !moment(trans.date).isAfter(moment(endDate))
    ));
    const totalCount = transactions.length;
    // Initialize
    const page = get(location, 'query.page', defaultPaginationPage);
    const count = get(location, 'query.count', defaultPaginationCount);
    const isLoading = !hasFetchedComparisonSummary;
    // Configure Pagination
    const paginationConfig = _configurePagination({
      totalCount,
      count,
      activePage: page,
      onPageChange: pageNumber => this._handlePageChange(pageNumber)
    });
    // Configure Table
    const tableConfig = _configureTable({
      dispatch,
      transactions,
      fields
    });

    return !isLoading && (
      <div className="lc-comparison-transactions-page animated fadeIn">
        <div className="lc-comparison-transactions-page__content lc-table-dimensions-parent--height">
          <div className="lc-row">
            {/* <!--HEADER--> */}
            <h1 className="lc-comparison-transactions-page__header lc-table-dimensions-parent--width">
              {cms['transactions.header']}
            </h1>
            {/* <!--TEXT--> */}
            <div className="lc-comparison-transactions-page__text">
              {cms['transactions.text']}
            </div>
            {/* <!--TRANSACTIONS TABLE--> */}
            <div className="lc-comparison-transactions-page__table">
              {isLoading ?
                <LoadingHexagon /> :
                <TransactionsTableComponent {...tableConfig} />
              }
            </div>
            {/* <!--NOTE-->} */}
            <div className="lc-comparison-transactions-page__note">
              {cms['transactions.note']}
            </div>
            {/* <!--PAGINATION--> */}
            <div className="lc-column lc-column--pagination columns medium-12">
              {totalCount > 0 && <Pagination {...paginationConfig} /> }
            </div>
            {/* <!--BUTTONS--> */}
            <div className="lc-comparison-transactions-page__buttons-container">
              <Link to={{
                  pathname: Routes.financeComparison,
                  query: { lastDate }
                  }} >
                <button className="lc-comparison-transactions-page__button lc-comparison-transactions-page__button--left">
                  {cms['comparisonTransactions.button.back']}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ financeSection }) {
  return {
    ...financeSection,
  };
}

export default connect(mapStateToProps)(ComparisonTransactions);
