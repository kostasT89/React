import fetch from 'isomorphic-fetch';
import { createHeadersForJSONContent } from '../../utils/fetchUtils';
import { getUserDataFromLocalStorage } from './usersApi';
import {
  goalsUrl,
  goalUrl
} from '../../constants/ApiUrls';

/*-----------------------------------
  CREATE GOAL
-------------------------------------*/
export async function createGoalRequest(goal) {
  const data = await getUserDataFromLocalStorage();

  const { user } = data;
  return fetch(`${data.apiUrl}${goalsUrl(user.id)}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({
      goal
    })
  });
}

/*-----------------------------------
  GET GOALS
-------------------------------------*/
export async function getGoalsRequest() {
  const data = await getUserDataFromLocalStorage();

  const { user } = data;
  return fetch(`${data.apiUrl}${goalsUrl(user.id)}`, {
    method: 'GET',
    headers: createHeadersForJSONContent(data.token),
  });
}

/*-----------------------------------
  UPDATE GOALS
-------------------------------------*/
export async function updateGoalsRequest(goal, goalId) {
  const data = await getUserDataFromLocalStorage();

  const { user } = data;
  return fetch(`${data.apiUrl}${goalUrl(user.id, goalId)}`, {
    method: 'PUT',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({
      goal
    })
  });
}
