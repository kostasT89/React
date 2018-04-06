import { GET_USER_SUCCESS } from '../../constants/AppConstants';

const initialState = {
  appointments: [],
};

const actionMappings = {
  [GET_USER_SUCCESS]: '_receiveUserData'
};

const reducer = {
  _receiveUserData(state, action) {
    return {
      ...state,
      user: action.userData
    };
  }
};

const finPlanSuccessReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default finPlanSuccessReducer;
