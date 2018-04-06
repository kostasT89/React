import {
  GET_TRANSACTIONS_BY_ACCOUNT,
  GET_TRANSACTIONS_BY_ACCOUNT_SUCCESS,
  GET_ENABLED_ACCOUNTS_SUCCESS,
  TOGGLE_ACCOUNT_OPTIONS_MENU_SUCCESS
} from '../constants/AppConstants';

import { sortTypes } from '../config/properties';

const initialState = {
  isFetchingTransactions: true,
  sortDir: sortTypes.asc,
  transactions: [],
  accounts: [],
  editingRecordId: null,
  editingRecordValue: null,
  editingRecordAttribute: null,
  activeRow: null,
  accountId: '',
  totalCount: 0,
  currentPage: '1',
  showTransactionDeleteLoadingSpinner: false
};

const actionMappings = {
    [GET_TRANSACTIONS_BY_ACCOUNT_SUCCESS]: '_getTransactionsByAccountSuccess',
    [GET_TRANSACTIONS_BY_ACCOUNT]: '_getTransactionsByAccount',
    [GET_ENABLED_ACCOUNTS_SUCCESS]: '_getAccountsSuccess',
    [TOGGLE_ACCOUNT_OPTIONS_MENU_SUCCESS]: '_showTransactionDeleteLoadingSpinner',
};

const reducer = {

  _getTransactionsByAccount(state, action) {
    return {
      ...state,
      isFetchingTransactions: true,
      accountId: action.accountId,
      currentPage: action.page,
      transactions: []
    };
  },

  _getTransactionsByAccountSuccess(state, action) {
    return {
      ...state,
      isFetchingTransactions: false,
      transactions: action.transactions,
      totalCount: action.totalCount
    };
  },

  _getAccountsSuccess(state, action) {
    return {
      ...state,
      accounts: action.enabledYodleeAccounts,
      isFetchingTransactions: false
    };
  },

  _showTransactionDeleteLoadingSpinner(state) {
    return {
      ...state,
      showTransactionDeleteLoadingSpinner: true
    };
  }
};

const accountTransactionsReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default accountTransactionsReducer;
