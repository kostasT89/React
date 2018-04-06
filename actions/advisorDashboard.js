import { getUserData } from './global/users';
import { refreshTransactions } from './global/refresh';
import { handleErrors } from '../utils/fetchUtils';
import { getTodayUtcAndFormat } from '../utils/dateUtils';
import { calculateRefreshStartDate } from '../utils/refreshUtils';
import { filterAccountsByStatus } from '../utils/accountUtils';
import { forwardToHome, forwardToDashboard } from '../utils/navigationUtils';
import {
         setFisecalUser,
         setFisecalToken,
         setCoBrowsingToken,
         getCoBrowsingToken,
         removeCoBrowsingToken,
         queryAndSetFisecalAccounts
       } from '../utils/localStorageUtils';
import {
         beginCoBrowse,
         fetchFisecalUsers,
         authenticateAdvisor,
         getAdvisorAppointments
       } from '../api/advisorDashboardApi';
import {
         RECEIVE_ADVISOR_DASHBOARD_DATA,
         CHANGE_ADVISOR_DASHBOARD_SEARCH,
         ADVISOR_DASHBOARD_TOGGLE_CALENDAR,
         TOGGLE_SENDING_ADVISOR_DASHBOARD_REQUEST
       } from '../constants/AppConstants';

function _receiveAdvisorDashboadData(fisecalUsers, appointments) {
  return {
    type: RECEIVE_ADVISOR_DASHBOARD_DATA,
    fisecalUsers,
    appointments
  };
}

function _sendingFetchRequest() {
  return {
    type: TOGGLE_SENDING_ADVISOR_DASHBOARD_REQUEST
  };
}

export function toggleCalendar() {
  return {
    type: ADVISOR_DASHBOARD_TOGGLE_CALENDAR
  };
}

export function changeForm(query) {
  return {
    type: CHANGE_ADVISOR_DASHBOARD_SEARCH,
    query
  };
}

export const reauthorizeAdvisor = (coBrowsingToken) => async (dispatch) => { // eslint-disable-line
  try {
    dispatch(_sendingFetchRequest());
    const response = await authenticateAdvisor(coBrowsingToken);

    handleErrors(response, true);
    const json = await response.json();

    await setFisecalToken(json.token);

    await setFisecalUser(json.user);

    removeCoBrowsingToken();
    dispatch(_sendingFetchRequest());
    dispatch(fetchAdvisorDashboardData()); // eslint-disable-line
  }
  catch (err) {
    dispatch(_sendingFetchRequest());
    forwardToHome();
  }
};

export const fetchAdvisorDashboardData = () => async (dispatch) => { // eslint-disable-line
  try {
    const coBrowsingToken = await getCoBrowsingToken();

    dispatch(reauthorizeAdvisor(coBrowsingToken));
  }
  catch (err) {
    try {
      dispatch(_sendingFetchRequest());
      const usersResponse = await fetchFisecalUsers();

      const appointmentsResponse = await getAdvisorAppointments();

      handleErrors(usersResponse, true);
      handleErrors(appointmentsResponse, true);

      const usersJson = await usersResponse.json();

      const appointmentsJson = await appointmentsResponse.json();

      const appointments = appointmentsJson.appointmentsData.appointments;
      // Manage UI
      dispatch(_sendingFetchRequest());
      dispatch(_receiveAdvisorDashboadData(usersJson, appointments));
    }
    catch (error) {
      dispatch(_sendingFetchRequest());
      forwardToHome();
    }
  }
};

export const initiateCoBrowsing = (userId) => async (dispatch) => { // eslint-disable-line
  try {
    dispatch(_sendingFetchRequest());
    const response = await beginCoBrowse(userId);

    handleErrors(response, true);
    const json = await response.json();

    const { user, token, coBrowsingToken } = json;
    const { lastYodleeUpdate, connectedAccounts } = user;

    // Update local storage:
    await setFisecalToken(token);

    await setFisecalUser(user);

    await setCoBrowsingToken(coBrowsingToken);

    await queryAndSetFisecalAccounts();

    // Get user data from local storage and transmit to any listening pages/components.
    dispatch(getUserData(user));
    // Manage UI
    dispatch(_sendingFetchRequest());
    // Refresh Data if user has finished initial connect flow:
    if (connectedAccounts) {
      // Only refresh accounts that have been connected.
      const accountIds = filterAccountsByStatus(connectedAccounts);
      dispatch(refreshTransactions({
        dateStartUTC: calculateRefreshStartDate(lastYodleeUpdate),
        dateEndUTC: getTodayUtcAndFormat(),
        accountIds
      }));
    }

    forwardToDashboard();
  }
  catch (err) { // eslint-disable-line
    dispatch(_sendingFetchRequest());
    forwardToHome();
  }
};
