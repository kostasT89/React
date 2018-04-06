// Global Deps:
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import truncate from 'lodash/truncate';
// Local Deps:
import Routes from '../../constants/Routes';
import cms from '../../config/messages';
import piggyBank from '../../assets/svg/piggy-bank.svg';
import FontAwesomeIcon from '../../components/FontAwesomeIcon/FontAwesomeIcon';
import './UserSnapshot.scss';

const nameLength = { length: 35 };

const UserSnapshot = ({ userName, disabledFinPlan }) =>
  (<div className="user-snapshot-component">
    <div className={`inline ${disabledFinPlan ? 'user-wrapper' : 'name-plan-wrapper'} text-left`}>
      <Link to={Routes.settingsPreferences}>
        <div className="user-name">
          <span>
            {truncate(userName, nameLength)}
          </span>
          <FontAwesomeIcon icon="cog" />
        </div>
      </Link>
      {!disabledFinPlan &&
        <Link to={Routes.financialPlan}>
          <div className="financial-plan text-left">
            <img src={piggyBank}
                role="presentation"
                className="piggy-bank inline" />
            <div className="inline financial-plan-title">
              {cms['user_snapshot.financial_plan']}
            </div>
          </div>
        </Link>
      }
    </div>
  </div>);

UserSnapshot.propTypes = {
  userName: PropTypes.string.isRequired,
  disabledFinPlan: PropTypes.bool.isRequired
};

export default UserSnapshot;
