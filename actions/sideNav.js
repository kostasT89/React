// Global Deps
import {
        SIGNAL_ACCOUNTS_RENDERED,
        UPDATE_SIDE_NAV_DATA
      } from '../constants/AppConstants';


/*-----------------------------------
  SIGNAL ACCOUNTS RENDERED
-------------------------------------*/

export function signalAccountsRendered() {
  return {
    type: SIGNAL_ACCOUNTS_RENDERED
  };
}

export function updateSideNavData() {
  return {
    type: UPDATE_SIDE_NAV_DATA
  };
}
