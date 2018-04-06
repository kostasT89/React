import fetch from 'isomorphic-fetch';
import { createHeadersForJSONContent } from '../../utils/fetchUtils';
import objectToQueryString from '../../utils/queryStringUtils';
import { getUserDataFromLocalStorage } from './usersApi';
import {
  appointmentsUrl,
  bookAppointmentUrl,
} from '../../constants/ApiUrls';

export async function fetchAllAppointmentsRequest({ dateStartUTC, dateEndUTC, type }) {
  const data = await getUserDataFromLocalStorage();

  const path = appointmentsUrl;
  const queryString = objectToQueryString({
    dateStart: dateStartUTC,
    dateEnd: dateEndUTC,
    type
  });
  return fetch(`${data.apiUrl}${path}${queryString}`, {
    method: 'GET',
    headers: createHeadersForJSONContent(data.token)
  });
}

export async function bookAppointmentRequest({ user, appointmentId }) {
  const data = await getUserDataFromLocalStorage();

  return fetch(`${data.apiUrl}${bookAppointmentUrl}`, {
    method: 'POST',
    headers: createHeadersForJSONContent(data.token),
    body: JSON.stringify({
      user,
      appointmentId
    })
  });
}
