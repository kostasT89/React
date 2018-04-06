import get from 'lodash/get';
// Local Deps:
import goalAttributes from '../../config/goalAttributes';
import {
        YODLEE_GET_ACCOUNT_SUCCESS,
        SET_GOALS_SELECTED_ACCOUNT_ID,
        GET_PEREX_ANALYSIS_SUCCESS
      } from '../../constants/AppConstants';
import {
        CURRENCY_ZERO,
        STRING_ZERO,
        NUMBER_ZEROZERO,
        EMPTY_STRING
      } from '../../config/properties';
import {
        roundCurrencyNumber,
        roundPercentageNumber
      } from '../../utils/mathUtils';

const {
  nickname,
  balanceAtGoalStart,
  goalAmount,
  projectedRR,
  desiredTermInYears,
  desiredPaymentPerMonth,
  remainingPerExPerMonth,
} = goalAttributes;

const initialState = {
  [nickname]: EMPTY_STRING,
  [balanceAtGoalStart]: CURRENCY_ZERO,
  [goalAmount]: CURRENCY_ZERO,
  [projectedRR]: CURRENCY_ZERO,
  [desiredTermInYears]: STRING_ZERO,
  [desiredPaymentPerMonth]: CURRENCY_ZERO,
  [remainingPerExPerMonth]: CURRENCY_ZERO,
  currentPerEx: CURRENCY_ZERO,
  isLoadingAccount: true,
  isLoadingPerExSummary: true,
  perExSummary: {}
};

const actionMappings = {
  [YODLEE_GET_ACCOUNT_SUCCESS]: '_getAccountSuccess',
  [SET_GOALS_SELECTED_ACCOUNT_ID]: '_setGoalsAccountId',
  [GET_PEREX_ANALYSIS_SUCCESS]: '_getPerExAnalysisSuccess'
};

const reducer = {
  _getAccountSuccess(state, { account }) {
    const balance = roundCurrencyNumber(get(account, 'balance.amount', NUMBER_ZEROZERO));
    const rate = roundPercentageNumber(get(account, 'interestRate', NUMBER_ZEROZERO));
    return {
      ...state,
      balanceAtGoalStart: balance,
      interestRate: rate,
      isLoadingAccount: false
    };
  },
  _setGoalsAccountId(state) {
    return {
      ...state,
      isLoadingAccount: true
    };
  },
  _getPerExAnalysisSuccess(state, { summary }) {
    return {
      ...state,
      ...summary,
      isLoadingPerExSummary: false
    };
  }
};

const investmetGoalReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default investmetGoalReducer;
