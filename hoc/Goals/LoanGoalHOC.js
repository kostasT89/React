// Global Deps
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { batchActions } from 'redux-batched-actions';
import { change as reduxFormChange } from 'redux-form';
import isUndefined from 'lodash/isUndefined';
// Local Deps
import { NUMBER_ZERO, STRING_ZERO, CURRENCY_ZERO } from '../../config/properties';
import attrs from '../../config/goalAttributes';
import reduxForms from '../../config/reduxForms';
import repaymentMethodTypes from '../../constants/enums/repaymentMethodTypes';
import yodleeContainers from '../../constants/enums/yodleeContainers';
import goalTypes from '../../constants/enums/goalTypes';
import ActionStatus from '../../constants/enums/actionStatus';
// Actions:
import {
        changeRepaymentMethod,
        submitGoalForm,
        updateGoalRequest
      } from '../../actions/goals';
import { getYodleeAccount } from '../../actions/global/accounts';
import { getPerExAnalysis } from '../../actions/global/analysis';
// Utils:
import {
        calculateInterest,
        calculateDesiredPaymentPerMonth,
        calculateDesiredTermInMonths,
        calculateRemainingPerExPerMonth,
        calculateInterestSaved,
        formatGoalForSubmit
      } from '../../utils/goalUtils';
import { parseCurrency } from '../../utils/parsingUtils';

