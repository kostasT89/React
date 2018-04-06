import fetch from 'isomorphic-fetch';
import { createHeadersForJSONContent } from '../../utils/fetchUtils';
import objectToQueryString from '../../utils/queryStringUtils';
import { getUserDataFromLocalStorage } from './usersApi';
import {
  yodleeAccountUrl,
  yodleeAccountsUrl,
  importAccountsUrl,
  accountsUrl
} from '../../constants/ApiUrls';

/*------------------------------------
  YODLEE ACCOUNTS:
--------------------------------------*/
export async function fetchYodleeAccountsRequest() {
  const data = await getUserDataFromLocalStorage();

  const userId = data.user.id;
  return fetch(
    `${data.apiUrl}${yodleeAccountsUrl(userId)}`,
    {
      method: 'GET',
      headers: createHeadersForJSONContent(data.token)
    }
  );
}

/*------------------------------------
  ENABLED ACCOUNTS:
--------------------------------------*/
export async function fetchEnabledAccountsRequest() {
  const data = await getUserDataFromLocalStorage();

  const userId = data.user.id;
  const queryString = objectToQueryString({ isAccountDisabled: false });
  return fetch(
    `${data.apiUrl}${accountsUrl(userId)}${queryString}`,
    {
      method: 'GET',
      headers: createHeadersForJSONContent(data.token),
    }
  );
}

export async function fetchYodleeAccountRequest(accountId, container) {
  const data = await getUserDataFromLocalStorage();

  const queryString = objectToQueryString({ container });
  const userId = data.user.id;
  return fetch(
    `${data.apiUrl}${yodleeAccountUrl(userId, accountId)}${queryString}`,
    {
      method: 'GET',
      headers: createHeadersForJSONContent(data.token)
    }
  );
}

export async function deleteYodleeAccountRequest(accountId) {
  const data = await getUserDataFromLocalStorage();

  const userId = data.user.id;
  return fetch(
    `${data.apiUrl}${yodleeAccountUrl(userId, accountId)}`,
    {
      method: 'DELETE',
      headers: createHeadersForJSONContent(data.token)
    }
  );
}

/*------------------------------------
  FISECAL ACCOUNTS:
--------------------------------------*/
export async function fetchAccountsRequest() {
  const data = await getUserDataFromLocalStorage();

  return fetch(
    `${data.apiUrl}${accountsUrl(data.user.id)}`,
    {
      method: 'GET',
      headers: createHeadersForJSONContent(data.token)
    }
  );
}

export async function bulkUpdateAccountsRequest(accountsArray) {
  const data = await getUserDataFromLocalStorage();

  return fetch(
    `${data.apiUrl}${accountsUrl(data.user.id)}`,
    {
      method: 'PUT',
      headers: createHeadersForJSONContent(data.token),
      body: JSON.stringify({
        accounts: accountsArray
      })
    }
  );
}

export async function importAccountsRequest() {
  const data = await getUserDataFromLocalStorage();

  return fetch(
    `${data.apiUrl}${importAccountsUrl(data.user.id)}`,
    {
      method: 'POST',
      headers: createHeadersForJSONContent(data.token),
    }
  );
}
