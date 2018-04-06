import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import headerLinks from '../../config/headerLinks';
import noFinPlanHeaderLinks from '../../config/noFinPlanHeaderLinks';

import './LoggedInHeader.scss';

const Header = ({ disabledFinPlan }) => (
  <div className="logged-in-header-component ">
    <div className="header-content-container text-right">
      { disabledFinPlan ? noFinPlanHeaderLinks.map((link, idx) => (
        <Link to={link.route}
              key={idx}
              onClick={link.onClick}
              className="header-link">
          {link.name}
        </Link>
      ))
      :
      headerLinks.map((link, idx) => (
        <Link to={link.route}
              key={idx}
              onClick={link.onClick}
              className="header-link">
          {link.name}
        </Link>
      ))
    }
    </div>
  </div>
);

Header.propTypes = {
  disabledFinPlan: PropTypes.bool
};

export default Header;
