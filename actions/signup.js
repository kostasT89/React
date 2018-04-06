import cms from '../config/messages';

import { handleErrors } from '../utils/fetchUtils';
import { sendingLoginRequest } from './login';

import {
  ERROR,
  SUCCESS,
  TOGGLE_TOC,
  SIGNUP_MESSAGE,
  CHANGE_SIGNUP_FORM,
  SENDING_SIGNUP_REQUEST,
  SIGNUP_RECAPTCHA_LOADED,
  SIGNUP_RECAPTCHA_ACCEPTED,
} from '../constants/AppConstants';

import {
  verifyAccount,
  attemptSignupRequest
} from '../api/signupApi';

export function changeSignupForm(newState) {
  return {
    type: CHANGE_SIGNUP_FORM,
    newState
  };
}

export function toggleTOC() {
  return {
    type: TOGGLE_TOC
  };
}

export function setSignupRecaptchaLoaded() {
  return {
    type: SIGNUP_RECAPTCHA_LOADED
  };
}

export function signupRecaptchaAccepted(gRecaptchaResponse) {
  return {
    type: SIGNUP_RECAPTCHA_ACCEPTED,
    gRecaptchaResponse
  };
}

function _sendingSignupRequest() {
  return {
    type: SENDING_SIGNUP_REQUEST
  };
}

export function setSignupMessage(signupMessage, singupMessageType) {
  return {
    type: SIGNUP_MESSAGE,
    signupMessage,
    singupMessageType
  };
}

export const signup = (signUpData) => async (dispatch) => { // eslint-disable-line
  try {
    dispatch(setSignupMessage('', ''));
    dispatch(_sendingSignupRequest());

    const response = await attemptSignupRequest(signUpData);
    handleErrors(response, true);

    dispatch(_sendingSignupRequest());
    dispatch(changeSignupForm({
     email: '',
     password: '',
     firstName: '',
    }));
    dispatch(setSignupMessage(cms['signup.signup_success_message'](signUpData.email), SUCCESS));
    dispatch(signupRecaptchaAccepted(''));
  }
  catch (err) { // eslint-disable-line
   dispatch(_sendingSignupRequest());
   dispatch(setSignupMessage(cms['signup.signup_error_message'], ERROR));
  }
};

export const verifyUserAccount = (accountConfirmationToken) => async (dispatch) => { // eslint-disable-line
  try {
    dispatch(sendingLoginRequest());
    dispatch(_sendingSignupRequest());

    const response = await verifyAccount(accountConfirmationToken);
    handleErrors(response, true);

    const json = await response.json();

    dispatch(sendingLoginRequest());
    dispatch(_sendingSignupRequest());

    dispatch(setSignupMessage(cms['signup.verification_success_message'](json.email), SUCCESS));
  }
  catch (err) { // eslint-disable-line
    dispatch(sendingLoginRequest());
    dispatch(_sendingSignupRequest());
  }
};
