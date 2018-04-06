import { handleErrors } from '../../../utils/fetchUtils';
import {
        createFinPlanGoalRequest,
        getFinPlanGoalsRequest,
        updateFinPlanGoalRequest,
        deleteFinPlanGoalRequest,
      } from '../../../api/global/finPlan/finPlanGoalsApi';
import {
        GET_FIN_PLAN_GOALS_SUCCESS,
        GET_FIN_PLAN_GOALS_FAIL,
        CREATE_FIN_PLAN_GOAL_SUCCESS,
        CREATE_FIN_PLAN_GOAL_FAIL,
        UPDATE_FIN_PLAN_GOAL_SUCCESS,
        UPDATE_FIN_PLAN_GOAL_FAIL,
        DELETE_FIN_PLAN_GOAL_SUCCESS,
        DELETE_FIN_PLAN_GOAL_FAIL
      } from '../../../constants/AppConstants';


/*-----------------------------------
  GET FIN PLAN GOALS
-------------------------------------*/
export function getFinPlanGoalsSuccess(goal) {
  return {
    type: GET_FIN_PLAN_GOALS_SUCCESS,
    goal,
  };
}

export function getFinPlanGoalsFail() {
  return {
    type: GET_FIN_PLAN_GOALS_FAIL,
  };
}

export const getFinPlanGoals = finPlanId => async (dispatch) => {
  try {
    const response = await getFinPlanGoalsRequest(finPlanId);

    handleErrors(response);
    const json = await response.json();

    const { goals } = json.goalsData;
    dispatch(getFinPlanGoalsSuccess(goals));
  }
  catch (err) {
    dispatch(getFinPlanGoalsFail(err));
  }
};

/*-----------------------------------
  UPDATE FIN PLAN GOAL
-------------------------------------*/
export function updateFinPlanGoalSuccess(goal) {
  return {
    type: UPDATE_FIN_PLAN_GOAL_SUCCESS,
    goal,
  };
}

export function updateFinPlanGoalFail() {
  return {
    type: UPDATE_FIN_PLAN_GOAL_FAIL,
  };
}

export const updateFinPlanGoal = (goal, finPlanId) => async (dispatch) => {
  try {
    const response = await updateFinPlanGoalRequest(goal, finPlanId);

    handleErrors(response);

    dispatch(updateFinPlanGoalSuccess(goal));
  }
  catch (err) {
    dispatch(updateFinPlanGoalFail(err));
  }
};

/*-----------------------------------
  CREATE FIN PLAN GOAL
-------------------------------------*/
export function createFinPlanGoalSuccess(goal) {
  return {
    type: CREATE_FIN_PLAN_GOAL_SUCCESS,
    goal,
  };
}

export function createFinPlanGoalFail() {
  return {
    type: CREATE_FIN_PLAN_GOAL_FAIL
  };
}

export const createFinPlanGoal = (goal, finPlanId) => async (dispatch) => { // eslint-disable-line
  try {
    const response = await createFinPlanGoalRequest(goal, finPlanId);

    handleErrors(response);
    const json = await response.json();

    const createdGoal = json.goalData.goal;
    dispatch(createFinPlanGoalSuccess(createdGoal));
  }
  catch (err) {
    dispatch(createFinPlanGoalFail(err));
  }
};

/*-----------------------------------
  DELETE FIN PLAN GOAL
-------------------------------------*/
export function deleteFinPlanGoalSuccess(id) {
  return {
    type: DELETE_FIN_PLAN_GOAL_SUCCESS,
    id,
  };
}

export function deleteFinPlanGoalFail() {
  return {
    type: DELETE_FIN_PLAN_GOAL_FAIL
  };
}

export const deleteFinPlanGoal = (id, finPlanId) => async (dispatch) => { // eslint-disable-line
  try {
    const response = await deleteFinPlanGoalRequest(id, finPlanId);

    handleErrors(response);
    dispatch(deleteFinPlanGoalSuccess(id));
  }
  catch (err) {
    dispatch(deleteFinPlanGoalFail(err));
  }
};
