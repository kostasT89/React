import React from 'react';
import cms from '../../config/messages';
import { exitCoBrowsingMode } from '../../utils/logoutUtils';

import './CoBrowsingHeader.scss';

const CoBrowsingHeader = () => (
  <div className="lc-co-browsing-header-component">
    {cms['co_browsing_header.title']}
    <span onClick={exitCoBrowsingMode}
          className="lc-co-browsing-exit fa fa-times" />
  </div>
);

export default CoBrowsingHeader;
