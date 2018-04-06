import {
        TOGGLE_ACCOUNT_OPTIONS_MENU_SUCCESS
      } from '../constants/AppConstants';

function _toggleShowAccountOptionsMenuSuccess(showAccountOptionsMenu) {
  return {
    type: TOGGLE_ACCOUNT_OPTIONS_MENU_SUCCESS,
    showAccountOptionsMenu
  };
}

function _toggleShowAccountOptionsMenuFailure(err) {
  return {
    type: 'TOGGLE_ACCOUNT_OPTIONS_MENU_FAIL',
    err
  };
}

export const toggleShowAccountOptionsMenu = showAccountOptionsMenu => async (dispatch) => {
  try {
    const showAccountOptionsMenuUpdated = !showAccountOptionsMenu;

    dispatch(_toggleShowAccountOptionsMenuSuccess(showAccountOptionsMenuUpdated));
  }
  catch (err) {
    dispatch(_toggleShowAccountOptionsMenuFailure(err));
  }
};
