import fetch from 'isomorphic-fetch';
import { createHeadersForJSONContent } from '../../../utils/fetchUtils';
import { getUserDataFromLocalStorage } from '../usersApi';
import {
        finPlanInsurancePolicyUrl,
        finPlanInsurancePoliciesUrl,
      } from '../../../constants/ApiUrls';

/*-----------------------------------
  CREATE FIN PLAN INSURANCE REQUEST
-------------------------------------*/
export async function createFinPlanInsuranceRequest(insurancePolicy, finPlanId) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${finPlanInsurancePoliciesUrl(finPlanId)}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify(insurancePolicy)
  });
}

/*-----------------------------------
  UPDATE FIN PLAN INSURANCE REQUEST
-------------------------------------*/
export async function updateFinPlanInsuranceRequest(insurancePolicy, finPlanId) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${finPlanInsurancePolicyUrl(finPlanId, insurancePolicy.id)}`, {
    method: 'PUT',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify(insurancePolicy)
  });
}

/*-----------------------------------
  DELETE FIN PLAN INSURANCE REQUEST
-------------------------------------*/
export async function deleteFinPlanInsuranceRequest(finPlanInsuranceId, finPlanId) {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${finPlanInsurancePolicyUrl(finPlanId, finPlanInsuranceId)}`, {
    method: 'DELETE',
    headers: createHeadersForJSONContent(data.token)
  });
}
