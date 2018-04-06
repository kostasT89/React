// Global Deps
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import find from 'lodash/find';
import kebabCase from 'lodash/kebabCase';
import Dimensions from 'react-dimensions';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
// Local Deps
import {
        defaultPaginationPage,
        defaultPaginationCount
      } from '../../config/properties';
import { createTableSchema } from '../../config/accountTransactionsTable';
import accountAttrs from '../../constants/enums/yodleeAccountAttributes';
import { createSummarySchema } from '../../schemas/accountTransactionsSummarySchema';
// Utils
import { populateAccountTransactionsRoute } from '../../utils/routeUtils';
import { forwardTo } from '../../utils/navigationUtils';
import { transactionsGroupByMonth } from '../../utils/financeUtils';
import AccountTypes from '../../constants/enums/accountTypes';
// Actions
import { getTransactionsByAccount } from '../../actions/global/transactions';
import { getAccountsFromLocalStorage } from '../../actions/global/accounts';
// Components
import Pagination from '../../components/Pagination/Pagination';
import DataSummary from '../../components/DataSummary/DataSummary';
import AccountIcon from '../../components/AccountIcon/AccountIcon';
import LoadingHexagon from '../../components/LoadingHexagon/LoadingHexagon';
import FinancialSnapshot from '../../components/FinancialSnapshot/FinancialSnapshot';
import TransactionsTableComponent from '../../components/TransactionsTable/wrappers/AccountTransactionsTableWrapper';
import TransactionMenu from '../../components/TransactionMenu/TransactionMenu';

