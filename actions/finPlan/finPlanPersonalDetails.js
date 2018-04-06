import { handleErrors } from '../../utils/fetchUtils';
import {
        getFinPlan,
      } from './finPlan';
import {
        createFinPlanPersonalDetailsRequest,
        updateFinPlanPersonalDetailsRequest,
      } from '../../api/global/finPlan/finPlanPersonalDetailsApi';
import {
        TOGGLE_CO_CLIENT,
        SET_CO_CLIENT_VISIBILITY,
        CHANGE_NUMBER_OF_CHILDREN,
        SHOW_PERSONAL_DETAILS_NO_TAX_FILED_ERROR,
        HIDE_PERSONAL_DETAILS_NO_TAX_FILED_ERROR,
        CREATE_FIN_PLAN_PERSONAL_DETAILS_SUCCESS,
      } from '../../constants/AppConstants';

import { forwardToFinPlanGoals } from '../../utils/navigationUtils';

export function showNoTaxFiledError() {
  return { type: SHOW_PERSONAL_DETAILS_NO_TAX_FILED_ERROR };
}

export function hideNoTaxFiledError() {
  return { type: HIDE_PERSONAL_DETAILS_NO_TAX_FILED_ERROR };
}

export function submitPersonalDetailsSuccess() {
  return { type: CREATE_FIN_PLAN_PERSONAL_DETAILS_SUCCESS };
}

export const submitPersonalDetailsForm = (userData, finPlanId) => async (dispatch) => {
  // eslint-disable-line
  try {
    const response = await createFinPlanPersonalDetailsRequest(userData, finPlanId);

    handleErrors(response);
    dispatch(submitPersonalDetailsSuccess());

    dispatch(getFinPlan(finPlanId));

    forwardToFinPlanGoals();
  }
  catch (err) { /* TODO */ } // eslint-disable-line
};

export const updatePersonalDetailsForm = (userData, personalDetailsId, finPlanId) => async (dispatch) => { // eslint-disable-line
  try {
    const response = await updateFinPlanPersonalDetailsRequest(userData, personalDetailsId, finPlanId); // eslint-disable-line

    handleErrors(response);
    dispatch(getFinPlan(finPlanId));

    forwardToFinPlanGoals();
  }
  catch (err) { /* TODO */ } // eslint-disable-line
};

/*-----------------------------------
 CHANGE NUMBER OF CHILDREN
-------------------------------------*/

export function changeNumberOfChildren(numberOfChildren) {
  return {
    type: CHANGE_NUMBER_OF_CHILDREN,
    numberOfChildren,
  };
}

/*-----------------------------------
 TOGGLE CO CLIENT
 -------------------------------------*/

export function toggleCoClient() {
  return {
    type: TOGGLE_CO_CLIENT,
  };
}

export function setCoClientVisibility(shouldShowCoClientFields) {
  return {
    type: SET_CO_CLIENT_VISIBILITY,
    shouldShowCoClientFields
  };
}
