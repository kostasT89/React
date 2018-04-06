import React from 'react';
import PropTypes from 'prop-types';

import { lookupAccountImageClass } from '../../schemas/accountImageSchema';

const AccountImage = ({ providerId }) => {
  const imageClass = lookupAccountImageClass(providerId);
  return (
    <i className={`lc-account-icon lc-icon lc-icon--${imageClass}`} />
  );
};

AccountImage.propTypes = {
  providerId: PropTypes.string.isRequired,
};

export default AccountImage;
