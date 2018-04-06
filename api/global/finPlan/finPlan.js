import fetch from 'isomorphic-fetch';
import { finPlanUrl, finPlansUrl } from '../../../constants/ApiUrls';
import { getUserDataFromLocalStorage } from '../usersApi';
import { createHeadersForJSONContent } from '../../../utils/fetchUtils';

/*-----------------------------------
  FETCH FIN PLANS REQUEST
-------------------------------------*/
export async function fetchFinPlansRequest() {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${finPlansUrl}`, {
    method: 'GET',
    headers: createHeadersForJSONContent(data.token)
  });
}

/*-----------------------------------
  FETCH FIN PLAN REQUEST
-------------------------------------*/
export async function fetchFinPlanRequest(finPlanId) {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${finPlanUrl(finPlanId)}`, {
    method: 'GET',
    headers: createHeadersForJSONContent(data.token)
  });
}

/*-----------------------------------
  CREATE FIN PLAN REQUEST
-------------------------------------*/
export async function createFinPlanRequest(finPlan = {}) {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${finPlansUrl}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({ finPlan })
  });
}
