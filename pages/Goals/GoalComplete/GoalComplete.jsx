import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import cms from '../../../config/messages';
import '../../../assets/svg/goal-oval.svg';
import goalIcon from '../../../assets/svg/goal-icon.svg';
import Routes from '../../../constants/Routes';

import IconBox from '../../../components/IconBox/IconBox';
import GenericButton from '../../../components/GenericButton/GenericButton';
import FinancialSnapshot from '../../../components/FinancialSnapshot/FinancialSnapshot';

const GoalComplete = ({ completedGoalName, completedGoalType, firstName }) => {
  const name = completedGoalName ? `"${completedGoalName}"` : '';
  return (
    <div className="lc-goal-complete-wrapper">
      <FinancialSnapshot />
      <div className="lc-goal-complete">
        <div className="lc-goal-complete__content">
          <div className="lc-goal--title">
            <h1>
              {cms['goalComplete.title']}
            </h1>
          </div>
          <div className="lc-goal-complete__image-container">
            <IconBox image={goalIcon} />
          </div>
          <div className="lc-goal-complete__header">
            {cms['goalComplete.header'](firstName)}
          </div>
          <div className="lc-goal-complete__alignment-table">
            <div className="lc-goal-complete__text">
              {cms['goalComplete.content']({
                name,
                type: completedGoalType
              })}
            </div>
            <div className="lc-goal-complete__button-container">
              <Link className="lc-goal-complete__link" to={Routes.dashboard}>
                <GenericButton className="lc-dashboard-button"
                  text={cms['goalComplete.dashboardButton']} />
              </Link>
              <Link className="lc-goal-complete__link lc-goal-complete__link--last"
                    to={Routes.goalSelect}>
                <GenericButton className="lc-button--blue lc-add-more-button"
                               text={cms['goalComplete.addAnotherGoalButton']} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

GoalComplete.propTypes = {
  completedGoalName: PropTypes.string.isRequired,
  completedGoalType: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    completedGoalName: state.goals.completedGoalName,
    completedGoalType: state.goals.completedGoalType,
    firstName: state.globalReducer.userData.firstName
  };
}

export default connect(mapStateToProps)(GoalComplete);
