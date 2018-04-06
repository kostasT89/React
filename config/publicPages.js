import Routes from '../constants/Routes';

const finPlanPages = [
  Routes.financialPlan,
  Routes.finPlanGoals,
  Routes.finPlanIncome,
  Routes.finPlanAssets,
  Routes.finPlanLiabilities,
  Routes.finPlanTransactions,
  Routes.finPlanBills,
  Routes.finPlanInsurance,
  Routes.finPlanQuestions,
  Routes.finPlanPayment,
  Routes.finPlanSuccess,
  Routes.finPlanDataOverview
];

const goalPages = [
  Routes.savingsGoal,
  Routes.creditCardGoal,
  Routes.investmentGoal,
  Routes.loanGoal,
  Routes.selectGoalAccount,
  Routes.transactionsByAccount,
  Routes.goalConnect,
  Routes.goalComplete,
  Routes.goalSelect,
];

export default [
  Routes.home,
  Routes.dashboard,
  Routes.connect,
  Routes.connectComplete,
  Routes.settingsAccounts,
  Routes.settingsPreferences,
  Routes.accountTransactions,
  Routes.transactions,
  Routes.transactionsSummary,
  Routes.billSummary,
  Routes.incomeSummary,
  Routes.advisorConnect,
  Routes.advisorConnectInfo,
  Routes.advisorConnectSuccess,
  Routes.finPlanPersonalDetails,
  Routes.finances,
  Routes.financeComparison,
  Routes.comparisonTransactions,
  ...goalPages,
  ...finPlanPages
];
