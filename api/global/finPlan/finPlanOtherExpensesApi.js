import fetch from 'isomorphic-fetch';
import { createHeadersForJSONContent } from '../../../utils/fetchUtils';
import { getUserDataFromLocalStorage } from '../usersApi';
import {
        finPlanOtherExpensesUrl,
        finPlanOtherExpenseUrl
      } from '../../../constants/ApiUrls';

/*-----------------------------------
  BULK CREATE FIN PLAN OTHER EXPENSES
-------------------------------------*/
export async function bulkCreateFinPlanOtherExpensesRequest(expenses, finPlanId) {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${finPlanOtherExpensesUrl(finPlanId)}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({ expenses })
  });
}

/*-----------------------------------
  GET FIN PLAN OTHER EXPENSES
-------------------------------------*/
export async function getFinPlanOtherExpensesRequest(finPlanId) {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${finPlanOtherExpensesUrl(finPlanId)}`, {
    method: 'GET',
    headers: createHeadersForJSONContent(data.token),
  });
}

/*-----------------------------------
  CREATE FIN PLAN OTHER EXPENSE
-------------------------------------*/
export async function createFinPlanOtherExpenseRequest(expense, finPlanId) {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${finPlanOtherExpensesUrl(finPlanId)}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({ expenses: [expense] })
  });
}

/*-----------------------------------
  UPDATE FIN PLAN OTHER EXPENSE
-------------------------------------*/
export async function updateFinPlanOtherExpenseRequest(expense, finPlanId) {
  const data = await getUserDataFromLocalStorage();
  const { id } = expense;
  return fetch(`${data.apiUrl}${finPlanOtherExpenseUrl(finPlanId, id)}`, {
    method: 'PUT',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({ expense })
  });
}

/*-----------------------------------
  DELETE FIN PLAN OTHER EXPENSE
-------------------------------------*/
export async function deleteFinPlanOtherExpenseRequest(expenseId, finPlanId) {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${finPlanOtherExpenseUrl(finPlanId, expenseId)}`, {
    method: 'DELETE',
    headers: createHeadersForJSONContent(data.token),
  });
}
