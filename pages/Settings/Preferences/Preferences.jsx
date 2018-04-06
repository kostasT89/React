import React from 'react';
import PropTypes from 'prop-types';
// Components
import FinancialSnapshot from '../../../components/FinancialSnapshot/FinancialSnapshot';
import SettingsSelector from '../../../components/Settings/SettingsSelector/SettingsSelector';
import LoadingHexagon from '../../../components/LoadingHexagon/LoadingHexagon';
import PreferencesForm from '../../../components/Settings/PreferencesForm/PreferencesForm';
import PreferencesHOC from '../../../hoc/Settings/PreferencesSettingsHOC';

const Preferences = ({ formData, isLoadingUser }) => (
  <div className="lc-preferences">
    <FinancialSnapshot />
    <div className="lc-preferences__content">
      <SettingsSelector />
      <div className="lc-preferences__preferences-form-container">
        { isLoadingUser ?
          <LoadingHexagon />
          :
          <PreferencesForm {...formData} /> }
      </div>
    </div>
  </div>
);

Preferences.propTypes = {
  formData: PropTypes.object.isRequired,
  isLoadingUser: PropTypes.bool.isRequired,
};

export default PreferencesHOC(Preferences);
