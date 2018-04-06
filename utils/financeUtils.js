import Moment from 'moment';
import { extendMoment } from 'moment-range';
import yodleeCategories from '../constants/enums/yodleeCategories';
import {
  subtractDurationFromMoment
} from '../utils/dateUtils';
import DurationTypes from '../constants/enums/durationTypes';
// Constants
const moment = extendMoment(Moment);

const {
  atmCashWithdrawal,
  automotiveFuel,
  cableSatelliteTelecom,
  charitableGiving,
  checkPayment,
  creditCardPayments,
  deposits,
  education,
  electronicsMerchandise,
  entertainmentRecreation,
  expensesReimbursements,
  gifts,
  groceries,
  healthcareMedical,
  homeImprovement,
  insurance,
  interestIncome,
  investmentRetirementIncome,
  loans,
  mortgage,
  officeExpenses,
  otherExpenses,
  otherIncome,
  personalFamily,
  petsPetCare,
  postageShipping,
  refundsAdjustments,
  rent,
  restaurants,
  retirementContributions,
  rewards,
  salaryRegularIncome,
  salesServiceIncome,
  savings,
  securitiesTrades,
  serviceChargesFees,
  serviceSupplies,
  subscriptionsRenewals,
  taxes,
  transfer,
  travel,
  uncategorized,
  utilities,
} = yodleeCategories;

export function sortFinanceSummary(summary) {
  const income = {
    [salaryRegularIncome]: summary[salaryRegularIncome],
    [salesServiceIncome]: summary[salesServiceIncome],
    [investmentRetirementIncome]: summary[investmentRetirementIncome],
    [interestIncome]: summary[interestIncome],
    [rewards]: summary[rewards]
  };
  const uncategorizedIncome = {
    [expensesReimbursements]: summary[expensesReimbursements],
    [refundsAdjustments]: summary[refundsAdjustments],
    [deposits]: summary[deposits],
    [otherIncome]: summary[otherIncome]
  };
  const recurringCharges = {
    [mortgage]: summary[mortgage],
    [rent]: summary[rent],
    [subscriptionsRenewals]: summary[subscriptionsRenewals],
    [loans]: summary[loans],
    [utilities]: summary[utilities],
    [cableSatelliteTelecom]: summary[cableSatelliteTelecom],
    [insurance]: summary[insurance]
  };
  const livingExpenses = {
    [groceries]: summary[groceries],
    [restaurants]: summary[restaurants],
    [entertainmentRecreation]: summary[entertainmentRecreation],
    [healthcareMedical]: summary[healthcareMedical],
    [automotiveFuel]: summary[automotiveFuel],
    [electronicsMerchandise]: summary[electronicsMerchandise],
    [personalFamily]: summary[personalFamily],
    [petsPetCare]: summary[petsPetCare],
    [education]: summary[education],
    [travel]: summary[travel],
    [charitableGiving]: summary[charitableGiving],
    [gifts]: summary[gifts],
    [officeExpenses]: summary[officeExpenses],
    [serviceSupplies]: summary[serviceSupplies],
    [postageShipping]: summary[postageShipping],
    [serviceChargesFees]: summary[serviceChargesFees],
    [homeImprovement]: summary[homeImprovement],
    [taxes]: summary[taxes]
  };
  const uncategorizedExpenses = {
    [otherExpenses]: summary[otherExpenses],
    [uncategorized]: summary[uncategorized],
    [atmCashWithdrawal]: summary[atmCashWithdrawal],
    [checkPayment]: summary[checkPayment],
  };
  const savingsTransfers = {
    [retirementContributions]: summary[retirementContributions],
    [savings]: summary[savings],
    [securitiesTrades]: summary[securitiesTrades]
  };
  const transfers = {
    [creditCardPayments]: summary[creditCardPayments],
    [transfer]: summary[transfer]
  };
  return {
    income,
    uncategorizedIncome,
    recurringCharges,
    livingExpenses,
    uncategorizedExpenses,
    savingsTransfers,
    transfers
  };
}

export function groupBySummaryForComparisonTable(summary, lastDate) {
  const dateRanges = [];
  const categories = Object.keys(summary);
  const resultSummary = {};
  for (let i = 0; i < 3; i += 1) {
    const startDate = subtractDurationFromMoment(lastDate, i, DurationTypes.month)
                        .startOf(DurationTypes.month);
    const endDate = subtractDurationFromMoment(lastDate, i, DurationTypes.month)
                      .endOf(DurationTypes.month);
    dateRanges.push(moment.range(startDate, endDate));
  }
  categories.forEach((category) => {
    const monthDatas = [];
    for (let i = 0; i < 3; i += 1) {
      monthDatas.push({
        transactions: [],
        total: 0
      });
    }
    summary[category].transactions.forEach((transaction) => {
      dateRanges.forEach((dateRange, idx) => {
        if (dateRange.contains(moment(transaction.date))) {
          monthDatas[idx].transactions.push(transaction);
          monthDatas[idx].total += parseFloat(transaction.amount);
        }
      });
    });
    resultSummary[category] = monthDatas;
  });
  return resultSummary;
}

export function transactionsGroupByMonth(transactions) {
  const dateRanges = [];
  const monthsData = [];
  const lastDate = moment();

  for (let i = 0; i < 3; i += 1) {
    const startDate = subtractDurationFromMoment(lastDate, i, DurationTypes.month)
                        .startOf(DurationTypes.month);
    const endDate = subtractDurationFromMoment(lastDate, i, DurationTypes.month)
                      .endOf(DurationTypes.month);
    dateRanges.push(moment.range(startDate, endDate));
  }
  for (let i = 0; i < 3; i += 1) {
    monthsData.push({
      date: '',
      total: 0
    });
  }
  transactions.forEach((transaction) => {
    dateRanges.forEach((dateRange, idx) => {
      if (dateRange.contains(moment(transaction.date))) {
        monthsData[idx].date = subtractDurationFromMoment(
          lastDate,
          idx,
          DurationTypes.month).format('MMM');
        monthsData[idx].total += parseFloat(transaction.amount);
      }
    });
  });
  return monthsData.filter(data => data.total > 0);
}
