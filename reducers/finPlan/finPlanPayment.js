import isEmpty from 'lodash/isEmpty';
import {
  GET_USER_SUCCESS,
  SHOW_CARD_ERROR,
  GET_STRIPE_SUBSCRIPTION_INFO_SUCCESS,
  GET_STRIPE_SUBSCRIPTION_INFO_FAIL,
  GET_STRIPE_INFO_SUCCESS,
  CANCEL_STRIPE_SUBSCRIPTION_SUCCESS
} from '../../constants/AppConstants';

const initialState = {
  appointments: [],
  cardError: false,
  cardData: {},
  userHasStripeSubscription: false
};

const actionMappings = {
  [GET_USER_SUCCESS]: '_receiveUserData',
  [SHOW_CARD_ERROR]: '_showCardError',
  [GET_STRIPE_SUBSCRIPTION_INFO_SUCCESS]: '_receiveStripeData',
  [GET_STRIPE_INFO_SUCCESS]: '_receiveStripeCardData',
  [GET_STRIPE_SUBSCRIPTION_INFO_FAIL]: '',
  [CANCEL_STRIPE_SUBSCRIPTION_SUCCESS]: '_cancelStripeSubscription',
};

const reducer = {
  _receiveUserData(state, action) {
    return {
      ...state,
      user: action.userData,
      isLoading: false,
    };
  },
  _showCardError(state, action) {
    return {
      ...state,
      cardError: action.error,
    };
  },
  _receiveStripeData(state, { stripePlan }) {
    let stripePlanPaymentName = null;
    let stripePlanPaymentAmount = null;
    if (stripePlan && stripePlan.plan && stripePlan.plan.name && stripePlan.plan.amount !== null) {
      stripePlanPaymentName = stripePlan.plan.name;
      stripePlanPaymentAmount = stripePlan.plan.amount;
    }
    const userHasStripeSubscription = !isEmpty(stripePlan) && !isEmpty(stripePlan.plan);
    return {
      ...state,
      stripePlanPaymentName,
      stripePlanPaymentAmount,
      userHasStripeSubscription
    };
  },
  _receiveStripeCardData(state, { paymentInfo }) {
    return {
      ...state,
      cardData: paymentInfo || initialState.paymentInfo,
      userHasStripeSubscription: !isEmpty(paymentInfo)
    };
  },

  _cancelStripeSubscription(state) {
    return {
      ...state,
      cardData: initialState.cardData,
      userHasStripeSubscription: initialState.userHasStripeSubscription
    };
  }
};

const finPlanPaymentReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default finPlanPaymentReducer;
