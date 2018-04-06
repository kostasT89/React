import fetch from 'isomorphic-fetch';

import { createHeadersForJSONContent } from '../utils/fetchUtils';
import { getUserDataFromLocalStorage } from './global/usersApi';
import { getFisecalApiUrl } from '../utils/localStorageUtils';

const urls = {
  users: 'users',
  coBrowsing: 'coBrowsing',
  advisorsReauthentication: 'advisorsReauthentication',
  advisorAppointmentsUrl: advisorId => `advisors/${advisorId}/appointments`
};

export async function fetchFisecalUsers() {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${urls.users}`, {
    method: 'GET',
    headers: createHeadersForJSONContent(data.token),
  });
}

export async function getAdvisorAppointments() {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${urls.advisorAppointmentsUrl(data.user.id)}`, {
    method: 'GET',
    headers: createHeadersForJSONContent(data.token),
  });
}

export async function beginCoBrowse(userId) {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${urls.coBrowsing}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({ userId })
  });
}

export async function authenticateAdvisor(coBrowsingToken) {
  const apiUrl = await getFisecalApiUrl();
  return fetch(`${apiUrl}${urls.advisorsReauthentication}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ coBrowsingToken })
  });
}
