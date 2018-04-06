import fetch from 'isomorphic-fetch';
// Local Deps:
import { createHeadersForJSONContent } from '../../../utils/fetchUtils';
import { getUserDataFromLocalStorage } from '../usersApi';
import {
        finPlanTaxReturnsUrl,
        finPlanTaxReturnUrl
      } from '../../../constants/ApiUrls';
/*-----------------------------------
  GET FIN PLAN TAX RETURN REQUEST
-------------------------------------*/
export async function getFinPlanTaxReturnRequest(finPlanId, finPlanTaxReturnId) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${finPlanTaxReturnUrl(finPlanId, finPlanTaxReturnId)}`, {
    method: 'GET',
    headers: createHeadersForJSONContent(data.token),
  });
}

/*-----------------------------------
  CREATE FIN PLAN TAX RETURN REQUEST
-------------------------------------*/
export async function createFinPlanTaxReturnRequest(taxes, finPlanId) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${finPlanTaxReturnsUrl(finPlanId)}`, {
    method: 'POST',
    body: JSON.stringify({ taxes }),
    headers: createHeadersForJSONContent(data.token),
  });
}

/*-----------------------------------
  UPDATE FIN PLAN TAX RETURN REQUEST
-------------------------------------*/
export async function updateFinPlanTaxReturnRequest(taxes, finPlanId, finPlanTaxReturnId) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${finPlanTaxReturnUrl(finPlanId, finPlanTaxReturnId)}`, {
    method: 'PUT',
    body: JSON.stringify({ taxes }),
    headers: createHeadersForJSONContent(data.token),
  });
}
