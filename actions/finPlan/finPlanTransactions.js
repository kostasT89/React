import {
        SYNC_ALL_FIN_PLAN_TRANSACTIONS,
        SYNC_ALL_FIN_PLAN_TRANSACTIONS_FAIL,
      } from '../../constants/AppConstants';
import {
        forwardToFinPlanBills,
      } from '../../utils/navigationUtils';
import {
        bulkCreateTransactions,
      } from '../global/finPlan/finPlanTransactions';

/*-----------------------------------
  BULK SYNC TRANSACTIONS
-------------------------------------*/

export function submitBulkTransactionRequest() {
  return {
    type: SYNC_ALL_FIN_PLAN_TRANSACTIONS
  };
}

export function bulkSyncAllTransactionsFail() {
  return {
    type: SYNC_ALL_FIN_PLAN_TRANSACTIONS_FAIL
  };
}

export const bulkSyncAllTransactions = ({
  transactions,
  finPlanId,
}) => async (dispatch) => {
  try {
    const payload = {
      transactions,
      finPlanId,
    };
    dispatch(submitBulkTransactionRequest());
    await dispatch(bulkCreateTransactions(payload, finPlanId));
    forwardToFinPlanBills();
  }
  catch (err) {
    dispatch(bulkSyncAllTransactionsFail(err));
  }
};
