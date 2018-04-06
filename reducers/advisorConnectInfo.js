import {
  GET_USER_SUCCESS,
  OTHER_PLEASE_TYPE,
  CHANGE_ADVISOR_CONNECT_FORM_FIELD_TYPE
} from '../constants/AppConstants';

const initialState = {
  fieldTypes: {},
  appointments: [],
};

const actionMappings = {
  [GET_USER_SUCCESS]: '_getUserDataFromLocalStorageSuccess',
  [CHANGE_ADVISOR_CONNECT_FORM_FIELD_TYPE]: '_changeFormFieldType'
};

const reducer = {
  _getUserDataFromLocalStorageSuccess(state, action) {
    return {
      ...state,
      user: action.userData
    };
  },

  _changeFormFieldType(state, { fieldName }) {
    return {
      ...state,
      fieldTypes: {
        ...state.fieldTypes,
        [fieldName]: state.fieldTypes[fieldName] === OTHER_PLEASE_TYPE ? null : OTHER_PLEASE_TYPE
      }
    };
  },
};

const advisorConnectInfoReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default advisorConnectInfoReducer;
