import React from 'react';
import PropTypes from 'prop-types';
import cms from '../../../config/messages';

// Components
import Switch from '../../Form/Switch/Switch';
import FontAwesomeIcon from '../../FontAwesomeIcon/FontAwesomeIcon';
import {
          formatNumberWithCommas,
          capitalizeFirstLetterOfEachWord
        } from '../../../utils/stringUtils';
import { currencyPrecision } from '../../../config/properties';

const precision = currencyPrecision;
const AccountSettingsRow = ({
    account,
    onToggle,
    toggleStates
  }) => {
    const {
      accountName,
      balance: { amount },
      yodleeId,
      id
    } = account;
    return (
      <tr key={id}>
        <td className="lc-account-settings__table-data chevron">
          <span className="lc-account-settings__table-data-text">
            <FontAwesomeIcon icon="chevron-up" />
          </span>
        </td>
        <td className="lc-account-settings__table-data account-name">
          <span className="lc-account-settings__table-data-text">
            {capitalizeFirstLetterOfEachWord(accountName)}
          </span>
        </td>
        <td className="lc-account-settings__table-data amount">
          <span className="lc-account-settings__table-data-text">
            $ {formatNumberWithCommas(amount, precision)}
          </span>
        </td>
        <td className="lc-account-settings__table-data switch">
          <Switch
            handleToggle={() => onToggle(account)}
            value={toggleStates[yodleeId]}
            name={id.toString()}
           />
        </td>
        {
          toggleStates[yodleeId] ?
            <td className="lc-account-settings__row-note" />
          :
            <td className="lc-account-settings__row-note">
              {cms['settings.accountDisabled']}
            </td>
        }
      </tr>
    );
  };

AccountSettingsRow.propTypes = {
  account: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  toggleStates: PropTypes.object.isRequired,
};

export default AccountSettingsRow;
