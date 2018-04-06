import fetch from 'isomorphic-fetch';
import { createHeadersForJSONContent } from '../../../utils/fetchUtils';
import { getUserDataFromLocalStorage } from '../usersApi';
import {
        finPlanPaymentUrl,
      } from '../../../constants/ApiUrls';

/*-----------------------------------
  CREATE FIN PLAN PAYMENT REQUEST
-------------------------------------*/
export async function createFinPlanPaymentRequest(paymentForm, finPlanId) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${finPlanPaymentUrl(finPlanId, finPlanPaymentUrl)}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify(paymentForm)
  });
}
