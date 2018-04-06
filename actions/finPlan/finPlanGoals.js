import {
        createFinPlanGoal,
        updateFinPlanGoal,
      } from '../global/finPlan/finPlanGoals';
import {
        UPDATE_FIN_PLAN_SELECTED_OPTION,
        SUBMIT_FIN_PLAN_GOAL_FORM,
        SUBMIT_FIN_PLAN_GOAL_FORM_FAIL,
        UPDATE_FIN_PLAN_CURRENT_GOAL
       } from '../../constants/AppConstants';

/*-----------------------------------
  UPDATE SELECTED OPTION
-------------------------------------*/

export function updateSelectedOption(selectedOptionKey) {
  return {
    type: UPDATE_FIN_PLAN_SELECTED_OPTION,
    selectedOptionKey
  };
}

/*-----------------------------------
  UPDATE CURRENT GOAL
-------------------------------------*/

export function updateCurrentGoal(currentGoal) {
  return {
    type: UPDATE_FIN_PLAN_CURRENT_GOAL,
    currentGoal
  };
}

/*-----------------------------------
  SUBMIT FORM
-------------------------------------*/

export function submitFinPlanGoalFormRequest() {
  return {
    type: SUBMIT_FIN_PLAN_GOAL_FORM
  };
}

export function submitFinPlanGoalFormFail() {
  return {
    type: SUBMIT_FIN_PLAN_GOAL_FORM_FAIL
  };
}

export const submitFinPlanGoalForm = ({
  formType,
  formValues,
  isNewGoal,
  finPlanId,
}) => async (dispatch) => {
  try {
    const goal = {
      data: {
        ...formValues,
        type: formType,
      },
      id: formValues.id,
      finPlanId,
    };
    if (isNewGoal) {
      dispatch(createFinPlanGoal(goal, finPlanId));
    }
    else {
      dispatch(updateFinPlanGoal(goal, finPlanId));
    }
    dispatch(submitFinPlanGoalFormRequest(goal));
  }
  catch (err) {
    dispatch(submitFinPlanGoalFormFail(err));
  }
};
