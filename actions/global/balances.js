// Global Deps:
import get from 'lodash/get';
// Local Deps:
import { fetchYodleeAccountBalancesRequest } from '../../api/global/balancesApi';
import {
        YODLEE_GET_ACCOUNT_BALANCES_SUCCESS,
        YODLEE_GET_ACCOUNT_BALANCES_FAIL
      } from '../../constants/AppConstants';

/*-----------------------------------
  GET YODLEE ACCOUNT BALANCES
-------------------------------------*/
export function getYodleeAccountBalancesSuccess(balances) {
  return {
    type: YODLEE_GET_ACCOUNT_BALANCES_SUCCESS,
    balances
  };
}

export function getYodleeAccountBalancesFail(err) {
  return {
    type: YODLEE_GET_ACCOUNT_BALANCES_FAIL,
    err
  };
}

export const getYodleeAccountBalances = params => async (dispatch) => {
  try {
    const response = await fetchYodleeAccountBalancesRequest(params);

    const json = await response.json();

    const balances = get(json, 'balanceData.accounts', []);
    dispatch(getYodleeAccountBalancesSuccess(balances));
  }
  catch (err) {
    dispatch(getYodleeAccountBalancesFail(err));
  }
};
