import fetch from 'isomorphic-fetch';
import {
          createHeadersForJSONContent,
          handleErrors
        } from '../../utils/fetchUtils';
import { getUserDataFromLocalStorage } from './usersApi';

import {
  settingsAccountsUrl,
  settingsAccountUrl,
  accountSettingsProviderUrl
 } from '../../constants/ApiUrls';

 export async function getAccountsSettings() {
   const data = await getUserDataFromLocalStorage();

   const { user } = data;
   return fetch(`${data.apiUrl}${settingsAccountsUrl(user.id)}`, {
       method: 'GET',
       headers: createHeadersForJSONContent(data.token)
     }
   );
 }

export async function updateLocalAccount(account) {
  const data = await getUserDataFromLocalStorage();
  const accountId = account.id;

  const { user } = data;
  return fetch(`${data.apiUrl}${settingsAccountUrl(user.id, accountId)}`, {
    method: 'PUT',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({
      account
    })
  }).then(handleErrors)
    .then(response => response.json());
}

export async function deleteProvider(providerAccountId) {
  const data = await getUserDataFromLocalStorage();

  return fetch(
    `${data.apiUrl}${accountSettingsProviderUrl(providerAccountId)}`,
    {
      method: 'DELETE',
      headers: createHeadersForJSONContent(data.token),
    }
  ).then(handleErrors)
   .then(response => response.json());
}

export async function refreshAccountSettings() {
  const data = await getUserDataFromLocalStorage();

  return fetch(
    `${data.apiUrl}${accountSettingsProviderUrl(data.user.id)}`,
    {
      method: 'GET',
      headers: createHeadersForJSONContent(data.token),
    }
  ).then(handleErrors)
   .then(response => response.json());
}
