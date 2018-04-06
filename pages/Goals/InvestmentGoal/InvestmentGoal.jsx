// Global Deps
import React from 'react';
import PropTypes from 'prop-types';
// Local Deps
import cms from '../../../config/messages';
// Components
import LoadingHexagon from '../../../components/LoadingHexagon/LoadingHexagon';
import FinancialSnapshot from '../../../components/FinancialSnapshot/FinancialSnapshot';
import InvestmentGoalForm from '../../../components/Goals/InvestmentGoalForm/InvestmentGoalForm';
import InvestmentGoalHOC from '../../../hoc/Goals/InvestmentGoalHOC';

const InvestmentGoal = ({ formProps }) => {
  const {
    isLoadingAccount,
    isLoadingPerExSummary
  } = formProps;
  const hasFinishedLoading = !isLoadingPerExSummary && !isLoadingAccount;
  return (
    <div className="lc-goal lc-investment-goal">
      <FinancialSnapshot />
      <div className="lc-goal__content">
        <div className="lc-row row">
          <h1 className="lc-goal__header">
            {cms['goals.investmentGoal.header']}
          </h1>
          <div className="lc-goal__form lc-column columns small-12">
            { !hasFinishedLoading ?
              <LoadingHexagon />
              :
              <InvestmentGoalForm {...formProps} /> }
          </div>
        </div>
      </div>
    </div>
  );
};

InvestmentGoal.propTypes = {
  formProps: PropTypes.object.isRequired
};

export default InvestmentGoalHOC(InvestmentGoal);
