import { handleErrors } from '../../utils/fetchUtils';
import {
  getGoalsRequest
} from '../../api/global/goalsApi';
import {
  GET_GOALS_SUCCESS,
  GET_GOALS_FAIL
} from '../../constants/AppConstants';


/*-----------------------------------
  GET GOALS
-------------------------------------*/
export function getGoalsSuccess(goals) {
  return {
    type: GET_GOALS_SUCCESS,
    goals
  };
}

export function getGoalsFail() {
  return {
    type: GET_GOALS_FAIL,
  };
}

export const getGoals = () => async (dispatch) => {
  try {
    const response = await getGoalsRequest();

    handleErrors(response);
    const json = await response.json();

    const { goals } = json.goalsData;
    dispatch(getGoalsSuccess(goals));
  }
  catch (err) {
    dispatch(getGoalsFail(err));
  }
};
