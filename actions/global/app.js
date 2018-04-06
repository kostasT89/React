import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import { updateUserData } from './users';
import logout from '../../utils/logoutUtils';
import { handleErrors } from '../../utils/fetchUtils';
import { fetchAppDataRequest } from '../../api/appApi';
import userAbleToViewRoute from '../../utils/permissionUtils';

import { forwardToDashboard } from '../../utils/navigationUtils';

import {
         getFisecalUser,
         getFisecalApiUrl,
         getCoBrowsingToken
       } from '../../utils/localStorageUtils';

import {
  CO_BROWSING_ENABLED,
  RECEIVE_APP_API_URL,
  APP_DATA_HAS_BEEN_UPDATED,
} from '../../constants/AppConstants';


export function coBrowsingEnabled() {
  return {
    type: CO_BROWSING_ENABLED,
  };
}

export function appDataHasBeenUpdated() {
  return {
    type: APP_DATA_HAS_BEEN_UPDATED,
  };
}

export function receiveAppApiUrl(data) {
  return {
    type: RECEIVE_APP_API_URL,
    data,
  };
}

export const checkForCoBrowsingToken = () => async (dispatch) => { // eslint-disable-line
  try {
    const token = await getCoBrowsingToken();
    if (token) {
      dispatch(coBrowsingEnabled());
    }
  }
  catch (err) { // eslint-disable-line
    // NOTE: If there is no token found this will just throw a silent error
  }
};

export const getAppData = () => async (dispatch) => { // eslint-disable-line
  try {
    const response = await fetchAppDataRequest();
    const data = await getFisecalApiUrl();

    handleErrors(response);
    const json = await response.json();

    const user = get(json, 'userData.user');
    dispatch(receiveAppApiUrl(data));
    dispatch(updateUserData(user));
  }
  catch (err) {
    logout();
  }
};

export const checkUserAbilityToViewPage = pathname => async () => {
  try {
    const userData = await getFisecalUser();

    if (isEmpty(userData)) {
      throw Error('User data missing, initiating logout');
    }
    const visiblePages = userData.visiblePages ?
                         userData.visiblePages.map(page => page.route) :
                         [];

    if (!userAbleToViewRoute(visiblePages, pathname)) {
      forwardToDashboard();
    }
  }
  catch (err) {
    logout();
  }
};
