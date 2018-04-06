import React from 'react';
import { forwardToHome } from '../../utils/navigationUtils';
import cms from '../../config/messages';

const NotFound = () => (
  <div className="not-found-component text-center">
    <h2>
      {cms['not_found.title']}
    </h2>
    <div className="button secondary home-button"
         onClick={() => { forwardToHome(); }}>
      {cms['not_found.home']}
    </div>
  </div>
);

export default NotFound;
