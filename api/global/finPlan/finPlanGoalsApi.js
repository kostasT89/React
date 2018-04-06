import fetch from 'isomorphic-fetch';
// Local Deps:
import { createHeadersForJSONContent } from '../../../utils/fetchUtils';
import { getUserDataFromLocalStorage } from '../usersApi';
import {
        finPlanGoalsUrl,
        finPlanGoalUrl
      } from '../../../constants/ApiUrls';

/*-----------------------------------
  CREATE FIN PLAN GOAL REQUEST
-------------------------------------*/
export async function createFinPlanGoalRequest(goal, finPlanId) {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${finPlanGoalsUrl(finPlanId)}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify(goal)
  });
}

/*-----------------------------------
  GET FIN PLAN GOALS REQUEST
-------------------------------------*/
export async function getFinPlanGoalsRequest(finPlanId) {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${finPlanGoalsUrl(finPlanId)}`, {
    method: 'GET',
    headers: createHeadersForJSONContent(data.token),
  });
}

/*-----------------------------------
  UPDATE FIN PLAN GOAL REQUEST
-------------------------------------*/
export async function updateFinPlanGoalRequest(goal, finPlanId) {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${finPlanGoalUrl(finPlanId, goal.id)}`, {
    method: 'PUT',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify(goal)
  });
}

/*-----------------------------------
  DELETE FIN PLAN GOAL REQUEST
-------------------------------------*/
export async function deleteFinPlanGoalRequest(goalId, finPlanId) {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${finPlanGoalUrl(finPlanId, goalId)}`, {
    method: 'DELETE',
    headers: createHeadersForJSONContent(data.token)
  });
}
