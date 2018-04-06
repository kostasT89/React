import {
         GET_FIN_PLAN_SUCCESS,
         TOGGLE_FIN_PLAN_INCOME_FORM,
         CREATE_FIN_PLAN_INCOME_SUCCESS,
         CREATE_FIN_PLAN_INCOME_FAIL,
         UPDATE_FIN_PLAN_INCOME_SUCCESS,
         UPDATE_FIN_PLAN_INCOME_FAIL,
         DELETE_FIN_PLAN_INCOME_SUCCESS,
         DELETE_FIN_PLAN_INCOME_FAIL,
         SUBMIT_FIN_PLAN_INCOME_FORM,
         SUBMIT_FIN_PLAN_INCOME_FORM_FAIL,
         TOGGLE_FORM_STATE,
         CLEAR_FORM_TOGGLE_STATES,
         UPDATE_FIN_PLAN_CURRENT_INCOME_SOURCE,
         CANCEL_INCOME_FORM,
       } from '../../constants/AppConstants';

const initialState = {
  incomes: [],
  isLoadingIncomes: true,
  formIsLoading: false,
  tableIsLoading: false,
  currentIncomeSource: {},
  toggleStates: {},
  investments: [],
  businesses: [],
  farms: [],
  formType: ''
};

const actionMappings = {
  [GET_FIN_PLAN_SUCCESS]: '_receiveFinPlanIncome',
  [TOGGLE_FIN_PLAN_INCOME_FORM]: '_toggleVisibleForm',
  [CREATE_FIN_PLAN_INCOME_SUCCESS]: '_createFinPlanIncomeSuccess',
  [UPDATE_FIN_PLAN_INCOME_SUCCESS]: '_updateFinPlanIncomeSuccess',
  [DELETE_FIN_PLAN_INCOME_SUCCESS]: '_deleteFinPlanIncomeSuccess',
  [CREATE_FIN_PLAN_INCOME_FAIL]: '_handleServerError',
  [UPDATE_FIN_PLAN_INCOME_FAIL]: '_handleServerError',
  [DELETE_FIN_PLAN_INCOME_FAIL]: '_handleServerError',
  [SUBMIT_FIN_PLAN_INCOME_FORM]: '_submitFinPlanIncomeForm',
  [SUBMIT_FIN_PLAN_INCOME_FORM_FAIL]: '_submitFinPlanIncomeFormFail',
  [TOGGLE_FORM_STATE]: '_toggleFormState',
  [CLEAR_FORM_TOGGLE_STATES]: '_clearFormToggleStates',
  [UPDATE_FIN_PLAN_CURRENT_INCOME_SOURCE]: '_updateCurrentIncomeSource',
  [CANCEL_INCOME_FORM]: '_cancelIncomeForm'
};

const reducer = {
  _receiveFinPlanIncome(state, { finPlan }) {
    const { finPlanIncome } = finPlan;
    const newIncomes = finPlanIncome.map(income => ({
      ...income.data,
      id: income.id,
      finPlanId: income.finPlanId,
    }));
    return {
      ...state,
      incomes: newIncomes,
      isLoadingIncomes: false
    };
  },

  _clearFormToggleStates(state) {
    return {
      ...state,
      toggleStates: {},
    };
  },

  _cancelIncomeForm(state) {
    return {
      ...state,
      currentIncomeSource: null,
      formType: '',
      toggleStates: {},
      investments: [],
      businesses: [],
      farms: [],
    };
  },

  _toggleFormState(state, action) {
    const {
     id,
    } = action;
    return {
      ...state,
      toggleStates: {
        ...state.toggleStates,
        [id]: !state.toggleStates[id],
      }
    };
  },

  _submitFinPlanIncomeForm(state) {
    return {
      ...state,
      formIsLoading: true
    };
  },

  _submitFinPlanIncomeFormFail(state) {
    return {
      ...state,
      formIsLoading: false
    };
  },

  _updateCurrentIncomeSource(state, { currentIncomeSource }) {
    return {
      ...state,
      currentIncomeSource,
      toggleStates: {},
    };
  },

  _toggleVisibleForm(state, { formType }) {
    return {
      ...state,
      formType: state.formType === formType ? '' : formType,
      currentIncomeSource: null
    };
  },

  _createFinPlanIncomeSuccess(state, action) {
    const { income } = action;
    const incomes = [...state.incomes, {
      ...income.data,
      finPlanId: income.finPlanId,
      id: income.id,
    }];
    return {
      ...state,
      incomes,
      currentIncomeSource: null,
      formIsLoading: false,
      tableIsLoading: false,
    };
  },

  _updateFinPlanIncomeSuccess(state, { income }) {
    // Replace old income with updated one:
    const incomes = state.incomes.map(i => (
      i.id === income.id ? {
        ...income.data,
        finPlanId: income.finPlanId,
        id: income.id,
      } : i
    ));
    return {
      ...state,
      incomes,
      currentIncomeSource: null,
      formIsLoading: false,
      tableIsLoading: false,
    };
  },

  _deleteFinPlanIncomeSuccess(state, action) {
    const { id } = action;
    const incomes = state.incomes.filter(income => (
      income.id !== id
    ));
    return {
      ...state,
      incomes,
      currentIncomeSource: null,
      formType: '',
      formIsLoading: false,
      tableIsLoading: false,
    };
  },

  _handleServerError(state, action) {
    const { error } = action;
    return {
      ...state,
      error,
      formIsLoading: false,
      tableIsLoading: false,
      currentIncomeSource: null,
    };
  },

};

const finPlanIncomeReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default finPlanIncomeReducer;
