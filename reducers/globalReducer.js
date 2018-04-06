import {
        CO_BROWSING_ENABLED,
        GET_USER_SUCCESS,
        GET_GOALS_SUCCESS,
        GET_ENABLED_ACCOUNTS_SUCCESS,
        APP_DATA_HAS_BEEN_UPDATED,
        APP_REFERENCE_DATA_HAS_BEEN_RECEIVED,
        REFRESH_TRANSACTIONS_SUCCESS,
        RECEIVE_APP_API_URL,
        IMPORT_ACCOUNTS_FAIL,
        IMPORT_ACCOUNTS_SUCCESS,
      } from '../constants/AppConstants';
import { EMPTY_STRING } from '../config/properties';

const initialState = {
  userData: {
    displayName: EMPTY_STRING,
    visiblePages: [],
    firstName: EMPTY_STRING
  },
  appData: {},
  appDataIsDirty: false,
  appDataHasBeenFetched: false,
  enabledAccounts: [],
  enabledYodleeAccounts: [],
  importedAccounts: [],
  goals: [],
  isLoadingAccounts: true,
  isLoadingGoals: true,
  hasFetchedEnabledAccounts: false,
  hasAttemptedAccountImport: false,
  shouldDisplayCoBrowsingHeader: false,
  hasAttemptedTransactionsImport: false,
};

const actionMappings = {
  [GET_USER_SUCCESS]: '_getUserDataFromLocalStorageSuccess',
  [APP_DATA_HAS_BEEN_UPDATED]: '_appDataHasBeenUpdated',
  [APP_REFERENCE_DATA_HAS_BEEN_RECEIVED]: '_receiveReferenceData',
  [GET_ENABLED_ACCOUNTS_SUCCESS]: '_receiveEnabledAccounts',
  [GET_GOALS_SUCCESS]: '_receiveGoals',
  [REFRESH_TRANSACTIONS_SUCCESS]: '_receiveRefreshedTransactions',
  [RECEIVE_APP_API_URL]: '_receiveAppApiUrl',
  [IMPORT_ACCOUNTS_SUCCESS]: '_handleImportAccountsSuccess',
  [IMPORT_ACCOUNTS_FAIL]: '_handleImportAccountsFail',
  [CO_BROWSING_ENABLED]: '_displayCoBrowsingHeader',
};

const reducer = {
  _getUserDataFromLocalStorageSuccess(state, action) {
    return {
      ...state,
      userData: action.userData
    };
  },

  _receiveEnabledAccounts(state, { enabledAccounts, enabledYodleeAccounts }) {
    return {
      ...state,
      enabledAccounts,
      isLoadingAccounts: false,
      enabledYodleeAccounts,
      hasFetchedEnabledAccounts: true
    };
  },

  _receiveAppApiUrl(state, action) {
    return {
      ...state,
      apiUrl: action.data,
    };
  },

  _appDataHasBeenUpdated(state, { apiUrl }) {
    return {
      ...state,
      appDataIsDirty: true,
      apiUrl,
    };
  },

  _receiveReferenceData(state, action) {
    return {
      ...state,
      appDataIsDirty: false,
      appDataHasBeenFetched: true,
      appData: action.referenceData
    };
  },

  _receiveGoals(state, { goals }) {
    return {
      ...state,
      goals,
      isLoadingGoals: false
    };
  },

  _receiveRefreshedTransactions(state, action) {
    return {
      ...state,
      transactions: action.transactions
    };
  },

  _handleImportAccountsSuccess(state, { accounts }) {
    return {
      ...state,
      hasAttemptedAccountImport: true,
      importedAccounts: accounts
    };
  },

  _handleImportAccountsFail(state) {
    return {
      ...state,
      hasAttemptedAccountImport: true,
    };
  },

  _displayCoBrowsingHeader(state) {
    return {
      ...state,
      shouldDisplayCoBrowsingHeader: true
    };
  },
};

const globalReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default globalReducer;
