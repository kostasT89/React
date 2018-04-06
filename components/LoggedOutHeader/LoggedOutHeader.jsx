import React from 'react';
import { Link } from 'react-router';
import cms from '../../config/messages';
import Routes from '../../constants/Routes';

import './LoggedOutHeader.scss';

const LoggedOutHeader = () => (
  <div className="logged-out-header-component">
    <div className="header-content-container">
      <Link to={Routes.home}
            className="app-name">
        {cms['header.title']}
      </Link>
    </div>
  </div>
);

export default LoggedOutHeader;
