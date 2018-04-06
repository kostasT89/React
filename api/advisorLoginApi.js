import fetch from 'isomorphic-fetch';

import { getFisecalApiUrl } from '../utils/localStorageUtils';

const urls = { advisorsSignIn: 'advisorsSignIn' };

export default async function attemptLoginRequest(loginInfo) {
  const apiUrl = await getFisecalApiUrl();
  return fetch(`${apiUrl}${urls.advisorsSignIn}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...loginInfo })
  });
}
