import { GET_USER_SUCCESS } from '../constants/AppConstants';

const initialState = {
  user: { firstName: '' }
};

const actionMappings = {
  [GET_USER_SUCCESS]: '_getUserDataFromLocalStorageSuccess'
};

const reducer = {
  _getUserDataFromLocalStorageSuccess(state, action) {
    return {
      ...state,
      user: action.userData
    };
  }
};

const advisorConnectSuccessReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default advisorConnectSuccessReducer;
