import get from 'lodash/get';
import filter from 'lodash/filter';

import displayTypes from '../constants/enums/displayTypes';
import accountTypes from '../constants/enums/accountTypes';
import cols from '../constants/enums/fisecalAccountAttributes';
import cms from '../config/messages';

// Initialize
import {
  emptyValue,
  shortDefaultDateFormat,
  yodleeDateFormat
} from '../config/properties';

const {
  currency,
  date,
  percentage,
  string
} = displayTypes;

// Small helper function
const getCaption = key => cms[`text.${key}`];

export const accountSummaryCols = {
  [cols.balance]: {
    key: cols.balance,
    yodleeMapping: 'balance.amount',
    text: getCaption(cols.balance),
    type: currency
  },
  [cols.availableBalance]: {
    key: cols.availableBalance,
    yodleeMapping: 'availableBalance.amount',
    text: getCaption(cols.availableBalance),
    type: currency
  },
  [cols.vestedBalance]: {
    key: cols.vestedBalance,
    yodleeMapping: 'vestedBalance',
    text: getCaption(cols.vestedBalance),
    type: currency
  },
  [cols.ytdInterest]: {
    key: cols.ytdInterest,
    yodleeMapping: 'ytdInterest',
    text: getCaption(cols.ytdInterest),
    type: currency
  },
  [cols.maturityDate]: {
    key: cols.maturityDate,
    yodleeMapping: 'maturityDate',
    text: getCaption(cols.maturityDate),
    type: date,
    inputDateFormat: yodleeDateFormat,
    outputDateFormat: shortDefaultDateFormat
  },
  [cols.ytdFeesPaid]: {
    key: cols.ytdFeesPaid,
    yodleeMapping: 'ytdFeesPaid',
    text: getCaption(cols.ytdFeesPaid),
    type: currency
  },
  [cols.apy]: {
    key: cols.apy,
    yodleeMapping: 'apy.amount',
    text: getCaption(cols.apy),
    type: percentage
  },
  [cols.apr]: {
    key: cols.apr,
    yodleeMapping: 'apr.amount',
    text: getCaption(cols.apr),
    type: percentage
  },
  [cols.ytdInterestAndFeesPaid]: {
    key: cols.ytdInterestAndFeesPaid,
    yodleeMapping: 'ytdInterestAndFeesPaid',
    text: getCaption(cols.ytdInterestAndFeesPaid),
    type: currency
  },
  [cols.dueDate]: {
    key: cols.dueDate,
    yodleeMapping: 'dueDate',
    text: getCaption(cols.dueDate),
    type: date,
    inputDateFormat: yodleeDateFormat,
    outputDateFormat: shortDefaultDateFormat
  },
  [cols.nextPayment]: {
    key: cols.nextPayment,
    yodleeMapping: 'nextPayment',
    text: getCaption(cols.nextPayment),
    type: currency
  },
  [cols.minimumAmountDue]: {
    key: cols.minimumAmountDue,
    yodleeMapping: 'minimumAmountDue.amount',
    text: getCaption(cols.minimumAmountDue),
    type: currency
  },
  [cols.availableCredit]: {
    key: cols.availableCredit,
    yodleeMapping: 'availableCredit.amount',
    text: getCaption(cols.availableCredit),
    type: currency
  },
  [cols.totalCreditLine]: {
    key: cols.totalCreditLine,
    yodleeMapping: 'totalCreditLine.amount',
    text: getCaption(cols.totalCreditLine),
    type: currency
  },
  [cols.createdDate]: {
    key: cols.createdDate,
    yodleeMapping: 'createdDate',
    text: getCaption(cols.createdDate),
    type: date,
    inputDateFormat: yodleeDateFormat,
    outputDateFormat: shortDefaultDateFormat
  },
  [cols.accountType]: {
    key: cols.accountType,
    yodleeMapping: 'accountType',
    text: getCaption(cols.accountType),
    type: string
  },
};

export function createSchemaTemplate(account) {
  // Take accountCols and add values from account var
  const keys = Object.keys(accountSummaryCols);
  const schemaTemplate = keys.reduce((template, key) => {
    const col = accountSummaryCols[key];
    const config = Object.assign({}, col, {
      value: get(account, col.yodleeMapping, emptyValue)
    });
    template[key] = config; // eslint-disable-line no-param-reassign
    return template;
  }, {});
  return schemaTemplate;
}

export function configureAccountSchema(account) {
  const template = createSchemaTemplate(account);
  const {
    balance,
    availableBalance,
    vestedBalance,
    ytdInterest,
    maturityDate,
    ytdFeesPaid,
    apy,
    apr,
    ytdInterestAndFeesPaid,
    dueDate,
    nextPayment,
    minimumAmountDue,
    availableCredit,
    totalCreditLine,
    accountType,
  } = template;
  // Choose which keys to display per container
  const accountContainer = (account.accountType === accountTypes.cd) ?
    account.accountType :
    account.CONTAINER;
  // Customize summary schema based on account type:
  switch (accountContainer) {
    case accountTypes.bank:
      return [
        balance,
        availableBalance,
        ytdFeesPaid,
        apy,
        ytdInterest,
      ];
    case accountTypes.cd:
      return [
        balance,
        apy,
        ytdInterest,
        maturityDate,
        ytdFeesPaid,
      ];
    case accountTypes.creditCard:
      return [
        balance,
        availableCredit,
        totalCreditLine,
        minimumAmountDue,
        dueDate,
        apr,
        ytdInterestAndFeesPaid
      ];
    case accountTypes.loan:
      return [
        balance,
        nextPayment,
        dueDate,
        apr,
        ytdInterestAndFeesPaid
      ];
    case accountTypes.investment:
      return [
        balance,
        vestedBalance,
        accountType,
        ytdFeesPaid
      ];
    case accountTypes.additionalAsset:
    default:
      return [balance];
  }
}


export function createSummarySchema(account) {
  const schema = configureAccountSchema(account);
  const cleanSchema = filter(schema, acct => acct.value === 0 || !!acct.value);
  return cleanSchema;
}
