import { browserHistory } from 'react-router';
import Routes from '../constants/Routes';
import {
        determineFurthestStep,
        sortBreadcrumbs
      } from './finPlan/finPlanUtils';

export function scrollToTopOfDiv(className) {
  const scrollableContentDiv = document.getElementsByClassName(className)[0];
  if (scrollableContentDiv) {
    scrollableContentDiv.scrollTop = 0;
  }
}

export function forwardTo(location) {
  scroll(0, 0);
  browserHistory.push(location);
}

export function forwardToDashboard() {
  forwardTo(Routes.dashboard);
}

export function forwardToLogin() {
  forwardTo(Routes.login);
}

export function forwardToHome() {
  forwardTo(Routes.home);
}

export function forwardToAdvisorDashboard() {
  forwardTo(Routes.advisorDashboard);
}

export function forwardToConnect() {
  forwardTo(Routes.connect);
}

export function forwardToIncomeSummary() {
  forwardTo(Routes.incomeSummary);
}

export function forwardToBillSummary() {
  forwardTo(Routes.billSummary);
}

export function forwardToTransactions() {
  forwardTo(Routes.transactions);
}

export function forwardToFinPlanPayment() {
  forwardTo(Routes.finPlanPayment);
}

export function forwardToFinPlanPersonalDetails() {
  forwardTo(Routes.finPlanPersonalDetails);
}

export function forwardToFinPlanGoals() {
  forwardTo(Routes.finPlanGoals);
}

export function forwardToFurthestFinPlanPage(breadcrumbs) {
  const sortedBreadcrumbs = sortBreadcrumbs(breadcrumbs);
  const step = determineFurthestStep(sortedBreadcrumbs);
  forwardTo(step.route);
}

export function forwardToFinPlanIncomePage() {
  forwardTo(Routes.finPlanIncome);
}

export function forwardToFinPlanAssetsPage() {
  forwardTo(Routes.finPlanAssets);
}

export function forwardToFinPlanBills() {
  forwardTo(Routes.finPlanBills);
}

export function forwardToFinPlanPaymentPage() {
  forwardTo(Routes.finPlanPayment);
}

export function forwardToFinPlanTransactions() {
  forwardTo(Routes.finPlanTransactions);
}

export function forwardToFinPlanQuestions() {
  forwardTo(Routes.finPlanQuestions);
}

export function forwardToFinPlanSuccess() {
  forwardTo(Routes.finPlanSuccess);
}