class AccountTransactions extends Component {
  /*
  * Note: Needed to disable the linter for the following propTypes because the rule does
  * not extend to nextProps, which is how these props are being referenced due to
  * the fact that this page is not re-mounted if only the query params change in the route.
  */
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
    params: PropTypes.object.isRequired,
    transactions: PropTypes.array.isRequired,
    accounts: PropTypes.array.isRequired,
    accountId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    isFetchingTransactions: PropTypes.bool.isRequired,
    totalCount: PropTypes.number.isRequired,
    currentPage: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    showTransactionDeleteLoadingSpinner: PropTypes.bool,
    containerWidth: PropTypes.number,
  };

  static _configureTable({ transactions, fields, dispatch }) {
    if (isEmpty(transactions)) { return {}; }
    return {
      transactions,
      fields,
      dispatch
    };
  }

  static _configurePagination({ totalCount, count, activePage, onPageChange }) {
    if (totalCount < 1) { return {}; }
    const numberOfItemsPerPage = count || defaultPaginationCount;
    return {
      activePage: Number(activePage),
      itemsCountPerPage: Number(numberOfItemsPerPage),
      totalItemsCount: totalCount,
      onChange: onPageChange
    };
  }

  static _getAccountData({ accounts, params }) {
    if (isEmpty(accounts)) { return {}; }
    const { accountId } = params;
    const accountData = find(accounts, { id: Number(accountId) });
    return accountData;
  }

  static _requestTransactionsData({ location, params, dispatch }) {
    const { accountId } = params;
    const page = get(location, 'query.page', defaultPaginationPage);
    const count = get(location, 'query.count', defaultPaginationCount);

    dispatch(getTransactionsByAccount({
      accountId,
      page,
      count
    }));
  }

  static _createHeader({ accountName, providerId }) {
    return (
      <div className="lc-account-transactions-page__header">
        <div className="lc-account-transactions-page__header-icon">
          <AccountIcon providerId={providerId} />
        </div>
        <h1 className="lc-account-transactions-page__header-text">
          {accountName}
        </h1>
      </div>
    );
  }

  componentDidMount() {
    const {
      dispatch,
      params,
      location,
    } = this.props;
    const { _requestTransactionsData } = AccountTransactions;
    _requestTransactionsData({ location, params, dispatch });
    dispatch(getAccountsFromLocalStorage());
  }

  componentWillReceiveProps(newProps) {
    const {
      dispatch,
      params,
      location,
      isFetchingTransactions,
      accountId,
      currentPage,
    } = newProps;

    const { _requestTransactionsData } = AccountTransactions;
    const page = get(location, 'query.page', defaultPaginationPage);
    // If transactions data is stale or does not exist, go get new data:
    const locationHasChanged = (params.accountId !== accountId) || (page !== currentPage);
    if (!isFetchingTransactions && locationHasChanged) {
      _requestTransactionsData({ location, params, dispatch });
    }
  }

  _handlePageChange(pageNumber) {
    const {
      params,
      location,
    } = this.props;
    const { accountId } = params;
    const count = get(location, 'query.count', defaultPaginationCount);
    const url = populateAccountTransactionsRoute({
      accountId,
      page: pageNumber,
      count
    });
    forwardTo(url);
  }

  render() {
    const {
      dispatch,
      transactions,
      accounts,
      params,
      location,
      isFetchingTransactions,
      totalCount,
      showTransactionDeleteLoadingSpinner,
      containerWidth
    } = this.props;

    const { accountId } = params;
    const {
      _configureTable,
      _configurePagination,
      _getAccountData,
      _createHeader
    } = AccountTransactions;
    const page = get(location, 'query.page', defaultPaginationPage);
    const count = get(location, 'query.count', defaultPaginationCount);

    // Configure Pagination
    const paginationConfig = _configurePagination({
      totalCount,
      count,
      accountId,
      activePage: page,
      onPageChange: pageNumber => this._handlePageChange(pageNumber)
    });

    // Get Account Data
    const accountData = _getAccountData({ accounts, params });
    const hasAccountData = !isEmpty(Object.keys(accountData));
    const accountType = get(accountData, accountAttrs.container);

    // Configure Data Summary
    const dataSummarySchema = hasAccountData && createSummarySchema(accountData);

    // Configure Table
    const shouldRenderTable = hasAccountData && !isFetchingTransactions;
    const fields = hasAccountData && createTableSchema(accountData.CONTAINER);
    const tableConfig = fields && _configureTable({
      transactions,
      fields,
      dispatch
    });
    const data = transactionsGroupByMonth(transactions).reverse();
    const isChartVisible = accountType === AccountTypes.investment && data.length === 3;

    return (
      <div className={'lc-account-transactions-page animated fadeIn ' +
          `lc-account-transactions-page--${kebabCase(accountType)}`}>
        <FinancialSnapshot />
        <div className="lc-account-transactions-page__content lc-table-dimensions-parent--height">
          <div className="lc-row row">
            {/* <!--HEADER--> */}
            <div className="lc-column columns medium-12 lc-column--no-padding">
              <div className="lc-column column medium-9">
                {hasAccountData && _createHeader({
                    providerId: accountData.providerId,
                    accountName: accountData.accountName
                  }) }
              </div>
              <div className="lc-column column medium-3 transaction-menu">
                <TransactionMenu accountId={accountId}
                                 dispatch={dispatch}
                                 showAccountOptionsMenu={false}
                                 accountData={accountData} />
              </div>
            </div>
            {/* <!--DATA SUMMARY--> */}
            <div className={'lc-column columns'}>
              {hasAccountData && <DataSummary data={dataSummarySchema} /> }
            </div>
            {/* INVESTMENT AREA CHART */}
            { isChartVisible &&
              <div className="lc-column columns lc-investment-areachart">
                <AreaChart width={containerWidth - 227} height={containerWidth / 4} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        className="lc-gradient-start"
                        offset="5%" />
                      <stop
                        className="lc-gradient-end"
                        offset="95%" />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={d => `$${d}`} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="total" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
              </div>
            }
            {/* <!--TRANSACTIONS TABLE--> */}
            <div className="lc-column columns medium-12 lc-table-dimensions-parent--width">
              { shouldRenderTable || showTransactionDeleteLoadingSpinner ?
                <TransactionsTableComponent {...tableConfig} /> : <LoadingHexagon />
                }
            </div>
            {/* <!--PAGINATION--> */}
            <div className="lc-column columns medium-12">
              {totalCount > 0 && <Pagination {...paginationConfig} /> }
            </div>
          </div>
        </div>
      </div>

    );
  }
}

function mapStateToProps({ accountTransactions }) {
  const {
    accountId,
    accounts,
    isFetchingTransactions,
    pageNumber,
    transactions,
    totalCount,
    currentPage,
    accountsHaveRendered } = accountTransactions;
  return {
    accountId,
    accounts,
    isFetchingTransactions,
    pageNumber,
    transactions,
    totalCount,
    currentPage,
    accountsHaveRendered,
  };
}

export default connect(mapStateToProps)(Dimensions()(AccountTransactions));
