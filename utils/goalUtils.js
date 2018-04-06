import startCase from 'lodash/startCase';
import flatMap from 'lodash/flatMap';
import orderBy from 'lodash/orderBy';
import isEmpty from 'lodash/isEmpty';

import goalTypes from '../constants/enums/goalTypes';
import {
          MONTHS_PER_YEAR,
          CURRENCY_ZERO,
          NUMBER_ZERO,
          NUMBER_ONE,
          NUMBER_HUNDRED,
        } from '../config/properties';
import {
          NPER,
          CUMIPMT,
          PMT
        } from './excelUtils';
import {
          parseFloatsFromObject,
          parseCurrency
        } from './parsingUtils';
import {
          roundWholeNumber,
          roundCurrencyNumber
        } from './mathUtils';
import attrs from '../config/goalAttributes';
import goalSnapshotConfig from '../config/goalSnapshot';
import cms from '../config/messages';

const { goalsConfig } = goalSnapshotConfig;

export const calculateRemainingGoalAmount = (goal, currBalance) => {
  const currentBalance = parseFloat(currBalance);
  const goalAmount = parseFloat(goal.goalAmount);
  const balanceAtGoalStart = parseFloat(goal.balanceAtGoalStart);
  switch (goal.type) {
    case goalTypes.loan:
    case goalTypes.creditCard: {
      return Math.round(currentBalance * NUMBER_HUNDRED) / NUMBER_HUNDRED;
    }
    case goalTypes.savings:
    case goalTypes.investment: {
      return Math.round(
        (goalAmount - (currentBalance - balanceAtGoalStart)) * NUMBER_HUNDRED
      ) / NUMBER_HUNDRED;
    }
  }
};

export const calculateProgressAmount = (type, startBalance, currentBalance) => {
  const safeStartBalance = parseFloat(startBalance);
  const safeCurrentBalance = parseFloat(currentBalance);
  switch (type) {
    case goalTypes.loan:
    case goalTypes.creditCard: {
      return Math.round((safeStartBalance - safeCurrentBalance) * NUMBER_HUNDRED) / NUMBER_HUNDRED;
    }
    case goalTypes.savings:
    case goalTypes.investment: {
      return Math.round((safeCurrentBalance - safeStartBalance) * NUMBER_HUNDRED) / NUMBER_HUNDRED;
    }
  }
};

export const calculateGoalProgressAmount = (goal, currBalance) =>
  calculateProgressAmount(goal.type, goal.balanceAtGoalStart, currBalance);

export const sumGoalsForSnapshot = (goals, accounts) => {
  const formattedGoalsObject = goals.reduce((goalsSet, goal) => {
    const account = accounts.find(acct => acct.id === goal.accountId);
    const config = goalsSet[goal.type];
    const currentBalance = account ? account.balance.amount : 0;
    const remaining = calculateRemainingGoalAmount(goal, currentBalance);
    const progress = calculateGoalProgressAmount(goal, currentBalance);
    const newConfig = {
      remaining: config.remaining + remaining,
      progress: config.progress + progress,
      type: goal.type
    };
    return {
      ...goalsSet,
      [goal.type]: newConfig
    };
  }, goalsConfig);
  const formattedGoals = flatMap(formattedGoalsObject);
  return formattedGoals;
};

export const formatGoalsForSnapshot = (goals, accounts) => {
  const accountsArray = flatMap(accounts);
  const totals = sumGoalsForSnapshot(goals, accountsArray);
  const filteredGoals = totals.filter(total => total.progress !== null);
  const formattedGoals = filteredGoals.map(goal => ({
    data: [
      {
        name: cms['snapshot.data.progress'],
        value: goal.progress,
        fill: goalSnapshotConfig[`fill.${goal.type}Goal`]
      },
      {
        name: cms['snapshot.data.remaining'],
        value: goal.remaining,
        fill: goalSnapshotConfig['fill.remaining']
      }
    ],
    message: `${startCase(goal.type)} Goal`,
    amount: goal.progress
  }));
  return formattedGoals;
};

export const formatGoalForSubmit = (rawGoal) => {
  const parsedFloats = parseFloatsFromObject(rawGoal);
  const goal = {
    ...parsedFloats,
    [attrs.nickname]: rawGoal.nickname
  };
  return goal;
};

