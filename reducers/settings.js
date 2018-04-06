import isEmpty from 'lodash/isEmpty';
import {
        hasAnyCoClientValues,
        createUserRepresentation
      } from '../utils/settingsUtils';
import {
  OTHER_PLEASE_TYPE,
  YODLEE_GET_ACCOUNT_SUCCESS,
  GET_ENABLED_ACCOUNTS_SUCCESS,
  TOGGLE_ACCOUNT_SUCCESS,
  GET_USER_SUCCESS,
  GET_STRIPE_INFO_SUCCESS,
  SET_PASSWORD_VERIFICATION_STATUS,
  GET_EDITABLE_FIELDSETS_SUCCESS,
  UPDATE_EDITABLE_FIELDSET_SUCCESS,
  GET_STRIPE_SUBSCRIPTION_INFO_SUCCESS,
  GET_STRIPE_SUBSCRIPTION_INFO_FAIL,
  CANCEL_STRIPE_SUBSCRIPTION_SUCCESS,
  SET_USER_DATA_UPDATED_STATUS,
  TOGGLE_SHOW_SETTINGS_CO_CLIENT_FIELDS,
  CHANGE_SETTINGS_NUMBER_OF_CHILDREN,
  SET_PREFERENCES_SUBMISSION_ERROR,
  TOGGLE_PASSWORD_VERIFICATION_IN_PROGRESS,
  CHANGE_SETTNGS_FORM_FIELD_TYPE,
  TOGGLE_SETTINGS_ADVISOR_CALL_INFORMATION,
  DELETE_PROVIDER_ACCOUNT_SUCCESS
} from '../constants/AppConstants';

const initialState = {
  userId: null,
  cardData: { brand: '', last4: '', exp_month: '', exp_year: '' },
  userData: {},
  stripeInfo: {},
  fieldTypes: {},
  sideNavData: {},
  userUpdated: false,
  toggleStates: {},
  isLoadingUser: true,
  submissionError: '',
  enabledAccounts: [],
  numberOfChildren: 0,
  isLoadingAccounts: true,
  isStripeSubCancelled: true,
  enabledYodleeAccounts: [],
  verificationInProgress: false,
  stripeSubscriptionName: null,
  stripeSubscriptionAmount: null,
  shouldShowCoClientFields: false,
  showAdvisorCallInformation: false,
  hasPasswordVerificationError: false,
};

const actionMappings = {
  [GET_USER_SUCCESS]: '_receiveUserData',
  [YODLEE_GET_ACCOUNT_SUCCESS]: '_getAccountSuccess',
  [GET_ENABLED_ACCOUNTS_SUCCESS]: '_getAccountsSuccess',
  [TOGGLE_ACCOUNT_SUCCESS]: '_toggleAccountState',
  [GET_STRIPE_INFO_SUCCESS]: '_getStripeInfoSuccess',
  [SET_PASSWORD_VERIFICATION_STATUS]: '_setPasswordVerificationnStatus',
  [TOGGLE_SHOW_SETTINGS_CO_CLIENT_FIELDS]: '_toggleCoClientFields',
  [GET_EDITABLE_FIELDSETS_SUCCESS]: '_getEditableFieldSets',
  [UPDATE_EDITABLE_FIELDSET_SUCCESS]: '_updateFieldSetSuccess',
  [GET_STRIPE_SUBSCRIPTION_INFO_SUCCESS]: '_getStripeSubscriptionSuccess',
  [GET_STRIPE_SUBSCRIPTION_INFO_FAIL]: '_getStripeSubscriptionFail',
  [CANCEL_STRIPE_SUBSCRIPTION_SUCCESS]: '_cancelStripeSubscriptionSuccess',
  [SET_USER_DATA_UPDATED_STATUS]: '_setUserDataUpdatedStatus',
  [CHANGE_SETTINGS_NUMBER_OF_CHILDREN]: '_changeNumberOfChildren',
  [SET_PREFERENCES_SUBMISSION_ERROR]: '_setPreferencesSubmissionError',
  [TOGGLE_PASSWORD_VERIFICATION_IN_PROGRESS]: '_toggleVerificationInProgress',
  [CHANGE_SETTNGS_FORM_FIELD_TYPE]: '_changeFormFieldType',
  [TOGGLE_SETTINGS_ADVISOR_CALL_INFORMATION]: '_toggleAdvisorCallInformation',
  [DELETE_PROVIDER_ACCOUNT_SUCCESS]: '_deleteProviderAccount'
};

