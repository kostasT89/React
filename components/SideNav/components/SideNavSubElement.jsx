import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { formatMoney } from 'accounting';
import cx from 'classnames';
import truncate from 'lodash/truncate';
import AccountTypes from '../../../../app/constants/enums/accountTypes';

import { populateAccountTransactionsRoute } from '../../../utils/routeUtils';

const titleLength = { length: 20 };
const subTitleLength = { length: 30 };

class SideNavElement extends Component {

  static _generateContent(accountId, title, amount, subTitle) {
    return (
      <div className={cx('side-nav-sub-element-component', { 'multiple-line': !!subTitle })}>
        <div>
          <div>
            {truncate(title, titleLength)}
            <div className="side-nav-right">
              {formatMoney(amount)}
            </div>
          </div>
          <div className="sub-title">
            {truncate(subTitle, subTitleLength)}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {
      accountId,
      title,
      amount,
      subTitle,
      accountType,
      handleClick
    } = this.props;

    const { _generateContent } = SideNavElement;

    return (
      accountType !== AccountTypes.additionalAsset ?
        <Link to={populateAccountTransactionsRoute({ accountId })} >
          { _generateContent(accountId, title, amount, subTitle) }
        </Link>
      :
        <a onClick={() => handleClick(accountId, title, amount)}>
          { _generateContent(accountId, title, amount, subTitle) }
        </a>
    );
  }
}

SideNavElement.propTypes = {
  accountId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  amount: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  subTitle: PropTypes.string,
  accountType: PropTypes.string.isRequired,
  handleClick: PropTypes.func
};

export default SideNavElement;
