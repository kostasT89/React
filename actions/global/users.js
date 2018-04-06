import isEmpty from 'lodash/isEmpty';
import logout from '../../utils/logoutUtils';

import { setUserDataUpdatedStatus } from '../settings';

import {
        getFisecalUser,
        setFisecalUser
       } from '../../utils/localStorageUtils';

import {
        updateUserDataInLocalStorage,
        getUserDataFromLocalStorageError
} from '../../constants/Errors';

import {
        verifyPassword,
        persistUserData,
        persistUserCurrentStatus
} from '../../api/global/usersApi';

import {
  GET_USER_SUCCESS,
  SET_PASSWORD_VERIFICATION_STATUS,
  TOGGLE_PASSWORD_VERIFICATION_IN_PROGRESS
} from '../../constants/AppConstants';

/*--------------------------------------------------
  GET USER DATA (FROM LOCAL STORAGE)
---------------------------------------------------*/
export function getUserDataSuccess(userData) {
  return {
    type: GET_USER_SUCCESS,
    userData
  };
}

export const getUserData = () => async (dispatch) => { // eslint-disable-line
  try {
    const userData = await getFisecalUser(); // eslint-disable-line no-undef

    if (isEmpty(userData)) {
      throw Error(getUserDataFromLocalStorageError);
    }
    dispatch(getUserDataSuccess(userData));
  }
  catch (err) {
    logout();
  }
};

// NOTE: This method only updates user data in local storage
export const updateUserData = (attrs) => async (dispatch) => { // eslint-disable-line
  try {
    const userData = await getFisecalUser(); // eslint-disable-line no-undef
    if (isEmpty(userData)) {
      throw Error(updateUserDataInLocalStorage);
    }
    // Create new user data
    const newUserData = {
      ...userData,
      ...attrs
    };

    // Update local storage
    setFisecalUser(newUserData);
  }
  catch (err) { //eslint-disable-line
    logout();
  }
};

export const saveUserData = (userId, userData) => async (dispatch) => { // eslint-disable-line
  try {
    dispatch(setUserDataUpdatedStatus({ userUpdated: false }));

    await persistUserData(userId, userData);

    await dispatch(updateUserData(userData));

    await dispatch(getUserData());

    dispatch(setUserDataUpdatedStatus({ userUpdated: true }));
  }
  catch (err) { //eslint-disable-line
    logout();
  }
};

export const updateUserCurrentStatus = (userId, currentStatus) => async (dispatch) => { // eslint-disable-line
  try {
    await persistUserCurrentStatus(userId, currentStatus);
  }
  catch (err) { //eslint-disable-line
    logout();
  }
};

/*--------------------------------------------------
  VERIFY USER PASSWORD AGAINST DB
---------------------------------------------------*/

function _setPasswordValidationStatus(hasPasswordVerificationError) {
  return {
    type: SET_PASSWORD_VERIFICATION_STATUS,
    hasPasswordVerificationError
  };
}

function _togglePasswordVerificationInProgress() {
  return {
    type: TOGGLE_PASSWORD_VERIFICATION_IN_PROGRESS,
  };
}

export const verifyUserPassword = password => async (dispatch) => {
  try {
    dispatch(_togglePasswordVerificationInProgress());

    const response = await verifyPassword(password);

    dispatch(_togglePasswordVerificationInProgress());
    dispatch(_setPasswordValidationStatus(!response.isVerified));
  }
  catch (err) { // eslint-disable-line
    logout();
    dispatch(_togglePasswordVerificationInProgress());
  }
};
