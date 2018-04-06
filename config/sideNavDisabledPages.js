import Routes from '../constants/Routes';

export const partiallyDisabledPages = [
  Routes.incomeSummary,
  Routes.billSummary,
  Routes.transactions
];

export default [
  Routes.connect,
  Routes.connectComplete,
  ...partiallyDisabledPages
];