function LoanGoalHOC(WrappedComponent) {
  class WrappedLoanGoalComponent extends Component {

    static propTypes = {
      data: PropTypes.shape({
        nickname: PropTypes.string.isRequired,
        balanceAtGoalStart: PropTypes.string.isRequired,
        minimumPayment: PropTypes.string.isRequired,
        interestRate: PropTypes.string.isRequired,
        remainingTermInMonths: PropTypes.string.isRequired,
        repaymentMethod: PropTypes.string.isRequired,
        desiredTermInMonths: PropTypes.string.isRequired,
        desiredPaymentPerMonth: PropTypes.string.isRequired,
        interestSaved: PropTypes.string.isRequired,
        remainingTotalInterest: PropTypes.string.isRequired,
        adjustedPaymentPerMonth: PropTypes.string.isRequired,
        remainingPerExPerMonth: PropTypes.string.isRequired,
        isLoadingAccount: PropTypes.bool.isRequired,
        isLoadingPerExSummary: PropTypes.bool.isRequired,
        perExSummary: PropTypes.object.isRequired
      }).isRequired,
      location: PropTypes.shape({
        query: PropTypes.object.isRequired
      }),
      dispatch: PropTypes.func.isRequired,
      isSubmitting: PropTypes.bool.isRequired,
      goals: PropTypes.array

    };

    static _handleTimeToRepaySelection({
        balanceAtGoalStart,
        remainingTermInMonths,
        interestRate,
        minimumPayment,
        remainingTotalInterest,
        desiredTermInMonths,
        currentPerEx,
        change
      }) {
      let calculatedPaymentPerMonth;
      let adjustedPaymentPerMonth;
      let remainingPerExPerMonth;
      let desiredTotalInterest;
      let interestSaved;
      let term = desiredTermInMonths;
      // If desiredTerm is not valid, use default values:
      if (!term || term === STRING_ZERO || term >= remainingTermInMonths) {
        term = remainingTermInMonths;
        calculatedPaymentPerMonth = remainingTermInMonths;
        adjustedPaymentPerMonth = NUMBER_ZERO;
        remainingPerExPerMonth = currentPerEx;
      }
      else {
        calculatedPaymentPerMonth = calculateDesiredPaymentPerMonth({
          interestRate,
          desiredTermInMonths: term,
          balanceAtGoalStart
        });
        // Interest Saved:
        desiredTotalInterest = calculateInterest({
          interestRate,
          termInMonths: term,
          balance: balanceAtGoalStart
        });
        interestSaved = calculateInterestSaved(remainingTotalInterest, desiredTotalInterest);
        // Increased Monthly Payment Amount
        adjustedPaymentPerMonth = calculatedPaymentPerMonth - minimumPayment;
        // Remaining PerEx Per Month
        remainingPerExPerMonth = calculateRemainingPerExPerMonth(
          currentPerEx,
          adjustedPaymentPerMonth
        );
      }
      // Return actions:
      return [
        change(attrs.desiredPaymentPerMonth, calculatedPaymentPerMonth),
        change(attrs.interestSaved, interestSaved),
        change(attrs.adjustedPaymentPerMonth, adjustedPaymentPerMonth),
        change(attrs.remainingPerExPerMonth, remainingPerExPerMonth)
      ];
    }

    static _handlePaymentAmountSelection({
        desiredPaymentPerMonth,
        minimumPayment,
        remainingTermInMonths,
        currentPerEx,
        interestRate,
        balanceAtGoalStart,
        remainingTotalInterest,
        change
      }) {
      let calculatedTermInMonths;
      let adjustedPaymentPerMonth;
      let remainingPerExPerMonth;
      let desiredTotalInterest;
      let interestSaved;
      let payment = desiredPaymentPerMonth;
      // If desiredPayment is not valid, use default values:
      if (!payment || payment === CURRENCY_ZERO || payment <= minimumPayment) {
        payment = minimumPayment;
        calculatedTermInMonths = remainingTermInMonths;
        adjustedPaymentPerMonth = NUMBER_ZERO;
        remainingPerExPerMonth = currentPerEx;
      }
      else {
        calculatedTermInMonths = calculateDesiredTermInMonths({
          interestRate,
          desiredPaymentPerMonth: payment,
          balanceAtGoalStart
        });
        // Interest Saved:
        desiredTotalInterest = calculateInterest({
          interestRate,
          termInMonths: calculatedTermInMonths,
          balance: balanceAtGoalStart
        });
        interestSaved = calculateInterestSaved(remainingTotalInterest, desiredTotalInterest);
        // Increased Monthly Payment Amount
        adjustedPaymentPerMonth = payment - minimumPayment;
        // Remaining PerEx Per Month
        remainingPerExPerMonth = calculateRemainingPerExPerMonth(
          currentPerEx,
          adjustedPaymentPerMonth
        );
      }
      // Return actions:
      return [
        change(attrs.desiredTermInMonths, calculatedTermInMonths),
        change(attrs.interestSaved, interestSaved),
        change(attrs.adjustedPaymentPerMonth, adjustedPaymentPerMonth),
        change(attrs.remainingPerExPerMonth, remainingPerExPerMonth)
      ];
    }

    componentDidMount() {
      const {
        dispatch,
        location: {
          query: { accountId, goalId }
        },
        goals
      } = this.props;

      let selectedGoal;
      if (!isUndefined(goalId)) {
        selectedGoal = goals.find(goal => goal.id.toString() === goalId.toString());
      }
      if ((!accountId || accountId === NUMBER_ZERO) && isUndefined(selectedGoal)) return;
      dispatch(getYodleeAccount(accountId || selectedGoal.accountId, yodleeContainers.loan));
      dispatch(getPerExAnalysis());
    }

    componentWillReceiveProps(nextProps) {
      const {
        dispatch,
        location: {
          query: { accountId, goalId }
        },
        goals,
        data: {
          isLoadingAccount
        }
      } = nextProps;
      if (this.props.data.repaymentMethod !== nextProps.data.repaymentMethod) {
        if (nextProps.data.repaymentMethod === repaymentMethodTypes.timeToRepay) {
          dispatch(reduxFormChange(
            reduxForms.loanGoalForm,
            attrs.desiredTermInMonths,
            NUMBER_ZERO
          ));
        }
        else {
          dispatch(reduxFormChange(
            reduxForms.loanGoalForm,
            attrs.desiredPaymentPerMonth,
            NUMBER_ZERO
          ));
        }
      }
      if (goals && isLoadingAccount) {
        let selectedGoal;
        if (!isUndefined(goalId)) {
          selectedGoal = goals.find(goal => goal.id.toString() === goalId.toString());
        }
        if ((!accountId || accountId === NUMBER_ZERO) && isUndefined(selectedGoal)) return;
        dispatch(getYodleeAccount(accountId || selectedGoal.accountId, yodleeContainers.loan));
        dispatch(getPerExAnalysis());
      }
    }

    _updateFormValues = (connectedFormValues, change) => {
      const {
        data: {
          repaymentMethod,
          perExSummary
        },
        dispatch
      } = this.props;
      const {
        _handleTimeToRepaySelection,
        _handlePaymentAmountSelection
      } = WrappedLoanGoalComponent;
      // Initialize:
      let selectionOptionActions;
      const currentPerEx = perExSummary.totalAnticipatedMonthlyAmount;
      // Get Connected Values:
      const balanceAtGoalStart = parseCurrency(connectedFormValues.balanceAtGoalStart);
      const interestRate = parseCurrency(connectedFormValues.interestRate);
      const minimumPayment = parseCurrency(connectedFormValues.minimumPayment);
      const desiredPaymentPerMonth = parseCurrency(connectedFormValues.desiredPaymentPerMonth);
      const desiredTermInMonths = parseCurrency(connectedFormValues.desiredTermInMonths);
      const remainingTermInMonths = parseCurrency(connectedFormValues.remainingTermInMonths);
      // If connected values are not defined, return.
      if (!balanceAtGoalStart || !interestRate || !minimumPayment || !remainingTermInMonths) return;
      // Remaining Total Interest:
      const remainingTotalInterest = calculateInterest({
        termInMonths: remainingTermInMonths,
        interestRate,
        balance: balanceAtGoalStart
      });
      // Add change actions to batch queue
      const updateInterestAction = change(attrs.remainingTotalInterest, remainingTotalInterest);

      // Time To Repay Method:
      if (repaymentMethod === repaymentMethodTypes.timeToRepay) {
        selectionOptionActions = _handleTimeToRepaySelection({
          balanceAtGoalStart,
          remainingTermInMonths,
          interestRate,
          minimumPayment,
          remainingTotalInterest,
          desiredTermInMonths,
          currentPerEx,
          change
        });
      }
      // Payment Amount Method:
      else if (repaymentMethod === repaymentMethodTypes.paymentAmount) {
        selectionOptionActions = _handlePaymentAmountSelection({
          desiredPaymentPerMonth,
          minimumPayment,
          remainingTermInMonths,
          currentPerEx,
          interestRate,
          balanceAtGoalStart,
          remainingTotalInterest,
          change
        });
      }
      return dispatch(batchActions([
        updateInterestAction,
        selectionOptionActions
      ]));
    }

    _onFieldChange = (node, change, connectedValues) => {
      // Get current form values since latest will be behind in state
      const { value, name } = node.target;
      const currentFormValues = {
        ...connectedValues,
        [name]: value
      };
      this._updateFormValues(currentFormValues, change);
    }

    _onRepaymentMethodClick = (repaymentMethod) => {
      const { dispatch } = this.props;
      dispatch(changeRepaymentMethod(repaymentMethod));
    }

    _onFormSubmit = (rawGoal) => {
      const {
        dispatch,
        location: {
          query: { accountId, goalId }
        },
        goals
      } = this.props;

      const formattedGoal = formatGoalForSubmit(rawGoal);
      if (accountId) {
        dispatch(submitGoalForm(formattedGoal, accountId, goalTypes.loan));
        return;
      }

      if (!isUndefined(goalId)) {
        const selectedGoal = goals.find(goal => goal.id.toString() === goalId.toString());
        dispatch(updateGoalRequest(
          goalId,
          formattedGoal,
          selectedGoal.accountId,
          goalTypes.loan
        ));
      }
    }

    render() {
      const {
        data: {
          nickname,
          balanceAtGoalStart,
          minimumPayment,
          interestRate,
          remainingTermInMonths,
          remainingTotalInterest,
          desiredTermInMonths,
          desiredPaymentPerMonth,
          interestSaved,
          adjustedPaymentPerMonth,
          repaymentMethod,
          isLoadingAccount,
          isLoadingPerExSummary,
          perExSummary
        },
        isSubmitting,
        goals,
        location: {
          query: { goalId }
        }

      } = this.props;

      // Calc Initial Values for Editing Loan Goal
      let selectedGoal;
      if (!isUndefined(goalId)) {
        selectedGoal = goals.find(goal => goal.id.toString() === goalId.toString());
      }

      const massagedProps = {
        formProps: {
          initialValues: {
            nickname,
            balanceAtGoalStart,
            minimumPayment,
            interestRate,
            remainingTermInMonths,
            desiredTermInMonths,
            desiredPaymentPerMonth,
            interestSaved,
            adjustedPaymentPerMonth,
            remainingTotalInterest,
            remainingPerExPerMonth: perExSummary.totalAnticipatedMonthlyAmount
          },
          onFieldChange: ::this._onFieldChange,
          onSubmit: ::this._onFormSubmit,
          onMount: ::this._updateFormValues,
          repaymentMethod,
          onRepaymentMethodClick: ::this._onRepaymentMethodClick,
          isLoadingAccount,
          isLoadingPerExSummary,
          isSubmitting,
          actionStatus: isUndefined(selectedGoal) ? ActionStatus.create : ActionStatus.edit
        }
      };

      // For initialValues of Loan Goal Editing
      if (!isUndefined(selectedGoal)) {
        massagedProps.formProps.initialValues = {
          nickname: selectedGoal.nickname,
          balanceAtGoalStart: selectedGoal.balanceAtGoalStart,
          minimumPayment: selectedGoal.minimumPayment,
          interestRate: selectedGoal.interestRate,
          remainingTermInMonths: selectedGoal.remainingTermInMonths,
          desiredTermInMonths: selectedGoal.desiredTermInMonths,
          desiredPaymentPerMonth: selectedGoal.desiredPaymentPerMonth,
          interestSaved,
          adjustedPaymentPerMonth,
          remainingTotalInterest,
          remainingPerExPerMonth: perExSummary.totalAnticipatedMonthlyAmount
        };
      }

      return (
        <WrappedComponent {...massagedProps} />
      );
    }

  }

  function mapStateToProps(state) {
    return {
      data: state.loanGoal,
      isSubmitting: state.goals.isSubmitting,
      goals: state.dashboard.goals
    };
  }

  return connect(mapStateToProps)(WrappedLoanGoalComponent);
}

export default LoanGoalHOC;
