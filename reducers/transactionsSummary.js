import { GET_PEREX_ANALYSIS_SUCCESS } from '../constants/AppConstants';
import { NUMBER_ZERO } from '../config/properties';

const initialState = {
  summary: {
    totalAnticipatedMonthlyAmount: NUMBER_ZERO,
    totalActualAmountThisMonth: NUMBER_ZERO
  }
};

const actionMappings = {
  [GET_PEREX_ANALYSIS_SUCCESS]: '_getPerExAnalysisSuccess',
};

const reducer = {
  _getPerExAnalysisSuccess(state, action) {
    return {
      ...state,
      summary: action.summary
    };
  }
};

const transactionsSummaryReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default transactionsSummaryReducer;
