import {
        GET_USER_SUCCESS,
        GET_FIN_PLAN_SUCCESS,
        GET_FIN_PLAN_FAIL,
        UPDATE_FIN_PLAN_BREADCRUMB_SUCCESS,
        CREATE_FIN_PLAN_INCOME_SUCCESS,
        CREATE_FIN_PLAN_GOAL_SUCCESS,
        CREATE_FIN_PLAN_INSURANCE_SUCCESS,
        CREATE_FIN_PLAN_LIABILITY_SUCCESS,
        CREATE_FIN_PLAN_ASSET_SUCCESS,
        CREATE_FIN_PLAN_QUESTIONS_SUCCESS,
        CREATE_FIN_PLAN_TRANSACTIONS_SUCCESS,
        CREATE_FIN_PLAN_OTHER_EXPENSE_SUCCESS,
        BULK_CREATE_FIN_PLAN_OTHER_EXPENSES_SUCCESS,
        CREATE_FIN_PLAN_PERSONAL_DETAILS_SUCCESS,
        CREATE_FIN_PLAN_PAYMENT_SUCCESS,
        UPDATE_FIN_PLAN,
        CREATE_FIN_PLAN_SUCCESS,
        GET_FIN_PLAN_BREADCRUMBS,
        GET_FIN_PLAN_BREADCRUMBS_SUCCESS,
        UPDATE_FIN_PLAN_PAYMENT_SUCCESS,
        UPDATE_FIN_PLAN_TAX_RETURN_SUCCESS,
        TOGGLE_FIN_PLAN_TAX_RETURN_FORM,
        SUBMIT_FIN_PLAN_INFO,
        UPDATE_FIN_PLAN_SUCCESS_FIRST_VISIT
      } from '../../constants/AppConstants';
import { pageMappings } from '../../config/finPlan/finPlanBreadcrumbs';
import FinPlanPages from '../../constants/enums/finPlanPages';

const initialState = {
  user: {},
  hasFinPlan: false,
  isFetchingFinPlan: true,
  breadcrumbToUpdate: null,
  completedAt: null,
  finPlanId: null,
  finPlanBreadcrumbs: [],
  finPlanPersonalDetails: undefined, // NOTE: we need this to be undefined
  finPlanGoals: [],
  finPlanIncome: [],
  finPlanInsurance: [],
  finPlanAssets: [],
  finPlanLiabilities: [],
  finPlanFinancialQuestions: null,
  finPlanTaxReturns: { data: {} },
  isTaxReturnFormActive: false,
  finPlanSaveSuccess: false,
  isFinPlanSubmitted: false,
  isFirstFinPlanSubmit: false
};

const actionMappings = {
  [GET_USER_SUCCESS]: '_receiveUserData',
  [GET_FIN_PLAN_SUCCESS]: '_receiveFinancialPlan',
  [GET_FIN_PLAN_FAIL]: '_handleFailedFinPlanRequest',
  [GET_FIN_PLAN_BREADCRUMBS]: '_requestBreadcrumbs',
  [GET_FIN_PLAN_BREADCRUMBS_SUCCESS]: '_receiveFinPlanBreadcrumbs',
  [UPDATE_FIN_PLAN_BREADCRUMB_SUCCESS]: '_receiveUpdatedBreadcrumb',
  [UPDATE_FIN_PLAN_PAYMENT_SUCCESS]: '_queueBreadcrumbUpdate',
  [CREATE_FIN_PLAN_PERSONAL_DETAILS_SUCCESS]: '_queueBreadcrumbUpdate',
  [CREATE_FIN_PLAN_INSURANCE_SUCCESS]: '_queueBreadcrumbUpdate',
  [CREATE_FIN_PLAN_QUESTIONS_SUCCESS]: '_queueBreadcrumbUpdate',
  [CREATE_FIN_PLAN_GOAL_SUCCESS]: '_queueBreadcrumbUpdate',
  [CREATE_FIN_PLAN_INCOME_SUCCESS]: '_queueBreadcrumbUpdate',
  [CREATE_FIN_PLAN_LIABILITY_SUCCESS]: '_queueBreadcrumbUpdate',
  [CREATE_FIN_PLAN_ASSET_SUCCESS]: '_queueBreadcrumbUpdate',
  [CREATE_FIN_PLAN_TRANSACTIONS_SUCCESS]: '_queueBreadcrumbUpdate',
  [CREATE_FIN_PLAN_PAYMENT_SUCCESS]: '_queueBreadcrumbUpdate',
  [UPDATE_FIN_PLAN]: '_queueBreadcrumbUpdate',
  [CREATE_FIN_PLAN_SUCCESS]: '_receiveFinancialPlan',
  [UPDATE_FIN_PLAN_TAX_RETURN_SUCCESS]: '_receiveUpdatedTaxReturns',
  [CREATE_FIN_PLAN_OTHER_EXPENSE_SUCCESS]: '_queueBreadcrumbUpdate',
  [BULK_CREATE_FIN_PLAN_OTHER_EXPENSES_SUCCESS]: '_queueBreadcrumbUpdate',
  [TOGGLE_FIN_PLAN_TAX_RETURN_FORM]: '_toggleTaxReturnForm',
  [SUBMIT_FIN_PLAN_INFO]: '_setIsFinPlanSubmitted',
  [UPDATE_FIN_PLAN_SUCCESS_FIRST_VISIT]: '_resetFinPlanSuccessFirstVisit'
};

