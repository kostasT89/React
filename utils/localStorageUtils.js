import get from 'lodash/get';
// Local Deps:
import localStorageVars from '../constants/enums/localStorageVars';
import { fetchAccountsRequest } from '../api/global/accountsApi';

const {
  fisecalUser,
  fisecalToken,
  fisecalUrl,
  fisecalApiUrl,
  fisecalAccounts,
  coBrowsingToken
} = localStorageVars;

/*-----------------------------------
  FISCAL USER
-------------------------------------*/
export function getFisecalUser() {
  return fisecalAppConfig.getItem(fisecalUser); // eslint-disable-line no-undef
}

export function setFisecalUser(user) {
  return fisecalAppConfig.setItem(fisecalUser, user); // eslint-disable-line no-undef
}

export function removeFisecalUser() {
  return fisecalAppConfig.removeItem(fisecalUser); // eslint-disable-line no-undef
}

/*-----------------------------------
  FISECAL TOKEN
-------------------------------------*/
export function getFisecalToken() {
  return fisecalAppConfig.getItem(fisecalToken); // eslint-disable-line no-undef
}

export function setFisecalToken(token) {
  return fisecalAppConfig.setItem(fisecalToken, token);  // eslint-disable-line no-undef
}

export function removeFisecalToken() {
  return fisecalAppConfig.removeItem(fisecalToken); // eslint-disable-line no-undef
}

/*-----------------------------------
  CO BROWSING TOKEN
-------------------------------------*/
export function getCoBrowsingToken() {
  return fisecalAppConfig.getItem(coBrowsingToken); // eslint-disable-line no-undef
}

export function setCoBrowsingToken(token) {
  return fisecalAppConfig.setItem(coBrowsingToken, token);  // eslint-disable-line no-undef
}

export function removeCoBrowsingToken() {
  return fisecalAppConfig.removeItem(coBrowsingToken); // eslint-disable-line no-undef
}

/*-----------------------------------
  FISECAL API URL
-------------------------------------*/
export function getFisecalApiUrl() {
  return fisecalAppConfig.getItem(fisecalApiUrl); // eslint-disable-line no-undef
}

export function setFisecalApiUrl(url) {
  return fisecalAppConfig.setItem(fisecalApiUrl, url); // eslint-disable-line no-undef
}

/*-----------------------------------
  FISECAL URL
-------------------------------------*/
export function getFisecalUrl() {
  return fisecalAppConfig.getItem(fisecalUrl); // eslint-disable-line no-undef
}

export function setFisecalUrl(url) {
  return fisecalAppConfig.setItem(fisecalUrl, url); // eslint-disable-line no-undef
}


/*-----------------------------------
  FISCAL ACCOUNTS
-------------------------------------*/
export function getFisecalAccounts() {
  return fisecalAppConfig.getItem(fisecalAccounts); // eslint-disable-line no-undef
}

export function setFisecalAccounts(accounts) {
  return fisecalAppConfig.setItem(fisecalAccounts, accounts); // eslint-disable-line no-undef
}

export function removeFisecalAccounts() {
  return fisecalAppConfig.removeItem(fisecalAccounts); // eslint-disable-line no-undef
}

export async function queryAndSetFisecalAccounts() {
  const response = await fetchAccountsRequest();

  const json = await response.json();

  const accounts = get(json, 'accountsData.accounts', []);
  setFisecalAccounts(accounts);
  return accounts;
}
