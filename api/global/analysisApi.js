import fetch from 'isomorphic-fetch';
import { createHeadersForJSONContent } from '../../utils/fetchUtils';
import { getUserDataFromLocalStorage } from './usersApi';
import {
        createBillSummaryUrl,
        createIncomeSummaryUrl,
        createTransactionsSummaryUrl,
        createPerExSummaryUrl,
        createFinancialOverviewUrl
      } from '../../constants/ApiUrls';

/*---------------------------------
  CREATE BILL SUMMARY
-----------------------------------*/
export async function createBillSummaryRequest({
  dateStart,
  dateEnd
}) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${createBillSummaryUrl(data.user.id)}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({
      dateStart,
      dateEnd,
    })
  });
}

/*---------------------------------
  CREATE INCOME SUMMARY
-----------------------------------*/
export async function createIncomeSummaryRequest({
  dateStart,
  dateEnd
}) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${createIncomeSummaryUrl(data.user.id)}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({
      dateStart,
      dateEnd
    })
  });
}

/*---------------------------------
  CREATE PEREX SUMMARY
-----------------------------------*/
export async function createPerExSummaryRequest({
  dateStart,
  dateEnd
}) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${createPerExSummaryUrl(data.user.id)}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({
      dateStart,
      dateEnd
    })
  });
}

/*---------------------------------
  CREATE FINANCIAL OVERVIEW
-----------------------------------*/
export async function createFinancialOverviewRequest({
  dateStart,
  dateEnd
}) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${createFinancialOverviewUrl(data.user.id)}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({
      dateStart,
      dateEnd
    })
  });
}

/*---------------------------------
  CREATE TRANSACTIONS SUMMARY
-----------------------------------*/
export async function createTransactionsSummaryRequest({
  dateStart,
  dateEnd
}) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${createTransactionsSummaryUrl(data.user.id)}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({
      dateStart,
      dateEnd
    })
  });
}
