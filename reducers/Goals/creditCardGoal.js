import get from 'lodash/get';
// Local Deps:
import goalAttributes from '../../config/goalAttributes';
import {
        CURRENCY_ZERO,
        NUMBER_ZEROZERO,
        NUMBER_ZERO,
        EMPTY_STRING
      } from '../../config/properties';
import repaymentMethodTypes from '../../constants/enums/repaymentMethodTypes';
import {
        CHANGE_REPAYMENT_METHOD,
        YODLEE_GET_ACCOUNT_SUCCESS,
        SET_GOALS_SELECTED_ACCOUNT_ID,
        GET_PEREX_ANALYSIS_SUCCESS
      } from '../../constants/AppConstants';
import {
        roundCurrencyNumber,
        roundPercentageNumber,
        roundWholeNumber
      } from '../../utils/mathUtils';

      const {
        nickname,
        interestRate,
        minimumPayment,
        balanceAtGoalStart,
        remainingTermInMonths,
        remainingTotalInterest,
        adjustedPaymentPerMonth,
        remainingPerExPerMonth,
        desiredTermInMonths,
        desiredPaymentPerMonth,
        interestSaved,
      } = goalAttributes;

const initialState = {
  [nickname]: EMPTY_STRING,
  [interestRate]: CURRENCY_ZERO,
  [minimumPayment]: CURRENCY_ZERO,
  [balanceAtGoalStart]: CURRENCY_ZERO,
  [remainingTermInMonths]: NUMBER_ZERO.toFixed(),
  [remainingTotalInterest]: CURRENCY_ZERO,
  [adjustedPaymentPerMonth]: CURRENCY_ZERO,
  [remainingPerExPerMonth]: CURRENCY_ZERO,
  [desiredTermInMonths]: NUMBER_ZERO.toFixed(),
  [desiredPaymentPerMonth]: CURRENCY_ZERO,
  [interestSaved]: CURRENCY_ZERO,
  repaymentMethod: repaymentMethodTypes.paymentAmount,
  isLoadingAccount: true,
  isLoadingPerExSummary: true,
  perExSummary: {}
};

const actionMappings = {
  [CHANGE_REPAYMENT_METHOD]: '_changeRepaymentMethod',
  [YODLEE_GET_ACCOUNT_SUCCESS]: '_getAccountSuccess',
  [SET_GOALS_SELECTED_ACCOUNT_ID]: '_setGoalsAccountId',
  [GET_PEREX_ANALYSIS_SUCCESS]: '_getPerExAnalysisSuccess'
};

const reducer = {
  _changeRepaymentMethod(state, action) {
    return {
      ...state,
      repaymentMethod: action.repaymentMethod
    };
  },
  _getAccountSuccess(state, { account }) {
    const minimum = roundCurrencyNumber(get(account, 'amountDue.amount', NUMBER_ZEROZERO));
    const balance = roundCurrencyNumber(get(account, 'balance.amount', NUMBER_ZEROZERO));
    const apr = roundPercentageNumber(get(account, 'apr', NUMBER_ZEROZERO));
    const remainingTerm = roundWholeNumber(get(account, 'remainingTerm', NUMBER_ZERO));
    return {
      ...state,
      balanceAtGoalStart: balance,
      interestRate: apr,
      minimumPayment: minimum,
      remainingTermInMonths: remainingTerm,
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
  },
};

const creditCardGoalReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default creditCardGoalReducer;
