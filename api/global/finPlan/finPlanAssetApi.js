import fetch from 'isomorphic-fetch';
import { createHeadersForJSONContent } from '../../../utils/fetchUtils';
import { getUserDataFromLocalStorage } from '../usersApi';
import {
        finPlanAssetUrl,
        finPlanAssetsUrl,
        additionalAssetsUrl,
        additionalAssetUrl,
      } from '../../../constants/ApiUrls';

/*-----------------------------------
  CREATE FIN PLAN ASSET REQUEST
-------------------------------------*/
export async function createFinPlanAssetRequest(asset, finPlanId) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${finPlanAssetsUrl(finPlanId)}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({ asset })
  });
}

/*-----------------------------------
  UPDATE FIN PLAN ASSET REQUEST
-------------------------------------*/
export async function updateFinPlanAssetRequest(asset, finPlanId) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${finPlanAssetUrl(finPlanId, asset.id)}`, {
    method: 'PUT',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({ asset })
  });
}

/*-----------------------------------
  DELETE FIN PLAN ASSET REQUEST
-------------------------------------*/
export async function deleteFinPlanAssetRequest(id, finPlanId) {
  const data = await getUserDataFromLocalStorage();
  return fetch(`${data.apiUrl}${finPlanAssetUrl(finPlanId, id)}`, {
    method: 'DELETE',
    headers: createHeadersForJSONContent(data.token)
  });
}

/*-----------------------------------
  GET ADDITIONAL ASSETS REQUEST
-------------------------------------*/
export async function getAdditionalAssetsRequest() {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${additionalAssetsUrl(data.user.id)}`, {
    method: 'GET',
    headers: createHeadersForJSONContent(data.token)
  });
}

/*-----------------------------------
  CREATE ADDITIONAL ASSET REQUEST
-------------------------------------*/
export async function createAdditionalAssetRequest(additionalAsset) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${additionalAssetsUrl(data.user.id)}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({ additionalAsset })
  });
}

/*-----------------------------------
  UPDATE ADDITIONAL ASSET REQUEST
-------------------------------------*/
export async function updateAdditionalAssetRequest(id, additionalAsset) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${additionalAssetUrl(data.user.id, id)}`, {
    method: 'PUT',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({ additionalAsset })
  });
}

/*-----------------------------------
  DELETE ADDITIONAL ASSET REQUEST
-------------------------------------*/
export async function deleteAdditionalAssetRequest(id) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${additionalAssetUrl(data.user.id, id)}`, {
    method: 'DELETE',
    headers: createHeadersForJSONContent(data.token)
  });
}
