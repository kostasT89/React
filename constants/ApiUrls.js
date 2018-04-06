
export const appConfigUrl = id => `users/${id}/config`;

  export const usersGenericUrl = 'users/';
  export const usersUrl = id => `${usersGenericUrl}${id}`;
  export const updateUserCurrentStatusUrl = id => `${usersUrl(id)}/updateCurrentStatus`;
  export const userVerifyPasswordUrl = userId => `${usersGenericUrl}${userId}/verifyPassword`;

  export const hoursEntryUrl = 'hoursEntry';

  // Yodlee
  export const fastLinkUrl = 'fastLink';
  export const yodleeAccountUrl = (userId, accountId) => `yodlee/users/${userId}/accounts/${accountId}`;
  export const yodleeAccountsUrl = id => `yodlee/users/${id}/accounts/`;
  export const yodleeAcctTransactionsUrl = id => `yodlee/accounts/${id}/transactions`;
  export const yodleeUserTransactionsUrl = id => `yodlee/users/${id}/transactions`;
  export const yodleeUserTransactionUrl = (userId, transactionId) => `yodlee/users/${userId}/transactions/${transactionId}`;
  export const yodleeAccountBalancesUrl = id => `yodlee/users/${id}/balances`;

  // Accounts
  export const accountUrl = (userId, accountId) => `users/${userId}/accounts/${accountId}`;
  export const accountsUrl = userId => `users/${userId}/accounts`;
  export const importAccountsUrl = userId => `users/${userId}/sync/importAccounts`;

  // Transactions
  export const acctTransactionUrl = (acctId, transactionId) => `accounts/${acctId}/transactions/${transactionId}`;
  export const acctTransactionsUrl = id => `accounts/${id}/transactions`;
  export const userTransactionUrl = (userId, transactionId) => `users/${userId}/transactions/${transactionId}`;
  export const userTransactionsUrl = id => `users/${id}/transactions`;
  export const calculateTransactionSummaryUrl = 'analysis/calculateTransactionSummary';
  export const importTransactionsUrl = userId => `users/${userId}/sync/importTransactions`;

  // Transaction Fieldsets
  export const transactionFieldsetsUrl = id => `users/${id}/fieldsets`;
  export const importTransactionFieldsetsUrl = id => `users/${id}/sync/importUserTransactionFieldsets`;
  export const importBillsUrl = id => `users/${id}/sync/importBills`;
  export const importIncomesUrl = id => `users/${id}/sync/importIncomes`;
  export const predictFieldsetsUrl = id => `users/${id}/predict/fieldsets`;

  // Analysis Urls
  export const createIncomeSummaryUrl = id => `users/${id}/analysis/calculateIncomeSummary`;
  export const createBillSummaryUrl = id => `users/${id}/analysis/calculateBillSummary`;
  export const createPerExSummaryUrl = id => `users/${id}/analysis/calculatePerExSummary`;
  export const createTransactionsSummaryUrl = id => `users/${id}/analysis/calculateTransactionsSummary`;
  export const createFinancialOverviewUrl = id => `users/${id}/analysis/calculateFinancialOverview`;

  // Appointments
  export const appointmentsUrl = 'appointments';
  export const bookAppointmentUrl = 'booking/bookAppointment';

  // Goals
  export const goalUrl = (userId, goalId) => `users/${userId}/goals/${goalId}`;
  export const goalsUrl = userId => `users/${userId}/goals`;

  // Fin Plan
  const finPlanBase = finPlanId => `finPlans/${finPlanId}/`;
  export const finPlanUrl = finPlanId => `${finPlanBase(finPlanId)}`;
  export const finPlansUrl = 'finPlans/';

  export const storeCallInformationUrl = 'booking/storeCallInformation';

  // Fin Plan Breadcrumbs
  export const finPlanBreadcrumbUrl = (finPlanId, breadcrumbId) =>
    `${finPlanBase(finPlanId)}finPlanBreadcrumbs/${breadcrumbId}`;
  export const finPlanBreadcrumbsUrl = finPlanId =>
    `${finPlanBase(finPlanId)}finPlanBreadcrumbs`;

  // Fin Plan Personal Details
  export const finPlanPersonalDetailsUrl = finPlanId => `${finPlanBase(finPlanId)}finPlanPersonalDetails`;
  export const finPlanPersonalDetailUrl = (finPlanId, id) => `${finPlanPersonalDetailsUrl(finPlanId)}/${id}`;

  // Fin Plan Goals
  export const finPlanGoalsUrl = finPlanId => `${finPlanBase(finPlanId)}finPlanGoals`;
  export const finPlanGoalUrl = (finPlanId, id) => `${finPlanGoalsUrl(finPlanId)}/${id}`;

  // Fin Plan Income
  export const finPlanIncomesUrl = finPlanId => `${finPlanBase(finPlanId)}finPlanIncomes`;
  export const finPlanIncomeUrl = (finPlanId, id) => `${finPlanIncomesUrl(finPlanId)}/${id}`;

  // Fin Plan Insurance
  export const finPlanInsurancePoliciesUrl = finPlanId => `${finPlanBase(finPlanId)}finPlanInsurancePolicies`;
  export const finPlanInsurancePolicyUrl = (finPlanId, finPlanInsuranceId) => `${finPlanInsurancePoliciesUrl(finPlanId)}/${finPlanInsuranceId}`;

  // Fin Plan Assets
  export const finPlanAssetsUrl = finPlanId => `${finPlanBase(finPlanId)}finPlanAssets`;
  export const finPlanAssetUrl = (finPlanId, id) => `${finPlanAssetsUrl(finPlanId)}/${id}`;

  // Additional Assets
  export const additionalAssetsUrl = userId => `users/${userId}/assets`; // GET, CREATE
  export const additionalAssetUrl = (userId, id) => `users/${userId}/assets/${id}`; // UPDATE, DELETE

  // Fin Plan Liabilities
  export const finPlanLiabilitiesUrl = finPlanId => `${finPlanBase(finPlanId)}finPlanLiabilities`;
  export const finPlanLiabilityUrl = (finPlanId, liabilityId) => `${finPlanLiabilitiesUrl(finPlanId)}/${liabilityId}`;

  // Fin Plan Transactions
  export const finPlanTransactionsUrl = finPlanId => `${finPlanBase(finPlanId)}finPlanTransactions`;

  // Fin Plan Other Expenses
  export const finPlanOtherExpensesUrl = finPlanId => `${finPlanBase(finPlanId)}finPlanExpenses`;
  export const finPlanOtherExpenseUrl = (finPlanId, expenseId) => `${finPlanOtherExpensesUrl(finPlanId)}/${expenseId}`;

  // Fin Plan Bills
  export const finPlanBillsUrl = finPlanId => `${finPlanBase(finPlanId)}finPlanBills`;

  // Fin Plan Questions
  export const finPlanQuestionsUrl = finPlanId => `${finPlanBase(finPlanId)}finPlanQuestions`;
  export const finPlanQuestionUrl = (finPlanId, finPlanQuestionsId) => `${finPlanQuestionsUrl(finPlanId)}/${finPlanQuestionsId}`;

  // Fin Plan Payments
  export const finPlanPaymentUrl = finPlanId => `${finPlanBase(finPlanId)}finPlanPayment`;

  // Fin Plan Questions
  export const finPlanTaxReturnsUrl = finPlanId => `${finPlanBase(finPlanId)}finPlanTaxReturns`;
  export const finPlanTaxReturnUrl = (finPlanId, taxReturnId) => `${finPlanTaxReturnsUrl(finPlanId)}/${taxReturnId}`;

  // Settings (Preferences, Accounts)
  export const settingsAccountsUrl = id => `users/${id}/accounts`;
  export const settingsAccountUrl = (id, accountId) => `users/${id}/accounts/${accountId}`;
  // Settings
  export const accountSettingsProviderUrl = providerAccountId => `accountProvider/${providerAccountId}`;
  // Stripe
  export const stripePaymentInfoUrl = userId => `stripe/${userId}/paymentInfo`;
  export const retrieveSubscriptionUrl = userId => `stripe/${userId}/retrieveSubscription`;
  export const cancelSubscriptionUrl = userId => `stripe/${userId}/cancelSubscription`;
  // Refresh
  export const refreshTransactionsUrl = 'refresh/transactions';