const reducer = {
  _receiveUserData(state, { userData }) {
    return {
      ...state,
      user: userData
    };
  },

  _queueBreadcrumbUpdate(state, { type }) {
    const { finPlanBreadcrumbs } = state;
    const page = pageMappings[type];
    const breadcrumb = finPlanBreadcrumbs.find(
      bcrumb => bcrumb.page === page
    );
    const breadcrumbToUpdate = {
      ...breadcrumb,
      isCompleted: true
    };
    return {
      ...state,
      breadcrumbToUpdate
    };
  },

  _receiveUpdatedBreadcrumb(state, { breadcrumb }) {
    const { finPlanBreadcrumbs } = state;
    const updatedBreadcrumbs = finPlanBreadcrumbs.map(bcrumb => (
      bcrumb.page === breadcrumb.page ? breadcrumb : bcrumb
    ));
    return {
      ...state,
      finPlanBreadcrumbs: updatedBreadcrumbs,
      breadcrumbToUpdate: null,
    };
  },

  _setIsFinPlanSubmitted(state) {
    return {
      ...state,
      isFinPlanSubmitted: true,
      isFirstFinPlanSubmit: true
    };
  },

  _resetFinPlanSuccessFirstVisit(state) {
    return {
      ...state,
      isFirstFinPlanSubmit: false
    };
  },

  _receiveFinancialPlan(state, { finPlan }) {
    const paymentCrumb = finPlan.finPlanBreadcrumbs.find(breadcrumb =>
      breadcrumb.page === FinPlanPages.finPlanPayment
    );

    const isFinPlanSubmitted = (paymentCrumb.isCompleted && paymentCrumb.isVisited);
    return {
      ...state,
      ...finPlan,
      isFetchingFinPlan: false,
      hasFinPlan: !!finPlan,
      isFinPlanSubmitted
    };
  },

  _handleFailedFinPlanRequest(state) {
    return {
      ...state,
      isFetchingFinPlan: false,
      hasFinPlan: false
    };
  },

  _receiveFinPlanBreadcrumbs(state, { breadcrumbs }) {
    const paymentCrumb = breadcrumbs.find(breadcrumb =>
      breadcrumb.page === FinPlanPages.finPlanPayment
    );

    const isFinPlanSubmitted = (paymentCrumb.isCompleted && paymentCrumb.isVisited);
    return {
      ...state,
      finPlanBreadcrumbs: breadcrumbs,
      isFetchingFinPlan: false,
      isFinPlanSubmitted
    };
  },

  _requestBreadcrumbs(state) {
    return {
      ...state,
      isFetchingFinPlan: true
    };
  },

  _receiveUpdatedTaxReturns(state, { updatedTaxReturn }) {
    return {
      ...state,
      finPlanTaxReturns: updatedTaxReturn,
      finPlanSaveSuccess: true
    };
  },

  _toggleTaxReturnForm(state, { isTaxReturnFormActive }) {
    return {
      ...state,
      isTaxReturnFormActive
    };
  }
};

const finPlanReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default finPlanReducer;
