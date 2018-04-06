import { createGoalRequest, updateGoalsRequest } from '../api/global/goalsApi';
import { handleErrors } from '../utils/fetchUtils';
import { forwardTo } from '../utils/navigationUtils';
import Routes from '../constants/Routes';
import {
          CHANGE_REPAYMENT_METHOD,
          SET_GOALS_SELECTED_ACCOUNT_ID,
          SUBMIT_GOAL_FORM_SUCCESS,
          SUBMIT_GOAL_FORM_FAIL,
          TOGGLE_GOAL_SUBMISSION,
          UPDATE_GOAL_SUCCESS,
          UPDATE_GOAL_FAIL
        } from '../constants/AppConstants';

export const changeRepaymentMethod = repaymentMethod => ({
  type: CHANGE_REPAYMENT_METHOD,
  repaymentMethod
});

export const setSelectedAccountId = selectedAccountId => ({
  type: SET_GOALS_SELECTED_ACCOUNT_ID,
  selectedAccountId
});

/*-----------------------------------
  SUBMIT GOAL FORM
-------------------------------------*/
export function submitGoalFormSuccess(goal) {
  return {
    type: SUBMIT_GOAL_FORM_SUCCESS,
    goal
  };
}

export function submitGoalFormFail(err) {
  return {
    type: SUBMIT_GOAL_FORM_FAIL,
    err
  };
}

function _toggleGoalSubmission() {
  return {
    type: TOGGLE_GOAL_SUBMISSION,
  };
}

export const submitGoalForm = (goal, accountId, type) => async(dispatch) => {
  dispatch(_toggleGoalSubmission());
  try {
    const payload = {
      ...goal,
      goalAmount: goal.goalAmount || goal.balanceAtGoalStart,
      accountId,
      type
    };
    const response = await createGoalRequest(payload);

    handleErrors(response);
    const json = await response.json();

    dispatch(submitGoalFormSuccess(json.goalData.goal));
    dispatch(_toggleGoalSubmission());
    forwardTo(Routes.goalComplete);
  }
  catch (err) {
    dispatch(submitGoalFormFail(err));
    dispatch(_toggleGoalSubmission());
  }
};

/*-----------------------------------
  UPDATE GOAL
-------------------------------------*/
export function updateGoalRequestSuccess(goal) {
  return {
    type: UPDATE_GOAL_SUCCESS,
    goal
  };
}

export function updateGoalRequestFail(err) {
  return {
    type: UPDATE_GOAL_FAIL,
    err
  };
}

export const updateGoalRequest = (goalId, goal, accountId, type) => async(dispatch) => {
  try {
    const payload = {
      ...goal,
      goalAmount: goal.goalAmount || goal.balanceAtGoalStart,
      accountId,
      type
    };
    const response = await updateGoalsRequest(payload, goalId);

    handleErrors(response);
    const json = await response.json();

    dispatch(updateGoalRequestSuccess(json.goalData.goal));
    forwardTo(Routes.dashboard);
  }
  catch (err) {
    dispatch(updateGoalRequestFail(err));
  }
};
