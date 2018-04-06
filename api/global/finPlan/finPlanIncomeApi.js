import fetch from 'isomorphic-fetch';
import { createHeadersForJSONContent } from '../../../utils/fetchUtils';
import { getUserDataFromLocalStorage } from '../usersApi';
import {
        finPlanIncomeUrl,
        finPlanIncomesUrl,
      } from '../../../constants/ApiUrls';

/*-----------------------------------
  CREATE FIN PLAN INCOME REQUEST
-------------------------------------*/
export async function createFinPlanIncomeRequest(income, finPlanId) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${finPlanIncomesUrl(finPlanId)}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({ income })
  });
}

/*-----------------------------------
  CREATE FIN PLAN UPDATE REQUEST
-------------------------------------*/
export async function updateFinPlanIncomeRequest(income, finPlanId) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${finPlanIncomeUrl(finPlanId, income.id)}`, {
    method: 'PUT',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({ income })
  });
}

/*-----------------------------------
  CREATE FIN PLAN DELETE REQUEST
-------------------------------------*/
export async function deleteFinPlanIncomeRequest(incomeId, finPlanId) {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${finPlanIncomeUrl(finPlanId, incomeId)}`, {
    method: 'DELETE',
    headers: createHeadersForJSONContent(data.token)
  });
}
