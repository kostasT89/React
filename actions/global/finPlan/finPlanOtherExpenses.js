import get from 'lodash/get';
// Local Deps
import {
        GET_FIN_PLAN_OTHER_EXPENSES_SUCCESS,
        GET_FIN_PLAN_OTHER_EXPENSES_FAIL,
        UPDATE_FIN_PLAN_OTHER_EXPENSE_SUCCESS,
        UPDATE_FIN_PLAN_OTHER_EXPENSE_FAIL,
        DELETE_FIN_PLAN_OTHER_EXPENSE_SUCCESS,
        DELETE_FIN_PLAN_OTHER_EXPENSE_FAIL,
        CREATE_FIN_PLAN_OTHER_EXPENSE_SUCCESS,
        CREATE_FIN_PLAN_OTHER_EXPENSE_FAIL,
        BULK_CREATE_FIN_PLAN_OTHER_EXPENSES_SUCCESS,
        BULK_CREATE_FIN_PLAN_OTHER_EXPENSES_FAIL,
        UPDATE_FIN_PLAN_BILLS_COMMENT_FOR_STORE,
        UPDATE_FIN_PLAN_BILLS_COMMENT_SUCCESS,
        UPDATE_FIN_PLAN_BILLS_COMMENT_FAIL,
        GET_FIN_PLAN_BILLS_COMMENT_SUCCESS,
        GET_FIN_PLAN_BILLS_COMMENT_FAIL
      } from '../../../constants/AppConstants';
import { handleErrors } from '../../../utils/fetchUtils';
import {
        getFinPlanOtherExpensesRequest,
        bulkCreateFinPlanOtherExpensesRequest,
        updateFinPlanOtherExpenseRequest,
        deleteFinPlanOtherExpenseRequest,
        createFinPlanOtherExpenseRequest
      } from '../../../api/global/finPlan/finPlanOtherExpensesApi';
import { updateFinPlanBillRequest, getFinPlanBillRequest } from '../../../api/global/finPlan/finPlanBillsApi';

/*-----------------------------------
  GET FIN PLAN OTHER EXPENSES
------------------------------------*/
export function getFinPlanOtherExpenseSuccess(expenses) {
  return {
    type: GET_FIN_PLAN_OTHER_EXPENSES_SUCCESS,
    expenses,
  };
}

export function getFinPlanOtherExpenseFail() {
  return {
    type: GET_FIN_PLAN_OTHER_EXPENSES_FAIL,
  };
}

export const getFinPlanOtherExpenses = finPlanId => async (dispatch) => {
  try {
    // If the Fin Plan has not been completed, we query the fieldsets table:
    const response = await getFinPlanOtherExpensesRequest(finPlanId);

    handleErrors(response);
    const json = await response.json();

    const expenses = get(json, 'expenseData.expenses');
    dispatch(getFinPlanOtherExpenseSuccess(expenses));
  }
  catch (err) {
    dispatch(getFinPlanOtherExpenseFail(err));
  }
};

/*-----------------------------------
  UPDATE FIN PLAN BILL COMMENT
------------------------------------*/
export function updateFinPlanBillsCommentForStore(comments) {
  return {
    type: UPDATE_FIN_PLAN_BILLS_COMMENT_FOR_STORE,
    comments
  };
}

export function updateFinPlanBillsCommentSuccess(comments) {
  return {
    type: UPDATE_FIN_PLAN_BILLS_COMMENT_SUCCESS,
    comments
  };
}

export function updateFinPlanBillsCommentFail(err) {
  return {
    type: UPDATE_FIN_PLAN_BILLS_COMMENT_FAIL,
    err
  };
}

export const updateFinPlanBillsComment = (finPlanId, comments) => async (dispatch) => {
  try {
    const response = await updateFinPlanBillRequest(finPlanId, comments);

    handleErrors(response);

    const json = await response.json();
    const updatedComments = get(json, 'billData.bill.comments');
    dispatch(updateFinPlanBillsCommentSuccess(updatedComments));
  }
  catch (err) {
    dispatch(updateFinPlanBillsCommentFail(err));
  }
};

/*-----------------------------------
  GET FIN PLAN BILL COMMENT
------------------------------------*/

export function getFinPlanBillsCommentSuccess(comments) {
  return {
    type: GET_FIN_PLAN_BILLS_COMMENT_SUCCESS,
    comments
  };
}

export function getFinPlanBillsCommentFail(err) {
  return {
    type: GET_FIN_PLAN_BILLS_COMMENT_FAIL,
    err
  };
}

