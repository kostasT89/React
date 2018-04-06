import isEmpty from 'lodash/isEmpty';
import fetch from 'isomorphic-fetch';
import {
         getFisecalUser,
         getFisecalToken,
         getFisecalApiUrl
       } from '../../utils/localStorageUtils';
import {
       createHeadersForJSONContent,
       handleErrors
      } from '../../utils/fetchUtils';
import {
  usersUrl,
  userVerifyPasswordUrl,
  updateUserCurrentStatusUrl
} from '../../constants/ApiUrls';

export async function getUserDataFromLocalStorage() {
  const user = await getFisecalUser();

  const token = await getFisecalToken();

  const apiUrl = await getFisecalApiUrl();

  if (isEmpty(user) || isEmpty(token)) {
    throw Error('User data missing, initiating logout');
  }
  return { user, token, apiUrl };
}

export async function persistUserData(userId, userData) {
  const data = await getUserDataFromLocalStorage();

  return fetch(
    `${data.apiUrl}${usersUrl(userId)}`,
    {
      method: 'PUT',
      headers: createHeadersForJSONContent(data.token),
      body: JSON.stringify(userData)
    }
  ).then(handleErrors)
   .then(response => response.json());
}

export async function persistUserCurrentStatus(userId, currentStatus) {
  const data = await getUserDataFromLocalStorage();

  return fetch(
    `${data.apiUrl}${updateUserCurrentStatusUrl(userId)}`,
    {
      method: 'PUT',
      headers: createHeadersForJSONContent(data.token),
      body: JSON.stringify({ currentStatus })
    }
  ).then(handleErrors)
   .then(response => response.json());
}

export async function verifyPassword(passwordToVerify) {
  const data = await getUserDataFromLocalStorage();

  const { user } = data;
  return fetch(
    `${data.apiUrl}${userVerifyPasswordUrl(user.id)}`,
    {
      method: 'PUT',
      headers: createHeadersForJSONContent(data.token),
      body: JSON.stringify({ passwordToVerify })
    }
  ).then(handleErrors)
   .then(response => response.json());
}