export const calculatePayoffTerm = ({
  interestRate,
  minimumPayment,
  balance
}) => {
  const floats = parseFloatsFromObject({ interestRate, minimumPayment, balance });
  const payOffTerm = NPER(
    floats.interestRate / MONTHS_PER_YEAR / NUMBER_HUNDRED,
    -floats.minimumPayment,
    floats.balance,
    NUMBER_ZERO,
    NUMBER_ZERO
  ).toFixed(0) || CURRENCY_ZERO;
  return payOffTerm;
};

export const calculateInterest = ({
  termInMonths,
  interestRate,
  balance
}) => {
  const floats = parseFloatsFromObject({ termInMonths, interestRate, balance });
  const totalInterest = CUMIPMT(
    floats.interestRate / MONTHS_PER_YEAR / NUMBER_HUNDRED,
    floats.termInMonths,
    floats.balance,
    NUMBER_ONE,
    floats.termInMonths,
    NUMBER_ZERO
  ).toFixed(2) || CURRENCY_ZERO;
  return totalInterest;
};

export const calculateDesiredPaymentPerMonth = ({
  interestRate,
  desiredTermInMonths,
  balanceAtGoalStart,
  goalAmount = NUMBER_ZERO
}) => {
  const floats = parseFloatsFromObject({
    interestRate,
    desiredTermInMonths,
    balanceAtGoalStart,
    goalAmount
  });
  const desiredPaymentPerMonth = PMT(
    floats.interestRate / MONTHS_PER_YEAR / NUMBER_HUNDRED,
    floats.desiredTermInMonths,
    -floats.balanceAtGoalStart,
    -floats.goalAmount,
    NUMBER_ZERO
  ).toFixed(2) || CURRENCY_ZERO;
  return desiredPaymentPerMonth;
};

export const calculateDesiredTermInMonths = ({
  interestRate,
  desiredPaymentPerMonth,
  balanceAtGoalStart
}) => {
  const floats = formatGoalForSubmit({
    interestRate,
    desiredPaymentPerMonth,
    balanceAtGoalStart
  });
  const desiredTermInMonths = NPER(
    floats.interestRate / MONTHS_PER_YEAR / NUMBER_HUNDRED,
    floats.desiredPaymentPerMonth,
    -floats.balanceAtGoalStart,
    NUMBER_ZERO,
    NUMBER_ZERO
  );
  const roundedToNextMonth = roundWholeNumber(desiredTermInMonths) || CURRENCY_ZERO;
  return roundedToNextMonth;
};

export const calculateRemainingPerExPerMonth = (currentPerEx, savingsRequired) => {
  const remainingPerExPerMonth = roundCurrencyNumber(
    currentPerEx - savingsRequired
  ) || CURRENCY_ZERO;
  return remainingPerExPerMonth;
};

export const calculateInterestSaved = (totalInterest, desiredTotalInterest) => {
  const interestSaved = parseCurrency(totalInterest) - parseCurrency(desiredTotalInterest);
  return roundCurrencyNumber(interestSaved);
};

export const orderGoals = (goals) => {
  const orderedGoals = orderBy(goals, ['amount'], ['desc']);
  return orderedGoals;
};

export const checkNumericalValuesExist = (numbersArray) => {
  if (isEmpty(numbersArray)) return false;
  const valueStates = numbersArray.filter((numb) => {
    if (parseFloat(numb) <= NUMBER_ZERO || !numb) {
      return false;
    }
    return true;
  });
  return valueStates.length === numbersArray.length;
};

export const determineRepaymentFieldErrors = ({
  remainingTermInMonths,
  minimumPayment,
  desiredPaymentPerMonth,
  desiredTermInMonths
}) => {
  const term = parseFloat(remainingTermInMonths);
  const min = parseCurrency(minimumPayment);
  const desiredTerm = parseFloat(desiredTermInMonths);
  const desiredMin = parseCurrency(desiredPaymentPerMonth);
  const showTermError = term < desiredTerm;
  const showPaymentError = min > desiredMin;
  return {
    showTermError,
    showPaymentError
  };
};
