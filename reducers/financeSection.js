import {
        CREATE_FINANCE_SUMMARY_SUCCESS,
        GET_PEREX_ANALYSIS_SUCCESS,
        CREATE_COMPARISON_SUMMARY_SUCCESS
      } from '../constants/AppConstants';

const initialState = {
  financeSummary: {},
  comparisonSummary: {},
  hasFetchedFinanceSummary: false,
  hasFetchedComparisonSummary: false,
  perExSummary: {},
  incomeSummary: {},
  billSummary: {},
  hasFetchedPerExSummary: false,
  transactionsNotFound: false,
};

const actionMappings = {
  [CREATE_FINANCE_SUMMARY_SUCCESS]: '_receiveFinanceSummarySuccess',
  [GET_PEREX_ANALYSIS_SUCCESS]: '_receivePerExSummarySuccess',
  [CREATE_COMPARISON_SUMMARY_SUCCESS]: '_receiveComparisonSummarySuccess',
};

const reducer = {
  _receiveFinanceSummarySuccess(state, {
    summary,
  }) {
    return {
      ...state,
      financeSummary: summary,
      hasFetchedFinanceSummary: true
    };
  },
  _receiveComparisonSummarySuccess(state, { summary }) {
    return {
      ...state,
      comparisonSummary: summary,
      hasFetchedComparisonSummary: true
    };
  },
  _receivePerExSummarySuccess(state, {
    summary,
  }) {
    return {
      ...state,
      perExSummary: summary.perExSummary,
      incomeSummary: summary.incomeSummary,
      billSummary: summary.billSummary,
      hasFetchedPerExSummary: true
    };
  },
};

const incomeSummaryReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default incomeSummaryReducer;
