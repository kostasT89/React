import {
  GET_USER_SUCCESS,
  GET_FIN_PLAN_SUCCESS,
  SHOW_INSURANCE_FORM,
  CHANGE_FORM_FIELD_TYPE,
  OTHER_PLEASE_TYPE,
  CREATE_FIN_PLAN_INSURANCE_SUCCESS,
  CREATE_FIN_PLAN_INSURANCE_FAIL,
  UPDATE_FIN_PLAN_INSURANCE_SUCCESS,
  UPDATE_FIN_PLAN_INSURANCE_FAIL,
  DELETE_FIN_PLAN_INSURANCE_SUCCESS,
  DELETE_FIN_PLAN_INSURANCE_FAIL,
  SUBMIT_INSURANCE_FORM_FAIL,
  SUBMIT_INSURANCE_FORM,
  UPDATE_CURRENT_INSURANCE_POLICY,
  TOGGLE_FIN_PLAN_INSURANCE_UPDATE,
} from '../../constants/AppConstants';

const initialState = {
  policies: [],
  fieldTypes: {},
  updateInProgress: false,
  currentInsurancePolicy: null
};

const actionMappings = {
  [GET_USER_SUCCESS]: '_receiveUserData',
  [GET_FIN_PLAN_SUCCESS]: '_receiveFinPlanInsurance',
  [SHOW_INSURANCE_FORM]: '_showInsuranceForm',
  [CHANGE_FORM_FIELD_TYPE]: '_changeFormFieldType',
  [CREATE_FIN_PLAN_INSURANCE_SUCCESS]: '_createFinPlanInsuranceSuccess',
  [UPDATE_FIN_PLAN_INSURANCE_SUCCESS]: '_updateFinPlanInsuranceSuccess',
  [DELETE_FIN_PLAN_INSURANCE_SUCCESS]: '_deleteFinPlanInsuranceSuccess',
  [CREATE_FIN_PLAN_INSURANCE_FAIL]: '_handleServerError',
  [UPDATE_FIN_PLAN_INSURANCE_FAIL]: '_handleServerError',
  [DELETE_FIN_PLAN_INSURANCE_FAIL]: '_handleServerError',
  [SUBMIT_INSURANCE_FORM]: '_submitFinPlanInsuranceForm',
  [SUBMIT_INSURANCE_FORM_FAIL]: '_submitFinPlanInsuranceFormFail',
  [UPDATE_CURRENT_INSURANCE_POLICY]: '_updateCurrentInsurancePolicy',
  [TOGGLE_FIN_PLAN_INSURANCE_UPDATE]: '_toggleFinPlanInsuranceUpdate',
};

const reducer = {
  _receiveFinPlanInsurance(state, { finPlan: { finPlanInsurance } }) {
    return {
      ...state,
      policies: finPlanInsurance.map(policy => ({
        ...policy.data,
        id: policy.id,
        finPlanId: policy.finPlanId,
      }))
    };
  },

  _submitFinPlanInsuranceForm(state) {
    return {
      ...state,
      isLoading: true,
    };
  },

  _receiveUserData(state, action) {
    return {
      ...state,
      user: action.userData
    };
  },

  _changeFormFieldType(state, action) {
    const {
      fieldName,
    } = action;
    const newFieldTypes = {
      ...state.fieldTypes,
      [fieldName]: state.fieldTypes[fieldName] === OTHER_PLEASE_TYPE ? null : OTHER_PLEASE_TYPE,
    };
    return {
      ...state,
      fieldTypes: newFieldTypes
    };
  },

  _showInsuranceForm(state, { formType }) {
    const currentInsurancePolicy = (!formType || formType === state.formType) ?
      state.currentInsurancePolicy : null;
    return {
      ...state,
      formType: state.formType === formType ? null : formType,
      fieldTypes: {},
      currentInsurancePolicy
    };
  },

  _handleServerError(state, action) {
    const { error } = action;
    return {
      ...state,
      error,
      formIsLoading: false,
      tableIsLoading: false,
      currentInsurancePolicy: null,
    };
  },

  _createFinPlanInsuranceSuccess(state, action) {
    const { policy } = action;
    const policies = [...state.policies, {
      ...policy.data,
      finPlanId: policy.finPlanId,
      id: policy.id,
    }];
    return {
      ...state,
      policies,
      fieldTypes: initialState.fieldTypes,
      formIsLoading: false,
      tableIsLoading: false,
      currentInsurancePolicy: null
    };
  },

  _updateFinPlanInsuranceSuccess(state, { insurancePolicy }) {
    return {
      ...state,
      policies: state.policies.map(p => (
        p.id === insurancePolicy.id ? {
          ...insurancePolicy.data,
          finPlanId: insurancePolicy.finPlanId,
          id: insurancePolicy.id,
        } : p
      )),
      currentInsurancePolicy: null,
      formIsLoading: false,
      tableIsLoading: false,
    };
  },

  _deleteFinPlanInsuranceSuccess(state, action) {
    const { id } = action;
    const insurancePolicies = state.policies.filter(policy => (
      policy.id !== id
    ));
    return {
      ...state,
      policies: insurancePolicies,
      currentInsurancePolicy: null,
      formType: null,
      formIsLoading: false,
      tableIsLoading: false,
    };
  },

  _updateCurrentInsurancePolicy(state, action) {
    const { policy } = action;
    return {
      ...state,
      currentInsurancePolicy: policy,
      toggleStates: {},
    };
  },

  _toggleFinPlanInsuranceUpdate(state) {
    return {
      ...state,
      updateInProgress: !state.updateInProgress
    };
  },
};

const finPlanInsuranceReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default finPlanInsuranceReducer;
