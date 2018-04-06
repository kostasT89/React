import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
// Local Deps
import { EMPTY_STRING } from '../config/properties';
import avatarTmp from '../assets/images/avatar-tmp.png';
import { parseAccountsForSideNav } from '../utils/parsingUtils';
import {
        updateSideNavEnabledAccounts,
        createAccountsObject,
        addBalanceToAccounts
      } from '../utils/accountUtils';
import { loadAccountsIfNeededToggleStates } from '../utils/settingsUtils';

function SideNavHOC(WrappedComponent) {
  const WrappedSideNavComponent = ({
    dispatch,
    enabledAccounts,
    enabledYodleeAccounts,
    userData,
    updatedAccount,
    toggleStates,
    additionalAssets
  }) => {
    const sideNavUserData = {
      userAvatar: avatarTmp,
      userName: userData.firstName || EMPTY_STRING
    };
    let parsedAccounts = {
      loan: [],
      creditCard: [],
      bank: [],
      investment: [],
      additionalAsset: []
    };
    let accounts = [];
    let updatedToggleStates = {};
    if (!isEmpty(enabledAccounts) && !isEmpty(enabledYodleeAccounts)) {
      accounts = addBalanceToAccounts(enabledAccounts, enabledYodleeAccounts);
      updatedToggleStates = loadAccountsIfNeededToggleStates(toggleStates, accounts);
    }
    if (!isEmpty(enabledYodleeAccounts)) {
      const accountsObject = createAccountsObject(enabledYodleeAccounts);
      parsedAccounts = parseAccountsForSideNav(accountsObject, updatedToggleStates);
    }

    if (parsedAccounts && updatedAccount && updatedAccount.isAccountDisabled) {
      parsedAccounts = updateSideNavEnabledAccounts(
        parsedAccounts,
        updatedAccount,
        updatedToggleStates
      );
    }

    // Parse additionalAsset to account object format
    if (!isEmpty(additionalAssets)) {
      additionalAssets.forEach((element) => {
        parsedAccounts.additionalAsset.push({
          title: element.property,
          amount: element.estimatedValue,
          accountId: element.id,
        });
      });
    }


    const massagedProps = {
      userData: sideNavUserData,
      accounts: parsedAccounts,
      accountsWithDisabledParam: get(accounts, '[0].data'),
      toggleStates: updatedToggleStates,
      disabledFinPlan: isEmpty(enabledAccounts),
      dispatch,
    };

    return (
      <WrappedComponent {...massagedProps} />
    );
  };

  WrappedSideNavComponent.propTypes = {
    dispatch: PropTypes.func,
    enabledYodleeAccounts: PropTypes.array.isRequired,
    enabledAccounts: PropTypes.array.isRequired,
    updatedAccount: PropTypes.object,
    userData: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      userAvatar: PropTypes.string
    }).isRequired,
    toggleStates: PropTypes.object,
    additionalAssets: PropTypes.array
  };

  function mapStateToProps(state) {
    const {
      globalReducer,
      sideNav,
      settings,
      finPlanAssets
    } = state;
    return {
      enabledYodleeAccounts: sideNav.enabledYodleeAccounts,
      enabledAccounts: sideNav.enabledAccounts,
      userData: globalReducer.userData,
      toggleStates: settings.toggleStates,
      updatedAccount: sideNav.updatedAccount,
      additionalAssets: finPlanAssets.additionalAssets
    };
  }

  return connect(mapStateToProps)(WrappedSideNavComponent);
}

export default SideNavHOC;
