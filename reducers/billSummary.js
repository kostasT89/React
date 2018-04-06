import {
         CREATE_BILL_SUMMARY_SUCCESS,
         CREATE_BILL_SUMMARY_FAIL,
         BILLS_NOT_FOUND,
         UPDATE_BILL,
         IMPORT_BILLS_SUCCESS,
         IMPORT_BILLS_FAIL,
         READY_TO_LOAD_PAGE,
         IMPORT_TRANSACTIONS_SUCCESS,
         IMPORT_TRANSACTIONS_FAIL,
         GET_ENABLED_ACCOUNTS_SUCCESS
       } from '../constants/AppConstants';

const initialState = {
  billsNotFound: false,
  summary: {},
  readyToLoadPage: false,
  enabledAccounts: [],
  hasAttemptedTransactionsImport: false,
  hasAttemptedBillImport: false,
};

const actionMappings = {
  [CREATE_BILL_SUMMARY_SUCCESS]: '_createBillSummary',
  [CREATE_BILL_SUMMARY_FAIL]: '_billsNotFound',
  [IMPORT_BILLS_SUCCESS]: '_handleBillImportResponse',
  [IMPORT_BILLS_FAIL]: '_handleBillImportResponse',
  [BILLS_NOT_FOUND]: '_billsNotFound',
  [UPDATE_BILL]: '_updateBill',
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
  _updateBill(state, bill) {
    const { summary } = this.state;
    summary[bill.id].fieldset = bill;
      return {
        ...state,
        summary
      };
  },
  _createBillSummary(state, { summary }) {
    return {
      ...state,
      summary
    };
  },
  _billsNotFound(state) {
    return {
      ...state,
      billsNotFound: true
    };
  },
  _handleBillImportResponse(state) {
    return {
      ...state,
      hasAttemptedBillImport: true
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

const billSummaryReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default billSummaryReducer;
