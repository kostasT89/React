import fetch from 'isomorphic-fetch';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { createHeadersForJSONContent } from '../../utils/fetchUtils';
import objectToQueryString from '../../utils/queryStringUtils';
import { getUserDataFromLocalStorage } from './usersApi';
import {
  acctTransactionsUrl,
  yodleeAcctTransactionsUrl,
  yodleeUserTransactionsUrl,
  userTransactionUrl,
  userTransactionsUrl,
  calculateTransactionSummaryUrl,
  importTransactionsUrl
} from '../../constants/ApiUrls';

/*--------------------------------------------------
  GET TRANSACTIONS BY ACCOUNT
---------------------------------------------------*/
export async function fetchAccountTransactionsRequest({ accountId, page, count }) {
  const data = await getUserDataFromLocalStorage();
  const queryString = objectToQueryString({
    page,
    count
  });

  return fetch(
    `${data.apiUrl}${acctTransactionsUrl(accountId)}${queryString}`,
    {
      method: 'GET',
      headers: createHeadersForJSONContent(data.token)
    }
  );
}

/*--------------------------------------------------
  GET YODLEE TRANSACTIONS BY ACCOUNT
---------------------------------------------------*/
export async function fetchYodleeAccountTransactionsRequest(accountId) {
  const data = await getUserDataFromLocalStorage();

  return fetch(
    `${data.apiUrl}${yodleeAcctTransactionsUrl(accountId)}`,
    {
      method: 'GET',
      headers: createHeadersForJSONContent(data.token)
    }
  );
}

/*--------------------------------------------------
  GET TRANSACTIONS BY USER
---------------------------------------------------*/
export async function fetchUserTransactionsRequest(queryParams) {
  const data = await getUserDataFromLocalStorage();

  let path = userTransactionsUrl(get(data, 'user.id'));
  let queryString;
  if (!isEmpty(queryParams)) {
    queryString = objectToQueryString(queryParams);
    path = `${path}${queryString}`;
  }
  return fetch(
    `${data.apiUrl}${path}`,
    {
      method: 'GET',
      headers: createHeadersForJSONContent(data.token)
    }
  );
}

/*--------------------------------------------------
  GET YODLEE TRANSACTIONS BY USER
---------------------------------------------------*/
export async function fetchYodleeUserTransactionsRequest({
  dateStartUTC,
  dateEndUTC
}) {
  const data = await getUserDataFromLocalStorage();

  let path = yodleeUserTransactionsUrl(get(data, 'user.id'));
  let queryString;
  if (dateStartUTC || dateEndUTC) {
    queryString = objectToQueryString({
      dateStart: dateStartUTC,
      dateEnd: dateEndUTC
    });
    path = `${path}${queryString}`;
  }
  return fetch(
    `${data.apiUrl}${path}`,
    {
      method: 'GET',
      headers: createHeadersForJSONContent(data.token)
    }
  );
}

/*--------------------------------------------------
  UPDATE TRANSACTION
---------------------------------------------------*/
export async function updateTransactionRequest(transaction) {
  const data = await getUserDataFromLocalStorage();
  const userId = data.user.id;
  const transactionId = transaction.id;
  return fetch(
    `${data.apiUrl}${userTransactionUrl(userId, transactionId)}`,
    {
      method: 'PUT',
      headers: createHeadersForJSONContent(data.token),
      body: JSON.stringify(transaction)
    }
  );
}

/*--------------------------------------------------
  UPDATE TRANSACTIONS
---------------------------------------------------*/
export async function updateUserTransactionsRequest(userData) {
  const data = await getUserDataFromLocalStorage();

  const { user } = data;
  return fetch(
    `${data.apiUrl}${acctTransactionsUrl(user.id)}`,
    {
      method: 'PUT',
      headers: createHeadersForJSONContent(data.token),
      body: JSON.stringify(userData)
    }
  );
}

/*--------------------------------------------------
  CREATE TRANSACTIONS
---------------------------------------------------*/
export async function bulkCreateTransactionsRequest(transactions) {
  const data = await getUserDataFromLocalStorage();
  const userId = data.user.id;
  return fetch(
    `${data.apiUrl}${userTransactionsUrl(userId)}`,
    {
      method: 'POST',
      headers: createHeadersForJSONContent(data.token),
      body: JSON.stringify({
        transactions
      })
    }
  );
}

/*--------------------------------------------------
  CREATE TRANSACTION SUMMARY
---------------------------------------------------*/
export async function calculateTransactionSummaryRequest({ dateStart, dateEnd }) {
  const data = await getUserDataFromLocalStorage();
  const userId = data.user.id;

  return fetch(`${data.apiUrl}${calculateTransactionSummaryUrl}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({
      userId,
      dateStart,
      dateEnd
    })
  });
}

/*--------------------------------------------------
  IMPORT TRANSACTIONS
---------------------------------------------------*/
export async function importTransactionsRequest({
  fromDate,
  toDate,
  yodleeAccountIds
}) {
  const data = await getUserDataFromLocalStorage();

  return fetch(
    `${data.apiUrl}${importTransactionsUrl(data.user.id)}`,
    {
      method: 'POST',
      headers: createHeadersForJSONContent(data.token),
      body: JSON.stringify({
        yodleeAccountIds,
        fromDate,
        toDate
      })
    }
  );
}
