// Global Deps:
import get from 'lodash/get';
import set from 'lodash/set';
import last from 'lodash/last';
import uniqBy from 'lodash/uniqBy';
import values from 'lodash/values';
import flatten from 'lodash/flatten';
import isEmpty from 'lodash/isEmpty';
import groupBy from 'lodash/groupBy';
// Local Deps:
import { capitalizeFirstLetter } from './stringUtils';
import {
        stripNonAlphabeticCharacters,
        stripNonNumbers
      } from './regexUtils';
import {
        calculateProgressAmount,
        orderGoals
      } from './goalUtils';
import { createMomentAndFormat } from './dateUtils';
import { yodleeCategoryIdToFisecalCategoryIdMap } from '../constants/enums/yodleeCategories';
import {
        EMPTY_STRING,
        NUMBER_ZERO,
        defaultDateFormat,
        dbDateFormat
      } from '../config/properties';

export const getTokenFromSearchParams = searchParams => last(searchParams.split('='));

export const parseCurrency = (str) => {
  if (typeof str !== 'string') return str;
  return parseFloat(stripNonNumbers(str));
};

export const parseFloatsFromObject = (strObject) => {
  if (!strObject) return strObject;
  const keys = Object.keys(strObject);
  const floatObject = keys.reduce((obj, key) => {
    const str = get(strObject, key, EMPTY_STRING);
    const num = !str ? str : parseCurrency(str);
    const value = Number.isNaN(num) ? str : num;
    set(obj, key, value);
    return obj;
  }, {});
  return floatObject;
};

export function parseYodleeTransaction(transaction) {
  const category = `yodlee_${transaction.categoryId}`;
  const name = get(transaction, 'description.original');
  const strippedName = stripNonAlphabeticCharacters(name);
  const parsedTransaction = {
    originalData: transaction,
    yodleeId: get(transaction, 'id'),
    date: get(transaction, 'postDate'),
    name,
    strippedName,
    amount: get(transaction, 'amount.amount'),
    category: yodleeCategoryIdToFisecalCategoryIdMap[category],
    baseType: get(transaction, 'baseType'),
    merchantName: get(transaction, 'merchant.name'),
    accountId: get(transaction, 'accountId'),
    isRecurring: false,
    frequency: null,
  };
  return parsedTransaction;
}

export function parseAccountsForSideNav(accounts, toggleStates) {
  if (isEmpty(accounts)) {
    return {
      bank: [],
      investment: [],
      creditCard: [],
      loan: [],
      additionalAsset: []
    };
  }
  const accountKeys = Object.keys(accounts);
  const parsedAccounts = {};
  accountKeys.forEach((key) => {
    parsedAccounts[key] = accounts[key].map(acct => { //eslint-disable-line
      if (toggleStates[acct.id]) {
        return {
          title: get(acct, 'providerName'),
          amount: get(acct, 'availableBalance.amount') || get(acct, 'balance.amount'),
          subTitle: capitalizeFirstLetter(get(acct, 'accountName')),
          accountId: get(acct, 'id')
        };
      }
    }).filter(acct => !isEmpty(acct));
  });
  return parsedAccounts;
}

export function parseYodleeAccountsObjectByKey(accounts, key) {
  const vals = flatten(values(accounts));
  const parsedAccountValues = vals.map(acct => acct[key]);
  return parsedAccountValues;
}

export function parseAccountIds(accounts) {
  return parseYodleeAccountsObjectByKey(accounts, 'id');
}

export function parseTransactionFieldset(transaction) {
  const { originalData } = transaction;
  const originalTransaction = parseYodleeTransaction(originalData);
  const fieldset = {
    userId: get(transaction, 'userId'),
    accountId: get(transaction, 'accountId'),
    merchantId: get(transaction, 'merchantId'),
    strippedName: get(transaction, 'strippedName'),
    originalName: get(originalTransaction, 'name'),
    name: get(transaction, 'name'),
    originalCategory: get(originalTransaction, 'category'),
    category: get(transaction, 'category'),
    isRecurring: get(transaction, 'isRecurring', false),
    frequency: get(transaction, 'frequency', null),
    baseType: get(transaction, 'baseType', null),
    date: get(transaction, 'date', null)
  };
  return fieldset;
}

