import {
          GET_ENABLED_ACCOUNTS_SUCCESS,
          UPDATE_ACCOUNT_SUCCESS
        } from '../constants/AppConstants';

const initialState = {
  sideNavData: {},
  financialData: {},
  updatedFinancialData: {},
  enabledAccounts: [],
  toggleStates: {},
  enabledYodleeAccounts: []
};

const actionMappings = {
  [GET_ENABLED_ACCOUNTS_SUCCESS]: '_receiveEnabledAccounts',
  [UPDATE_ACCOUNT_SUCCESS]: '_updateSideNavComponent',
};

const reducer = {
  _updateSideNavComponent(state, { toggleStates, account }) {
    return {
      ...state,
      toggleStates,
      updatedAccount: account
    };
  },
  _receiveEnabledAccounts(state, {
    enabledAccounts,
    enabledYodleeAccounts
  }) {
    return {
      ...state,
      enabledAccounts,
      enabledYodleeAccounts,
      hasFetchedEnabledAccounts: true
    };
  }
};

const sideNavReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default sideNavReducer;
