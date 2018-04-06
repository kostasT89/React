import fetch from 'isomorphic-fetch';
// Local Deps
import { createHeadersForJSONContent } from '../../../utils/fetchUtils';
import { getUserDataFromLocalStorage } from '../usersApi';
import {
        finPlanBreadcrumbUrl,
        finPlanBreadcrumbsUrl
      } from '../../../constants/ApiUrls';

/*-----------------------------------
  UPDATE FIN PLAN BREADCRUMB REQUEST
-------------------------------------*/
export async function updateFinPlanBreadcrumbRequest(breadcrumb, finPlanId) {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${finPlanBreadcrumbUrl(finPlanId, breadcrumb.id)}`, {
    method: 'PUT',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({ breadcrumb })
  });
}
/*-----------------------------------
  GET FIN PLAN BREADCRUMBS REQUEST
-------------------------------------*/
export async function getFinPlanBreadcrumbsRequest(finPlanId) {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${finPlanBreadcrumbsUrl(finPlanId)}`, {
    method: 'GET',
    headers: createHeadersForJSONContent(data.token)
  });
}
