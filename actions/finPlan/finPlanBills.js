import {
  SUBMIT_FIN_PLAN_BILLS_FORM,
  SUBMIT_FIN_PLAN_BILLS_FORM_FAIL,
} from '../../constants/AppConstants';

/*-----------------------------------
 SUBMIT FIN PLAN BILLS PAGE
-------------------------------------*/

export function submitFinPlanBillsRequest() {
  return {
    type: SUBMIT_FIN_PLAN_BILLS_FORM,
  };
}

export function submitFinPlanBillsRequestFail() {
  return {
    type: SUBMIT_FIN_PLAN_BILLS_FORM_FAIL,
  };
}

export const submitFinPlanBills = () => async (dispatch) => {
  try {
    dispatch(submitFinPlanBillsRequest());
  }
  catch (err) {
    dispatch(submitFinPlanBillsRequestFail(err));
  }
};
