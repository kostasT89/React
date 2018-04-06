import React from 'react';
import { Link } from 'react-router';
import Routes from '../../../constants/Routes';
import cms from '../../../config/messages';

const SettingsSelector = () => (
  <div className="lc-settings-selector">
    <Link to={Routes.settingsPreferences}
          className="lc-column columns small-6 lc-settings-selector__button"
          activeClassName="lc-active-settings-selector">
      <span className="lc-settings-selector__button-text">
        {cms['settings.selector.preferences']}
      </span>
    </Link>
    { window.location.href.indexOf(Routes.settingsAccounts) <= -1 ?
      <Link to={Routes.settingsAccounts}
            className="lc-column columns small-6 lc-settings-selector__button"
            activeClassName="lc-active-settings-selector">
        <span className="lc-settings-selector__button-text">
          {cms['settings.selector.accounts']}
        </span>
      </Link>
      :
      <div>
        <Link to={Routes.settingsAccounts}
              className="lc-column columns small-4 lc-settings-selector__button"
              activeClassName="lc-active-settings-selector">
          <span className="lc-settings-selector__button-text">
            {cms['settings.selector.accounts']}
          </span>
        </Link>
        <Link to={Routes.connect} className="lc-column columns small-2 lc-settings-selector__button lc-no-shadow">
          <span className="lc-settings-selector__button-text--blue">
            {cms['settings.selector.addAccount']}
          </span>
        </Link>
      </div>
    }
  </div>
);

export default SettingsSelector;
