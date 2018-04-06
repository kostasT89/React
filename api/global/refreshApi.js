import fetch from 'isomorphic-fetch';

import { createHeadersForJSONContent } from '../../utils/fetchUtils';
import { getUserDataFromLocalStorage } from './usersApi';
import { refreshTransactionsUrl } from '../../constants/ApiUrls';

/*--------------------------------------------------
  REFRESH TRANSACTIONS
---------------------------------------------------*/
export async function fetchRefreshedTransactionsRequest({
  dateStartUTC,
  dateEndUTC,
}) {
  const data = await getUserDataFromLocalStorage();

  return fetch(
    `${data.apiUrl}${refreshTransactionsUrl}`,
    {
      method: 'POST',
      headers: createHeadersForJSONContent(data.token),
      body: JSON.stringify({
        dateStartUTC,
        dateEndUTC,
      })
    }
  );
}
