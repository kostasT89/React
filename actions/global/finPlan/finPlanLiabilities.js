import { handleErrors } from '../../../utils/fetchUtils';
import {
        createFinPlanLiabilityRequest,
        updateFinPlanLiabilityRequest,
        deleteFinPlanLiabilityRequest,
      } from '../../../api/global/finPlan/finPlanLiabilitiesApi';

import {
        CREATE_FIN_PLAN_LIABILITY_SUCCESS,
        CREATE_FIN_PLAN_LIABILITY_FAIL,
        UPDATE_FIN_PLAN_LIABILITY_SUCCESS,
        UPDATE_FIN_PLAN_LIABILITY_FAIL,
        DELETE_FIN_PLAN_LIABILITY_SUCCESS,
        DELETE_FIN_PLAN_LIABILITY_FAIL,
      } from '../../../constants/AppConstants';

/*-----------------------------------
  CREATE FIN PLAN LIABILITY
-------------------------------------*/
export function createFinPlanLiabilitySuccess(liability) {
  return {
    type: CREATE_FIN_PLAN_LIABILITY_SUCCESS,
    liability,
  };
}

export function createFinPlanLiabilityFail(err) {
  return {
    type: CREATE_FIN_PLAN_LIABILITY_FAIL,
    err
  };
}

export const createFinPlanLiability = (liability, finPlanId) => async (dispatch) => {
  try {
    const response = await createFinPlanLiabilityRequest(liability, finPlanId);

    handleErrors(response);
    const json = await response.json();

    const createdLiability = json.liabilityData.liability;
    dispatch(createFinPlanLiabilitySuccess(createdLiability));
  }
  catch (err) {
    dispatch(createFinPlanLiabilityFail(err));
  }
};

/*-----------------------------------
  UPDATE FIN PLAN LIABILITY
-------------------------------------*/
export function updateFinPlanLiabilitySuccess(liability) {
  return {
    type: UPDATE_FIN_PLAN_LIABILITY_SUCCESS,
    liability,
  };
}

export function updateFinPlanLiabilityFail() {
  return {
    type: UPDATE_FIN_PLAN_LIABILITY_FAIL,
  };
}

export const updateFinPlanLiability = (liability, finPlanId) => async (dispatch) => {
  try {
    const response = await updateFinPlanLiabilityRequest(liability, finPlanId);

    handleErrors(response);
    dispatch(updateFinPlanLiabilitySuccess(liability));
  }
  catch (err) {
    dispatch(updateFinPlanLiabilityFail(err));
  }
};

/*-----------------------------------
  DELETE FIN PLAN LIABILITY
-------------------------------------*/
export function deleteFinPlanLiabilitySuccess(id) {
  return {
    type: DELETE_FIN_PLAN_LIABILITY_SUCCESS,
    id
  };
}

export function deleteFinPlanLiabilityFail() {
  return {
    type: DELETE_FIN_PLAN_LIABILITY_FAIL,
  };
}

export const deleteFinPlanLiability = (liabilityId, finPlanId) => async (dispatch) => {
  try {
    const response = await deleteFinPlanLiabilityRequest(liabilityId, finPlanId);

    handleErrors(response);
    dispatch(deleteFinPlanLiabilitySuccess(liabilityId));
  }
  catch (err) {
    dispatch(deleteFinPlanLiabilityFail(err));
  }
};
