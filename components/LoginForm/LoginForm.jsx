import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Recaptcha from 'react-recaptcha';
import LoadingWave from '../LoadingWave/LoadingWave';
import Field from '../Form/Field/Field';
import cms from '../../config/messages';
import { siteKey } from '../../config/properties';
import './LoginForm.scss';

export default class LoginForm extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    verifyCallback: PropTypes.func,
    recaptchaLoaded: PropTypes.bool,
    currentlySending: PropTypes.bool.isRequired,
    recaptchaAccepted: PropTypes.bool,
    toggleForgotPassword: PropTypes.func,
    showForgotPasswordForm: PropTypes.bool,
    onRecaptchaLoadCallback: PropTypes.func,
  }

  _changeAttribute(event) {
    const newState = this._mergeWithCurrentState({
      [event.target.name]: event.target.value
    });
    this.props.onChange(newState);
  }

  _mergeWithCurrentState(change) {
    return Object.assign(this.props.data, change);
  }

  render() {
    const {
      data: {
        email,
        password
      },
      onSubmit,
      verifyCallback,
      recaptchaLoaded,
      currentlySending,
      recaptchaAccepted,
      toggleForgotPassword,
      showForgotPasswordForm,
      onRecaptchaLoadCallback
    } = this.props;

    const buttonMessage = showForgotPasswordForm ?
      cms['login.forgot_password_form.button'] : cms['login.login_form.button'];
    const forgotPasswordText = showForgotPasswordForm ?
      cms['login.forgot_password.cancel'] : cms['login.forgot_password'];

    return (
      <form onSubmit={onSubmit}
            className="lc-login-form">
        <Field icon="fa-envelope-o"
               type="text"
               name="email"
               isRequired={true}
               isFocused={true}
               value={email}
               placeholder={cms['login.login_form.email']}
               onChange={::this._changeAttribute} />
        {
          showForgotPasswordForm ?
            <div>
              {!recaptchaLoaded && <div className="lc-recaptcha-overlay">
                {cms['signup.signup_form.loading']}
              </div>}
              <Recaptcha sitekey={siteKey}
                         verifyCallback={verifyCallback}
                         onloadCallback={onRecaptchaLoadCallback} />
            </div>
          :
            <Field icon="fa-unlock-alt"
                 type="password"
                 name="password"
                 value={password}
                 placeholder={cms['login.login_form.password']}
                 onChange={::this._changeAttribute} />
        }
        {
          currentlySending ?
            <div>
              <LoadingWave />
            </div>
          :
            <div className="lc-login-form__button-container">
              <button type="submit"
                      className="lc-login-form__button button"
                      disabled={showForgotPasswordForm && !recaptchaAccepted}>
                {buttonMessage}
              </button>
            </div>
        }
        {toggleForgotPassword &&
          <div className="lc-forgot-password-container"
               onClick={toggleForgotPassword}>
            {forgotPasswordText}
          </div>
        }
      </form>);
  }
}
