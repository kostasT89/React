/* eslint no-nested-ternary:0 */
import React from 'react';
import PropTypes from 'prop-types';
import cms from '../../config/messages';
import { maxLoginAttempts } from '../../config/properties';
import './LoginMessage.scss';

const LoginMessage = ({ errorMessage, loginAttempts }) => (
  <div className="login-message-component">
    {
      loginAttempts >= maxLoginAttempts ?
        <div className="login-error">
          { cms['login.locked_out'] }
        </div>
        :
      errorMessage ?
        <div className="login-error">
          {`${errorMessage} - ${maxLoginAttempts - loginAttempts} ${cms['login.remaining']}`}
        </div>
      :
      null
    }
  </div>
);

LoginMessage.propTypes = {
  errorMessage: PropTypes.string,
  loginAttempts: PropTypes.number.isRequired
};

export default LoginMessage;
