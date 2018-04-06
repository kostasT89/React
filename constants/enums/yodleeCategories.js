const yodleeCategories = {
  atmCashWithdrawal: 'atmCashWithdrawal',
  automotiveFuel: 'automotiveFuel',
  cableSatelliteTelecom: 'cableSatelliteTelecom',
  charitableGiving: 'charitableGiving',
  checkPayment: 'checkPayment',
  creditCardPayments: 'creditCardPayments',
  deposits: 'deposits',
  education: 'education',
  electronicsMerchandise: 'electronicsMerchandise',
  entertainmentRecreation: 'entertainmentRecreation',
  expensesReimbursements: 'expensesReimbursements',
  gifts: 'gifts',
  groceries: 'groceries',
  healthcareMedical: 'healthcareMedical',
  homeImprovement: 'homeImprovement',
  insurance: 'insurance',
  interestIncome: 'interestIncome',
  investmentRetirementIncome: 'investmentRetirementIncome',
  loans: 'loans',
  mortgage: 'mortgage',
  officeExpenses: 'officeExpenses',
  otherExpenses: 'otherExpenses',
  otherIncome: 'otherIncome',
  personalFamily: 'personalFamily',
  petsPetCare: 'petsPetCare',
  postageShipping: 'postageShipping',
  refundsAdjustments: 'refundsAdjustments',
  rent: 'rent',
  restaurants: 'restaurants',
  retirementContributions: 'retirementContributions',
  rewards: 'rewards',
  salaryRegularIncome: 'salaryRegularIncome',
  salesServiceIncome: 'salesServiceIncome',
  savings: 'savings',
  securitiesTrades: 'securitiesTrades',
  serviceChargesFees: 'serviceChargesFees',
  serviceSupplies: 'serviceSupplies',
  subscriptionsRenewals: 'subscriptionsRenewals',
  taxes: 'taxes',
  transfer: 'transfer',
  travel: 'travel',
  uncategorized: 'uncategorized',
  utilities: 'utilities'
};

export default yodleeCategories;

export const yodleeCategoryIdToFisecalCategoryIdMap = {
  yodlee_25: yodleeCategories.atmCashWithdrawal,
  yodlee_2: yodleeCategories.automotiveFuel,
  yodlee_15: yodleeCategories.cableSatelliteTelecom,
  yodlee_3: yodleeCategories.charitableGiving,
  yodlee_33: yodleeCategories.checkPayment,
  yodlee_26: yodleeCategories.creditCardPayments,
  yodlee_27: yodleeCategories.deposits,
  yodlee_6: yodleeCategories.education,
  yodlee_43: yodleeCategories.electronicsMerchandise,
  yodlee_7: yodleeCategories.entertainmentRecreation,
  yodlee_114: yodleeCategories.expensesReimbursements,
  yodlee_9: yodleeCategories.gifts,
  yodlee_10: yodleeCategories.groceries,
  yodlee_11: yodleeCategories.healthcareMedical,
  yodlee_13: yodleeCategories.homeImprovement,
  yodlee_14: yodleeCategories.insurance,
  yodlee_96: yodleeCategories.interestIncome,
  yodlee_30: yodleeCategories.investmentRetirementIncome,
  yodlee_17: yodleeCategories.loans,
  yodlee_18: yodleeCategories.mortgage,
  yodlee_45: yodleeCategories.officeExpenses,
  yodlee_19: yodleeCategories.otherExpenses,
  yodlee_32: yodleeCategories.otherIncome,
  yodlee_20: yodleeCategories.personalFamily,
  yodlee_42: yodleeCategories.petsPetCare,
  yodlee_104: yodleeCategories.postageShipping,
  yodlee_227: yodleeCategories.refundsAdjustments,
  yodlee_21: yodleeCategories.rent,
  yodlee_22: yodleeCategories.restaurants,
  yodlee_41: yodleeCategories.retirementContributions,
  yodlee_225: yodleeCategories.rewards,
  yodlee_29: yodleeCategories.salaryRegularIncome,
  yodlee_92: yodleeCategories.salesServiceIncome,
  yodlee_40: yodleeCategories.savings,
  yodlee_36: yodleeCategories.securitiesTrades,
  yodlee_24: yodleeCategories.serviceChargesFees,
  yodlee_16: yodleeCategories.serviceSupplies,
  yodlee_108: yodleeCategories.subscriptionsRenewals,
  yodlee_37: yodleeCategories.taxes,
  yodlee_28: yodleeCategories.transfer,
  yodlee_23: yodleeCategories.travel,
  yodlee_1: yodleeCategories.uncategorized,
  yodlee_39: yodleeCategories.utilities
};

