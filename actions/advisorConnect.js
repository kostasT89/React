import { saveUserData } from '../actions/global/users';
import { bookAppointmentRequest } from '../api/global/appointmentsApi';
import { storeCallInformationRequest } from '../api/advisorConnectApi';
import {
  SUBMIT_APPOINTMENT_FORM_FAIL,
  SUBMIT_APPOINTMENT_FORM_SUCCESS,
  SUBMIT_ADVISOR_CONNECT_INFO_FORM_FAIL,
  CHANGE_ADVISOR_CONNECT_FORM_FIELD_TYPE,
  SUBMIT_ADVISOR_CONNECT_INFO_FORM_SUCCESS
} from '../constants/AppConstants';

/*-----------------------------------
  SUBMIT APPOINTMENTS FORM
-------------------------------------*/

export function changeFormFieldType(fieldName) {
  return {
    type: CHANGE_ADVISOR_CONNECT_FORM_FIELD_TYPE,
    fieldName,
  };
}

export function submitAppointmentsFormSuccess() {
  return {
    type: SUBMIT_APPOINTMENT_FORM_SUCCESS
  };
}

export function submitAppointmentsFormFail(err) {
  return {
    type: SUBMIT_APPOINTMENT_FORM_FAIL,
    err
  };
}

export const submitAppointmentsForm = ({ appointmentId, user }) => async (dispatch) => {
  try {
    dispatch(saveUserData(user.id, user));
    const response = await bookAppointmentRequest({ appointmentId, user });

    const json = await response.json();

    dispatch(submitAppointmentsFormSuccess(json));
  }
  catch (err) {
    dispatch(submitAppointmentsFormFail(err));
  }
};

/*-----------------------------------
  SUBMIT ADVISOR CONNECT INFO FORM
-------------------------------------*/

export function submitAdvisorConnectInfoFormSuccess() {
  return {
    type: SUBMIT_ADVISOR_CONNECT_INFO_FORM_SUCCESS
  };
}

export function submitAdvisorConnectInfoFormFail(err) {
  return {
    type: SUBMIT_ADVISOR_CONNECT_INFO_FORM_FAIL,
    err
  };
}

export const submitAdvisorConnectInfoForm = ({
  age,
  gender,
  maritalStatus,
  childrenCount,
  hasSubmitedTaxReturnsInLastTwoYears,
  coClient,
  income,
  debt,
  objective,
  experience,
  gavePermissionToViewFinData,
  savings,
  retirementSavings,
  creditCardDebt,
  studentLoanDebt
 }) => async (dispatch) => { // eslint-disable-line
  try {
    const response = await storeCallInformationRequest({
      age,
      gender,
      maritalStatus,
      childrenCount,
      hasSubmitedTaxReturnsInLastTwoYears,
      coClient,
      income,
      debt,
      objective,
      experience,
      gavePermissionToViewFinData,
      savings,
      retirementSavings,
      creditCardDebt,
      studentLoanDebt
    });

    const json = await response.json();

    dispatch(submitAdvisorConnectInfoFormSuccess(json.formData));
  }
  catch (err) {
    dispatch(submitAdvisorConnectInfoFormFail(err));
  }
};
