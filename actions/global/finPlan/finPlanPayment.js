import { handleErrors } from '../../../utils/fetchUtils';
import {
        createFinPlanPaymentRequest,
      } from '../../../api/global/finPlan/finPlanPaymentApi';
import { updateUserData } from '../users';
import {
        CREATE_FIN_PLAN_PAYMENT_SUCCESS,
        UPDATE_FIN_PLAN_PAYMENT_SUCCESS,
      } from '../../../constants/AppConstants';
import { forwardToFinPlanSuccess } from '../../../utils/navigationUtils';

/*-----------------------------------
  CREATE FIN PLAN PAYMENT
-------------------------------------*/
export function createFinPlanPaymentSuccess(paymentInfo) {
  return {
    type: CREATE_FIN_PLAN_PAYMENT_SUCCESS,
    paymentInfo,
  };
}

export function updateFinPlanPaymentSuccess() {
  return {
    type: UPDATE_FIN_PLAN_PAYMENT_SUCCESS
  };
}

export const createFinPlanPayment = (paymentForm, finPlanId) => async (dispatch) => {
  try {
    const response = await createFinPlanPaymentRequest(paymentForm, finPlanId);

    handleErrors(response);
    const json = await response.json();

    const finPlan = json.data;
    dispatch(createFinPlanPaymentSuccess(finPlan));
    dispatch(updateUserData({
      stripeCustomer: finPlan.stripeCustomer,
      stripeSubscription: finPlan.stripeSubscription
    }));
    forwardToFinPlanSuccess();
  }
  catch (err) { } // eslint-disable-line no-empty
};
