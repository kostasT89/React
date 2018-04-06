import {
        DELETE_MAJOR_EVENT,
        UPDATE_MAJOR_EVENT,
        COMPLETE_FIN_PLAN_QUESTION,
        SUBMIT_FIN_PLAN_QUESTIONS_REQUEST,
        SUBMIT_FIN_PLAN_QUESTIONS_REQUEST_FAIL,
        SET_FIN_PLAN_QUESTIONS_ENABLE_REINITILIZATION
      } from '../../constants/AppConstants';
import {
        createFinPlanQuestions,
        updateFinPlanQuestions
      } from '../global/finPlan/finPlanQuestions';

export function setEnableReinitialize(enableReinitialize) {
  return {
    type: SET_FIN_PLAN_QUESTIONS_ENABLE_REINITILIZATION,
    enableReinitialize
  };
}

/*-----------------------------------
 COMPLETE FIN PLAN QUESTION
-------------------------------------*/

export function completeFinPlanQuestion(question) {
  return {
    type: COMPLETE_FIN_PLAN_QUESTION,
    question
  };
}

/*-----------------------------------
  ADD MAJOR EVENT
-------------------------------------*/
export function addMajorEvent(type) {
  return {
    type,
  };
}

export function updateMajorEvent(event) {
  return {
    type: UPDATE_MAJOR_EVENT,
    event,
  };
}

export function deleteMajorEvent(event) {
  return {
    type: DELETE_MAJOR_EVENT,
    event,
  };
}

/*-----------------------------------
 SUBMIT FIN PLAN QUESTIONS PAGE
-------------------------------------*/
export function submitFinPlanQuestionsRequest() {
  return {
    type: SUBMIT_FIN_PLAN_QUESTIONS_REQUEST,
  };
}

export function submitFinPlanQuestionsRequestFail() {
  return {
    type: SUBMIT_FIN_PLAN_QUESTIONS_REQUEST_FAIL,
  };
}

export const submitFinPlanQuestions = ({ responses, finPlanId, finPlanQuestionsId }) => async (dispatch) => { // eslint-disable-line
  try {
    if (!finPlanQuestionsId) {
      dispatch(createFinPlanQuestions(responses, finPlanId));
    }
    else {
      dispatch(updateFinPlanQuestions(responses, finPlanId, finPlanQuestionsId));
    }
    dispatch(submitFinPlanQuestionsRequest());
  }
  catch (err) {
    dispatch(submitFinPlanQuestionsRequestFail(err));
  }
};
