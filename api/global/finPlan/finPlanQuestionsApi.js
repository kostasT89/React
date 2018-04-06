import fetch from 'isomorphic-fetch';
import { createHeadersForJSONContent } from '../../../utils/fetchUtils';
import { getUserDataFromLocalStorage } from '../usersApi';
import { finPlanQuestionUrl, finPlanQuestionsUrl } from '../../../constants/ApiUrls';

/*-----------------------------------
  CREATE FIN PLAN QUESTIONS REQUEST
-------------------------------------*/
export async function createFinPlanQuestionsRequest(responses, finPlanId) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${finPlanQuestionsUrl(finPlanId)}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({ responses })
  });
}

/*-----------------------------------
  UPDATE FIN PLAN QUESTIONS REQUEST
-------------------------------------*/
export async function updateFinPlanQuestionsRequest(responses, finPlanId, finPlanQuestionsId) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${finPlanQuestionUrl(finPlanId, finPlanQuestionsId)}`, {
    method: 'PUT',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({ responses })
  });
}
