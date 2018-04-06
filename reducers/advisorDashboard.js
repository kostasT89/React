import tap from 'lodash/tap';
import orderBy from 'lodash/orderBy';

import {
  RECEIVE_ADVISOR_DASHBOARD_DATA,
  CHANGE_ADVISOR_DASHBOARD_SEARCH,
  ADVISOR_DASHBOARD_TOGGLE_CALENDAR,
  TOGGLE_SENDING_ADVISOR_DASHBOARD_REQUEST,
} from '../constants/AppConstants';

const initialState = {
  events: [],
  querry: '',
  showCalendar: false,
  fisecalUsers: [],
  userNameIdMap: {},
  requestSending: false,
};

const actionMappings = {
  [RECEIVE_ADVISOR_DASHBOARD_DATA]: '_receiveData',
  [CHANGE_ADVISOR_DASHBOARD_SEARCH]: '_changeSearch',
  [ADVISOR_DASHBOARD_TOGGLE_CALENDAR]: '_toggleCalendar',
  [TOGGLE_SENDING_ADVISOR_DASHBOARD_REQUEST]: '_toggleSendingRequest',
};

const reducer = {
  _receiveData(state, { fisecalUsers, appointments }) {
    const userNameIdMap = tap({},
      result => fisecalUsers.forEach(
        user => result[user.id] = `${user.firstName} ${user.lastName || ''}`) // eslint-disable-line
      );

    return {
      ...state,
      fisecalUsers: orderBy(fisecalUsers, ['lastName', 'firstName']),
      events: appointments.map(apt => ({
        end: new Date(apt.dateEnd),
        start: new Date(apt.dateStart),
        title: userNameIdMap[apt.userId]
      })),
      userNameIdMap
    };
  },

  _changeSearch(state, { query }) {
    return {
      ...state,
      query,
    };
  },

  _toggleCalendar(state) {
    return {
      ...state,
      showCalendar: !state.showCalendar
    };
  },

  _toggleSendingRequest(state) {
    return {
      ...state,
      requestSending: !state.requestSending
    };
  },
};

const advisorDashboard = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default advisorDashboard;
