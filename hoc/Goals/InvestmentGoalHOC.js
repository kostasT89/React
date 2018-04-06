// Global Deps
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
// Local Deps
import attrs from '../../config/goalAttributes';
import yodleeContainers from '../../constants/enums/yodleeContainers';
import goalTypes from '../../constants/enums/goalTypes';
import {
        MONTHS_PER_YEAR,
        NUMBER_ZERO
      } from '../../config/properties';
// Actions:
import { getYodleeAccount } from '../../actions/global/accounts';
import { submitGoalForm, updateGoalRequest } from '../../actions/goals';
import { getPerExAnalysis } from '../../actions/global/analysis';
// Utils:
import {
        formatGoalForSubmit,
        calculateRemainingPerExPerMonth,
        calculateDesiredPaymentPerMonth
      } from '../../utils/goalUtils';
import { parseCurrency } from '../../utils/parsingUtils';
import ActionStatus from '../../constants/enums/actionStatus';

function InvestmentGoalHOC(WrappedComponent) {
  class WrappedInvestmentGoalComponent extends Component {

    static propTypes = {
      data: PropTypes.shape({
        nickname: PropTypes.string.isRequired,
        balanceAtGoalStart: PropTypes.string.isRequired,
        goalAmount: PropTypes.string.isRequired,
        projectedRR: PropTypes.string.isRequired,
        desiredTermInYears: PropTypes.string.isRequired,
        desiredPaymentPerMonth: PropTypes.string.isRequired,
        remainingPerExPerMonth: PropTypes.string.isRequired,
        currentPerEx: PropTypes.string.isRequired,
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
      dispatch(getYodleeAccount(accountId || selectedGoal.accountId, yodleeContainers.investment));
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
        },
      } = nextProps;

      if (goals && isLoadingAccount) {
        let selectedGoal;
        if (!isUndefined(goalId)) {
          selectedGoal = goals.find(goal => goal.id.toString() === goalId.toString());
        }
        if ((!accountId || accountId === NUMBER_ZERO) && isUndefined(selectedGoal)) return;
        dispatch(getYodleeAccount(accountId || selectedGoal.accountId,
          yodleeContainers.investment));
        dispatch(getPerExAnalysis());
      }
    }

    _onFieldChange = (node, change, connectedValues) => {
      const {
        dispatch,
        data: {
          perExSummary
        }
      } = this.props;
      const { value, name } = node.target;
      const currentFormValues = {
        ...connectedValues,
        [name]: value
      };
      const {
        balanceAtGoalStart,
        goalAmount,
        projectedRR,
        desiredTermInYears
      } = currentFormValues;
      // Calculate new values:
      const desiredPaymentPerMonth = calculateDesiredPaymentPerMonth({
        interestRate: projectedRR,
        desiredTermInMonths: parseFloat(desiredTermInYears) * MONTHS_PER_YEAR,
        balanceAtGoalStart: parseCurrency(balanceAtGoalStart) * -1,
        goalAmount
      });
      // Remaining Per Ex Per Month
      const remainingPerExPerMonth = calculateRemainingPerExPerMonth(
        perExSummary.totalAnticipatedMonthlyAmount,
        desiredPaymentPerMonth
      );
      // Update values in redux form:
      dispatch(change(attrs.desiredPaymentPerMonth, desiredPaymentPerMonth));
      dispatch(change(attrs.remainingPerExPerMonth, remainingPerExPerMonth));
    }

    _onFormSubmit = (goal) => {
      const {
        dispatch,
        location: {
          query: { accountId, goalId }
        },
        goals
      } = this.props;

      const formattedGoal = formatGoalForSubmit(goal);
      if (accountId) {
        dispatch(submitGoalForm(formattedGoal, accountId, goalTypes.investment));
        return;
      }
      if (!isUndefined(goalId)) {
        const selectedGoal = goals.find(tGoal => tGoal.id.toString() === goalId.toString());
        dispatch(updateGoalRequest(
          goalId,
          formattedGoal,
          selectedGoal.accountId,
          goalTypes.investment
        ));
      }
    }

    render() {
      const {
        data: {
          projectedRR,
          desiredTermInYears,
          balanceAtGoalStart,
          goalAmount,
          desiredPaymentPerMonth,
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

      // Calc Initial Values for Editing Investment Goal
      let selectedGoal;
      if (!isUndefined(goalId)) {
        selectedGoal = goals.find(goal => goal.id.toString() === goalId.toString());
      }

      const massagedProps = {
        formProps: {
          initialValues: {
            balanceAtGoalStart,
            projectedRR,
            goalAmount,
            desiredTermInYears,
            desiredPaymentPerMonth,
            remainingPerExPerMonth: perExSummary.totalAnticipatedMonthlyAmount
          },
          onFieldChange: ::this._onFieldChange,
          onSubmit: ::this._onFormSubmit,
          isLoadingAccount,
          isLoadingPerExSummary,
          isSubmitting,
          actionStatus: isUndefined(selectedGoal) ? ActionStatus.create : ActionStatus.edit
        }
      };

      // For initialValues of Investment Goal Editing
      if (!isUndefined(selectedGoal)) {
        massagedProps.formProps.initialValues = {
          nickname: selectedGoal.nickname,
          balanceAtGoalStart: selectedGoal.balanceAtGoalStart,
          projectedRR: selectedGoal.projectedRR,
          goalAmount: selectedGoal.goalAmount,
          desiredTermInYears: selectedGoal.desiredTermInYears,
          desiredPaymentPerMonth: selectedGoal.desiredPaymentPerMonth,
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
      data: state.investmentGoal,
      isSubmitting: state.goals.isSubmitting,
      goals: state.dashboard.goals
    };
  }

  return connect(mapStateToProps)(WrappedInvestmentGoalComponent);
}

export default InvestmentGoalHOC;
