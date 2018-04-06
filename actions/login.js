import cms from '../config/messages';
import { getUserData } from './global/users';
import { refreshTransactions } from './global/refresh';
import { handleErrors } from '../utils/fetchUtils';
import { forwardToDashboard } from '../utils/navigationUtils';
import { getTodayUtcAndFormat } from '../utils/dateUtils';
import { calculateRefreshStartDate } from '../utils/refreshUtils';
import {
         setFisecalUser,
         setFisecalToken,
         queryAndSetFisecalAccounts
       } from '../utils/localStorageUtils';
import {
  ERROR,
  SUCCESS,
  CHANGE_LOGIN_FORM,
  CLEAR_LOGIN_MESSAGE,
  DISPLAY_LOGIN_ERROR,
  SENDING_LOGIN_REQUEST,
  TOGGLE_FORGOT_PASSWORD,
  LOGIN_RECAPTCHA_LOADED,
  PASSWORD_RESET_MESSAGE,
  LOGIN_RECAPTCHA_ACCEPTED,
} from '../constants/AppConstants';

import {
  resetPassword,
  attemptLoginRequest
} from '../api/loginApi';

export function sendingLoginRequest() {
  return {
    type: SENDING_LOGIN_REQUEST
  };
}

function _displayError(message) {
  return {
    type: DISPLAY_LOGIN_ERROR,
    message
  };
}

export function clearLoginMessage() {
  return {
    type: CLEAR_LOGIN_MESSAGE
  };
}

export function changeForm(newState) {
  return {
    type: CHANGE_LOGIN_FORM,
    newState
  };
}

export function toggleForgotPassword() {
  return {
    type: TOGGLE_FORGOT_PASSWORD
  };
}

export function setLoginRecaptchaLoaded() {
  return {
    type: LOGIN_RECAPTCHA_LOADED
  };
}

export function loginRecaptchaAccepted(gRecaptchaResponse) {
  return {
    type: LOGIN_RECAPTCHA_ACCEPTED,
    gRecaptchaResponse
  };
}

export function passwordResetMessage(resetPasswordMessage, resetPasswordMessageType) {
  return {
    type: PASSWORD_RESET_MESSAGE,
    resetPasswordMessage,
    resetPasswordMessageType
  };
}

export const login = (email, password) => async (dispatch) => { // eslint-disable-line
  try {
    dispatch(clearLoginMessage());
    dispatch(sendingLoginRequest());

    const response = await attemptLoginRequest({ email, password });

    handleErrors(response, true);
    const json = await response.json();

    const { user, token } = json;
    const { lastYodleeUpdate } = user;

    // Update local storage:
    await setFisecalToken(token);

    await setFisecalUser(user);

    await queryAndSetFisecalAccounts();

    // Get user data from local storage and transmit to any listening pages/components.
    dispatch(getUserData(user));
    // Manage UI
    dispatch(sendingLoginRequest());
    dispatch(changeForm({
     email: '',
     password: ''
    }));
    // Refresh Data
    dispatch(refreshTransactions({
      dateStartUTC: calculateRefreshStartDate(lastYodleeUpdate),
      dateEndUTC: getTodayUtcAndFormat()
    }));

    forwardToDashboard();
  }
  catch (err) {
   dispatch(sendingLoginRequest());
   dispatch(_displayError('Invalid Email/Password'));
  }
};

export const sendPasswordResetEmail = (email, gRecaptchaResponse) => async (dispatch) => { // eslint-disable-line
  try {
    dispatch(sendingLoginRequest());
    const response = await resetPassword({ email, gRecaptchaResponse });

    handleErrors(response, true);

    dispatch(sendingLoginRequest());
    dispatch(toggleForgotPassword());
    dispatch(passwordResetMessage(cms['login.rest_password_success'](email), SUCCESS));
  }
  catch (err) { // eslint-disable-line
   dispatch(sendingLoginRequest());
   dispatch(toggleForgotPassword());
   dispatch(passwordResetMessage(cms['login.rest_password_error'], ERROR));
  }
};
