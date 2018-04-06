// Global Deps
import React from 'react';
import PropTypes from 'prop-types';
// Local Deps
import cms from '../../../config/messages';
// Components
import LoadingHexagon from '../../../components/LoadingHexagon/LoadingHexagon';
import FinancialSnapshot from '../../../components/FinancialSnapshot/FinancialSnapshot';
import SavingsGoalForm from '../../../components/Goals/SavingsGoalForm/SavingsGoalForm';
import SavingsGoalHOC from '../../../hoc/Goals/SavingsGoalHOC';

const SavingsGoal = ({ formProps }) => {
  const {
    isLoadingAccount,
    isLoadingPerExSummary
  } = formProps;
  const hasFinishedLoading = !isLoadingPerExSummary && !isLoadingAccount;
  return (
    <div className="lc-goal lc-savings-goal">
      <FinancialSnapshot />
      <div className="lc-goal__content">
        <div className="lc-row row">
          <h1 className="lc-goal__header">
            {cms['goals.savingsGoal.header']}
          </h1>
          <div className="lc-goal__form lc-column columns small-12">
            { !hasFinishedLoading ?
              <LoadingHexagon />
              :
              <SavingsGoalForm {...formProps} /> }
          </div>
        </div>
      </div>
    </div>
  );
};

SavingsGoal.propTypes = {
  formProps: PropTypes.object.isRequired
};

export default SavingsGoalHOC(SavingsGoal);
