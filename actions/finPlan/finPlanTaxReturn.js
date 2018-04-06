import {
        createFinPlanTaxReturnRequest,
        updateFinPlanTaxReturnRequest
      } from '../../api/global/finPlan/finPlanTaxReturnApi';
import { handleErrors } from '../../utils/fetchUtils';
import {
      UPDATE_FIN_PLAN_TAX_RETURN_SUCCESS,
      TOGGLE_FIN_PLAN_TAX_RETURN_FORM,
      UPDATE_FIN_PLAN_SUCCESS_FIRST_VISIT
      } from '../../constants/AppConstants';
import { forwardToDashboard } from '../../utils/navigationUtils';

export function updateFirstVisitFlag() {
  return {
    type: UPDATE_FIN_PLAN_SUCCESS_FIRST_VISIT
  };
}

function _updateTaxReturnSuccess(updatedTaxReturn) {
  return {
    type: UPDATE_FIN_PLAN_TAX_RETURN_SUCCESS,
    updatedTaxReturn
  };
}

export const toggleTaxReturnFormRequest = isTaxReturnFormActive => ({
  type: TOGGLE_FIN_PLAN_TAX_RETURN_FORM,
  isTaxReturnFormActive
});

export function updateFinPlanPaymentSuccess() {
  forwardToDashboard();
  return {
    type: UPDATE_FIN_PLAN_TAX_RETURN_SUCCESS
  };
}

export const submitTaxReturnRequest = (
  taxReturn,
  finPlanId,
  finPlanTaxReturnId) => async (dispatch) => {
  try {
    if (!finPlanTaxReturnId) {
      const createdTaxReturn = await createFinPlanTaxReturnRequest(taxReturn, finPlanId);

      handleErrors(createdTaxReturn);

      const json = await createdTaxReturn.json();
      dispatch(_updateTaxReturnSuccess(json.taxesData));
    }
    else {
      const updatedTaxReturn = await updateFinPlanTaxReturnRequest(
        taxReturn,
        finPlanId,
        finPlanTaxReturnId
      );

      handleErrors(updatedTaxReturn);
      const json = await updatedTaxReturn.json();

      dispatch(_updateTaxReturnSuccess(json.taxesData[1]));
    }
  }
  catch (err) { } // eslint-disable-line no-empty
};
