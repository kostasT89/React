import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

/* Logged Out Pages */
import login from './login';
import signup from './signup';
import advisorLogin from './advisorLogin';

/* Logged In Pages */
import connect from './connect';
import dashboard from './dashboard';
import advisorDashboard from './advisorDashboard';
import transactions from './transactions';
import resetPassword from './resetPassword';
import globalReducer from './globalReducer';
import advisorConnect from './advisorConnect';
import advisorConnectInfo from './advisorConnectInfo';
import transactionsSummary from './transactionsSummary';
import accountTransactions from './accountTransactions';
import advisorConnectSuccess from './advisorConnectSuccess';
import savingsGoal from './Goals/savingsGoal';
import investmentGoal from './Goals/investmentGoal';
import creditCardGoal from './Goals/creditCardGoal';
import loanGoal from './Goals/loanGoal';
import goals from './Goals/goals';
import settings from './settings';
import sideNav from './sideNav';
import billSummary from './billSummary';
import incomeSummary from './incomeSummary';
import transactionMenu from './transactionMenu';
import financeSection from './financeSection';

/* Fin Plan */
import finPlan from './finPlan/finPlan';
import finPlanPersonalDetails from './finPlan/finPlanPersonalDetails';
import finPlanGoals from './finPlan/finPlanGoals';
import finPlanIncome from './finPlan/finPlanIncome';
import finPlanAssets from './finPlan/finPlanAssets';
import finPlanLiabilities from './finPlan/finPlanLiabilities';
import finPlanTransactions from './finPlan/finPlanTransactions';
import finPlanBills from './finPlan/finPlanBills';
import finPlanInsurance from './finPlan/finPlanInsurance';
import finPlanQuestions from './finPlan/finPlanQuestions';
import finPlanPayment from './finPlan/finPlanPayment';
import finPlanSuccess from './finPlan/finPlanSuccess';

const reducers = combineReducers({
  login,
  signup,
  advisorLogin,
  dashboard,
  advisorDashboard,
  connect,
  transactions,
  transactionsSummary,
  accountTransactions,
  advisorConnect,
  advisorConnectInfo,
  advisorConnectSuccess,
  savingsGoal,
  investmentGoal,
  creditCardGoal,
  loanGoal,
  goals,
  globalReducer,
  billSummary,
  incomeSummary,
  resetPassword,
  // Fin Plan
  finPlan,
  finPlanPersonalDetails,
  finPlanGoals,
  finPlanIncome,
  finPlanAssets,
  finPlanLiabilities,
  finPlanTransactions,
  finPlanBills,
  finPlanInsurance,
  finPlanQuestions,
  finPlanPayment,
  finPlanSuccess,
  settings,
  sideNav,
  transactionMenu,
  financeSection,
  // 3rd party for form and routing
  form: formReducer,
  routing: routerReducer,
});

export default reducers;
