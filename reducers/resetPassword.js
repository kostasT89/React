import {
  RESET_PASSWORD_ERROR,
  CHANGE_RESET_PASSWORD_FORM,
  SENDING_RESET_PASSWORD_REQUEST,
  TOGGLE_PASSWORD_RESET_SUCCESS_MESSAGE
} from '../constants/AppConstants';

const initialState = {
  error: '',
  formState: {
    password: '',
    passwordConfirmation: '',
  },
  currentlySending: false,
  showSuccessMessage: false,
};

const actionMappings = {
  [RESET_PASSWORD_ERROR]: '_errorMessage',
  [CHANGE_RESET_PASSWORD_FORM]: '_changeForm',
  [SENDING_RESET_PASSWORD_REQUEST]: '_sendingSignupRequest',
  [TOGGLE_PASSWORD_RESET_SUCCESS_MESSAGE]: '_toggleSuccessMessage',
};

const reducer = {
  _errorMessage(state, { error }) {
    return {
      ...state,
      error
    };
  },

  _changeForm(state, { newState }) {
    return {
      ...state,
      formState: newState
    };
  },

  _sendingSignupRequest(state) {
    return {
      ...state,
      currentlySending: !state.currentlySending
    };
  },

  _toggleSuccessMessage(state) {
    return {
      ...state,
      showSuccessMessage: !state.showSuccessMessage
    };
  }
};

const resetPassword = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default resetPassword;
