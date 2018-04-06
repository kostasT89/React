import { handleErrors } from '../../../utils/fetchUtils';
import {
        createFinPlanInsuranceRequest,
        updateFinPlanInsuranceRequest,
        deleteFinPlanInsuranceRequest,
      } from '../../../api/global/finPlan/finPlanInsuranceApi';

import {
        CREATE_FIN_PLAN_INSURANCE_SUCCESS,
        CREATE_FIN_PLAN_INSURANCE_FAIL,
        UPDATE_FIN_PLAN_INSURANCE_SUCCESS,
        UPDATE_FIN_PLAN_INSURANCE_FAIL,
        DELETE_FIN_PLAN_INSURANCE_SUCCESS,
        DELETE_FIN_PLAN_INSURANCE_FAIL,
        TOGGLE_FIN_PLAN_INSURANCE_UPDATE
      } from '../../../constants/AppConstants';

/*-----------------------------------
  UPDATE FIN PLAN INSURANCE
-------------------------------------*/
export function updateFinPlanInsuranceSuccess(insurancePolicy) {
  return {
    type: UPDATE_FIN_PLAN_INSURANCE_SUCCESS,
    insurancePolicy,
  };
}

export function updateFinPlanInsuranceFail() {
  return {
    type: UPDATE_FIN_PLAN_INSURANCE_FAIL,
  };
}

export function _toggleFinPlanInsuranceUpdate() {
  return {
    type: TOGGLE_FIN_PLAN_INSURANCE_UPDATE
  };
}

export const updateFinPlanInsurance = (insurancePolicy, finPlanId) => async (dispatch) => {
  try {
    dispatch(_toggleFinPlanInsuranceUpdate());
    const response = await updateFinPlanInsuranceRequest(insurancePolicy, finPlanId);

    handleErrors(response);
    dispatch(_toggleFinPlanInsuranceUpdate());
    dispatch(updateFinPlanInsuranceSuccess(insurancePolicy));
  }
  catch (err) {
    dispatch(_toggleFinPlanInsuranceUpdate());
    dispatch(updateFinPlanInsuranceFail(err));
  }
};

/*-----------------------------------
  CREATE FIN PLAN INSURANCE
-------------------------------------*/
export function createFinPlanInsuranceSuccess(policy) {
  return {
    type: CREATE_FIN_PLAN_INSURANCE_SUCCESS,
    policy,
  };
}

export function createFinPlanInsuranceFail() {
  return {
    type: CREATE_FIN_PLAN_INSURANCE_FAIL,
  };
}

export const createFinPlanInsurance = (insurancePolicy, finPlanId) => async (dispatch) => {
  try {
    dispatch(_toggleFinPlanInsuranceUpdate());
    const response = await createFinPlanInsuranceRequest(insurancePolicy, finPlanId);

    handleErrors(response);
    const json = await response.json();

    const createdPolicy = json.policyData.policy;
    dispatch(_toggleFinPlanInsuranceUpdate());
    dispatch(createFinPlanInsuranceSuccess(createdPolicy));
  }
  catch (err) {
    dispatch(_toggleFinPlanInsuranceUpdate());
    dispatch(createFinPlanInsuranceFail(err));
  }
};

/*-----------------------------------
  DELETE FIN PLAN INSURANCE
-------------------------------------*/
export function deleteFinPlanInsuranceSuccess(id) {
  return {
    type: DELETE_FIN_PLAN_INSURANCE_SUCCESS,
    id
  };
}

export function deleteFinPlanInsuranceFail() {
  return {
    type: DELETE_FIN_PLAN_INSURANCE_FAIL,
  };
}

export const deleteFinPlanInsurance = (finPlanInsuranceId, finPlanId) => async (dispatch) => {
  try {
    const response = await deleteFinPlanInsuranceRequest(finPlanInsuranceId, finPlanId);

    handleErrors(response);
    dispatch(deleteFinPlanInsuranceSuccess(finPlanInsuranceId));
  }
  catch (err) {
    dispatch(deleteFinPlanInsuranceFail(err));
  }
};