const reducer = {
  _getAccountSuccess(state, { account }) {
    return {
      ...state,
      account,
      isLoadingAccounts: false
    };
  },

  _getAccountsSuccess(state, {
    enabledAccounts,
    enabledYodleeAccounts
  }) {
    return {
      ...state,
      enabledAccounts,
      enabledYodleeAccounts,
      isLoadingAccounts: false
    };
  },

  _toggleAccountState(state, { account, toggleStates }) {
    return {
      ...state,
      toggleStates: {
        ...toggleStates,
        [account.yodleeId]: !account.isAccountDisabled,
      }
    };
  },

  _changeFormFieldType(state, { fieldName }) {
    return {
      ...state,
      fieldTypes: {
        ...state.fieldTypes,
        [fieldName]: state.fieldTypes[fieldName] === OTHER_PLEASE_TYPE ? null : OTHER_PLEASE_TYPE
      }
    };
  },

  _receiveUserData(state, { userData, userData: { children = [], coClient } }) {
    return {
      ...state,
      userId: userData.id,
      userData: createUserRepresentation(userData),
      isLoadingUser: false,
      numberOfChildren: children.length,
      shouldShowCoClientFields: hasAnyCoClientValues(coClient)
    };
  },

  _getStripeInfoSuccess(state, { paymentInfo }) {
    return {
      ...state,
      stripeInfo: paymentInfo
    };
  },

  _setPasswordVerificationnStatus(state, { hasPasswordVerificationError }) {
    return {
      ...state,
      hasPasswordVerificationError
    };
  },

  _toggleCoClientFields(state) {
    return {
      ...state,
      shouldShowCoClientFields: !state.shouldShowCoClientFields
    };
  },

  _getEditableFieldSets(state, { fieldsets }) {
    return {
      ...state,
      editableFieldSets: fieldsets
    };
  },

  _updateFieldSetSuccess(state, { isUpdated }) {
    return {
      ...state,
      isUpdated
    };
  },

  _getStripeSubscriptionSuccess(state, { stripePlan }) {
    let stripePlanPaymentName = null;
    let stripePlanPaymentAmount = null;
    if (stripePlan && stripePlan.plan && stripePlan.plan.name && stripePlan.plan.amount !== null) {
      stripePlanPaymentName = stripePlan.plan.name;
      stripePlanPaymentAmount = stripePlan.plan.amount;
    }
    return {
      ...state,
      stripePlanPaymentName,
      stripePlanPaymentAmount,
      isStripeSubCancelled: isEmpty(stripePlan) && isEmpty(stripePlan.plan)
    };
  },

  _getStripeSubscriptionFail(state) {
    return {
      ...state,
      isStripeSubCancelled: true
    };
  },

  _cancelStripeSubscriptionSuccess(state) {
    return {
      ...state,
      isStripeSubCancelled: true,
      stripeInfo: {},
      stripeSubscriptionName: initialState.stripeSubscriptionName,
      stripeSubscriptionAmount: initialState.stripeSubscriptionAmount
    };
  },

  _setUserDataUpdatedStatus(state, { userUpdated }) {
    return {
      ...state,
      userUpdated
    };
  },

  _toggleAccountSuccess(state) {
    return {
      ...state
    };
  },

  _changeNumberOfChildren(state, { numberOfChildren }) {
    return {
      ...state,
      numberOfChildren
    };
  },

  _setPreferencesSubmissionError(state, { submissionError }) {
    return {
      ...state,
      submissionError
    };
  },

  _toggleVerificationInProgress(state) {
    return {
      ...state,
      verificationInProgress: !state.verificationInProgress
    };
  },

  _toggleAdvisorCallInformation(state) {
    return {
      ...state,
      showAdvisorCallInformation: !state.showAdvisorCallInformation
    };
  },

  _deleteProviderAccount(state) {
    return {
      ...state,
      isLoadingAccounts: false
    };
  }
};

const settingsReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default settingsReducer;
