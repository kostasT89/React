import { handleErrors } from '../../../utils/fetchUtils';
import {
          updateFinPlanBreadcrumbRequest,
          getFinPlanBreadcrumbsRequest
        } from '../../../api/global/finPlan/finPlanBreadcrumbApi';
import {
        UPDATE_FIN_PLAN_BREADCRUMB_SUCCESS,
        UPDATE_FIN_PLAN_BREADCRUMB_FAIL,
        GET_FIN_PLAN_BREADCRUMBS_SUCCESS,
        GET_FIN_PLAN_BREADCRUMBS_FAIL,
        GET_FIN_PLAN_BREADCRUMBS
      } from '../../../constants/AppConstants';

/*-----------------------------------
GET FIN PLAN BREADCRUMBS
-------------------------------------*/
export function getFinPlanBreadcrumbsSuccess(breadcrumbs) {
  return {
    type: GET_FIN_PLAN_BREADCRUMBS_SUCCESS,
    breadcrumbs
  };
}

export function getFinPlanBreadcrumbsFail(err) {
  return {
    type: GET_FIN_PLAN_BREADCRUMBS_FAIL,
    err
  };
}

export function signalFinPlanBreadcrumbsGetRequest() {
  return {
    type: GET_FIN_PLAN_BREADCRUMBS,
  };
}

export const getFinPlanBreadcrumbs = finPlanId => async (dispatch) => {
  try {
    dispatch(signalFinPlanBreadcrumbsGetRequest());
    const response = await getFinPlanBreadcrumbsRequest(finPlanId);


    handleErrors(response);
    const json = await response.json();

    const { breadcrumbs } = json.breadcrumbData;
    dispatch(getFinPlanBreadcrumbsSuccess(breadcrumbs));
  }
  catch (err) {
    dispatch(getFinPlanBreadcrumbsFail(err));
  }
};

/*-----------------------------------
UPDATE FIN PLAN BREADCRUMB
-------------------------------------*/
export function updateFinPlanBreadcrumbSuccess(breadcrumb) {
  return {
    type: UPDATE_FIN_PLAN_BREADCRUMB_SUCCESS,
    breadcrumb,
  };
}

export function updateFinPlanBreadcrumbFail(err) {
  return {
    type: UPDATE_FIN_PLAN_BREADCRUMB_FAIL,
    err
  };
}

export const updateFinPlanBreadcrumb = (breadcrumb, finPlanId) => async (dispatch) => {
  try {
    const response = await updateFinPlanBreadcrumbRequest(breadcrumb, finPlanId);

    handleErrors(response);

    dispatch(updateFinPlanBreadcrumbSuccess(breadcrumb));
  }
  catch (err) {
    dispatch(updateFinPlanBreadcrumbFail(err));
  }
};
