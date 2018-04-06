import { handleErrors } from '../utils/fetchUtils';
import { forwardToAdvisorDashboard } from '../utils/navigationUtils';
import {
         setFisecalUser,
         setFisecalToken,
       } from '../utils/localStorageUtils';
import {
        CHANGE_ADVISOR_LOGIN_FORM,
        CLEAR_ADVISOR_LOGIN_MESSAGE,
        DISPLAY_ADVISOR_LOGIN_ERROR,
        SENDING_ADVISOR_LOGIN_REQUEST,
} from '../constants/AppConstants';

import attemptLoginRequest from '../api/advisorLoginApi';

function _sendingLoginRequest() {
  return {
    type: SENDING_ADVISOR_LOGIN_REQUEST
  };
}

function _displayError(errorMessage) {
  return {
    type: DISPLAY_ADVISOR_LOGIN_ERROR,
    errorMessage
  };
}

export function clearLoginMessage() {
  return {
    type: CLEAR_ADVISOR_LOGIN_MESSAGE
  };
}

export function changeForm(newState) {
  return {
    type: CHANGE_ADVISOR_LOGIN_FORM,
    newState
  };
}

export const login = (email, password) => async (dispatch) => { // eslint-disable-line
  try {
    dispatch(clearLoginMessage());
    dispatch(_sendingLoginRequest());

    const response = await attemptLoginRequest({ email, password });

    handleErrors(response, true);
    const json = await response.json();

    await setFisecalToken(json.token);

    await setFisecalUser(json.user);

    // Manage UI
    dispatch(_sendingLoginRequest());
    dispatch(changeForm({ email: '', password: '' }));

    forwardToAdvisorDashboard();
  }
  catch (err) {
   dispatch(_sendingLoginRequest());
   dispatch(_displayError('Invalid Email/Password'));
  }
};