export const fisecalCategories = {
  atmCashWithdrawal: {
    yodleeId: 25,
    value: 'ATM/Cash Withdrawal',
    type: 'Expenses'
  },
  automotiveFuel: {
    yodleeId: 2,
    value: 'Automotive/Fuel',
    type: 'Expenses'
  },
  cableSatelliteTelecom: {
    yodleeId: 15,
    value: 'Cable/Satelite/Telecom',
    type: 'Expenses'
  },
  charitableGiving: {
    yodleeIAd: 3,
    value: 'Charitable Giving',
    type: 'Expenses'
  },
  checkPayment: {
    yodleeId: 33,
    value: 'Check Payment',
    type: 'Expenses'
  },
  creditCardPayments: {
    yodleeId: 26,
    value: 'Credit Card Payments',
    type: 'Transfer'
  },
  deposits: {
    yodleeId: 27,
    value: 'Deposits',
    type: 'Income'
  },
  education: {
    yodleeId: 6,
    value: 'Education',
    type: 'Expenses'
  },
  electronicsMerchandise: {
    yodleeId: 43,
    value: 'Electronics/Merchandise',
    type: 'Expenses'
  },
  entertainmentRecreation: {
    yodleeId: 7,
    value: 'Entertainment/Recreation',
    type: 'Expenses'
  },
  expensesReimbursements: {
    yodleeId: 114,
    value: 'Expenses Reimbursements',
    type: 'Income'
  },
  gifts: {
    yodleeId: 9,
    value: 'Gifts',
    type: 'Expenses'
  },
  groceries: {
    yodleeId: 10,
    value: 'Groceries',
    type: 'Expenses'
  },
  healthcareMedical: {
    yodleeId: 11,
    value: 'Healthcare/Medical',
    type: 'Expenses'
  },
  homeImprovement: {
    yodleeId: 13,
    value: 'Home Improvement',
    type: 'Expenses'
  },
  insurance: {
    yodleeId: 14,
    value: 'Insurance',
    type: 'Expenses'
  },
  interestIncome: {
    yodleeId: 96,
    value: 'Interest Income',
    type: 'Income'
  },
  investmentRetirementIncome: {
    yodleeId: 30,
    value: 'Investment/Retirement Income',
    type: 'Income'
  },
  loans: {
    yodleeId: 17,
    value: 'Loans',
    type: 'Expenses'
  },
  mortgage: {
    yodleeId: 18,
    value: 'Mortgage',
    type: 'Expenses'
  },
  officeExpenses: {
    yodleeId: 45,
    value: 'Office Expenses',
    type: 'Expenses'
  },
  otherExpenses: {
    yodleeId: 19,
    value: 'Other Expenses',
    type: 'Expenses'
  },
  otherIncome: {
    yodleeId: 32,
    value: 'Other Income',
    type: 'Income'
  },
  personalFamily: {
    yodleeId: 20,
    value: 'Personal/Family',
    type: 'Expenses'
  },
  petsPetCare: {
    yodleeId: 42,
    value: 'Pets/Pet Care',
    type: 'Expenses'
  },
  postageShipping: {
    yodleeId: 104,
    value: 'Postage/Shipping',
    type: 'Expenses'
  },
  refundsAdjustments: {
    yodleeId: 227,
    value: 'Refunds/Adjustments',
    type: 'Income'
  },
  rent: {
    yodleeId: 21,
    value: 'Rent',
    type: 'Expenses'
  },
  restaurants: {
    yodleeId: 22,
    value: 'Restaurants',
    type: 'Expenses'
  },
  retirementContributions: {
    yodleeId: 41,
    value: 'Retirement Contributions',
    type: 'Deferred Compensation'
  },
  rewards: {
    yodleeId: 225,
    value: 'Rewards',
    type: 'Income'
  },
  salaryRegularIncome: {
    yodleeId: 29,
    value: 'Salary/Regular Income',
    type: 'Income'
  },
  salesServiceIncome: {
    yodleeId: 92,
    value: 'Sales/Service Income',
    type: 'Income'
  },
  savings: {
    yodleeId: 40,
    value: 'Savings',
    type: 'Transfer'
  },
  securitiesTrades: {
    yodleeId: 36,
    value: 'Securities Trades',
    type: 'Transfer'
  },
  serviceChargesFees: {
    yodleeId: 24,
    value: 'Service Charges/Fees',
    type: 'Expenses'
  },
  serviceSupplies: {
    yodleeId: 16,
    value: 'Service/Supplies',
    type: 'Expenses'
  },
  subscriptionsRenewals: {
    yodleeId: 108,
    value: 'Subscriptions/Renewals',
    type: 'Expenses'
  },
  taxes: {
    yodleeId: 37,
    value: 'Taxes',
    type: 'Expenses'
  },
  transfer: {
    yodleeId: 28,
    value: 'Transfer',
    type: 'Transfer'
  },
  travel: {
    yodleeId: 23,
    value: 'Travel',
    type: 'Expenses'
  },
  uncategorized: {
    yodleeId: 1,
    value: 'Uncategorized',
    type: 'General'
  },
  utilities: {
    yodleeId: 39,
    value: 'Utilities',
    type: 'Expenses'
  },
};
