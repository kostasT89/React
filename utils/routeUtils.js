import Routes from '../constants/Routes';
import objectToQueryString from './queryStringUtils';

import {
  defaultPaginationPage,
  defaultPaginationCount
} from '../config/properties';

export function populateAccountTransactionsRoute({ accountId, page, count }) {
  const route = Routes.accountTransactions.replace(':accountId', accountId);
  const queryString = objectToQueryString({
    page: page || defaultPaginationPage,
    count: count || defaultPaginationCount
  });
  return `${route}${queryString}`;
}

export function populateTransactionsRoute({ page, count }) {
  const route = Routes.transactions;
  const queryString = objectToQueryString({
    page: page || defaultPaginationPage,
    count: count || defaultPaginationCount
  });
  return `${route}${queryString}`;
}

export function populateFinPlanTransactionsRoute({ page, count }) {
  const route = Routes.finPlanTransactions;
  const queryString = objectToQueryString({
    page: page || defaultPaginationPage,
    count: count || defaultPaginationCount
  });
  return `${route}${queryString}`;
}

export function populateGoalPageRoute(goalRoute, accountId) {
  if (!accountId) return goalRoute;
  const queryString = objectToQueryString({ accountId });
  return `${goalRoute}${queryString}`;
}

export function populateGoalSelectionRoute(goalType) {
  const route = Routes.selectGoalAccount.replace(':goalType', goalType);
  return route;
}
