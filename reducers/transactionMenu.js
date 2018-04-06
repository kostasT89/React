import {
        TOGGLE_ACCOUNT_OPTIONS_MENU_SUCCESS,
        DISCONNECT_ACCOUNTS_SUCCESS,
        TOGGLE_ACCOUNT_SUCCESS,
        GET_ENABLED_ACCOUNTS_SUCCESS
      } from '../constants/AppConstants';

const initialState = {
  showAccountOptionsMenu: false,
  itemHasBeenUpdated: false,
  enabledAccounts: []
};

const actionMappings = {
  [TOGGLE_ACCOUNT_OPTIONS_MENU_SUCCESS]: '_toggleShowAccountOptionsMenu',
  [DISCONNECT_ACCOUNTS_SUCCESS]: '_reloadSideNavForwardHome',
  [TOGGLE_ACCOUNT_SUCCESS]: '_reloadSideNavForwardHome',
  [GET_ENABLED_ACCOUNTS_SUCCESS]: '_getAccounts'
};

const reducer = {
  _toggleShowAccountOptionsMenu(state, { showAccountOptionsMenu }) {
    return {
      ...state,
      showAccountOptionsMenu
    };
  },

  _reloadSideNavForwardHome(state) {
    return {
      ...state,
      itemHasBeenUpdated: true
    };
  },

  _getAccounts(state, { enabledAccounts, enabledYodleeAccounts }) {
    return {
      ...state,
      enabledAccounts,
      enabledYodleeAccounts
    };
  }
};

const transactionMenuReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default transactionMenuReducer;
