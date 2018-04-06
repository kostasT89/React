import Routes from '../../constants/Routes';
import finPlanPages from '../../constants/enums/finPlanPages';

export default [
  {
    key: finPlanPages.finPlanPersonalDetails,
    name: 'Personal Details',
    route: Routes.finPlanPersonalDetails
  },
  {
    key: finPlanPages.finPlanGoals,
    name: 'Goals',
    route: Routes.finPlanGoals
  },
  {
    key: finPlanPages.finPlanIncome,
    name: 'Income',
    route: Routes.finPlanIncome
  },
  {
    key: finPlanPages.finPlanInsurance,
    name: 'Insurance',
    route: Routes.finPlanInsurance
  },
  {
    key: finPlanPages.finPlanAssets,
    name: 'Assets',
    route: Routes.finPlanAssets
  },
  {
    key: finPlanPages.finPlanLiabilities,
    name: 'Liabilities',
    route: Routes.finPlanLiabilities
  },
  {
    key: finPlanPages.finPlanTransactionReview,
    name: 'Transaction Review',
    route: Routes.finPlanTransactions
  },
  {
    key: finPlanPages.finPlanBillReview,
    name: 'Bill Review',
    route: Routes.finPlanBills
  },
  {
    key: finPlanPages.finPlanFinancialQuestions,
    name: 'Financial Questions',
    route: Routes.finPlanQuestions
  },
  {
    key: finPlanPages.finPlanPayment,
    name: 'Payment',
    route: Routes.finPlanPayment
  }
];
