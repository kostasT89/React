import React from 'react';
import { Route, Redirect } from 'react-router';

import Routes from '../constants/Routes';
import PageWrapper from '../components/PageWrapper/PageWrapper';

import Home from '../pages/Home/Home';
import Connect from '../pages/Connect/Connect';
import AdvisorLogin from '../pages/AdvisorLogin/AdvisorLogin';
import AdvisorDashboard from '../pages/AdvisorDashboard/AdvisorDashboard';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import ConnectComplete from '../pages/ConnectComplete/ConnectComplete';
import NotFound from '../pages/NotFound/NotFound';
import Dashboard from '../pages/Dashboard/Dashboard';
import Transactions from '../pages/Transactions/Transactions';
import TransactionsSummary from '../pages/TransactionsSummary/TransactionsSummary';
import AdvisorConnect from '../pages/AdvisorConnect/AdvisorConnect';
import AdvisorConnectInfo from '../pages/AdvisorConnectInfo/AdvisorConnectInfo';
import AdvisorConnectSuccess from '../pages/AdvisorConnectSuccess/AdvisorConnectSuccess';
import AccountTransactions from '../pages/AccountTransactions/AccountTransactions';
import BillSummary from '../pages/BillSummary/BillSummary';
import IncomeSummary from '../pages/IncomeSummary/IncomeSummary';
import FinanceSection from '../pages/FinanceSection/FinanceSection';
import ComparisonTableSection from '../pages/ComparisonTableSection/ComparisonTableSection';
import ComparisonTransactions from '../pages/ComparisonTransactions/ComparisonTransactions';

/* Fisecal Goals */
import SelectGoalAccount from '../pages/Goals/SelectGoalAccount/SelectGoalAccount';
import SavingsGoal from '../pages/Goals/SavingsGoal/SavingsGoal';
import CreditCardGoal from '../pages/Goals/CreditCardGoal/CreditCardGoal';
import LoanGoal from '../pages/Goals/LoanGoal/LoanGoal';
import InvestmentGoal from '../pages/Goals/InvestmentGoal/InvestmentGoal';
import GoalComplete from '../pages/Goals/GoalComplete/GoalComplete';
import GoalSelect from '../pages/Goals/GoalSelect/GoalSelect';

/* Fin Plan */
import FinPlanIntro from '../pages/FinPlan/FinPlanIntro/FinPlanIntro';
import FinPlanDataOverView from '../pages/FinPlan/FinPlanDataOverview/FinPlanDataOverview';
import FinPlanPersonalDetails from '../pages/FinPlan/FinPlanPersonalDetails/FinPlanPersonalDetails';
import FinPlanGoals from '../pages/FinPlan/FinPlanGoals/FinPlanGoals';
import FinPlanIncome from '../pages/FinPlan/FinPlanIncome/FinPlanIncome';
import FinPlanAssets from '../pages/FinPlan/FinPlanAssets/FinPlanAssets';
import FinPlanLiabilities from '../pages/FinPlan/FinPlanLiabilities/FinPlanLiabilities';
import FinPlanTransactions from '../pages/FinPlan/FinPlanTransactions/FinPlanTransactions';
import FinPlanBills from '../pages/FinPlan/FinPlanBills/FinPlanBills';
import FinPlanInsurance from '../pages/FinPlan/FinPlanInsurance/FinPlanInsurance';
import FinPlanQuestions from '../pages/FinPlan/FinPlanQuestions/FinPlanQuestions';
import FinPlanPayment from '../pages/FinPlan/FinPlanPayment/FinPlanPayment';
import FinPlanSuccess from '../pages/FinPlan/FinPlanSuccess/FinPlanSuccess';
import Accounts from '../pages/Settings/Accounts/Accounts';
import Preferences from '../pages/Settings/Preferences/Preferences';

function checkAuth(nextState, replace) {
  const loggedIn = true;
  if (!loggedIn) {
    if (nextState.location.pathname === !Routes.login) {
      replace(Routes.login);
    }
  }
}

export default (
  <Route onEnter={checkAuth}>
    <Route component={PageWrapper}>
      <Route path={Routes.dashboard} component={Dashboard} />
      <Route path={Routes.transactions} component={Transactions} />
      <Route path={Routes.accountTransactions} component={AccountTransactions} />
      <Route path={Routes.transactionsSummary} component={TransactionsSummary} />
      <Route path={Routes.advisorConnect} component={AdvisorConnect} />
      <Route path={Routes.advisorConnectInfo} component={AdvisorConnectInfo} />
      <Route path={Routes.advisorConnectSuccess} component={AdvisorConnectSuccess} />
      <Route path={Routes.selectGoalAccount} component={SelectGoalAccount} />
      <Route path={Routes.savingsGoal} component={SavingsGoal} />
      <Route path={Routes.creditCardGoal} component={CreditCardGoal} />
      <Route path={Routes.loanGoal} component={LoanGoal} />
      <Route path={Routes.investmentGoal} component={InvestmentGoal} />
      <Route path={Routes.goalComplete} component={GoalComplete} />
      <Route path={Routes.goalSelect} component={GoalSelect} />
      <Route path={Routes.billSummary} component={BillSummary} />
      <Route path={Routes.incomeSummary} component={IncomeSummary} />
      <Route path={Routes.finances} component={FinanceSection} />
      <Route path={Routes.financeComparison} component={ComparisonTableSection} />
      <Route path={Routes.comparisonTransactions} component={ComparisonTransactions} />
      {/* Start Fin Plan Pages */}
      <Route path={Routes.finPlanPersonalDetails} component={FinPlanPersonalDetails} />
      <Route path={Routes.financialPlan} component={FinPlanIntro} />
      <Route path={Routes.finPlanGoals} component={FinPlanGoals} />
      <Route path={Routes.finPlanIncome} component={FinPlanIncome} />
      <Route path={Routes.finPlanAssets} component={FinPlanAssets} />
      <Route path={Routes.finPlanLiabilities} component={FinPlanLiabilities} />
      <Route path={Routes.finPlanTransactions} component={FinPlanTransactions} />
      <Route path={Routes.finPlanBills} component={FinPlanBills} />
      <Route path={Routes.finPlanInsurance} component={FinPlanInsurance} />
      <Route path={Routes.finPlanQuestions} component={FinPlanQuestions} />
      <Route path={Routes.finPlanPayment} component={FinPlanPayment} />
      <Route path={Routes.finPlanSuccess} component={FinPlanSuccess} />
      <Route path={Routes.finPlanDataOverview} component={FinPlanDataOverView} />
      {/* End Fin Plan Pages */}
      <Route path={Routes.settingsAccounts} component={Accounts} />
      <Route path={Routes.settingsPreferences} component={Preferences} />
      <Route path={Routes.connect} component={Connect} />
    </Route>
    <Route path={Routes.connectComplete} component={ConnectComplete} />
    <Route path={Routes.home} component={Home} />
    <Route path={Routes.resetPassword} component={ResetPassword} />
    <Route path={Routes.advisorLogin} component={AdvisorLogin} />
    <Route path={Routes.advisorDashboard} component={AdvisorDashboard} />
    <Route path={Routes.notFound} component={NotFound} />
    <Redirect from="/" to={Routes.home} />
    <Redirect from="*" to={Routes.notFound} />
  </Route>
);
