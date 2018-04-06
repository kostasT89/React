// Global Deps
import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router';
// Local Deps
import cms from '../../../config/messages';
import Routes from '../../../constants/Routes';
import AccountItemTypes from '../../../constants/enums/accountItemTypes';
// Components
import FinancialSnapshot from '../../../components/FinancialSnapshot/FinancialSnapshot';
import LoadingHexagon from '../../../components/LoadingHexagon/LoadingHexagon';
import GenericButton from '../../../components/GenericButton/GenericButton';
import AccountItem from '../../../components/Form/AccountItem/AccountItem';

import SelectGoalAccountHOC from '../../../hoc/Goals/SelectGoalAccountHOC';

const SelectAccount = ({
  header,
  text,
  accounts,
  onSetUpGoalClick,
  onAccountToggle,
  isLoadingAccounts,
  goalType,
  pronoun = 'a'
}) => (
  <div className="lc-select-goal-account">
    <FinancialSnapshot />
    <div className="lc-select-goal-account__header-container">
      {/* <!--HEADER--> */}
      <h1 className="lc-select-goal-account__header">
        {header}
      </h1>
      {/* <!--SUBTEXT--> */}
      <div className="lc-select-goal-account__subtext">
        {cms['goals.selectAcccount.subtext']}
      </div>
      {/* <!--NO ACCOUNTS FOUND MESSAGE--> */}
      {isLoadingAccounts ?
        <LoadingHexagon />
        :
        <div>
          {isEmpty(accounts) &&
            <div className="lc-select-goal-account__message-container">
              <div className="lc-select-goal-account__message">
                {cms['goals.selectAccount.noAccountsFound'](`${pronoun} ${goalType}`)}
              </div>
              {/* <!--BUTTONS--> */}
              <div className="lc-select-goal-account__buttons-container">
                <Link to={Routes.goalSelect}>
                  <GenericButton text={cms['button.previous']} />
                </Link>
                <Link to={Routes.connect}>
                  <GenericButton text={cms['goals.selectAccount.button.connectAccount'](goalType)}
                    className="lc-button--blue" />
                </Link>
              </div>
            </div>
          }
        </div>
      }
    </div>
    {/* <!--CONTENT--> */}
    {!isEmpty(accounts) &&
      <div className="lc-select-goal-account__content">
        <div className="lc-row row">
          <div className="lc-column column lc-goals-accounts__content">
            <div>
              {/* <!--TEXT--> */}
              <div className="lc-select-goal-account__text">
                {text}
              </div>
              {/* <!--ACCOUNTS TABLE--> */}
              <div className="lc-select-goal-account__accounts">
                <ul>
                  {accounts.map((account, index) => (
                    <AccountItem
                      accountName={`${account.providerName} ${account.accountName}`}
                      accountBalance={account.balance.amount}
                      key={index}
                      providerId={account.providerId}
                      id={account.id}
                      value={account.value}
                      fisecalId={account.fisecalId}
                      handleToggle={onAccountToggle}
                      accountItemType={AccountItemTypes.selectGoalAccountItem}
                    />
                  ))}
                </ul>
              </div>
              {/* <!--BUTTONS--> */}
              <div className="lc-select-goal-account__buttons-container">
                <Link to={Routes.goalSelect}>
                  <GenericButton text={cms['button.previous']} />
                </Link>
                <GenericButton className="lc-button--blue"
                               text={cms['goals.selectAccount.button.setUpGoal']}
                               onClick={onSetUpGoalClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  </div>
);

SelectAccount.propTypes = {
  accounts: PropTypes.array.isRequired,
  header: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  pronoun: PropTypes.string.isRequired,
  goalType: PropTypes.string.isRequired,
  onSetUpGoalClick: PropTypes.func.isRequired,
  onAccountToggle: PropTypes.func.isRequired,
  isLoadingAccounts: PropTypes.bool.isRequired
};

export default SelectGoalAccountHOC(SelectAccount);
