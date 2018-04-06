import fetch from 'isomorphic-fetch';
import { createHeadersForJSONContent } from '../utils/fetchUtils';
import { getUserDataFromLocalStorage } from './global/usersApi';
import { fastLinkUrl } from '../constants/ApiUrls';

export async function fetchYodleeFastLinkDataRequest() {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${fastLinkUrl}`, {
    method: 'GET',
    headers: createHeadersForJSONContent(data.token)
  });
}
