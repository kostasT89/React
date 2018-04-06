import fetch from 'isomorphic-fetch';

import { getFisecalApiUrl } from '../utils/localStorageUtils';

const urls = {
  signup: 'users',
  accountConfirmation: 'accountConfirmation'
};

export async function attemptSignupRequest(signupInfo) {
  const apiUrl = await getFisecalApiUrl();
  return fetch(`${apiUrl}${urls.signup}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...signupInfo })
  });
}

export async function verifyAccount(accountConfirmationToken) {
  const apiUrl = await getFisecalApiUrl();
  return fetch(`${apiUrl}${urls.accountConfirmation}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ accountConfirmationToken })
  });
}
