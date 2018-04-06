import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
// Local Deps:
import GoalSnapshot from '../GoalSnapshot/GoalSnapshot';
import './FinancialSnapshot.scss';
import cms from '../../config/messages';
import Routes from '../../constants/Routes';
import { NUMBER_ZERO } from '../../config/properties';
import config from '../../config/goalSnapshot';
// Actions
import { getPerExAnalysis } from '../../actions/global/analysis';
// Utils
import { formatGoalsForSnapshot } from '../../utils/goalUtils';
import { createAccountsObject } from '../../utils/accountUtils';

class FinancialSnapshot extends Component {

  static _generateGoals(goals, accounts) {
    const formattedGoals = formatGoalsForSnapshot(goals, accounts);

    return formattedGoals.map((goalProps, idx) => (
      <div className="lc-financial-snapshot__goal-container columns small-3"
           key={idx} >
        <GoalSnapshot {...goalProps} />
      </div>
    ));
  }

  static _formatPerExData(perExAvailable, perExRemaining) {
    const availableInt = parseInt(perExAvailable, 10);
    const remainingInt = parseInt(perExRemaining, 10);
    const available = availableInt > -1 ? availableInt : NUMBER_ZERO;
    const remaining = remainingInt > -1 ? remainingInt : NUMBER_ZERO;
    return [
      {
        name: cms['snapshot.data.available'],
        value: available,
        fill: config['fill.perEx']
      },
      {
        name: cms['snapshot.data.remaining'],
        value: remaining,
        fill: config['fill.remaining']
      }
    ];
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getPerExAnalysis());
  }

  render() {
    const { _generateGoals, _formatPerExData } = FinancialSnapshot;
    const {
      goals,
      accounts,
      perExSummary,
      isLoadingGoals,
      isLoadingAccounts
    } = this.props;

    const perExAvailable = perExSummary.totalActualAmountThisMonth;
    const totalAnticipatedMonthlyAmount = perExSummary.totalAnticipatedMonthlyAmount;
    const perExRemaining = totalAnticipatedMonthlyAmount - perExAvailable;

    const data = _formatPerExData(perExAvailable, perExRemaining);
    const isLoading = isLoadingAccounts || isLoadingGoals;
    const accountsObject = createAccountsObject(accounts);

    return (
      <div className="lc-financial-snapshot">
        <div className="lc-financial-snapshot__content">
          <div className="lc-financial-snapshot__perex-container">
            <GoalSnapshot className="lc-goal-snapshot--perex"
                          data={data}
                          message={cms['snapshot.perEx']}
                          amount={perExAvailable} />
          </div>
          <Link to={Routes.goalSelect}
                className="lc-financial-snapshot__link">
            + <span className="lc-financial-snapshot__link-text">{cms['snapshot.createGoal']}</span>
          </Link>
          <div className="lc-financial-snapshot__goals-container">
            {!isLoading && _generateGoals(goals, accountsObject)}
          </div>
        </div>
      </div>
    );
  }
}

FinancialSnapshot.defaultProps = {
  perExSummary: {
    totalActualAmountThisMonth: NUMBER_ZERO,
    totalAnticipatedMonthlyAmount: NUMBER_ZERO
  }
};

FinancialSnapshot.propTypes = {
  goals: PropTypes.array.isRequired,
  accounts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  perExSummary: PropTypes.shape({
    totalActualAmountThisMonth: PropTypes.number,
    totalAnticipatedMonthlyAmount: PropTypes.number,
  }).isRequired,
  isLoadingGoals: PropTypes.bool.isRequired,
  isLoadingAccounts: PropTypes.bool.isRequired
};

function mapStateToProps({ globalReducer, transactionsSummary }) {
  const {
    goals,
    isLoadingGoals,
    isLoadingAccounts,
    enabledYodleeAccounts,
  } = globalReducer;
  const { perExSummary } = transactionsSummary.summary;
  return {
    goals,
    accounts: enabledYodleeAccounts,
    isLoadingAccounts,
    isLoadingGoals,
    perExSummary
  };
}


export default connect(mapStateToProps)(FinancialSnapshot);
