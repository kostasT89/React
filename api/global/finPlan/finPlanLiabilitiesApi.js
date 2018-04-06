import fetch from 'isomorphic-fetch';
import { createHeadersForJSONContent } from '../../../utils/fetchUtils';
import { getUserDataFromLocalStorage } from '../usersApi';
import {
        finPlanLiabilityUrl,
        finPlanLiabilitiesUrl,
      } from '../../../constants/ApiUrls';

/*-----------------------------------
  CREATE FIN PLAN LIABILITY REQUEST
-------------------------------------*/
export async function createFinPlanLiabilityRequest(liability, finPlanId) {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${finPlanLiabilitiesUrl(finPlanId)}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify(liability)
  });
}

/*-----------------------------------
  UPDATE FIN PLAN LIABILITY REQUEST
-------------------------------------*/
export async function updateFinPlanLiabilityRequest(liability, finPlanId) {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${finPlanLiabilityUrl(finPlanId, liability.id)}`, {
    method: 'PUT',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify(liability)
  });
}

/*-----------------------------------
  DELETE FIN PLAN GOAL REQUEST
-------------------------------------*/
export async function deleteFinPlanLiabilityRequest(liabilityId, finPlanId) {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${finPlanLiabilityUrl(finPlanId, liabilityId)}`, {
    method: 'DELETE',
    headers: createHeadersForJSONContent(data.token)
  });
}
