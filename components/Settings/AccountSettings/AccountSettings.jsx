import React, { Component } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
// Local Deps:
import { getNumberOfDaysFromToday } from '../../../utils/dateUtils';
import cms from '../../../config/messages';
import {
          toggleAccountState,
          updateAccount,
          deleteProviderAccount
        } from '../../../actions/settings';
// Components
import AccountSettingsRow from '../AccountSettingsRow/AccountSettingsRow';
import AccountIcon from '../../AccountIcon/AccountIcon';
import FontAwesomeIcon from '../../FontAwesomeIcon/FontAwesomeIcon';

class AccountSettings extends Component {

  static generateAccountRows(toggleStates, data, _onToggle) {
    return map(data, (row, key) => (
      <AccountSettingsRow account={row}
        index={key}
        key={row.id}
        onToggle={_onToggle}
        toggleStates={toggleStates} />
    ));
  }

  static generateLastUpdated(acc) {
    return (
      <div className="lc-account-settings__title">
        {cms['settings.lastUpdated'](getNumberOfDaysFromToday(acc.updatedAt))}
      </div>
    );
  }

  _onToggle = (row) => {
    const { dispatch, toggleStates } = this.props;

    // eslint-disable-next-line no-param-reassign
    row.isAccountDisabled = !row.isAccountDisabled;

    dispatch(toggleAccountState(row, toggleStates));
    dispatch(updateAccount(row, toggleStates));
  }

  _deleteProviderAccount = (providerAccountId) => {
    const { dispatch } = this.props;
    dispatch(deleteProviderAccount(providerAccountId));
  }

  render() {
    const {
      generateAccountRows,
      generateLastUpdated
    } = AccountSettings;
    const {
      accountData,
      toggleStates
    } = this.props;

    return (
      <div className="lc-account-settings">
        <div className="lc-account-settings__accounts">
          <div className="lc-account-settings__header">
            <div className="lc-column columns small-4">
              <div className="lc-account-settings__logo">
                <AccountIcon providerId={accountData[0].providerId.toString()} />
              </div>
            </div>
            <div className="lc-column columns small-5">
              <div className="lc-account-settings__title">
                <span>
                  { generateLastUpdated(accountData[0]) }
                </span>
              </div>
            </div>
            <div className="lc-column columns small-3">
              <div className="lc-account-settings__actions">
                <ul className="lc-account-settings__ul">
                  <li>
                    <FontAwesomeIcon icon="times-thin" />
                    <a className="lc-account-settings__list-content"
                      onClick={() => this._deleteProviderAccount(accountData[0].providerAccountId)}>
                      {cms['settings.deleteAccount']}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="lc-account-settings__header-divider" />
          <div className="lc-account-settings__body">
            <table className="lc-account-settings__table">
              <tbody>
                { generateAccountRows(toggleStates, accountData, ::this._onToggle) }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

AccountSettings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  accountData: PropTypes.array.isRequired,
  toggleStates: PropTypes.object.isRequired
};

export default AccountSettings;
