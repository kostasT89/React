// Global Deps
import React, { PropTypes, Component } from 'react';
// Local Deps
import { deleteFinPlanAsset } from '../../../actions/global/finPlan/finPlanAssets';
import { submitFinPlanAssetForm } from '../../../actions/finPlan/finPlanAssets';
import { lookupMessage } from '../../../utils/cmsUtils';
// Components
import AccountItem from '../../Form/AccountItem/AccountItem';
import './BankAccountsForm.scss';

// CONSTS
const noop = () => {};
const BANK_ACCOUNT = 'BANK ACCOUNT';
const keyBase = 'finPlanAssets.assetsForm';

class ConnectedAccounts extends Component {

  static _cms(key) {
    return lookupMessage(keyBase, key);
  }

  static _generateAccounts(accounts, handleToggle) {
    const { _cms } = ConnectedAccounts;
    return (
      <div className="lc-assets-form__account-list">
        <div className="lc-table-body">
          <div className="lc-assets-form__account-list__title">
            {_cms('account-title')}
          </div>
          {/* CONNECT SAVINGS ACCOUNT*/}
          {accounts.map((account, index) => (
            <AccountItem id={account.id}
                           key={index}
                           accountName={`${account.providerName} ${account.accountName}`}
                           accountBalance={account.balance.amount}
                           providerId={account.providerId}
                           displayImage
                           value={account.value}
                           fisecalId={account.fisecalId}
                           handleToggle={handleToggle} />))}
        </div>
      </div>
    );
  }

  _handleToggle({
    id,
    value,
    fisecalId,
    accountName,
    accountBalance,
  }) {
    const { dispatch, finPlanId } = this.props;
    if (value) {
      dispatch(deleteFinPlanAsset(fisecalId, finPlanId));
    }
    else {
      dispatch(submitFinPlanAssetForm({
        finPlanId,
        isNewAsset: true,
        formValues: {
          yodleeId: id,
          finPlanId,
          assetDescription: accountName,
          assetValue: accountBalance,
          formType: BANK_ACCOUNT,
        }
      }));
    }
  }

  render() {
    const { accounts, creationInProgress } = this.props;
    const { _cms, _generateAccounts } = ConnectedAccounts;
    const onClick = creationInProgress ? noop : ::this._handleToggle;
    return (
      <div className="lc-assets-form">
        {/*  SUBTITLE */}
        <div className="lc-row row lc-column__subtitle">
          <div className="lc-column columns small-12">
            {_cms('subtitle')}
          </div>
        </div>
        {/*  ACCOUNTS */}
        {_generateAccounts(accounts, onClick)}
      </div>
    );
  }
}

ConnectedAccounts.propTypes = {
  dispatch: PropTypes.func,
  finPlanId: PropTypes.any,
  accounts: PropTypes.array,
  creationInProgress: PropTypes.bool.isRequired,
};

export default ConnectedAccounts;
