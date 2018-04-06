import { handleErrors } from '../../../utils/fetchUtils';
import {
        createFinPlanTransactionsRequest,
      } from '../../../api/global/finPlan/finPlanTransactionsApi';
import {
        CREATE_FIN_PLAN_TRANSACTIONS_SUCCESS,
        CREATE_FIN_PLAN_TRANSACTIONS_FAIL,
        RECEIVE_FIN_PLAN_TRANSACTIONS,
      } from '../../../constants/AppConstants';

/*-----------------------------------
RECEIVE FIN PLAN TRANSACTIONS
-------------------------------------*/
export function receiveFinPlanTransactions(transactions) {
  return {
    type: RECEIVE_FIN_PLAN_TRANSACTIONS,
    transactions,
  };
}

/*-----------------------------------
  CREATE FIN PLAN TRANSACTIONS
  -------------------------------------*/
export function createFinPlanTransactionsSuccess(transactions) {
  return {
    type: CREATE_FIN_PLAN_TRANSACTIONS_SUCCESS,
    transactions,
  };
}

export function createFinPlanTransactionsFail() {
  return {
    type: CREATE_FIN_PLAN_TRANSACTIONS_FAIL,
  };
}

export const bulkCreateTransactions = (transactionData, finPlanId) => async (dispatch) => {
  try {
    const response = await createFinPlanTransactionsRequest(transactionData, finPlanId);

    handleErrors(response);
    const json = await response.json();

    const createdTransactions = json.transactionsData.transactions;
    dispatch(createFinPlanTransactionsSuccess(createdTransactions));
    dispatch(receiveFinPlanTransactions(createdTransactions));
  }
  catch (err) {
    dispatch(createFinPlanTransactionsFail(err));
  }
};
