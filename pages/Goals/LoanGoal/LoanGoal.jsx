// Global Deps
import React from 'react';
import PropTypes from 'prop-types';
// Local Deps
import cms from '../../../config/messages';
// Components
import LoadingHexagon from '../../../components/LoadingHexagon/LoadingHexagon';
import FinancialSnapshot from '../../../components/FinancialSnapshot/FinancialSnapshot';
import LoanGoalForm from '../../../components/Goals/LoanGoalForm/LoanGoalForm';
import LoanGoalHOC from '../../../hoc/Goals/LoanGoalHOC';

const LoanGoal = ({ formProps }) => {
  const {
    isLoadingPerExSummary,
    isLoadingAccount
  } = formProps;
  const hasFinishedLoading = !isLoadingPerExSummary && !isLoadingAccount;
  return (
    <div className="lc-goal lc-loan-goal">
      <FinancialSnapshot />
      <div className="lc-goal__content">
        <div className="lc-row row">
          <h1 className="lc-goal__header">
            {cms['goals.loanGoal.header']}
          </h1>
          <div className="lc-goal__form lc-column columns small-12">
            { !hasFinishedLoading ?
              <LoadingHexagon />
              :
              <LoanGoalForm {...formProps} /> }
          </div>
        </div>
      </div>
    </div>
  );
};

LoanGoal.propTypes = {
  formProps: PropTypes.object.isRequired
};

export default LoanGoalHOC(LoanGoal);
