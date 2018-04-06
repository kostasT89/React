import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
// Local Deps
import { addBalanceToAccounts } from '../../utils/accountUtils';
import { loadAccountsIfNeededToggleStates } from '../../utils/settingsUtils';

function AccountHOC(WrappedComponent) {
  const WrappedAccountSettingsComponent = ({
    isLoadingAccounts,
    enabledAccounts,
    enabledYodleeAccounts,
    toggleStates,
    dispatch
  }) => {
    let accounts = [];
    let updatedToggleStates = toggleStates;

    if (!isEmpty(enabledAccounts) && !isEmpty(enabledYodleeAccounts)) {
      accounts = addBalanceToAccounts(enabledAccounts, enabledYodleeAccounts);
      updatedToggleStates = loadAccountsIfNeededToggleStates(toggleStates, accounts);
    }

    const massagedProps = {
      isLoadingAccounts,
      accounts,
      toggleStates: updatedToggleStates,
      dispatch
    };

    return (
      <WrappedComponent {...massagedProps} />
    );
  };

  WrappedAccountSettingsComponent.propTypes = {
    isLoadingAccounts: PropTypes.bool.isRequired,
    enabledAccounts: PropTypes.array.isRequired,
    enabledYodleeAccounts: PropTypes.array.isRequired,
    toggleStates: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  function mapStateToProps({ settings }) {
    return settings;
  }

  return connect(mapStateToProps)(WrappedAccountSettingsComponent);
}
export default AccountHOC;
