import get from 'lodash/get';

import { selectOptions } from '../../config/finPlan/finPlanGoals';
import { shouldChangeFormFieldType } from '../../utils/finPlan/finPlanUtils';

import {
         GET_FIN_PLAN_SUCCESS,
         CREATE_FIN_PLAN_GOAL_SUCCESS,
         CREATE_FIN_PLAN_GOAL_FAIL,
         UPDATE_FIN_PLAN_GOAL_SUCCESS,
         UPDATE_FIN_PLAN_GOAL_FAIL,
         DELETE_FIN_PLAN_GOAL_SUCCESS,
         DELETE_FIN_PLAN_GOAL_FAIL,
         UPDATE_FIN_PLAN_SELECTED_OPTION,
         SUBMIT_FIN_PLAN_GOAL_FORM,
         SUBMIT_FIN_PLAN_GOAL_FORM_FAIL,
         UPDATE_FIN_PLAN_CURRENT_GOAL,
         CHANGE_FORM_FIELD_TYPE,
         OTHER_PLEASE_TYPE,
       } from '../../constants/AppConstants';

const initialState = {
  goals: [],
  fieldTypes: {},
  currentGoal: null,
  formIsLoading: false,
  tableIsLoading: false,
  selectedOptionKey: '',
};

const actionMappings = {
  [GET_FIN_PLAN_SUCCESS]: '_receiveFinPlanGoals',
  [CREATE_FIN_PLAN_GOAL_SUCCESS]: '_createFinPlanGoalSuccess',
  [CREATE_FIN_PLAN_GOAL_FAIL]: '_handleServerError',
  [UPDATE_FIN_PLAN_GOAL_SUCCESS]: '_updateFinPlanGoalSuccess',
  [UPDATE_FIN_PLAN_GOAL_FAIL]: '_handleServerError',
  [DELETE_FIN_PLAN_GOAL_SUCCESS]: '_deleteFinPlanGoalSuccess',
  [DELETE_FIN_PLAN_GOAL_FAIL]: '_handleServerError',
  [UPDATE_FIN_PLAN_SELECTED_OPTION]: '_updateSelectedOptionKey',
  [SUBMIT_FIN_PLAN_GOAL_FORM]: '_submitFinPlanGoalForm',
  [SUBMIT_FIN_PLAN_GOAL_FORM_FAIL]: '_submitFinPlanGoalFormFail',
  [UPDATE_FIN_PLAN_CURRENT_GOAL]: '_updateCurrentGoal',
  [CHANGE_FORM_FIELD_TYPE]: '_changeFormFieldType',
};

const reducer = {
  _changeFormFieldType(state, { fieldName }) {
    const newFieldTypes = {
      ...state.fieldTypes,
      [fieldName]: state.fieldTypes[fieldName] === OTHER_PLEASE_TYPE ? null : OTHER_PLEASE_TYPE,
    };
    return {
      ...state,
      fieldTypes: newFieldTypes
    };
  },

  _receiveFinPlanGoals(state, { finPlan: { finPlanGoals } }) {
    const newGoals = finPlanGoals.map(goal => ({
      id: goal.id,
      finPlanId: goal.finPlanId,
      ...goal.data,
    }));
    return {
      ...state,
      goals: newGoals
    };
  },

  _updateSelectedOptionKey(state, { selectedOptionKey }) {
    const fieldTypes = shouldChangeFormFieldType(selectedOptionKey, selectOptions) ||
      selectedOptionKey === OTHER_PLEASE_TYPE ? state.fieldTypes : {};
    return {
      ...state,
      fieldTypes,
      currentGoal: null,
      selectedOptionKey,
    };
  },

  _updateCurrentGoal(state, { currentGoal }) {
    const selectedOptionKey = get(currentGoal, 'type', '');
    return {
      ...state,
      currentGoal,
      selectedOptionKey
    };
  },

  _handleServerError(state, { error }) {
    return {
      ...state,
      error,
      fieldTypes: {},
      currentGoal: null,
      formIsLoading: false,
      tableIsLoading: false,
      selectedOptionKey: ''
    };
  },

  _submitFinPlanGoalForm(state) {
    return {
      ...state,
      formIsLoading: true
    };
  },

  _submitFinPlanGoalFormFail(state) {
    return {
      ...state,
      formIsLoading: false
    };
  },

  _createFinPlanGoalSuccess(state, { goal }) {
    const goals = [...state.goals, {
      ...goal.data,
      finPlanId: goal.finPlanId,
      id: goal.id,
    }];
    return {
      ...state,
      goals,
      fieldTypes: {},
      formIsLoading: false,
      currentGoal: null,
      selectedOptionKey: ''
    };
  },

  _updateFinPlanGoalSuccess(state, { goal }) {
    // Replace old goal with updated one:
    const goals = state.goals.map(g => (
      g.id === goal.id ? {
        ...goal.data,
        finPlanId: goal.finPlanId,
        id: goal.id,
      } : g
    ));
    return {
      ...state,
      goals,
      fieldTypes: {},
      formIsLoading: false,
      currentGoal: null,
      selectedOptionKey: ''
    };
  },

  _deleteFinPlanGoalSuccess(state, { id }) {
    const goals = state.goals.filter(goal => (
      goal.id !== id
    ));
    return {
      ...state,
      goals,
      fieldTypes: {},
      currentGoal: null,
      formIsLoading: false,
      selectedOptionKey: ''
    };
  },

};

const finPlanGoalsReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default finPlanGoalsReducer;