export const getFinPlanBillsComments = finPlanId => async (dispatch) => {
  try {
    const response = await getFinPlanBillRequest(finPlanId);

    handleErrors(response);

    const json = await response.json();
    const comments = get(json, 'billData.bill.comments');
    dispatch(getFinPlanBillsCommentSuccess(comments));
  }
  catch (err) {
    dispatch(getFinPlanBillsCommentFail(err));
  }
};

/*-----------------------------------
  CREATE FIN PLAN OTHER EXPENSE
------------------------------------*/
export function createFinPlanOtherExpenseSuccess(expense) {
  return {
    type: CREATE_FIN_PLAN_OTHER_EXPENSE_SUCCESS,
    expense,
  };
}

export function createFinPlanOtherExpenseFail(error) {
  return {
    type: CREATE_FIN_PLAN_OTHER_EXPENSE_FAIL,
    error
  };
}

export const createFinPlanOtherExpense = (expense, finPlanId) => async (dispatch) => {
  try {
    const response = await createFinPlanOtherExpenseRequest(expense, finPlanId);

    handleErrors(response);
    const json = await response.json();

    const createdExpense = get(json, 'expenseData.expenses[0]');
    dispatch(createFinPlanOtherExpenseSuccess(createdExpense));
  }
  catch (err) {
    dispatch(createFinPlanOtherExpenseFail(err));
  }
};

/*-----------------------------------
  UPDATE FIN PLAN OTHER EXPENSES
------------------------------------*/
export function updateFinPlanOtherExpenseSuccess(expense) {
  return {
    type: UPDATE_FIN_PLAN_OTHER_EXPENSE_SUCCESS,
    expense,
  };
}

export function updateFinPlanOtherExpenseFail(error) {
  return {
    type: UPDATE_FIN_PLAN_OTHER_EXPENSE_FAIL,
    error
  };
}

export const updateFinPlanOtherExpense = (expense, finPlanId) => async (dispatch) => {
  try {
    const response = await updateFinPlanOtherExpenseRequest(expense, finPlanId);

    handleErrors(response);
    const json = await response.json();

    const updatedExpense = get(json, 'expenseData.expense');
    dispatch(updateFinPlanOtherExpenseSuccess(updatedExpense));
  }
  catch (err) {
    dispatch(updateFinPlanOtherExpenseFail(err));
  }
};

/*-----------------------------------
  DELETE FIN PLAN OTHER EXPENSES
------------------------------------*/
export function deleteFinPlanOtherExpenseSuccess(expenseId) {
  return {
    type: DELETE_FIN_PLAN_OTHER_EXPENSE_SUCCESS,
    expenseId
  };
}

export function deleteFinPlanOtherExpenseFail(error) {
  return {
    type: DELETE_FIN_PLAN_OTHER_EXPENSE_FAIL,
    error
  };
}

export const deleteFinPlanOtherExpense = (expenseId, finPlanId) => async (dispatch) => {
  try {
    const response = await deleteFinPlanOtherExpenseRequest(expenseId, finPlanId);

    handleErrors(response);
    const json = await response.json();

    const deletedExpenseId = get(json, 'expenseData.expenseId');
    dispatch(deleteFinPlanOtherExpenseSuccess(deletedExpenseId));
  }
  catch (err) {
    dispatch(deleteFinPlanOtherExpenseFail(err));
  }
};

/*-----------------------------------
  BULK CREATE FIN PLAN OTHER_EXPENSES
------------------------------------*/
export function bulkCreateFinPlanOtherExpensesSuccess(expenses) {
  return {
    type: BULK_CREATE_FIN_PLAN_OTHER_EXPENSES_SUCCESS,
    expenses,
  };
}

export function bulkCreateFinPlanOtherExpensesFail() {
  return {
    type: BULK_CREATE_FIN_PLAN_OTHER_EXPENSES_FAIL,
  };
}

export const bulkCreateFinPlanOtherExpenses = (expenses, finPlanId) => async (dispatch) => {
  try {
    const response = await bulkCreateFinPlanOtherExpensesRequest(expenses, finPlanId);

    handleErrors(response);
    const json = await response.json();

    const createdExpenses = get(json, 'expenseData.expenses');
    dispatch(bulkCreateFinPlanOtherExpensesSuccess(createdExpenses));
  }
  catch (err) {
    dispatch(bulkCreateFinPlanOtherExpensesFail(err));
  }
};
