// Global Deps
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
// Local Deps
import { yodleeDateFormat } from '../config/properties';
// Actions
import { getYodleeAccountBalances } from '../actions/global/balances';
import { predictBills } from '../actions/global/transactionFieldsets';
import { getPerExAnalysis } from '../actions/global/analysis';
import { getGoals } from '../actions/global/goals';
// Utils
import { formatFieldsetsByDate } from '../utils/editableTransactionFieldsetUtils';
import {
        parseDashboardGoals,
        parsePredictedFieldsets,
        parseGoalSummary
      } from '../utils/parsingUtils';
import {
        getFirstOfMonth,
        convertMomentToUtcAndFormat,
        createNowMoment
      } from '../utils/dateUtils';

function DashboardHOC(WrappedComponent) {
  class WrappedDashboardComponent extends Component {

    static propTypes = {
      user: PropTypes.object.isRequired,
      predictedBills: PropTypes.array.isRequired,
      enabledAccounts: PropTypes.array.isRequired,
      enabledYodleeAccounts: PropTypes.array.isRequired,
      goals: PropTypes.array.isRequired,
      balances: PropTypes.array.isRequired,
      hasFetchedAccounts: PropTypes.bool.isRequired,
      hasFetchedGoals: PropTypes.bool.isRequired,
      hasFetchedBalances: PropTypes.bool.isRequired,
      hasFetchedPredictedBills: PropTypes.bool.isRequired,
      dispatch: PropTypes.func.isRequired,
      billSummary: PropTypes.object.isRequired,
      perExSummary: PropTypes.object.isRequired,
    };

    componentDidMount() {
      const {
        dispatch,
        hasFetchedGoals
      } = this.props;
      const firstOfMonthMoment = getFirstOfMonth();
      const firstOfMonthDate = convertMomentToUtcAndFormat(
        firstOfMonthMoment,
        yodleeDateFormat
      );
      // Need current + beginning-of-month account balances:
      dispatch(getYodleeAccountBalances({
        fromDate: firstOfMonthDate,
        toDate: firstOfMonthDate
      }));
      dispatch(predictBills());
      dispatch(getPerExAnalysis());
      /*
      * If we are returning to the Dashboard after initially fetching goals,
      * there is a chance that a goal has been added.  We re-fetch goals
      * here to check for new ones.
      */
      if (hasFetchedGoals) {
        dispatch(getGoals());
      }
    }

    render() {
      const {
        user,
        predictedBills,
        enabledAccounts,
        enabledYodleeAccounts,
        goals,
        balances,
        hasFetchedAccounts,
        hasFetchedGoals,
        hasFetchedBalances,
        hasFetchedPredictedBills,
        billSummary,
        perExSummary
      } = this.props;

      const canFormatGoals = !isEmpty(goals) && !isEmpty(enabledYodleeAccounts);
      const formattedGoals = canFormatGoals ?
        parseDashboardGoals({ goals, enabledYodleeAccounts, balances }) :
        [];
      const today = createNowMoment();
      const parsedBills = parsePredictedFieldsets(predictedBills);
      const formattedBills = formatFieldsetsByDate(
        parsedBills,
        today
      );
      const goalSummary = parseGoalSummary(formattedGoals);

      const massagedProps = {
        user,
        predictedBills: formattedBills,
        enabledAccounts,
        enabledYodleeAccounts,
        goals: formattedGoals,
        hasFetchedAccounts,
        hasFetchedGoals,
        hasFetchedBalances,
        hasFetchedPredictedBills,
        billSummary,
        perExSummary,
        goalSummary
      };

      return (
        <WrappedComponent {...massagedProps} />
      );
    }

  }

  function mapStateToProps({ dashboard }) {
    return dashboard;
  }

  return connect(mapStateToProps)(WrappedDashboardComponent);
}

export default DashboardHOC;
