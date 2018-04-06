import { handleErrors } from '../../utils/fetchUtils';
import {
        fetchFinPlanRequest,
        createFinPlanRequest,
      } from '../../api/global/finPlan/finPlan';
import {
        GET_FIN_PLAN_SUCCESS,
        GET_FIN_PLAN_FAIL,
        CHANGE_FORM_FIELD_TYPE,
        CREATE_FIN_PLAN_SUCCESS,
        CREATE_FIN_PLAN_FAIL,
        UPDATE_FIN_PLAN,
        SUBMIT_FIN_PLAN_INFO
      } from '../../constants/AppConstants';

export function changeFormFieldType(fieldName) {
  return {
    type: CHANGE_FORM_FIELD_TYPE,
    fieldName,
  };
}

export function updatedFinPlan() {
  return {
    type: UPDATE_FIN_PLAN
  };
}

/*-----------------------------------
  GET FIN PLAN
-------------------------------------*/

function getFinPlanSuccess(finPlan) {
  return {
    type: GET_FIN_PLAN_SUCCESS,
    finPlan,
  };
}
function getFinPlanFail(error) {
  return {
    type: GET_FIN_PLAN_FAIL,
    error
  };
}

export const getFinPlan = finPlanId => async (dispatch) => {
  try {
    const response = await fetchFinPlanRequest(finPlanId);

    handleErrors(response);
    const json = await response.json();

    const { finPlan } = json.finPlanData;
    dispatch(getFinPlanSuccess(finPlan));
  }
  catch (err) {
    dispatch(getFinPlanFail(err));
  }
};

/*-----------------------------------
  SET FIN PLAN SUBMIT FLAG
-------------------------------------*/
export function submitFinPlan() {
  return {
    type: SUBMIT_FIN_PLAN_INFO
  };
}

/*-----------------------------------
  CREATE FIN PLAN
-------------------------------------*/

function createFinPlanSuccess(finPlan) {
  return {
    type: CREATE_FIN_PLAN_SUCCESS,
    finPlan
  };
}

function createFinPlanFail(error) {
  return {
    type: CREATE_FIN_PLAN_FAIL,
    error
  };
}

export const createFinPlan = () => async (dispatch) => {
  try {
    const response = await createFinPlanRequest();

    handleErrors(response);
    const json = await response.json();

    dispatch(createFinPlanSuccess(json.finPlanData.finPlan));
  }
  catch (err) {
    dispatch(createFinPlanFail(err));
  }
};
