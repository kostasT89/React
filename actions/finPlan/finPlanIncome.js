import {
        UPDATE_FIN_PLAN_CURRENT_INCOME_SOURCE,
        TOGGLE_FIN_PLAN_INCOME_FORM,
        TOGGLE_FORM_STATE,
        CLEAR_FORM_TOGGLE_STATES,
        SUBMIT_FIN_PLAN_INCOME_FORM,
        SUBMIT_FIN_PLAN_INCOME_FORM_FAIL,
        ADD_TAX_TABLE_ITEM,
        REMOVE_TAX_TABLE_ITEM,
        CANCEL_INCOME_FORM
       } from '../../constants/AppConstants';

import {
        createFinPlanIncome,
        updateFinPlanIncome,
      } from '../global/finPlan/finPlanIncome';


/*-----------------------------------
  TOGGLE FORM STATE
-------------------------------------*/

export function toggleFormState(id) {
  return {
    type: TOGGLE_FORM_STATE,
    id,
  };
}

/*-----------------------------------
 ADD TAX TABLE ITEM
-------------------------------------*/

export function addTableItem(itemType) {
  return {
    type: ADD_TAX_TABLE_ITEM,
    itemType,
  };
}

/*-----------------------------------
 REMOVE TAX TABLE ITEM
-------------------------------------*/

export function removeTableItem({ itemType }) {
  return {
    type: REMOVE_TAX_TABLE_ITEM,
    itemType,
  };
}

/*-----------------------------------
  CLEAR FORM STATE
-------------------------------------*/

export function clearFormToggleStates() {
  return {
    type: CLEAR_FORM_TOGGLE_STATES,
  };
}

/*-----------------------------------
 TOGGLE FIN PLAN INCOME FORM
-------------------------------------*/

export function toggleFinPlanIncomeForm(formType) {
  return {
    type: TOGGLE_FIN_PLAN_INCOME_FORM,
    formType,
  };
}

/*-----------------------------------
  UPDATE CURRENT INCOME
-------------------------------------*/

export function updateCurrentIncomeSource(currentIncomeSource) {
  return {
    type: UPDATE_FIN_PLAN_CURRENT_INCOME_SOURCE,
    currentIncomeSource
  };
}

/*-----------------------------------
  CANCEL INCOME FORM
-------------------------------------*/
export function cancelIncomeForm() {
  return {
    type: CANCEL_INCOME_FORM,
  };
}

/*-----------------------------------
  SUBMIT INCOME FORM
-------------------------------------*/
export function submitFinPlanIncomeFormRequest() {
  return {
    type: SUBMIT_FIN_PLAN_INCOME_FORM
  };
}

export function submitFinPlanIncomeFormFail() {
  return {
    type: SUBMIT_FIN_PLAN_INCOME_FORM_FAIL
  };
}

export const submitFinPlanIncomeForm = ({
  formType,
  formValues,
  isNewIncomeSource,
  finPlanId,
}) => async (dispatch) => {
  try {
    const income = {
      data: {
        ...formValues,
        type: formType,
      },
      id: formValues.id,
      finPlanId,
    };
    if (isNewIncomeSource) {
      dispatch(createFinPlanIncome(income, finPlanId));
    }
    else {
      dispatch(updateFinPlanIncome(income, finPlanId));
    }
    dispatch(submitFinPlanIncomeFormRequest(income));
  }
  catch (err) {
    dispatch(submitFinPlanIncomeFormFail(err));
  }
};
