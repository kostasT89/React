import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { transactionMenuOptions } from '../../config/formFieldOptions';
import { toggleShowAccountOptionsMenu } from '../../actions/transactionMenu';
import {
        toggleAccountState,
        updateAccount
       } from '../../actions/settings';
import cms from '../../config/messages';
import { disconnectAccount } from '../../actions/global/connect';
import { getTransactionsByAccount } from '../../actions/global/transactions';
import TransactionMenuHOC from '../../hoc/TransactionMenuHOC';
import GenericButton from '../GenericButton/GenericButton';
import FontAwesomeIcon from '../FontAwesomeIcon/FontAwesomeIcon';

import './TransactionMenu.scss';

class TransactionMenu extends Component {

  static propTypes = {
    accountId: PropTypes.string.isRequired,
    showAccountOptionsMenu: PropTypes.bool.isRequired,
    toggleStates: PropTypes.object,
    accountData: PropTypes.object,
    accounts: PropTypes.array,
    dispatch: PropTypes.func
  };


  _getAccountDataById() {
    const { accountData, accounts } = this.props;
    let updatedAccount = {};
    accounts.forEach((accWithId) => {
      if (accountData.id === accWithId.yodleeId) {
        updatedAccount = accWithId;
      }
    });
    return updatedAccount;
  }

  _toggleShowAccountOptionsMenu = () => {
    const { showAccountOptionsMenu, dispatch } = this.props;
    dispatch(toggleShowAccountOptionsMenu(showAccountOptionsMenu));
  }

  _accountOptionSelected = (type) => {
    const { accountId, dispatch, toggleStates } = this.props;
    if (type === transactionMenuOptions.refresh) {
      const page = '1';
      const count = '50';
      dispatch(getTransactionsByAccount({ accountId, page, count }));
    }
    else if (type === transactionMenuOptions.disable) {
      const updatedToggleStates = {
        ...toggleStates,
        [accountId]: true
      };
      const updatedAccount = this._getAccountDataById();

      dispatch(toggleAccountState(updatedAccount, updatedToggleStates));
      dispatch(updateAccount(updatedAccount, updatedToggleStates));
    }
    else if (type === transactionMenuOptions.delete) {
      dispatch(disconnectAccount(accountId));
    }
  }

  render() {
    const { showAccountOptionsMenu } = this.props;
    return (
      <div className="lc-transaction-menu">
        {/* animated and fade-in for showing menu options */}
        <div className="lc-row">
          <div className="lc-transactions-menu__container">
            <GenericButton className="lc-transaction-menu__header-button"
              text={cms['transactions.accountOptions']}
              type="button"
              onClick={::this._toggleShowAccountOptionsMenu} />
            {showAccountOptionsMenu && <FontAwesomeIcon
              optionalClassName="lc-transaction-menu__header-icon"
              icon="chevron-down" />}
            {!showAccountOptionsMenu && <FontAwesomeIcon
              optionalClassName="lc-transaction-menu__header-icon"
              icon="chevron-up" />}
          </div>
        </div>
        <div className="lc-row lc-transaction-menu__content">
          { showAccountOptionsMenu &&
            <div className="lc-transactions-menu__options">
              <div className="lc-transaction-menu__button-container">
                <a onClick={() => this._accountOptionSelected(transactionMenuOptions.refresh)}>
                  {transactionMenuOptions.refresh}
                </a>
                <a onClick={() => this._accountOptionSelected(transactionMenuOptions.disable)}>
                  {transactionMenuOptions.disable}
                </a>
                <a onClick={() => this._accountOptionSelected(transactionMenuOptions.delete)}>
                  {transactionMenuOptions.delete}
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

TransactionMenu.propTypes = {
  accountId: PropTypes.string.isRequired,
  showAccountOptionsMenu: PropTypes.bool.isRequired,
  toggleStates: PropTypes.object,
  accountData: PropTypes.object,
  accounts: PropTypes.array,
  dispatch: PropTypes.func
};

export default TransactionMenuHOC(TransactionMenu);
// export default TransactionMenu;
