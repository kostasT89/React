import {
         deleteYodleeAccountRequest
       } from '../../api/global/accountsApi';
import {
          DISCONNECT_ACCOUNTS_SUCCESS,
          DISCONNECT_ACCOUNTS_FAIL
        } from '../../constants/AppConstants';
import { getEnabledAccounts } from './accounts';


/*-----------------------------------
  DISCONNECT ACCOUNTS
-------------------------------------*/

export function disconnectAccountSuccess(accounts) {
  return {
    type: DISCONNECT_ACCOUNTS_SUCCESS,
    accounts
  };
}

export function disconnectAccountFail(err) {
  return {
    type: DISCONNECT_ACCOUNTS_FAIL,
    err
  };
}

export const disconnectAccount = accountId => async (dispatch) => {
  try {
    const response = await deleteYodleeAccountRequest(accountId);

    const json = await response.json();
    dispatch(disconnectAccountSuccess(json));
    dispatch(getEnabledAccounts());
  }
  catch (err) {
    dispatch(disconnectAccountFail(err));
  }
};
