import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { lookupAccountImageClass } from '../../../schemas/accountImageSchema';
import Switch from '../../../components/Form/Switch/Switch';
import displayTypes from '../../../constants/enums/displayTypes';
import AccountItemTypes from '../../../constants/enums/accountItemTypes';
import { formatStringForDisplay } from '../../../utils/stringUtils';
import './AccountItem.scss';

const AccountItem = ({
  handleToggle = () => {},
  value,
  accountName,
  accountBalance,
  providerId,
  displayImage,
  fisecalId,
  id,
  accountItemType
}) => (
  <div className={cx('lc-row row lc-account-item', {
    'lc-saving-goal': accountItemType === AccountItemTypes.selectGoalAccountItem
  })}>
    {displayImage && (
      <div className="lc-account-item-logo-container" >
        <div className={cx('lc-account-item__image', `lc-icon--${lookupAccountImageClass(providerId)}`)} />
      </div>
    )}
    <div className={accountItemType === AccountItemTypes.selectGoalAccountItem ?
      'lc-saving-goal-account-item_info' : 'lc-account-item__info'} >
      <h1 className={value > 0 && 'bold-text'} >{accountName}</h1>
      <p className={value > 0 && 'bold-text'} >{formatStringForDisplay({
        value: accountBalance.toString(),
        type: displayTypes.currency
      })}</p>
    </div>
    <div className="lc-account-item__switch">
      <Switch
        value={value}
        handleToggle={() => {
          handleToggle({
            value,
            id,
            accountName,
            accountBalance,
            providerId,
            fisecalId,
          });
        }}
        name={id.toString()}
      />
    </div>
  </div>
);

AccountItem.propTypes = {
  accountName: PropTypes.string.isRequired,
  accountBalance: PropTypes.number.isRequired,
  providerId: PropTypes.string.isRequired,
  handleToggle: PropTypes.func,
  value: PropTypes.any,
  displayImage: PropTypes.any,
  id: PropTypes.any,
  fisecalId: PropTypes.any,
  accountItemType: PropTypes.string
};

export default AccountItem;
