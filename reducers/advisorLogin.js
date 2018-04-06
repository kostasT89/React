/* eslint no-unused-vars:0 */
import {
  CHANGE_ADVISOR_LOGIN_FORM,
  CLEAR_ADVISOR_LOGIN_MESSAGE,
  DISPLAY_ADVISOR_LOGIN_ERROR,
  SENDING_ADVISOR_LOGIN_REQUEST,
} from '../constants/AppConstants';

const initialState = {
  formState: {
    email: '',
    password: ''
  },
  errorMessage: '',
  loginAttempts: 0,
  currentlySending: false,
};

const actionMappings = {
  [CHANGE_ADVISOR_LOGIN_FORM]: '_changeForm',
  [DISPLAY_ADVISOR_LOGIN_ERROR]: '_displayLoginError',
  [CLEAR_ADVISOR_LOGIN_MESSAGE]: '_clearLoginMessage',
  [SENDING_ADVISOR_LOGIN_REQUEST]: '_sendingLoginRequest',
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

  _displayLoginError(state, { errorMessage }) {
    return {
      ...state,
      errorMessage,
      loginAttempts: state.loginAttempts + 1
    };
  },

  _sendingLoginRequest(state) {
    return {
      ...state,
      currentlySending: !state.currentlySending
    };
  },
};

const advisorLogin = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default advisorLogin;
