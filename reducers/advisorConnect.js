import {
  GET_USER_SUCCESS,
  GET_APPOINTMENTS_SUCCESS,
} from '../constants/AppConstants';

const initialState = {
  appointments: [],
  user: {}
};

const actionMappings = {
  [GET_USER_SUCCESS]: '_receiveUserDataSuccess',
  [GET_APPOINTMENTS_SUCCESS]: 'getAppointmentsSuccess'
};

const reducer = {
  _receiveUserDataSuccess(state, { userData }) {
    return {
      ...state,
      user: userData
    };
  },

  getAppointmentsSuccess(state, { appointments }) {
    return {
      ...state,
      isInitialLoad: false,
      appointments
    };
  }
};

const advisorConnectReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default advisorConnectReducer;
