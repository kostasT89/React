import {
         GET_TRANSACTIONS_BY_USER_SUCCESS,
         GET_TRANSACTIONS_BY_USER_REQUEST,
         GET_USER_SUCCESS,
         SIGNAL_ACCOUNTS_RENDERED
       } from '../constants/AppConstants';

import { sortTypes } from '../config/properties';

const initialState = {
  isLoading: true,
  sortDir: sortTypes.asc,
  transactions: [],
  editingRecordId: null,
  editingRecordValue: null,
  editingRecordAttribute: null,
  updateInProgress: false,
  activeRow: null,
  isFetchingTransactions: true,
  sideNavHasRendered: false,
  totalCount: 1
};

const actionMappings = {
  [GET_TRANSACTIONS_BY_USER_SUCCESS]: '_getTransactionsSuccess',
  [GET_TRANSACTIONS_BY_USER_REQUEST]: '_requestTransactions',
  [GET_USER_SUCCESS]: '_getUserDataFromLocalStorageSuccess',
  [SIGNAL_ACCOUNTS_RENDERED]: '_receiveSignalFromSideNav'
};

const reducer = {
  _requestTransactions(state) {
    return {
      ...state,
      isFetchingTransactions: true
    };
  },

  _getUserDataFromLocalStorageSuccess(state, action) {
    return {
      ...state,
      userData: action.userData
    };
  },

  _getTransactionsSuccess(state, {
    transactions,
    totalCount
  }) {
    return {
      ...state,
      isFetchingTransactions: false,
      transactions,
      totalCount,
    };
  },

  _receiveSignalFromSideNav(state) {
    return {
      ...state,
      sideNavHasRendered: true
    };
  }
};

const transactionsReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default transactionsReducer;
