import React from 'react';
import { Link } from 'react-router';
import { populateGoalSelectionRoute } from '../../../utils/routeUtils';
import cms from '../../../config/messages';
import goalTypes from '../../../constants/enums/goalTypes';

// NOTE: We need to require these so webpack know about them
 /* eslint-disable */
import savings from '../../../assets/png/goalIcons/savings.png';
import loan from '../../../assets/png/goalIcons/loan.png';
import investment from '../../../assets/png/goalIcons/investment.png';
import creditCard from '../../../assets/png/goalIcons/credit-card.png';
/* eslint-enable */

import FinancialSnapshot from '../../../components/FinancialSnapshot/FinancialSnapshot';

const GoalSelect = () => {
  const savingsGoalRoute = populateGoalSelectionRoute(goalTypes.savings);
  const investmentGoalRoute = populateGoalSelectionRoute(goalTypes.investment);
  const creditCardGoalRoute = populateGoalSelectionRoute(goalTypes.creditCard);
  const loanGoalRoute = populateGoalSelectionRoute(goalTypes.loan);
  return (
    <div className="lc-goal-select">
      <FinancialSnapshot />
      <div className="lc-goal-select__container">
        <div className="lc-goal-select__title">
          {cms['goals.select.title']}
        </div>
        <div className="lc-goal-select__content">
          <div className="lc-goal-select__message">
            {cms['goals.select.mainMessage']}
            <div className="lc-goal-second-message">
              {cms['goals.select.secondaryMessage']}
            </div>
          </div>
        </div>
      </div>
      <div className="lc-goal-select__buttons-container">
        <div className="lc-column small-6 columns">
          <Link to={savingsGoalRoute}
            className="lc-goal-select__link lc-goal-select__link--left">
            <div className="lc-goal-select__goal lc-goal-select__goal-savings">
              <div className="lc-goal-select__goal-title">
                {cms['goals.savingsGoal']}
              </div>
            </div>
          </Link>
        </div>
        <div className="lc-column small-6 columns">
          <Link to={investmentGoalRoute}
            className="lc-goal-select__link lc-goal-select__link--right">
            <div className="lc-goal-select__goal lc-goal-select__goal-investment">
              <div className="lc-goal-select__goal-title">
                {cms['goals.investmentGoal']}
              </div>
            </div>
          </Link>
        </div>
        <div className="lc-column small-6 columns">
          <Link to={creditCardGoalRoute}
            className="lc-goal-select__link lc-goal-select__link--left">
            <div className="lc-goal-select__goal lc-goal-select__goal-credit-card">
              <div className="lc-goal-select__goal-title">
                {cms['goals.ccRepayment']}
              </div>
            </div>
          </Link>
        </div>
        <div className="lc-column small-6 columns">
          <Link to={loanGoalRoute}
            className="lc-goal-select__link lc-goal-select__link--right">
            <div className="lc-goal-select__goal lc-goal-select__goal-loan">
              <div className="lc-goal-select__goal-title">
                {cms['goals.loanRepayment']}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

GoalSelect.propTypes = {};

export default GoalSelect;
