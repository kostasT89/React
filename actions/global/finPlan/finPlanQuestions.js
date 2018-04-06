import { handleErrors } from '../../../utils/fetchUtils';
import {
        createFinPlanQuestionsRequest,
        updateFinPlanQuestionsRequest
      } from '../../../api/global/finPlan/finPlanQuestionsApi';
import {
        SUBMIT_FIN_PLAN_QUESTIONS_SUCCESS,
      } from '../../../constants/AppConstants';


export function submitFinPlanQuestionsSuccess(finPlanFinancialQuestions) {
  return {
    type: SUBMIT_FIN_PLAN_QUESTIONS_SUCCESS,
    finPlan: { finPlanFinancialQuestions },
  };
}
/*-----------------------------------
  CREATE FIN PLAN QUESTIONS
-------------------------------------*/

export const createFinPlanQuestions = (responses, finPlanId) => async (dispatch) => {
  try {
    const response = await createFinPlanQuestionsRequest(responses, finPlanId);

    handleErrors(response);

    dispatch(submitFinPlanQuestionsSuccess(responses));
  }
  catch (err) { // eslint-disable-line
  }
};

/*-----------------------------------
  UPDATE FIN PLAN QUESTIONS
-------------------------------------*/

export const updateFinPlanQuestions = (responses, finPlanId, finPlanQuestionsId) => async (dispatch) => { // eslint-disable-line
  try {
    const response = await updateFinPlanQuestionsRequest(responses, finPlanId, finPlanQuestionsId);

    handleErrors(response);

    dispatch(submitFinPlanQuestionsSuccess(responses));
  }
  catch (err) { // eslint-disable-line
  }
};
