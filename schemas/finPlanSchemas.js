import { CURRENCY_ZERO } from '../config/properties';
import types from '../constants/enums/finPlanSchemaTypes';

const description = 'Enter Description';

export default {
  [types.bill]: {
    value: 0,
    frequency: 'monthly',
    type: description,
  },
  [types.liability]: {
    description,
    value: CURRENCY_ZERO
  },
  [types.majorIncomeEvent]: {
    description,
    plans: 'Plan for funds?',
    value: 0
  },
  [types.majorExpenseEvent]: {
    description,
    plans: 'Plan for expense?',
    value: 0
  }
};
