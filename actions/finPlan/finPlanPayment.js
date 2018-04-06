import {
        SUBMIT_PAYMENT_FORM,
        SUBMIT_PAYMENT_FORM_FAIL,
        SHOW_CARD_ERROR,
      } from '../../constants/AppConstants';

import {
        createFinPlanPayment,
      } from '../global/finPlan/finPlanPayment';


/*-----------------------------------
  SUBMIT PAYMENT FORM
-------------------------------------*/

export function submitFinPlanPaymentFormRequest(paymentForm) {
  return {
    type: SUBMIT_PAYMENT_FORM,
    paymentForm
  };
}

export function submitFinPlanPaymentFormFail() {
  return {
    type: SUBMIT_PAYMENT_FORM_FAIL
  };
}

export const submitFinPlanPaymentForm = formValues => async (dispatch) => {
  try {
    const { finPlanId } = formValues;
    dispatch(submitFinPlanPaymentFormRequest(formValues));
    dispatch(createFinPlanPayment(formValues, finPlanId));
  }
  catch (err) {
    dispatch(submitFinPlanPaymentFormFail(err));
  }
};

/*-----------------------------------
 SHOW CARD ERROR
-------------------------------------*/

export function showCardError(error) {
  return {
    type: SHOW_CARD_ERROR,
    error,
  };
}
