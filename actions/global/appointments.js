import { handleErrors } from '../../utils/fetchUtils';
import { fetchAllAppointmentsRequest } from '../../api/global/appointmentsApi';

import {
  GET_APPOINTMENTS_SUCCESS,
  GET_APPOINTMENTS_FAIL,
} from '../../constants/AppConstants';
import { convertMomentToUtcAndFormat } from '../../utils/dateUtils';
import { defaultDateFormat } from '../../config/properties';

/*-----------------------------------
  GET APPOINTMENTS
-------------------------------------*/

export function getAppointmentsSuccess(appointments) {
  return {
    type: GET_APPOINTMENTS_SUCCESS,
    appointments
  };
}

export function getAppointmentsFail(err) {
  return {
    type: GET_APPOINTMENTS_FAIL,
    err
  };
}

export const getAppointments = ({ dateStart, dateEnd, type }) => async (dispatch) => {
  try {
    /*
    * Fetch appointments one month at a time. Default to current month.
    */
    const dateStartUTC = convertMomentToUtcAndFormat(dateStart, defaultDateFormat);
    const dateEndUTC = convertMomentToUtcAndFormat(dateEnd, defaultDateFormat);
    const response = await fetchAllAppointmentsRequest({
      dateStartUTC,
      dateEndUTC,
      type
    });

    handleErrors(response);
    const json = await response.json();

    const { appointments } = json.appointmentsData;
    dispatch(getAppointmentsSuccess(appointments));
  }
  catch (err) {
    dispatch(getAppointmentsFail(err));
  }
};
