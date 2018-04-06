import React from 'react';
import PropTypes from 'prop-types';
import { calculateNetworth } from '../../../utils/accountUtils';
import { formatNumberWithCommas } from '../../../utils/stringUtils';
import { networth } from '../../../schemas/sideNavSchema';
import { CURRENCY_ZERO } from '../../../config/properties';

const Networth = ({ accounts }) => {
  const amount = calculateNetworth(accounts);
  const nwIsNegative = amount < 0;
  const absAmount = amount ? Math.abs(amount) : CURRENCY_ZERO;
  const formattedAmount = formatNumberWithCommas(absAmount, 2);

  const displayAmount = nwIsNegative ? `-$${formattedAmount}` : `$${formattedAmount}`;

  const { title, icon } = networth;
  return (
    <div className="lc-networth lc-nav-parent-element">
      <img src={icon}
           role="presentation" />
      <span className="parent-title">
        {title}
      </span>
      <div className="side-nav-right">
        {displayAmount}
      </div>
    </div>
  );
};

Networth.propTypes = {
  accounts: PropTypes.object.isRequired
};

export default Networth;
