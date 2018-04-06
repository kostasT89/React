import fetch from 'isomorphic-fetch';
import { createHeadersForJSONContent } from '../../../utils/fetchUtils';
import { getUserDataFromLocalStorage } from '../usersApi';
import {
  finPlanPersonalDetailsUrl,
  finPlanPersonalDetailUrl,
} from '../../../constants/ApiUrls';

/*------------------------------------------
  CREATE FIN PLAN PERSONAL DETAILS REQUEST
-------------------------------------------*/
export async function createFinPlanPersonalDetailsRequest(userData, finPlanId) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${finPlanPersonalDetailsUrl(finPlanId)}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({ personalDetails: { ...userData } })
  });
}

/*------------------------------------------
  UPDATE FIN PLAN PERSONAL DETAILS REQUEST
-------------------------------------------*/
export async function updateFinPlanPersonalDetailsRequest(userData, personalDetailsId, finPlanId) {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${finPlanPersonalDetailUrl(finPlanId, personalDetailsId)}`, {
    method: 'PUT',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({ personalDetails: { ...userData } })
  });
}
