import fetch from 'isomorphic-fetch';
import { createHeadersForJSONContent } from '../../utils/fetchUtils';
import objectToQueryString from '../../utils/queryStringUtils';
import { getUserDataFromLocalStorage } from './usersApi';
import { yodleeAccountBalancesUrl } from '../../constants/ApiUrls';

/*------------------------------------
  YODLEE ACCOUNT BALANCES:
--------------------------------------*/
export async function fetchYodleeAccountBalancesRequest(params) {
  const data = await getUserDataFromLocalStorage();

  const queryString = objectToQueryString(params);
  const userId = data.user.id;
  return fetch(
    `${data.apiUrl}${yodleeAccountBalancesUrl(userId)}${queryString}`,
    {
      method: 'GET',
      headers: createHeadersForJSONContent(data.token)
    }
  );
}
