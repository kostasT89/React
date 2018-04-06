import pickBy from 'lodash/pickBy';
import keys from 'lodash/keys';

import transactionTypes from '../constants/enums/transactionTypes';

export const spacer = {
  value: '------------------------',
  disabled: true
};

export function formatYodleeCategorySelectOptions(categories) {
  const copy = { ...categories };
  copy.income = {
    value: 'Income:',
    disabled: true
  };
  copy.expenses = {
    value: 'Bill/Expenses:',
    disabled: true
  };
  copy.other = {
    value: 'Other:',
    disabled: true
  };
  copy.income_spacer = spacer;
  copy.expenses_spacer = spacer;
  copy.other_spacer = spacer;
  return copy;
}

export function formatYodleeCategorySelectOrder(categories) {
  const expenses = keys(pickBy(categories, { type: transactionTypes.expense }));
  const income = keys(pickBy(categories, { type: transactionTypes.income }));
  const other = keys(pickBy(categories, cat => (
    cat.type !== transactionTypes.expense && cat.type !== transactionTypes.income
  )));
  const orderedCategories = [
    'income',
    'income_spacer',
    ...income,
    'expenses',
    'expenses_spacer',
    ...expenses,
    'other',
    'other_spacer',
    ...other
  ];
  return orderedCategories;
}
