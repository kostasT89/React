import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import map from 'lodash/map';

// Components
import cms from '../../../config/messages';
import Routes from '../../../constants/Routes';
import SettingsSelector from '../../../components/Settings/SettingsSelector/SettingsSelector';
import AccountSettings from '../../../components/Settings/AccountSettings/AccountSettings';
import FinancialSnapshot from '../../../components/FinancialSnapshot/FinancialSnapshot';
import AccountsSettingsHOC from '../../../hoc/Settings/AccountsSettingsHOC';
import LoadingHexagon from '../../../components/LoadingHexagon/LoadingHexagon';
import GenericButton from '../../../components/GenericButton/GenericButton';

class Accounts extends Component {

  static generateAccounts(toggleStates, accounts, dispatch) {
    return map(accounts, acctObj => (
      <div key={acctObj.id}>
        { acctObj.data.length > 0 &&
        <AccountSettings accountType={acctObj.data.id}
          accountData={acctObj.data}
          toggleStates={toggleStates}
          dispatch={dispatch}
          key={acctObj.data.yodleeId} />
        }
      </div>
    ));
  }

  render() {
    const { generateAccounts } = Accounts;
    const {
      accounts,
      isLoadingAccounts,
      toggleStates,
      dispatch
    } = this.props;

    return (
      <div className="lc-accounts">
        <FinancialSnapshot />
        <div className="lc-accounts__content">
          <SettingsSelector />
          <div>
            { isLoadingAccounts ?
              <LoadingHexagon />
              :
              generateAccounts(toggleStates, accounts, dispatch) }
          </div>
        </div>
        <div className="lc-accounts__footer">
          <div className="lc-accounts__button-container">
            <Link to={Routes.dashboard}
                  className="lc-accounts__link">
              <GenericButton className="lc-accounts__dashboard-button"
                text={cms['settings.dashboardButton']} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Accounts.propTypes = {
  accounts: PropTypes.array.isRequired,
  isLoadingAccounts: PropTypes.bool.isRequired,
  toggleStates: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default AccountsSettingsHOC(Accounts);
