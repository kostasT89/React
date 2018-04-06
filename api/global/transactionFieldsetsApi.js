import fetch from 'isomorphic-fetch';
// Local Deps
import objectToQueryString from '../../utils/queryStringUtils';
import { createHeadersForJSONContent } from '../../utils/fetchUtils';
import { getUserDataFromLocalStorage } from './usersApi';
import {
        transactionFieldsetsUrl,
        importTransactionFieldsetsUrl,
        importBillsUrl,
        importIncomesUrl,
        predictFieldsetsUrl
      } from '../../constants/ApiUrls';

/*--------------------------------------------------
  GET FIELDSETS
---------------------------------------------------*/
export async function getFieldsetsRequest(attrs) {
  const data = await getUserDataFromLocalStorage();

  const userId = data.user.id;
  const queryString = objectToQueryString(attrs);
  return fetch(
    `${data.apiUrl}${transactionFieldsetsUrl(userId)}${queryString}`,
    {
      method: 'GET',
      headers: createHeadersForJSONContent(data.token),
    }
  );
}

/*--------------------------------------------------
  UPSERT FIELDSET
---------------------------------------------------*/
export async function upsertFieldsetRequest(fieldset) {
  const data = await getUserDataFromLocalStorage();

  const userId = data.user.id;
  if (!fieldset.accountId) return;
  return fetch(
    `${data.apiUrl}${transactionFieldsetsUrl(userId)}`,
    {
      method: 'POST',
      headers: createHeadersForJSONContent(data.token),
      body: JSON.stringify({
        fieldset
      })
    }
  );
}

/*--------------------------------------------------
  IMPORT FIELDSETS REQUEST
---------------------------------------------------*/
export async function importFieldsetsRequest(queryParams) {
  const data = await getUserDataFromLocalStorage();

  const userId = data.user.id;
  return fetch(
    `${data.apiUrl}${importTransactionFieldsetsUrl(userId)}`,
    {
      method: 'POST',
      headers: createHeadersForJSONContent(data.token),
      body: JSON.stringify(queryParams)
    }
  );
}

/*--------------------------------------------------
  IMPORT BILLS REQUEST
---------------------------------------------------*/

export async function importBillsRequest(queryParams) {
  const data = await getUserDataFromLocalStorage();

  const userId = data.user.id;
  return fetch(
    `${data.apiUrl}${importBillsUrl(userId)}`,
    {
      method: 'POST',
      headers: createHeadersForJSONContent(data.token),
      body: JSON.stringify(queryParams)
    }
  );
}

/*--------------------------------------------------
  IMPORT INCOMES REQUEST
---------------------------------------------------*/
export async function importIncomesRequest(queryParams) {
  const data = await getUserDataFromLocalStorage();

  const userId = data.user.id;
  return fetch(
    `${data.apiUrl}${importIncomesUrl(userId)}`,
    {
      method: 'POST',
      headers: createHeadersForJSONContent(data.token),
      body: JSON.stringify(queryParams)
    }
  );
}

/*--------------------------------------------------
  PREDICT FIELDSETS REQUEST
---------------------------------------------------*/
export async function predictFieldsetsRequest(queryParams) {
  const data = await getUserDataFromLocalStorage();

  const userId = data.user.id;
  return fetch(
    `${data.apiUrl}${predictFieldsetsUrl(userId)}`,
    {
      method: 'POST',
      headers: createHeadersForJSONContent(data.token),
      body: JSON.stringify(queryParams)
    }
  );
}
