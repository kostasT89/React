import {
  GET_USER_SUCCESS,
  GET_ENABLED_ACCOUNTS_SUCCESS,
  GET_ENABLED_ACCOUNTS_FAIL,
  GET_GOALS_SUCCESS,
  GET_GOALS_FAIL,
  YODLEE_GET_ACCOUNT_BALANCES_SUCCESS,
  YODLEE_GET_ACCOUNT_BALANCES_FAIL,
  PREDICT_BILLS_SUCCESS,
  PREDICT_BILLS_FAIL,
  GET_PEREX_ANALYSIS_SUCCESS
} from '../constants/AppConstants';

const initialState = {
  hasFetchedAccounts: false,
  hasFetchedGoals: false,
  hasFetchedBalances: false,
  hasFetchedPredictedBills: false,
  enabledAccounts: [],
  enabledYodleeAccounts: [],
  predictedBills: [],
  user: {
    firstName: ''
  },
  goals: [],
  balances: [],
  incomeSummary: {},
  billSummary: {},
  perExSummary: {},
  goalSummary: {}
};

const actionMappings = {
  [GET_USER_SUCCESS]: '_getUserDataSuccess',
  [GET_ENABLED_ACCOUNTS_SUCCESS]: '_getAccountsSuccess',
  [GET_ENABLED_ACCOUNTS_FAIL]: '_getAccountsFail',
  [GET_GOALS_SUCCESS]: '_getGoalsSuccess',
  [GET_GOALS_FAIL]: '_getGoalsFail',
  [YODLEE_GET_ACCOUNT_BALANCES_SUCCESS]: '_getBalancesSuccess',
  [YODLEE_GET_ACCOUNT_BALANCES_FAIL]: '_getBalancesFail',
  [PREDICT_BILLS_SUCCESS]: '_getPredictedFieldsetsSuccess',
  [PREDICT_BILLS_FAIL]: '_getPredictedFieldSetsFail',
  [GET_PEREX_ANALYSIS_SUCCESS]: '_getPerExAnalysisSuccess',
};

const reducer = {
  _getUserDataSuccess(state, { userData }) {
    return {
      ...state,
      user: userData
    };
  },
  _getGoalsSuccess(state, { goals }) {
    return {
      ...state,
      hasFetchedGoals: true,
      goals
    };
  },
  _getGoalsFail(state) {
    return {
      ...state,
      hasFetchedGoals: true,
    };
  },
  _getAccountsSuccess(state, {
    enabledAccounts,
    enabledYodleeAccounts
  }) {
    return {
      ...state,
      hasFetchedAccounts: true,
      enabledAccounts,
      enabledYodleeAccounts
    };
  },
  _getAccountsFail(state) {
    return {
      ...state,
      hasFetchedAccounts: true
    };
  },
  _getBalancesSuccess(state, { balances }) {
    return {
      ...state,
      hasFetchedBalances: true,
      balances
    };
  },
  _getBalancesFail(state) {
    return {
      ...state,
      hasFetchedBalances: true
    };
  },
  _getPredictedFieldsetsSuccess(state, { predictedBills }) {
    return {
      ...state,
      predictedBills,
      hasFetchedPredictedBills: true
    };
  },
  _getPredictedFieldSetsFail(state) {
    return {
      ...state,
      hasFetchedPredictedBills: true
    };
  },
  _getPerExAnalysisSuccess(state, { summary }) {
    const { perExSummary } = summary;
    return {
      ...state,
      perExSummary
    };
  },
};

const dashboardReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default dashboardReducer;
