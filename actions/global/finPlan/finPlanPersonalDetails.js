import {
          GET_USER_SUCCESS,
        } from '../../../constants/AppConstants';

/*-----------------------------------
  GET FIN PLAN GOALS
-------------------------------------*/

export function receiveFinPlanPersonalDetails(personalDetails) {
  return {
    type: GET_USER_SUCCESS,
    personalDetails,
  };
}
