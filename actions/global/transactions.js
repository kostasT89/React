import { handleErrors } from '../../utils/fetchUtils';
import {
         updateTransactionRequest,
         bulkCreateTransactionsRequest,
         fetchUserTransactionsRequest,
         fetchAccountTransactionsRequest,
         importTransactionsRequest
       } from '../../api/global/transactionsApi';
import { upsertTransactionFieldset } from '../../actions/global/transactionFieldsets';
import {
         parseTransactionFieldset,
       } from '../../utils/parsingUtils';
import { convertMomentToUtcAndFormat } from '../../utils/dateUtils';
import { checkIfTransactionMustUpsertFieldset } from '../../utils/transactionUtils';
import { defaultDateFormat } from '../../config/properties';
import {
          GET_TRANSACTIONS_BY_USER_SUCCESS,
          GET_TRANSACTIONS_BY_USER_FAIL,
          SAVE_TRANSACTION_SUCCESS,
          SAVE_TRANSACTION_FAIL,
          GET_TRANSACTIONS_BY_ACCOUNT,
          GET_TRANSACTIONS_BY_ACCOUNT_SUCCESS,
          GET_TRANSACTIONS_BY_ACCOUNT_FAIL,
          UPDATE_TRANSACTION_SUCCESS,
          UPDATE_TRANSACTION_FAIL,
          GET_TRANSACTIONS_BY_USER_REQUEST,
          IMPORT_TRANSACTIONS_FAIL,
          IMPORT_TRANSACTIONS_SUCCESS
        } from '../../constants/AppConstants';

/*-----------------------------------
  GET TRANSACTIONS BY USER
-------------------------------------*/

export function getTransactionsByUserSuccess({
  transactions,
  totalCount
}) {
  return {
    type: GET_TRANSACTIONS_BY_USER_SUCCESS,
    transactions,
    totalCount
  };
}

export function getTransactionsByUserFail(err) {
  return {
    type: GET_TRANSACTIONS_BY_USER_FAIL,
    err
  };
}

export function getTransactionsByUserRequest(page) {
  return {
    type: GET_TRANSACTIONS_BY_USER_REQUEST,
    page
  };
}

export const getTransactionsByUser = ({
  count,
  page,
  dateStart,
  dateEnd,
  container
}) => async (dispatch) => {
  try {
    // Initialize
    const dateStartUtc = convertMomentToUtcAndFormat(
      dateStart,
      defaultDateFormat
    );
    const dateEndUtc = convertMomentToUtcAndFormat(
      dateEnd,
      defaultDateFormat
    );
    // Format Request Object
    const requestObject = {
      page,
      count,
      dateStart: dateStartUtc, // must be utc
      dateEnd: dateEndUtc // must be utc
    };
    // Add account Type param if available
    if (container) {
      requestObject.container = container.toString();
    }
    // Signal request is being made
    dispatch(getTransactionsByUserRequest(page));
    // Make request
    const response = await fetchUserTransactionsRequest(requestObject);

    const json = await response.json();

    const { transactions, totalCount } = json.transactionsData;
    dispatch(getTransactionsByUserSuccess({
      transactions,
      totalCount
    }));
  }
  catch (err) {
    dispatch(getTransactionsByUserFail(err));
  }
};

/*-----------------------------------
  GET TRANSACTIONS BY ACCOUNT
-------------------------------------*/

export function getTransactionsByAccountSuccess({
  transactions,
  accountId,
  totalCount
}) {
  return {
    type: GET_TRANSACTIONS_BY_ACCOUNT_SUCCESS,
    transactions,
    totalCount,
    accountId
  };
}

export function getTransactionsByAccountFail(err) {
  return {
    type: GET_TRANSACTIONS_BY_ACCOUNT_FAIL,
    err
  };
}

export function getTransactionsByAccountRequest(accountId, page) {
  return {
    type: GET_TRANSACTIONS_BY_ACCOUNT,
    accountId,
    page
  };
}

export const getTransactionsByAccount = ({ accountId, page, count }) => async (dispatch) => {
  try {
    dispatch(getTransactionsByAccountRequest(accountId, page));
    const response = await fetchAccountTransactionsRequest({
      accountId,
      page,
      count
    });

    const json = await response.json();

    const { transactions, totalCount } = json.transactionsData;
    dispatch(getTransactionsByAccountSuccess({
      transactions,
      totalCount,
      accountId
    }));
  }
  catch (err) {
    dispatch(getTransactionsByAccountFail(err));
  }
};

/*-----------------------------------
  UPDATE TRANSACTION
-------------------------------------*/

export function updateTransactionSuccess() {
  return {
    type: UPDATE_TRANSACTION_SUCCESS
  };
}

export function updateTransactionFail() {
  return {
    type: UPDATE_TRANSACTION_FAIL
  };
}

export const updateTransaction = (transaction) => async (dispatch) => { // eslint-disable-line
  try {
      const response = await updateTransactionRequest(transaction);

      handleErrors(response);
      dispatch(updateTransactionSuccess());
  }
  catch (err) {
    dispatch(updateTransactionFail(err));
  }
};

/*-----------------------------------
  SAVE TRANSACTION
-------------------------------------*/

export function saveTransactionFail() {
  return {
    type: SAVE_TRANSACTION_FAIL
  };
}

export const saveTransaction = (transaction, attributeName) => async (dispatch) => { // eslint-disable-line
  try {
    const transactionToPersist = transaction;
    // Create/update fieldset if required
    const hasToUpsertFieldset = checkIfTransactionMustUpsertFieldset(attributeName, transaction);
    if (hasToUpsertFieldset) {
      const fieldset = parseTransactionFieldset(transaction);
      return dispatch(upsertTransactionFieldset(fieldset));
    }
    // If we are toggling off the recurring switch, we need to clear the frequency
    if (transaction.frequency && !transaction.isRecurring) {
      transactionToPersist.frequency = null;
    }
    // Update transaction -- this also takes care of deleting fieldsets when required
    return dispatch(updateTransaction(transaction));
  }
  catch (err) {
    dispatch(saveTransactionFail(err));
  }
};

/*-----------------------------------
  BULK SAVE TRANSACTIONS
-------------------------------------*/

export function bulkSaveTransactionsSuccess(transactions) {
  return {
    type: SAVE_TRANSACTION_SUCCESS,
    transactions
  };
}

export function bulkSaveTransactionsFail(err) {
  return {
    type: SAVE_TRANSACTION_FAIL,
    err
  };
}

export const bulkSaveTransactions = (transactions) => async (dispatch) => { // eslint-disable-line
  try {
    const response = await bulkCreateTransactionsRequest(transactions);

    handleErrors(response);
    const json = await response.json();

    const { transactionsData } = json.transactions;
    dispatch(bulkSaveTransactionsSuccess(transactionsData));
  }
  catch (err) {
    dispatch(bulkSaveTransactionsFail(err));
  }
};

/*-----------------------------------
  IMPORT TRANSACTIONS
-------------------------------------*/

export function importTransactionsSuccess() {
  return {
    type: IMPORT_TRANSACTIONS_SUCCESS
  };
}

export function importTransactionsFail(err) {
  return {
    type: IMPORT_TRANSACTIONS_FAIL,
    err
  };
}

export const importTransactions = ({ yodleeAccountIds, fromDate, toDate }) => async (dispatch) => {
  try {
    const response = await importTransactionsRequest({
      yodleeAccountIds,
      fromDate,
      toDate
    });

    handleErrors(response);
    dispatch(importTransactionsSuccess());
  }
  catch (err) {
    dispatch(importTransactionsFail(err));
  }
};
