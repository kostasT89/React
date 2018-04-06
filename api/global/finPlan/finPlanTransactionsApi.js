import fetch from 'isomorphic-fetch';
import { createHeadersForJSONContent } from '../../../utils/fetchUtils';
import { getUserDataFromLocalStorage } from '../usersApi';
import { finPlanTransactionsUrl } from '../../../constants/ApiUrls';

/*-----------------------------------
  CREATE FIN PLAN QUESTIONS REQUEST
-------------------------------------*/

export async function createFinPlanTransactionsRequest(transactions, finPlanId) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${finPlanTransactionsUrl(finPlanId)}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({ transactions })
  });
}
