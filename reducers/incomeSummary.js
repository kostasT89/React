import {
         CREATE_INCOME_SUMMARY_SUCCESS,
         CREATE_INCOME_SUMMARY_FAIL,
         INCOMES_NOT_FOUND,
         UPDATE_INCOME,
         IMPORT_INCOMES_SUCCESS,
         IMPORT_INCOMES_FAIL,
         READY_TO_LOAD_PAGE,
         IMPORT_TRANSACTIONS_SUCCESS,
         IMPORT_TRANSACTIONS_FAIL,
         GET_ENABLED_ACCOUNTS_SUCCESS
       } from '../constants/AppConstants';

const initialState = {
  incomesNotFound: false,
  summary: {},
  readyToLoadPage: false,
  enabledAccounts: [],
  hasAttemptedTransactionsImport: false,
  hasAttemptedIncomeImport: false,
};

const actionMappings = {
  [CREATE_INCOME_SUMMARY_SUCCESS]: '_createIncomeSummary',
  [CREATE_INCOME_SUMMARY_FAIL]: '_incomesNotFound',
  [INCOMES_NOT_FOUND]: '_incomesNotFound',
  [UPDATE_INCOME]: '_updateIncome',
  [IMPORT_INCOMES_SUCCESS]: '_handleIncomeImportResponse',
  [IMPORT_INCOMES_FAIL]: '_handleIncomeImportResponse',
  [READY_TO_LOAD_PAGE]: '_handleReadyToLoadPageSignal',
  [IMPORT_TRANSACTIONS_SUCCESS]: '_handleImportTransactionsRequest',
  [IMPORT_TRANSACTIONS_FAIL]: '_handleImportTransactionsRequest',
  [GET_ENABLED_ACCOUNTS_SUCCESS]: '_receiveEnabledAccounts'
};

const reducer = {
  _receiveEnabledAccounts(state, {
    enabledAccounts,
  }) {
    return {
      ...state,
      enabledAccounts,
      hasFetchedEnabledAccounts: true
    };
  },
  _updateIncome(state, income) {
    const { summary } = this.state;
    summary[income.id].fieldset = income;
      return {
        ...state,
        summary
      };
  },
  _createIncomeSummary(state, { summary }) {
    return {
      ...state,
      summary
    };
  },
  _incomesNotFound(state) {
    return {
      ...state,
      incomesNotFound: true
    };
  },
  _handleIncomeImportResponse(state) {
    return {
      ...state,
      hasAttemptedIncomeImport: true
    };
  },
  _handleReadyToLoadPageSignal(state) {
    return {
      ...state,
      readyToLoadPage: true
    };
  },
  _handleImportTransactionsRequest(state) {
    return {
      ...state,
      hasAttemptedTransactionsImport: true,
      readyToLoadPage: true
    };
  },
};

const incomeSummaryReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default incomeSummaryReducer;
