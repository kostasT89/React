import fetch from 'isomorphic-fetch';

import { getFisecalApiUrl } from '../utils/localStorageUtils';

const urls = {
  signIn: 'signIn',
  resetPassword: 'resetPassword'
};

export async function attemptLoginRequest(loginInfo) {
  const apiUrl = await getFisecalApiUrl();

  return fetch(`${apiUrl}${urls.signIn}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...loginInfo })
  });
}

export async function resetPassword(resetPasswordInfo) {
  const apiUrl = await getFisecalApiUrl();

  return fetch(`${apiUrl}${urls.resetPassword}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...resetPasswordInfo })
  });
}
