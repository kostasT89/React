import fetch from 'isomorphic-fetch';
import {
          createHeadersForJSONContent,
          handleErrors
      } from '../../utils/fetchUtils';
import { getUserDataFromLocalStorage } from './usersApi';
import {
          stripePaymentInfoUrl,
          cancelSubscriptionUrl,
          retrieveSubscriptionUrl
        } from '../../constants/ApiUrls';

/*------------------------------------
  STRIPE ACCOUNT PAYMENT INFO
--------------------------------------*/
export async function fetchStripePaymentInformation() {
  const data = await getUserDataFromLocalStorage();

  const userId = data.user.id;
  return fetch(
    `${data.apiUrl}${stripePaymentInfoUrl(userId)}`,
    {
      method: 'GET',
      headers: createHeadersForJSONContent(data.token)
    }
  ).then(handleErrors)
   .then(response => response.json());
}

/*------------------------------------
  CANCEL STRIPE SUBSCRIPTION
--------------------------------------*/
export async function cancelSubscription() {
  const data = await getUserDataFromLocalStorage();

  const userId = data.user.id;
  return fetch(
    `${data.apiUrl}${cancelSubscriptionUrl(userId)}`,
    {
      method: 'PUT',
      headers: createHeadersForJSONContent(data.token)
    }
  ).then(handleErrors)
   .then(response => response.json());
}

/*------------------------------------
  RETRIEVE STRIPE SUBSCRIPTION DETAILS
--------------------------------------*/
export async function retrieveStripeSubscriptionDetails() {
  const data = await getUserDataFromLocalStorage();

  const userId = data.user.id;
  return fetch(
    `${data.apiUrl}${retrieveSubscriptionUrl(userId)}`,
    {
      method: 'GET',
      headers: createHeadersForJSONContent(data.token)
    }
  ).then(handleErrors)
   .then(response => response.json());
}
