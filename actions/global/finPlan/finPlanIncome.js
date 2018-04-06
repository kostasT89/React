import { handleErrors } from '../../../utils/fetchUtils';
import {
        createFinPlanIncomeRequest,
        updateFinPlanIncomeRequest,
        deleteFinPlanIncomeRequest,
      } from '../../../api/global/finPlan/finPlanIncomeApi';
import {
        CREATE_FIN_PLAN_INCOME_SUCCESS,
        CREATE_FIN_PLAN_INCOME_FAIL,
        UPDATE_FIN_PLAN_INCOME_SUCCESS,
        UPDATE_FIN_PLAN_INCOME_FAIL,
        DELETE_FIN_PLAN_INCOME_SUCCESS,
        DELETE_FIN_PLAN_INCOME_FAIL,
      } from '../../../constants/AppConstants';


/*-----------------------------------
  CREATE FIN PLAN INCOME
-------------------------------------*/
export function createFinPlanIncomeSuccess(income) {
  return {
    type: CREATE_FIN_PLAN_INCOME_SUCCESS,
    income
  };
}

export function createFinPlanIncomeFail() {
  return {
    type: CREATE_FIN_PLAN_INCOME_FAIL,
  };
}

export const createFinPlanIncome = (income, finPlanId) => async (dispatch) => {
  try {
    const response = await createFinPlanIncomeRequest(income, finPlanId);

    handleErrors(response);
    const json = await response.json();

    const createdIncome = json.incomeData.income;
    dispatch(createFinPlanIncomeSuccess(createdIncome));
  }
  catch (err) {
    dispatch(createFinPlanIncomeFail(err));
  }
};

/*-----------------------------------
  UPDATE FIN PLAN INCOME
-------------------------------------*/
export function updateFinPlanIncomeSuccess(income) {
  return {
    type: UPDATE_FIN_PLAN_INCOME_SUCCESS,
    income
  };
}

export function updateFinPlanIncomeFail() {
  return {
    type: UPDATE_FIN_PLAN_INCOME_FAIL,
  };
}

export const updateFinPlanIncome = (income, finPlanId) => async (dispatch) => {
  try {
    const response = await updateFinPlanIncomeRequest(income, finPlanId);

    handleErrors(response);
    const json = await response.json();

    const updatedIncome = json.incomeData.income;
    dispatch(updateFinPlanIncomeSuccess(updatedIncome));
  }
  catch (err) {
    dispatch(updateFinPlanIncomeFail(err));
  }
};

/*-----------------------------------
  DELETE FIN PLAN INCOME
-------------------------------------*/
export function deleteFinPlanIncomeSuccess(id) {
  return {
    type: DELETE_FIN_PLAN_INCOME_SUCCESS,
    id
  };
}

export function deleteFinPlanIncomeFail() {
  return {
    type: DELETE_FIN_PLAN_INCOME_FAIL,
  };
}

export const deleteFinPlanIncome = (id, finPlanId) => async (dispatch) => {
  try {
    const response = await deleteFinPlanIncomeRequest(id, finPlanId);

    handleErrors(response);
    dispatch(deleteFinPlanIncomeSuccess(id));
  }
  catch (err) {
    dispatch(deleteFinPlanIncomeFail(err));
  }
};
