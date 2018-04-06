import tap from 'lodash/tap';
import some from 'lodash/some';
import range from 'lodash/range';

import cms from '../config/messages';
import { parseCurrency } from './parsingUtils';
import { setFisecalUser } from './localStorageUtils';

import {
         convertDateToDbFormat,
         formatDateInputForDisplay
       } from './dateUtils';

export function updateConnectedAccounts(enabledAccounts, account, toggleStates) {
  const updatedConnectedAccounts = {};
  const { yodleeId, isAccountDisabled } = account;
  const accountDup = Object.assign({}, account);

  /* eslint no-unused-vars: 1, max-len: 1 */
  for (const [key, value] of Object.entries(enabledAccounts)) {
    if (value.yodleeId === yodleeId) {
      updatedConnectedAccounts[value.yodleeId] = isAccountDisabled;
    }
    else {
      updatedConnectedAccounts[value.yodleeId] = toggleStates[value.yodleeId];
    }
  }
  /* eslint no-unused-vars: 0, max-len: 0 */

  accountDup.connectedAccounts = updatedConnectedAccounts;

  setFisecalUser(accountDup);
  return accountDup;
}

export const hasAnyCoClientValues = ({ firstName, lastName, birthdate, gender }) =>
  some([firstName, lastName, birthdate, gender]);

const createCoClientRepresentation = ({
  firstName,
  lastName,
  birthdate,
  gender
}) => ({
  firstNameCoClient: firstName,
  lastNameCoClient: lastName,
  birthdateCoClient: birthdate ? formatDateInputForDisplay(birthdate) : null,
  genderCoClient: gender
});

export const createChildrenData = children =>
  tap({}, blankObj => children.map((child, idx) => { blankObj[`child${idx}`] = child; })); // eslint-disable-line

export const createUserRepresentation = ({
  firstName,
  lastName,
  birthdate,
  gender,
  coClient,
  phone,
  state,
  zipCode,
  hasSubmitedTaxReturnsInLastTwoYears,
  maritalStatus,
  income,
  debt,
  objective,
  experience,
  children = []
}) => {
  let updatedHasSubmittedTaxes = null;
  if (hasSubmitedTaxReturnsInLastTwoYears === true) {
    updatedHasSubmittedTaxes = cms.yes;
  }
  else if (hasSubmitedTaxReturnsInLastTwoYears === false) {
    updatedHasSubmittedTaxes = cms.no;
  }
  return {
    firstName,
    lastName,
    birthdate: birthdate ? formatDateInputForDisplay(birthdate) : null,
    gender,
    ...createCoClientRepresentation(coClient || {}),
    phone,
    state,
    zipCode,
    ...createChildrenData(children),
    hasSubmitedTaxReturnsInLastTwoYears: updatedHasSubmittedTaxes,
    maritalStatus,
    numberOfChildren: `${children.length}`,
    income,
    debt,
    objective,
    experience,
    children
  };
};

const createCoClientRepresentationForSave = ({
  firstNameCoClient,
  lastNameCoClient,
  birthdateCoClient,
  genderCoClient }) => ({
  firstName: firstNameCoClient,
  lastName: lastNameCoClient,
  birthdate: birthdateCoClient ? convertDateToDbFormat(birthdateCoClient) : null,
  gender: genderCoClient
});

const createChildrenDataForSave = formValues =>
  range(0, formValues.numberOfChildren).map(num => ({ ...formValues[`child${num}`] }));

export const createUserRepresentationForSave = (formValues, hasCoClient, passwordData) => {
  const {
    firstName,
    lastName,
    birthdate,
    gender,
    phone,
    state,
    zipCode,
    hasSubmitedTaxReturnsInLastTwoYears,
    maritalStatus,
    income,
    debt,
    objective,
    experience,
  } = formValues;

  return ({
    firstName,
    lastName,
    birthdate: birthdate ? convertDateToDbFormat(birthdate) : null,
    gender,
    coClient: hasCoClient ? createCoClientRepresentationForSave(formValues) : {},
    children: createChildrenDataForSave(formValues),
    phone,
    state,
    zipCode,
    hasSubmitedTaxReturnsInLastTwoYears: hasSubmitedTaxReturnsInLastTwoYears === cms.yes,
    maritalStatus,
    income: parseCurrency(income),
    debt: parseCurrency(debt),
    objective,
    experience,
    ...passwordData
  });
};

export const loadAccountsIfNeededToggleStates = (toggleStates, accountsData) => {
  const updatedToggleStates = { ...toggleStates };
  for (const value of accountsData) {
    // Load initial values of toggles after fetching accountData
    if (value.data[0]) {
      value.data.forEach((acc) => {
        if (toggleStates[acc.yodleeId] === false) {
          updatedToggleStates[acc.yodleeId] = toggleStates[acc.yodleeId];
        }
        else {
          updatedToggleStates[acc.yodleeId] = !acc.isAccountDisabled;
        }
      });
    }
  }
  return updatedToggleStates;
};
