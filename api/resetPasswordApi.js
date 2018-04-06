import fetch from 'isomorphic-fetch';

import { getFisecalApiUrl } from '../utils/localStorageUtils';

const urls = { updatePassword: 'updatePassword' };

// eslint-disable-next-line import/prefer-default-export
export default async function setNewPassword(resetPasswordInfo) {
  const apiUrl = await getFisecalApiUrl();
  return fetch(`${apiUrl}${urls.updatePassword}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...resetPasswordInfo })
  });
}
