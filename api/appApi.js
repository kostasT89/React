import fetch from 'isomorphic-fetch';
import get from 'lodash/get';

import { createHeadersForJSONContent } from '../utils/fetchUtils';
import { getUserDataFromLocalStorage } from './global/usersApi';
import { appConfigUrl } from '../constants/ApiUrls';

export async function fetchAppDataRequest() {
  const data = await getUserDataFromLocalStorage();

  const userId = get(data, 'user.id');
  return fetch(`${data.apiUrl}${appConfigUrl(userId)}`, {
    method: 'GET',
    headers: createHeadersForJSONContent(data.token)
  });
}
