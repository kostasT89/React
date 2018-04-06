import fetch from 'isomorphic-fetch';
import { createHeadersForJSONContent } from '../utils/fetchUtils';
import { getUserDataFromLocalStorage } from './global/usersApi';
import { storeCallInformationUrl } from '../constants/ApiUrls';

export async function storeCallInformationRequest({
  age,
  gender,
  maritalStatus,
  childrenCount,
  hasSubmitedTaxReturnsInLastTwoYears,
  coClient,
  income,
  debt,
  objective,
  experience,
  gavePermissionToViewFinData,
  savings,
  retirement,
  creditCardDebt,
  studentLoanDebt }) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${storeCallInformationUrl}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({
      age,
      gender,
      maritalStatus,
      childrenCount,
      hasSubmitedTaxReturnsInLastTwoYears,
      coClient,
      income,
      debt,
      objective,
      experience,
      gavePermissionToViewFinData,
      savings,
      retirement,
      creditCardDebt,
      studentLoanDebt
    })
  });
}
