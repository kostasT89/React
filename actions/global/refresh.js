import get from 'lodash/get';

import { fetchRefreshedTransactionsRequest } from '../../api/global/refreshApi';
import {
  REFRESH_TRANSACTIONS,
  REFRESH_TRANSACTIONS_SUCCESS,
  REFRESH_TRANSACTIONS_FAIL
} from '../../constants/AppConstants';

/*-----------------------------------
  REFRESH TRANSACTIONS
-------------------------------------*/

export function refreshTransactionsSuccess(transactions) {
  return {
    type: REFRESH_TRANSACTIONS_SUCCESS,
    transactions
  };
}

export function refreshTransactionsFail(err) {
  return {
    type: REFRESH_TRANSACTIONS_FAIL,
    err
  };
}

export function refreshTransactionsRequest() {
  return {
    type: REFRESH_TRANSACTIONS
  };
}

export const refreshTransactions = ({
  dateStartUTC,
  dateEndUTC,
}) => async (dispatch) => { // eslint-disable-line
  try {
    dispatch(refreshTransactionsRequest());
    const response = await fetchRefreshedTransactionsRequest({
      dateStartUTC,
      dateEndUTC,
    });

    // handleErrors(response);
    const json = await response.json();

    const savedTransactions = get(json, 'transactionsData.transactions');
    dispatch(refreshTransactionsSuccess(savedTransactions));
  }
  catch (err) {
    dispatch(refreshTransactionsFail(err));
  }
};
