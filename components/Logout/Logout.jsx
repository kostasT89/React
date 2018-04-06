import React from 'react';
import cms from '../../config/messages';
import logout from '../../utils/logoutUtils';

const Logout = () => (
  <div className="logout-component inline">
    <div className="logout-link"
         onClick={logout}>
      {cms['logout.title']}
    </div>
  </div>
);

export default Logout;
