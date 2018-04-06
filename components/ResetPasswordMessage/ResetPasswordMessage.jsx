import React from 'react';
import PropTypes from 'prop-types';

import './ResetPasswordMessage.scss';

const ResetPasswordMessage = ({ errorMessage }) => (
  <div className="lc-reset-password-message-component">
    {errorMessage &&
      <div className="reset-password-error">
        {errorMessage}
      </div>
    }
  </div>
);

ResetPasswordMessage.propTypes = {
  errorMessage: PropTypes.string,
};

export default ResetPasswordMessage;
