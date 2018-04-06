import get from 'lodash/get';

import {
        updateLocalAccount,
        deleteProvider
       } from '../api/global/settingsApi';

import {
        fetchStripePaymentInformation,
        retrieveStripeSubscriptionDetails,
        cancelSubscription
      } from '../api/global/stripeApi';
import { getEnabledAccounts } from './global/accounts';
import { getUserDataFromLocalStorage } from '../api/global/usersApi';

import {
        upsertFieldsetRequest,
        getFieldsetsRequest
      } from '../api/global/transactionFieldsetsApi';

import {
          TOGGLE_ACCOUNT_SUCCESS,
          TOGGLE_ACCOUNT_FAIL,
          UPDATE_ACCOUNT_SUCCESS,
          UPDATE_ACCOUNT_FAIL,
          GET_STRIPE_INFO_SUCCESS,
          GET_STRIPE_INFO_FAIL,
          GET_EDITABLE_FIELDSETS_SUCCESS,
          GET_EDITABLE_FIELDSETS_FAIL,
          UPDATE_EDITABLE_FIELDSET_SUCCESS,
          UPDATE_EDITABLE_FIELDSET_FAIL,
          GET_STRIPE_SUBSCRIPTION_INFO_SUCCESS,
          GET_STRIPE_SUBSCRIPTION_INFO_FAIL,
          CANCEL_STRIPE_SUBSCRIPTION_SUCCESS,
          CANCEL_STRIPE_SUBSCRIPTION_FAIL,
          SET_PREFERENCES_SUBMISSION_ERROR,
          TOGGLE_SHOW_SETTINGS_CO_CLIENT_FIELDS,
          CHANGE_SETTINGS_NUMBER_OF_CHILDREN,
          SET_USER_DATA_UPDATED_STATUS,
          CHANGE_SETTNGS_FORM_FIELD_TYPE,
          TOGGLE_SETTINGS_ADVISOR_CALL_INFORMATION
        } from '../constants/AppConstants';

export function toggleAdvisorCallInformation() {
  return {
    type: TOGGLE_SETTINGS_ADVISOR_CALL_INFORMATION,
  };
}

export function changeFormFieldType(fieldName) {
  return {
    type: CHANGE_SETTNGS_FORM_FIELD_TYPE,
    fieldName,
  };
}

export function changeNumberOfChildren(numberOfChildren) {
  return {
    type: CHANGE_SETTINGS_NUMBER_OF_CHILDREN,
    numberOfChildren,
  };
}

function _toggleAccountStateSuccess(account, toggleStates) {
  return {
    type: TOGGLE_ACCOUNT_SUCCESS,
    account,
    toggleStates
  };
}

function _toggleAccountStateFail(err) {
  return {
    type: TOGGLE_ACCOUNT_FAIL,
    err
  };
}

function _updateAccountSuccess(toggleStates, account) {
  return {
    type: UPDATE_ACCOUNT_SUCCESS,
    toggleStates,
    ...account
  };
}

function _updatedAccountFail(err) {
  return {
    type: UPDATE_ACCOUNT_FAIL,
    err
  };
}

function _getStripeInfoSuccess(paymentInfo) {
  return {
    type: GET_STRIPE_INFO_SUCCESS,
    ...paymentInfo
  };
}

function _getStripeInfoFail(err) {
  return {
    type: GET_STRIPE_INFO_FAIL,
    err
  };
}

export function toggleCoClientFields() {
  return {
    type: TOGGLE_SHOW_SETTINGS_CO_CLIENT_FIELDS
  };
}

export function setPreferencesSubmissionError(submissionError) {
  return {
    type: SET_PREFERENCES_SUBMISSION_ERROR,
    submissionError
  };
}

function _getEditableFieldSetsSuccess(fieldsets) {
  return {
    type: GET_EDITABLE_FIELDSETS_SUCCESS,
    fieldsets
  };
}

function _getEditableFieldSetsFail(err) {
  return {
    type: GET_EDITABLE_FIELDSETS_FAIL,
    err
  };
}

