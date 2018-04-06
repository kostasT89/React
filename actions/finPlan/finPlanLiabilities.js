import {
        SUBMIT_FIN_PLAN_LIABILITY_REQUEST_FAIL,
        SUBMIT_FIN_PLAN_LIABILITY_REQUEST,
        TOGGLE_LIABILITY_ACCOUNTS,
      } from '../../constants/AppConstants';
import {
        createFinPlanLiability,
        updateFinPlanLiability,
      } from '../../actions/global/finPlan/finPlanLiabilities';

export function submitFinPlanLiabilityRequest(liability) {
  return {
    type: SUBMIT_FIN_PLAN_LIABILITY_REQUEST,
    liability,
  };
}

export function submitFinPlanLiabilityRequestFail(err) {
  return {
    type: SUBMIT_FIN_PLAN_LIABILITY_REQUEST_FAIL,
    err,
  };
}

export const createLiability = ({
    isNewLiability,
    formValues,
    finPlanId,
  }) => async (dispatch) => {
  try {
    const liability = {
      data: {
        ...formValues,
      },
      id: formValues.id,
      finPlanId,
    };
    if (isNewLiability) {
      dispatch(createFinPlanLiability(liability, finPlanId));
    }
    else {
      dispatch(updateFinPlanLiability(liability, finPlanId));
    }
    dispatch(submitFinPlanLiabilityRequest(liability));
  }
  catch (err) {
    dispatch(submitFinPlanLiabilityRequestFail(err));
  }
};

export function toggleLiabilityAccounts() {
  return {
    type: TOGGLE_LIABILITY_ACCOUNTS,
  };
}
