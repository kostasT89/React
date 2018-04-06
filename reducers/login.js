/* eslint no-unused-vars:0 */
import {
  CHANGE_LOGIN_FORM,
  CLEAR_LOGIN_MESSAGE,
  DISPLAY_LOGIN_ERROR,
  SENDING_LOGIN_REQUEST,
  PASSWORD_RESET_MESSAGE,
  TOGGLE_FORGOT_PASSWORD,
  LOGIN_RECAPTCHA_LOADED,
  LOGIN_RECAPTCHA_ACCEPTED
} from '../constants/AppConstants';

const initialState = {
  formState: {
    email: '',
    password: ''
  },
  errorMessage: '',
  loginAttempts: 0,
  recaptchaLoaded: false,
  currentlySending: false,
  recaptchaAccepted: false,
  gRecaptchaResponse: '',
  showForgotPasswordForm: false,
  resetPasswordMessage: '',
  resetPasswordMessageType: ''
};

const actionMappings = {
  [CHANGE_LOGIN_FORM]: '_changeForm',
  [DISPLAY_LOGIN_ERROR]: '_displayLoginError',
  [CLEAR_LOGIN_MESSAGE]: '_clearLoginMessage',
  [SENDING_LOGIN_REQUEST]: '_sendingLoginRequest',
  [PASSWORD_RESET_MESSAGE]: '_passwordResetMessage',
  [TOGGLE_FORGOT_PASSWORD]: '_toggleForgotPassword',
  [LOGIN_RECAPTCHA_LOADED]: '_recaptchaLoaded',
  [LOGIN_RECAPTCHA_ACCEPTED]: '_recaptchaAccepted'
};

const reducer = {
  _changeForm(state, action) {
    return {
      ...state,
      formState: action.newState
    };
  },

  _clearLoginMessage(state, action) {
    return {
      ...state,
      errorMessage: '',
      successMessage: ''
    };
  },

  _displayLoginError(state, action) {
    return {
      ...state,
      errorMessage: action.message,
      loginAttempts: state.loginAttempts + 1
    };
  },

  _recaptchaLoaded(state) {
    return {
      ...state,
      recaptchaLoaded: true,
    };
  },

  _recaptchaAccepted(state, { gRecaptchaResponse }) {
    return {
      ...state,
      gRecaptchaResponse,
      recaptchaAccepted: true
    };
  },

  _sendingLoginRequest(state) {
    return {
      ...state,
      currentlySending: !state.currentlySending
    };
  },

  _passwordResetMessage(state, { resetPasswordMessage, resetPasswordMessageType }) {
    return {
      ...state,
      resetPasswordMessage,
      resetPasswordMessageType
    };
  },

  _toggleForgotPassword(state) {
    return {
      ...state,
      recaptchaLoaded: false,
      recaptchaAccepted: false,
      showForgotPasswordForm: !state.showForgotPasswordForm
    };
  }
};

const login = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default login;
