import isEmpty from 'lodash/isEmpty';
// Local Deps:
import {
        importTransactions,
        importTransactionsFail
      } from '../actions/global/transactions';
import {
        transactionFieldsToPropagate,
      } from '../config/properties';

export function checkIfTransactionMustUpsertFieldset(fieldMapping, transaction) {
  const isFieldThatPropagates = !!transactionFieldsToPropagate.find(
    field => field === fieldMapping
  );
  // In this case, we need to delete the fieldset:
  if (isFieldThatPropagates &&
    fieldMapping === 'isRecurring' &&
    !transaction.isRecurring) {
    return false;
  }
  return isFieldThatPropagates;
}

export function checkIfTransactionsShouldBeImported(enabledAccounts) {
  const accountsToConnect = enabledAccounts.filter(acct => !acct.hasConnectedTransactions);
  return !isEmpty(accountsToConnect);
}

export function importTransactionsForEnabledAccounts(enabledAccounts, dispatch) {
  const accountsToConnect = enabledAccounts.filter(acct => !acct.hasConnectedTransactions);
  // Connect Accounts Where Needed:
  if (!isEmpty(accountsToConnect)) {
    const yodleeAccountIds = accountsToConnect.map(acct => acct.yodleeId);
    return dispatch(importTransactions({
      yodleeAccountIds
    }));
  }
  return dispatch(importTransactionsFail());
}

export function calculateAverageSpendingPerMonth(transactions, numberOfMonths) {
  const total = transactions.reduce((sum, trans) => (
    sum + parseFloat(trans.amount)
  ), 0);

  return (total / numberOfMonths);
}
