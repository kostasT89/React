import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
// Local Deps
import { handleErrors } from '../../utils/fetchUtils';
import { findByValues } from '../../utils/searchUtils';
import {
          queryAndSetFisecalAccounts,
          getFisecalAccounts
       } from '../../utils/localStorageUtils';
import {
          fetchYodleeAccountsRequest,
          fetchYodleeAccountRequest,
          bulkUpdateAccountsRequest,
          importAccountsRequest,
          fetchEnabledAccountsRequest
        } from '../../api/global/accountsApi';
import {
          YODLEE_GET_ACCOUNTS_SUCCESS,
          YODLEE_GET_ACCOUNTS_FAIL,
          YODLEE_GET_ENABLED_ACCOUNTS_SUCCESS,
          YODLEE_GET_ENABLED_ACCOUNTS_FAIL,
          YODLEE_GET_ACCOUNT_SUCCESS,
          YODLEE_GET_ACCOUNT_FAIL,
          GET_ACCOUNTS_FROM_LOCAL_STORAGE_SUCCESS,
          UPDATE_ACCOUNTS_SUCCESS,
          UPDATE_ACCOUNTS_FAIL,
          GET_ENABLED_ACCOUNTS_FAIL,
          GET_ENABLED_ACCOUNTS_SUCCESS,
          IMPORT_ACCOUNTS_SUCCESS,
          IMPORT_ACCOUNTS_FAIL
        } from '../../constants/AppConstants';

/*-----------------------------------
  BULK UPDATE ACCOUNTS
-------------------------------------*/
export function bulkUpdateAccountsSuccess(accounts) {
  return {
    type: UPDATE_ACCOUNTS_SUCCESS,
    accounts
  };
}

export function bulkUpdateAccountsFail(err) {
  return {
    type: UPDATE_ACCOUNTS_FAIL,
    err
  };
}

/*-----------------------------------
  GET ACCOUNTS FROM LOCAL STORAGE
-------------------------------------*/
export function getAccountsFromLocalStorageSuccess(accounts) {
  return {
    type: GET_ACCOUNTS_FROM_LOCAL_STORAGE_SUCCESS,
    accounts
  };
}

export const getAccountsFromLocalStorage = accountIds => async (dispatch) => {
  let accounts = [];
  try {
    accounts = await getFisecalAccounts();
  }
  catch (e) { /* catch error in order to continue flow */ }
  if (isEmpty(accounts)) {
    accounts = await queryAndSetFisecalAccounts();
  }
  const filteredAccounts = isEmpty(accountIds) ? accounts :
    findByValues(accounts, 'id', accountIds);
  dispatch(getAccountsFromLocalStorageSuccess(filteredAccounts));
};

/*-----------------------------------
  GET YODLEE ACCOUNTS
-------------------------------------*/
export function getYodleeAccountsSuccess(accounts) {
  return {
    type: YODLEE_GET_ACCOUNTS_SUCCESS,
    accounts
  };
}

export function getYodleeAccountsFail(err) {
  return {
    type: YODLEE_GET_ACCOUNTS_FAIL,
    err
  };
}

/*-----------------------------------
  GET SINGLE YODLEE ACCOUNT
-------------------------------------*/
export function getYodleeAccountSuccess(account) {
  return {
    type: YODLEE_GET_ACCOUNT_SUCCESS,
    account
  };
}

export function getYodleeAccountFail(err) {
  return {
    type: YODLEE_GET_ACCOUNT_FAIL,
    err
  };
}

/*-----------------------------------
  BULK UPDATE ACCOUNTS
-------------------------------------*/
export const bulkUpdateAccounts = accountsArray => async (dispatch) => {
  try {
    const response = await bulkUpdateAccountsRequest(accountsArray);

    const json = await response.json();

    const accounts = get(json, 'accountsData.accounts');
    dispatch(bulkUpdateAccountsSuccess(accounts));
  }
  catch (err) {
    dispatch(bulkUpdateAccountsFail(err));
  }
};

/*-----------------------------------
  GET ENABLED YODLEE ACCOUNTS
-------------------------------------*/
export function getYodleeEnabledAccountsSuccess(enabledAccounts) {
  return {
    type: YODLEE_GET_ENABLED_ACCOUNTS_SUCCESS,
    enabledAccounts
  };
}

export function getYodleeEnabledAccountsFail(err) {
  return {
    type: YODLEE_GET_ENABLED_ACCOUNTS_FAIL,
    err
  };
}

export const getYodleeEnabledAccounts = () => async (dispatch) => {
  try {
    const response = await fetchYodleeAccountsRequest();

    const json = await response.json();

    const accounts = get(json, 'accountsData.accounts');
    dispatch(getYodleeEnabledAccountsSuccess(accounts));
  }
  catch (err) {
    dispatch(getYodleeEnabledAccountsFail(err));
  }
};

/*-----------------------------------
  GET ENABLED ACCOUNTS
-------------------------------------*/

export function getEnabledAccountsSuccess({
  enabledAccounts,
  enabledYodleeAccounts
}) {
  return {
    type: GET_ENABLED_ACCOUNTS_SUCCESS,
    enabledAccounts,
    enabledYodleeAccounts
  };
}

export function getEnabledAccountsFail(err) {
  return {
    type: GET_ENABLED_ACCOUNTS_FAIL,
    err
  };
}

export const getEnabledAccounts = () => async (dispatch) => {
  try {
    // Fetch Yodlee Accounts
    const accountsResponse = await fetchEnabledAccountsRequest();

    const json = await accountsResponse.json();

    const { accounts, yodleeAccounts } = json.accountsData;
    // Send success status:
    dispatch(getEnabledAccountsSuccess({
      enabledAccounts: accounts,
      enabledYodleeAccounts: yodleeAccounts
    }));
  }
  catch (err) {
    dispatch(getEnabledAccountsFail(err));
  }
};

/*-----------------------------------
  GET SINGLE YODLEE ACCOUNT
-------------------------------------*/

export const getYodleeAccount = (accountId, container) => async (dispatch) => {
  try {
    const response = await fetchYodleeAccountRequest(accountId, container);

    const json = await response.json();

    const account = get(json, 'accountData.account');
    dispatch(getYodleeAccountSuccess(account[0]));
  }
  catch (err) {
    dispatch(getYodleeAccountFail(err));
  }
};


/*-----------------------------------
  IMPORT ACCOUNTS
-------------------------------------*/

export function importAccountsSuccess() {
  return {
    type: IMPORT_ACCOUNTS_SUCCESS
  };
}

export function importAccountsFail(err) {
  return {
    type: IMPORT_ACCOUNTS_FAIL,
    err
  };
}

export const importAccounts = () => async (dispatch) => {
  try {
    const response = await importAccountsRequest();

    handleErrors(response);
    const json = await response.json();

    dispatch(importAccountsSuccess(json.accountsData.accounts));
  }
  catch (err) {
    dispatch(importAccountsFail(err));
  }
};
