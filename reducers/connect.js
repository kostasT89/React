import {
  YODLEE_GET_FASTLINK_DATA_SUCCESS,
  GET_USER_SUCCESS,
} from '../constants/AppConstants';

const initialState = {
  isLoading: true,
  userData: {},
  enabledAccounts: [],
};

const actionMappings = {
  [YODLEE_GET_FASTLINK_DATA_SUCCESS]: '_yodleeFastLinkAuthSuccess',
  [GET_USER_SUCCESS]: '_getUserSuccess',
};

const reducer = {
  _getUserSuccess(state, { userData }) {
    return {
      ...state,
      userData
    };
  },
  _yodleeFastLinkAuthSuccess(state, { url, rsession, token }) {
    return {
      ...state,
      fastLinkAuthData: {
        url,
        rsession,
        token
      }
    };
  }
};

const connectReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default connectReducer;