function _updateFieldSetSuccess(isUpdated) {
  return {
    type: UPDATE_EDITABLE_FIELDSET_SUCCESS,
    isUpdated
  };
}

function _updateFieldSetFail(err) {
  return {
    type: UPDATE_EDITABLE_FIELDSET_FAIL,
    err
  };
}

function _getStripeSubscriptionInfoSuccess(stripeSubscriptionInfo) {
  return {
    type: GET_STRIPE_SUBSCRIPTION_INFO_SUCCESS,
    ...stripeSubscriptionInfo
  };
}

function _getStripeSubscriptionInfoFail(err) {
  return {
    type: GET_STRIPE_SUBSCRIPTION_INFO_FAIL,
    err
  };
}

function _cancelStripeSubscriptionSuccess() {
  return {
    type: CANCEL_STRIPE_SUBSCRIPTION_SUCCESS
  };
}

function _cancelStripeSubscriptionFail(err) {
  return {
    type: CANCEL_STRIPE_SUBSCRIPTION_FAIL,
    err
  };
}

export function setUserDataUpdatedStatus({ userUpdated }) {
  return {
    type: SET_USER_DATA_UPDATED_STATUS,
    userUpdated
  };
}

export const toggleAccountState = (accountToUpdate, toggleStates) => async (dispatch) => {
  try {
    // Duplicate account object and make changes - as to not alter state
    const accountObjectDup = Object.assign({}, accountToUpdate);
    accountObjectDup.isAccountDisabled = toggleStates[accountToUpdate.yodleeId];
    dispatch(_toggleAccountStateSuccess(accountObjectDup, toggleStates));
  }
  catch (err) {
    dispatch(_toggleAccountStateFail(err));
  }
};

export const updateAccount = (accountToUpdate, toggleStates) => async (dispatch) => {
  try {
    // Duplicate account object and make changes - as to not alter state
    const accountObjectDup = Object.assign({}, accountToUpdate);
    accountObjectDup.isAccountDisabled = toggleStates[accountToUpdate.yodleeId];
    const updatedAccount = await updateLocalAccount(accountObjectDup);

    await getUserDataFromLocalStorage();

    dispatch(_updateAccountSuccess(toggleStates, updatedAccount));
  }
  catch (err) {
    dispatch(_updatedAccountFail(err));
  }
};

export const getStripePaymentInfo = () => async (dispatch) => {
  try {
    const stripePaymentInfo = await fetchStripePaymentInformation();

    dispatch(_getStripeInfoSuccess(stripePaymentInfo));
  }
  catch (err) {
    dispatch(_getStripeInfoFail(err));
  }
};

export const getEditableFieldSets = () => async (dispatch) => {
  try {
    const response = await getFieldsetsRequest();

    const json = await response.json();

    const fieldsets = get(json, 'fieldsetsData.fieldsets');
    dispatch(_getEditableFieldSetsSuccess(fieldsets));
  }
  catch (err) {
    dispatch(_getEditableFieldSetsFail(err));
  }
};

export const updateFieldSet = data => async (dispatch) => {
  try {
    const response = await upsertFieldsetRequest(data);

    const json = await response.json();

    dispatch(_updateFieldSetSuccess(json));
  }
  catch (err) {
    dispatch(_updateFieldSetFail(err));
  }
};

export const getStripeSubscriptionInfo = () => async (dispatch) => {
  try {
    const response = await retrieveStripeSubscriptionDetails();

    dispatch(_getStripeSubscriptionInfoSuccess(response));
  }
  catch (err) {
    dispatch(_getStripeSubscriptionInfoFail(err));
  }
};

export const cancelStripeSubscription = () => async (dispatch) => {
  try {
    await cancelSubscription();

    dispatch(_cancelStripeSubscriptionSuccess());
  }
  catch (err) {
    dispatch(_cancelStripeSubscriptionFail(err));
  }
};

export const deleteProviderAccount = providerAccountId => async (dispatch) => {
  try {
    await deleteProvider(providerAccountId);
    // Below getEnabledAccounts handles the dispatch callback
    dispatch(getEnabledAccounts());
  }
  catch (err) { /* TODO */ } // eslint-disable-line
};
