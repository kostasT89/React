// Global Deps
import React from 'react';
import PropTypes from 'prop-types';
// Local Deps
import cms from '../../../config/messages';
// Components
import LoadingHexagon from '../../../components/LoadingHexagon/LoadingHexagon';
import FinancialSnapshot from '../../../components/FinancialSnapshot/FinancialSnapshot';
import CreditCardGoalForm from '../../../components/Goals/CreditCardGoalForm/CreditCardGoalForm';
import CreditCardGoalHOC from '../../../hoc/Goals/CreditCardGoalHOC';

const CreditCardGoal = ({ formProps }) => {
  const {
    isLoadingPerExSummary,
    isLoadingAccount,
  } = formProps;
  const hasFinishedLoading = !isLoadingPerExSummary && !isLoadingAccount;
  return (
    <div className="lc-goal lc-credit-card-goal">
      <FinancialSnapshot />
      <div className="lc-goal__content">
        <div className="lc-row row">
          <h1 className="lc-goal__header">
            {cms['goals.ccGoal.header']}
          </h1>
          <div className="lc-goal__form lc-column columns small-12">
            { !hasFinishedLoading ?
              <LoadingHexagon />
              :
              <CreditCardGoalForm {...formProps} /> }
          </div>
        </div>
      </div>
    </div>
  );
};

CreditCardGoal.propTypes = {
  formProps: PropTypes.object.isRequired
};

export default CreditCardGoalHOC(CreditCardGoal);
