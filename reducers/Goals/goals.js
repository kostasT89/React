import startCase from 'lodash/startCase';

import {
          CHANGE_REPAYMENT_METHOD,
          GET_ENABLED_ACCOUNTS_SUCCESS,
          SET_GOALS_SELECTED_ACCOUNT_ID,
          SUBMIT_GOAL_FORM_SUCCESS,
          TOGGLE_GOAL_SUBMISSION
        } from '../../constants/AppConstants';

const initialState = {
  selectedAccountId: 0,
  accounts: [],
  isLoadingAccounts: true,
  completedGoalName: '',
  completedGoalType: '',
  isSubmitting: false
};

const actionMappings = {
  [CHANGE_REPAYMENT_METHOD]: '_changeRepaymentMethod',
  [GET_ENABLED_ACCOUNTS_SUCCESS]: '_getAccountsSuccess',
  [SET_GOALS_SELECTED_ACCOUNT_ID]: '_setGoalsSelectedAccountId',
  [SUBMIT_GOAL_FORM_SUCCESS]: '_onSubmitGoalFormSuccess',
  [TOGGLE_GOAL_SUBMISSION]: '_toggleGoalSubmission',
};

const reducer = {
  _changeRepaymentMethod(state, action) {
    return {
      ...state,
      repaymentMethod: action.repaymentMethod
    };
  },

  _getAccountsSuccess(state, { enabledYodleeAccounts }) {
    return {
      ...state,
      accounts: enabledYodleeAccounts,
      isLoadingAccounts: false
    };
  },

  _setGoalsSelectedAccountId(state, { selectedAccountId }) {
    return {
      ...state,
      selectedAccountId
    };
  },

  _onSubmitGoalFormSuccess(state, { goal }) {
    return {
      ...state,
      completedGoalName: goal.nickname,
      completedGoalType: startCase(goal.type).toLowerCase()
    };
  },

  _toggleGoalSubmission(state) {
    return {
      ...state,
      isSubmitting: !state.isSubmitting
    };
  }
};

const goalsReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default goalsReducer;
