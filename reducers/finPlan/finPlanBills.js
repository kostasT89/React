import get from 'lodash/get';
import finPlanSchemas from '../../schemas/finPlanSchemas';
import finPlanSchemaTypes from '../../constants/enums/finPlanSchemaTypes';

import {
  GET_FIN_PLAN_SUCCESS,
  PREDICT_BILLS_SUCCESS,
  UPDATE_FIN_PLAN_OTHER_EXPENSE_SUCCESS,
  DELETE_FIN_PLAN_OTHER_EXPENSE_SUCCESS,
  CREATE_FIN_PLAN_OTHER_EXPENSE_SUCCESS,
  BULK_CREATE_FIN_PLAN_OTHER_EXPENSES_SUCCESS,
  UPDATE_FIN_PLAN_BILLS_COMMENT_FOR_STORE,
  GET_FIN_PLAN_BILLS_COMMENT_SUCCESS,
} from '../../constants/AppConstants';

const initialState = {
  isFetchingBills: true,
  bills: [],
  otherExpenses: [],
  isLoading: true,
  comments: undefined
};

const actionMappings = {
  [GET_FIN_PLAN_SUCCESS]: '_receiveFinPlan',
  [PREDICT_BILLS_SUCCESS]: '_receiveUserBills',
  [BULK_CREATE_FIN_PLAN_OTHER_EXPENSES_SUCCESS]: '_receiveDefaultOtherExpenses',
  [UPDATE_FIN_PLAN_OTHER_EXPENSE_SUCCESS]: '_updateOtherExpense',
  [DELETE_FIN_PLAN_OTHER_EXPENSE_SUCCESS]: '_deleteOtherExpense',
  [CREATE_FIN_PLAN_OTHER_EXPENSE_SUCCESS]: '_createOtherExpense',
  [UPDATE_FIN_PLAN_BILLS_COMMENT_FOR_STORE]: '_updateFinPlanBillsComment',
  [GET_FIN_PLAN_BILLS_COMMENT_SUCCESS]: '_updateFinPlanBillsComment'
};

const reducer = {
  _receiveFinPlan(state, { finPlan }) {
    const finPlanOtherExpenses = get(finPlan, 'finPlanOtherExpenses', []);
    const otherExpenses = finPlanOtherExpenses.map(exp => ({
      ...exp.data,
      finPlanId: exp.finPlanId,
      id: exp.id
    }));
    return {
      ...state,
      otherExpenses,
      isFetchingFinPlan: false
    };
  },
  // This receives the response from auto-created, default "Other Expenses"
  _receiveDefaultOtherExpenses(state, { expenses }) {
    const otherExpenses = expenses ? expenses.map(exp => ({
      ...exp.data,
      finPlanId: exp.finPlanId
    })) : [];
    return {
      ...state,
      otherExpenses
    };
  },
  _receiveUserBills(state, { predictedBills }) {
    return {
      ...state,
      bills: predictedBills,
      isFetchingBills: false
    };
  },
  _deleteOtherExpense(state, { expenseId }) {
    const { otherExpenses } = state;
    const filteredExpenses = otherExpenses.filter(expense => expense.id !== expenseId);
    return {
      ...state,
      otherExpenses: filteredExpenses
    };
  },
  _updateOtherExpense(state, { expense }) {
    const { otherExpenses } = state;
    const index = otherExpenses.findIndex(exp => exp.id === expense.id);
    const otherExpensesCopy = [...otherExpenses];
    otherExpensesCopy[index] = {
      id: expense.id,
      ...expense.data
    };
    return {
      ...state,
      otherExpenses: otherExpensesCopy
    };
  },
  _createOtherExpense(state, { expense }) {
    const createdExpense = {
      ...expense.data,
      id: expense.id,
    };
    const { otherExpenses } = state;
    return {
      ...state,
      otherExpenses: [
        ...otherExpenses,
        createdExpense
      ]
    };
  },
  _updateFinPlanBill(state, action) {
    const {
      bill
    } = action;
    const newBills = state.bills.map((b) => {
      if (bill.id === b.id) {
        return {
          ...bill,
        };
      }
      return b;
    });
    return {
      ...state,
      bills: newBills,
    };
  },

  _addFinPlanBillsOtherExpense(state) {
    return {
      ...state,
      otherRecurringBills: [
        ...state.otherRecurringBills,
        { ...finPlanSchemas[finPlanSchemaTypes.bill] }
      ],
    };
  },

  _updateFinPlanBillsOtherExpense(state, action) {
    const {
      expense,
    } = action;
    const newOtherReccuringBills = state.otherRecurringBills.map((bill) => {
      if (bill.id === expense.id) {
        return {
          ...expense
        };
      }
      return bill;
    });
    return {
      ...state,
      otherRecurringBills: newOtherReccuringBills,
    };
  },

  _updateFinPlanBillsComment(state, action) {
    const { comments } = action;
    return {
      ...state,
      comments,
    };
  }

};

const finPlanBillsReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default finPlanBillsReducer;
