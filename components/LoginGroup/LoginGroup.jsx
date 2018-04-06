import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import cms from '../../config/messages';
import Title from '../Title/Title';
import Subtext from '../Subtext/Subtext';
import LoginForm from '../LoginForm/LoginForm';
import LoginMessage from '../LoginMessage/LoginMessage';
import './LoginGroup.scss';

const LoginGroup = ({
  onLoginSubmit,
  onLoginChange,
  loginAttempts,
  loginFormState,
  verifyCallback,
  recaptchaLoaded,
  loginErrorMessage,
  recaptchaAccepted,
  toggleForgotPassword,
  loginCurrentlySending,
  showForgotPasswordForm,
  onRecaptchaLoadCallback
}) => (
  <div className={cx('lc-login-group',
    { 'lc-show-password-reset-group': showForgotPasswordForm })}>
    <div className="lc-login-group__text">
      <Title title={cms['login.title']}
             titleClassName="lc-login-group__title" />
      <Subtext text={cms['login.subtext']}
              subtextClassName="lc-login-group__subtext" />
    </div>
    <LoginMessage errorMessage={loginErrorMessage}
                  loginAttempts={loginAttempts} />
    <LoginForm data={loginFormState}
               onSubmit={onLoginSubmit}
               onChange={onLoginChange}
               verifyCallback={verifyCallback}
               recaptchaLoaded={recaptchaLoaded}
               currentlySending={loginCurrentlySending}
               recaptchaAccepted={recaptchaAccepted}
               toggleForgotPassword={toggleForgotPassword}
               showForgotPasswordForm={showForgotPasswordForm}
               onRecaptchaLoadCallback={onRecaptchaLoadCallback} />
  </div>);

LoginGroup.propTypes = {
  onLoginSubmit: PropTypes.func.isRequired,
  onLoginChange: PropTypes.func.isRequired,
  loginAttempts: PropTypes.number.isRequired,
  loginFormState: PropTypes.object.isRequired,
  verifyCallback: PropTypes.func,
  recaptchaLoaded: PropTypes.bool,
  loginErrorMessage: PropTypes.string,
  recaptchaAccepted: PropTypes.bool,
  toggleForgotPassword: PropTypes.func,
  loginCurrentlySending: PropTypes.bool.isRequired,
  showForgotPasswordForm: PropTypes.bool,
  onRecaptchaLoadCallback: PropTypes.func
};

export default LoginGroup;

// loginAttempts
// loginErrorMessage,
// loginCurrentlySending,
// onLoginSubmit: ::this._sendData,
// onLoginChange: ::this._changeForm,
// loginFormState: formState
