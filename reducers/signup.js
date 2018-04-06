import {
  TOGGLE_TOC,
  SIGNUP_MESSAGE,
  CHANGE_SIGNUP_FORM,
  SENDING_SIGNUP_REQUEST,
  SIGNUP_RECAPTCHA_LOADED,
  SIGNUP_RECAPTCHA_ACCEPTED
} from '../constants/AppConstants';

const initialState = {
  formState: {
    email: '',
    password: '',
    firstName: ''
  },
  acceptedTOC: false,
  signupMessage: '',
  recaptchaLoaded: false,
  singupMessageType: '',
  gRecaptchaResponse: '',
  currentlySending: false,
  recaptchaAccepted: false,
};

const actionMappings = {
  [TOGGLE_TOC]: '_toggleTOC',
  [SIGNUP_MESSAGE]: '_signupMessage',
  [CHANGE_SIGNUP_FORM]: '_changeForm',
  [SENDING_SIGNUP_REQUEST]: '_sendingSignupRequest',
  [SIGNUP_RECAPTCHA_LOADED]: '_recaptchaLoaded',
  [SIGNUP_RECAPTCHA_ACCEPTED]: '_recaptchaAccepted'
};

const reducer = {
  _toggleTOC(state) {
    return {
      ...state,
      acceptedTOC: !state.acceptedTOC
    };
  },

  _signupMessage(state, { signupMessage, singupMessageType }) {
    return {
      ...state,
      signupMessage,
      singupMessageType
    };
  },

  _recaptchaLoaded(state) {
    return {
      ...state,
      recaptchaLoaded: true,
    };
  },

  _changeForm(state, action) {
    return {
      ...state,
      formState: action.newState
    };
  },

  _recaptchaAccepted(state, { gRecaptchaResponse }) {
    return {
      ...state,
      gRecaptchaResponse,
      recaptchaAccepted: true
    };
  },

  _sendingSignupRequest(state) {
    return {
      ...state,
      currentlySending: !state.currentlySending
    };
  }
};

const signup = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default signup;
