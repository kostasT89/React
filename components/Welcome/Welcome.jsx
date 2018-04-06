import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import VerticalList from '../../components/VerticalList/VerticalList';
import cms from '../../config/messages';
import { welcomeSteps } from '../../config/properties';
import Routes from '../../constants/Routes';

const Welcome = ({ userName }) => (
  <div className="lc-welcome">
    <div className="lc-welcome-container">
      <div className="lc-row row">
        <h1 className="lc-welcome__header">
          {cms['welcome.header']}{` ${userName}!`}
        </h1>
        <div className="lc-welcome__subtext">
          {cms['welcome.subtext']}
        </div>
        <div className="lc-welcome__list-title">
          {cms['welcome.list.title']}
        </div>
        <VerticalList className="lc-welcome__vertical-list" items={welcomeSteps} />
        <div className="lc-welcome__text">
          {cms['welcome.text']}
        </div>
        <Link to={Routes.connect}>
          <button className="lc-welcome__button" >
            {cms['welcome.button']}
          </button>
        </Link>
      </div>
    </div>
  </div>
);

Welcome.propTypes = {
  userName: PropTypes.string.isRequired
};

export default Welcome;
