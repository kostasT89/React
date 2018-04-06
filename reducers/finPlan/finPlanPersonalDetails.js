import {
        hasAnyCoClientValues,
        createUserRepresentation
      } from '../../utils/settingsUtils';

import {
        GET_USER_SUCCESS,
        TOGGLE_CO_CLIENT,
        SET_CO_CLIENT_VISIBILITY,
        CHANGE_NUMBER_OF_CHILDREN,
        SHOW_PERSONAL_DETAILS_NO_TAX_FILED_ERROR,
        HIDE_PERSONAL_DETAILS_NO_TAX_FILED_ERROR,
        CREATE_FIN_PLAN_SUCCESS
      } from '../../constants/AppConstants';

const initialState = {
  userData: {},
  numberOfChildren: 0,
  hasNoTaxFiledError: false,
  shouldShowCoClientFields: false,
};

const actionMappings = {
  [GET_USER_SUCCESS]: '_receiveFinPlanPersonalDetails',
  [TOGGLE_CO_CLIENT]: '_toggleCoClientFields',
  [SET_CO_CLIENT_VISIBILITY]: '_setCoClientFields',
  [CHANGE_NUMBER_OF_CHILDREN]: '_changeNumberOfChildren',
  [SHOW_PERSONAL_DETAILS_NO_TAX_FILED_ERROR]: '_showNoTaxFiledError',
  [HIDE_PERSONAL_DETAILS_NO_TAX_FILED_ERROR]: '_hideNoTaxFiledError',
  [CREATE_FIN_PLAN_SUCCESS]: '_createFinPlanSuccess',
};

const reducer = {

  _receiveFinPlanPersonalDetails(state, { userData, userData: { children = [], coClient } }) {
    return {
      ...state,
      userData: createUserRepresentation(userData),
      numberOfChildren: children.length,
      shouldShowCoClientFields: hasAnyCoClientValues(coClient)
    };
  },

  _showNoTaxFiledError(state) {
    return {
      ...state,
      hasNoTaxFiledError: true
    };
  },

  _hideNoTaxFiledError(state) {
    return {
      ...state,
      hasNoTaxFiledError: false
    };
  },

  _changeNumberOfChildren(state, { numberOfChildren }) {
    return {
      ...state,
      numberOfChildren
    };
  },

  _toggleCoClientFields(state) {
    return {
      ...state,
      shouldShowCoClientFields: !state.shouldShowCoClientFields,
    };
  },

  _setCoClientFields(state, { shouldShowCoClientFields }) {
    return {
      ...state,
      shouldShowCoClientFields
    };
  },

  _createFinPlanSuccess(state, { finPlanId }) {
    return {
      ...state,
      finPlanId
    };
  }
};

const finPlanPersonalDetailsReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default finPlanPersonalDetailsReducer;
