import {
  RESET_PASSWORD_ERROR,
  CHANGE_RESET_PASSWORD_FORM,
  SENDING_RESET_PASSWORD_REQUEST,
  TOGGLE_PASSWORD_RESET_SUCCESS_MESSAGE
} from '../constants/AppConstants';

import setNewPassword from '../api/resetPasswordApi';

export function errorMessage(error) {
  return {
    type: RESET_PASSWORD_ERROR,
    error
  };
}

export function changeResetPasswordForm(newState) {
  return {
    type: CHANGE_RESET_PASSWORD_FORM,
    newState
  };
}

export function toggleSuccessMessage() {
  return {
    type: TOGGLE_PASSWORD_RESET_SUCCESS_MESSAGE
  };
}

function _sendingResetPasswordRequest() {
  return {
    type: SENDING_RESET_PASSWORD_REQUEST
  };
}

export const updatePassword = (newPassword, resetPasswordToken) => async (dispatch) => { // eslint-disable-line
  try {
    dispatch(errorMessage(''));
    dispatch(_sendingResetPasswordRequest());
    const response = await setNewPassword({ newPassword, resetPasswordToken });

    const json = await response.json();

    if (response.ok) {
      dispatch(toggleSuccessMessage());
    }
    else {
      dispatch(errorMessage(json.message));
    }

    dispatch(_sendingResetPasswordRequest());
  }
  catch (err) { // eslint-disable-line
   dispatch(_sendingResetPasswordRequest());
  }
};
