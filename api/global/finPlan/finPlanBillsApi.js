import fetch from 'isomorphic-fetch';
import { createHeadersForJSONContent } from '../../../utils/fetchUtils';
import { getUserDataFromLocalStorage } from '../usersApi';
import { finPlanBillsUrl } from '../../../constants/ApiUrls';

/*-----------------------------------
  GET FIN PLAN BILLS
-------------------------------------*/
export async function getFinPlanBillRequest(finPlanId) {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${finPlanBillsUrl(finPlanId)}`, {
    method: 'GET',
    headers: createHeadersForJSONContent(data.token),
  });
}

/*-----------------------------------
  UPDATE FIN PLAN BILLS
-------------------------------------*/
export async function updateFinPlanBillRequest(finPlanId, comments) {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${finPlanBillsUrl(finPlanId)}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({ bill: { comments } })
  });
}
