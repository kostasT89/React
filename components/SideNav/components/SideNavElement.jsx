import React from 'react';
import PropTypes from 'prop-types';
import { formatMoney } from 'accounting';
import isEmpty from 'lodash/isEmpty';

import SideNavSubElement from './SideNavSubElement';
import { mapReduceTotals } from '../../../utils/mapReduceUtils';
import { currencyPrecision } from '../../../config/properties';

const amount = 'amount';
const precision = { precision: currencyPrecision };

function generateSubElements(subNavElements, accountType, handleClick) {
  return subNavElements.map((element, idx) => (
    <SideNavSubElement {...element} key={idx} accountType={accountType} handleClick={handleClick} />
  ));
}

function generateParentElement(icon, title, navClass, subNavElements) {
  return (
    <div className={`${navClass} lc-nav-parent-element`}>
      <img src={icon}
           role="presentation" />
      <span className="parent-title">
        {title}
      </span>
      <div className="side-nav-right">
        {formatMoney(mapReduceTotals(subNavElements, amount, 0), precision)}
      </div>
    </div>
  );
}

const SideNavElement = ({ icon, title, navClass, subNavElements, accountType, handleClick }) => (
  <div className="side-nav-element-component">
    { generateParentElement(icon, title, navClass, subNavElements)}
    { !isEmpty(subNavElements) && generateSubElements(subNavElements, accountType, handleClick)}
  </div>
);

SideNavElement.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  navClass: PropTypes.string.isRequired,
  subNavElements: PropTypes.array.isRequired,
  accountType: PropTypes.string.isRequired,
  handleClick: PropTypes.func
};

export default SideNavElement;
