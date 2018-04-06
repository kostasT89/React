import remove from 'lodash/remove';
import isEmpty from 'lodash/isEmpty';
// Local Deps:
import finPlanSchemas from '../../schemas/finPlanSchemas';
import finPlanSchemaTypes from '../../constants/enums/finPlanSchemaTypes';
import { financialQuestions } from '../../constants/enums/finPlanFinancialQuestions';
import {
        GET_USER_SUCCESS,
        DELETE_MAJOR_EVENT,
        UPDATE_MAJOR_EVENT,
        GET_FIN_PLAN_SUCCESS,
        ADD_MAJOR_INCOME_EVENT,
        ADD_MAJOR_EXPENSE_EVENT,
        COMPLETE_FIN_PLAN_QUESTION,
        SUBMIT_FIN_PLAN_QUESTIONS_SUCCESS,
        SET_FIN_PLAN_QUESTIONS_ENABLE_REINITILIZATION
      } from '../../constants/AppConstants';

const initialState = {
  questions: financialQuestions,
  clientAnswers: {},
  coClientAnswers: {},
  majorIncomeEvents: [],
  majorExpenseEvents: [],
  enableReinitialize: false
};

const actionMappings = {
  [GET_USER_SUCCESS]: '_receiveUserData',
  [ADD_MAJOR_EXPENSE_EVENT]: '_addMajorEvent',
  [ADD_MAJOR_INCOME_EVENT]: '_addMajorEvent',
  [DELETE_MAJOR_EVENT]: '_deleteMajorEvent',
  [UPDATE_MAJOR_EVENT]: '_updateMajorEvent',
  [COMPLETE_FIN_PLAN_QUESTION]: '_completeFinPlanQuestion',
  [GET_FIN_PLAN_SUCCESS]: '_receiveFinPlanQuestions',
  [SUBMIT_FIN_PLAN_QUESTIONS_SUCCESS]: '_receiveFinPlanQuestions',
  [SET_FIN_PLAN_QUESTIONS_ENABLE_REINITILIZATION]: '_setEnableReinitialize',
};

const reducer = {
  _receiveFinPlanQuestions(state, { finPlan: { finPlanFinancialQuestions } }) {
    const enableReinitialize = !isEmpty(finPlanFinancialQuestions);
    return {
      ...state,
      ...finPlanFinancialQuestions,
      enableReinitialize
    };
  },

  _completeFinPlanQuestion(state, action) {
    const newQuestions = state.questions.map((question) => {
      if (question.name === action.id) {
        return {
          ...question,
          isChecked: true
        };
      }
      return question;
    });
    return {
      ...state,
      questions: newQuestions,
    };
  },

  _setEnableReinitialize(state, { enableReinitialize }) {
    return {
      ...state,
      enableReinitialize
    };
  },

  _receiveUserData(state, action) {
    return {
      ...state,
      user: action.userData
    };
  },

  _addMajorEvent(state, { type }) {
    let stateKey;
    let stateValues;
    switch (type) {
      case ADD_MAJOR_INCOME_EVENT:
        stateKey = 'majorIncomeEvents';
        stateValues = [...state.majorIncomeEvents,
          {
            ...finPlanSchemas[finPlanSchemaTypes.majorIncomeEvent],
            id: Math.random(),
            date: new Date()
          }
        ];
        break;
      case ADD_MAJOR_EXPENSE_EVENT:
        stateKey = 'majorExpenseEvents';
        stateValues = [
          ...state.majorExpenseEvents,
          {
            ...finPlanSchemas[finPlanSchemaTypes.majorExpenseEvent],
            id: Math.random(),
            date: new Date()
          }
        ];
        break;
      default:
        break;
    }
    return {
      ...state,
      [stateKey]: stateValues,
    };
  },
  _deleteMajorEvent(state, action) {
    const {
      event: {
        id,
        type,
      }
    } = action;
    switch (type) {
      case ADD_MAJOR_INCOME_EVENT:
        remove(state.majorIncomeEvents, value => (value.id === id));
        break;
      case ADD_MAJOR_EXPENSE_EVENT:
        remove(state.majorExpenseEvents, value => (value.id === id));
        break;
      default:
        break;
    }

    return {
      ...state,
    };
  },
  _updateMajorEvent(state, action) {
    const { event: { type } } = action;
    let stateKey;
    let stateValue;
    switch (type) {
      case ADD_MAJOR_INCOME_EVENT:
        stateKey = 'majorIncomeEvents';
        stateValue = state.majorIncomeEvents.map((event) => {
          if (event.id === action.event.id) {
            return Object.assign({}, action.event);
          }
          return event;
        });
        break;
      case ADD_MAJOR_EXPENSE_EVENT:
        stateKey = 'majorExpenseEvents';
        stateValue = state.majorExpenseEvents.map((event) => {
          if (event.id === action.event.id) {
            return Object.assign({}, action.event);
          }
          return event;
        });
        break;
      default:
        break;
    }

    return {
      ...state,
      [stateKey]: stateValue,
    };
  }
};

const finPlanQuestionsReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default finPlanQuestionsReducer;
