import isEmpty from 'lodash/isEmpty';

// Local Deps
import Routes from '../constants/Routes';
// Utils
import { checkIfTransactionsShouldBeImported } from './transactionUtils';
import {
        forwardToIncomeSummary,
        forwardToBillSummary,
      } from './navigationUtils';
// Actions
import {
        importIncomes,
        importIncomesFail,
        importBills,
        importBillsFail
      } from '../actions/global/transactionFieldsets';

const allowedRoutes = [
  Routes.connect,
  Routes.transactions,
  Routes.incomeSummary,
  Routes.billSummary,
  Routes.transactionsSummary,
];

export function checkIfBillsShouldBeImported(enabledAccounts) {
  const accountsToImportBills = enabledAccounts.filter(acct => !acct.hasImportedBills);
  return !isEmpty(accountsToImportBills);
}

export function checkIfIncomeShouldBeImported(enabledAccounts) {
  const accountsToImportIncome = enabledAccounts.filter(acct => !acct.hasImportedIncome);
  return !isEmpty(accountsToImportIncome);
}

export function importIncomesForEnabledAccounts({
  enabledAccounts,
  dispatch,
  dateStart,
  dateEnd
}) {
  const shouldImportIncome = checkIfIncomeShouldBeImported(enabledAccounts);
  if (shouldImportIncome) {
    return dispatch(importIncomes({ dateStart, dateEnd }));
  }
  return dispatch(importIncomesFail());
}

export function importBillsForEnabledAccounts({
  enabledAccounts,
  dispatch,
  dateStart,
  dateEnd
}) {
  const shouldImportBills = checkIfBillsShouldBeImported(enabledAccounts);
  if (shouldImportBills) {
    return dispatch(importBills({ dateStart, dateEnd }));
  }
  return dispatch(importBillsFail());
}

export function checkForIncompleteConnectStates(enabledAccounts, route) {
  if (allowedRoutes.includes(route)) return false;
  // Check accounts
  const shouldImportTransactions = checkIfTransactionsShouldBeImported(enabledAccounts);
  const shouldImportIncome = checkIfIncomeShouldBeImported(enabledAccounts);
  const shouldImportBills = checkIfBillsShouldBeImported(enabledAccounts);
  // Forward to Income Summary
  if (shouldImportTransactions || shouldImportIncome) {
    return forwardToIncomeSummary();
  }
  // Forward to Bills Summary
  if (shouldImportBills) {
    return forwardToBillSummary();
  }
  return false;
}

export function checkForCompletedConnectFlow(enabledAccounts) {
  const connectedAccount = enabledAccounts.find(acct =>
    acct.hasImportedIncome && acct.hasImportedBills && acct.hasConnectedTransactions
  );
  return !!connectedAccount;
}