export function parseConnectedAccountsFromTransactions(transactions) {
  const accounts = uniqBy(transactions, 'accountId');
  const connectedAccounts = accounts.reduce((obj, acct) => (
    obj[acct.id] = true // eslint-disable-line no-param-reassign
  ), {});
  return connectedAccounts;
}

export function parseEligibleGoal({
  goal,
  accounts,
  balances
}) {
  const {
    type,
    nickname,
    desiredPaymentPerMonth,
    accountId,
    id
  } = goal;
  /*
  * The "actual amount" is the difference between the account's current balance
  * and the balance of the account at the beginning of the month.  Depending on
  * the type of goal, the opposite may be true.
  */
  const account = accounts.find(acct => acct.id === accountId);
  const currentBalance = get(account, 'balance.amount', NUMBER_ZERO);
  const accountBalanceData = balances.find(acct => acct.id === accountId);
  const startingBalance = accountBalanceData ? get(
    accountBalanceData,
    'historicalBalances[0].balance.amount',
    currentBalance
  ) : currentBalance;
  const actualAmount = calculateProgressAmount(type, startingBalance, currentBalance);
  return {
    type,
    nickname,
    actualAmount,
    monthlyAmount: parseFloat(desiredPaymentPerMonth),
    id
  };
}

export function parseIneligibleGoal(goal) {
  const {
    type,
    nickname,
    desiredPaymentPerMonth,
    id
  } = goal;
  const monthlyAmount = parseFloat(desiredPaymentPerMonth);
  return {
    type,
    nickname,
    monthlyAmount,
    actualAmount: NUMBER_ZERO,
    id
  };
}

export function parseDashboardGoals({
  goals,
  enabledYodleeAccounts,
  balances
}) {
  const enabledAccountIds = enabledYodleeAccounts.map(acct => acct.id);
  const enabledGoals = goals.filter(goal => enabledAccountIds.includes(goal.accountId));
  const groupedGoals = groupBy(enabledGoals, 'accountId');
  const enabledGoalAccountIds = Object.keys(groupedGoals);

  const parsedGoals = enabledGoalAccountIds.reduce((parsedGoalsArray, key) => {
    const goalsForAccount = groupedGoals[key];
    const [selectedGoal, ...otherGoals] = orderGoals(goalsForAccount);
    const parsedEligibleGoal = parseEligibleGoal({
      goal: selectedGoal,
      accounts: enabledYodleeAccounts,
      balances
    });
    const parsedIneligibleGoals = otherGoals.map(goal => parseIneligibleGoal(goal));
    parsedGoalsArray.push(
      parsedEligibleGoal,
      ...parsedIneligibleGoals
    );
    return parsedGoalsArray;
  }, []);

  return parsedGoals;
}

export function parseGoalSummary(goals) {
  const startingSummary = {
    totalActualAmountThisMonth: 0,
    totalAnticipatedMonthlyAmount: 0
  };
  if (isEmpty(goals)) return startingSummary;
  const goalSummary = goals.reduce((summary, goal) => ({
    totalActualAmountThisMonth:
      summary.totalActualAmountThisMonth + goal.actualAmount,
    totalAnticipatedMonthlyAmount:
      summary.totalAnticipatedMonthlyAmount + goal.monthlyAmount
  }), startingSummary);
  return goalSummary;
}

export function parsePredictedFieldsets(fieldsets) {
  return fieldsets.map(fset => (
    {
      ...fset,
      amount: fset.averageAmount,
      date: createMomentAndFormat(
        fset.predictedDate,
        defaultDateFormat,
        dbDateFormat
      )
    }
  ));
}
