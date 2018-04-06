import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'react-redux';
import cms from '../../config/messages';
import {
        maxLoginAttempts,
        minPasswordLength
       } from '../../config/properties';

import {
        login,
        changeForm,
        clearLoginMessage,
        toggleForgotPassword,
        passwordResetMessage,
        sendPasswordResetEmail,
        loginRecaptchaAccepted,
        setLoginRecaptchaLoaded,
      } from '../../actions/login';
import {
        signup,
        toggleTOC,
        setSignupMessage,
        changeSignupForm,
        verifyUserAccount,
        signupRecaptchaAccepted,
        setSignupRecaptchaLoaded
      } from '../../actions/signup';

import {
        ERROR,
        SUCCESS
       } from '../../constants/AppConstants';

import { getTokenFromSearchParams } from '../../utils/parsingUtils';

import mouse from '../../assets/svg/mouse.svg';
import barsImg from '../../assets/svg/bars-icon.svg';
import coinsImg from '../../assets/svg/coin-icon.svg';
import fingerPrintImg from '../../assets/svg/finger-print-icon.svg';

import '../../assets/png/tablet-phone.png';

import Footer from '../../components/Footer/Footer';
import Callout from '../../components/Callout/Callout';
import LoginGroup from '../../components/LoginGroup/LoginGroup';
import SignupGroup from '../../components/SignupGroup/SignupGroup';
import LoggedOutHeader from '../../components/LoggedOutHeader/LoggedOutHeader';

import './Home.scss';

class Home extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loginData: PropTypes.object.isRequired,
    signupData: PropTypes.object.isRequired
  }

  componentDidMount() {
    const accountConfirmationToken = getTokenFromSearchParams(window.location.search.substring(1));
    if (accountConfirmationToken) {
      this.props.dispatch(verifyUserAccount(accountConfirmationToken));
    }
  }

  _sendData(event) {
    event.preventDefault();
    const {
      dispatch,
      loginData: {
        formState: {
          email,
          password
        },
        loginAttempts,
        gRecaptchaResponse,
        showForgotPasswordForm
      }
    } = this.props;

    if (showForgotPasswordForm && gRecaptchaResponse) {
      return dispatch(sendPasswordResetEmail(email, gRecaptchaResponse));
    }

    if (loginAttempts < maxLoginAttempts) {
      dispatch(login(email, password));
    }
    else {
      dispatch(clearLoginMessage());
    }
  }

  _signup(event) {
    event.preventDefault();

    const {
      signupData: {
        formState: {
          email,
          password,
          firstName
        },
        gRecaptchaResponse
      },
      dispatch
    } = this.props;

    if (password.length >= minPasswordLength) {
      dispatch(signup({
        email,
        password,
        firstName,
        gRecaptchaResponse
      }));
    }
    else {
      dispatch(setSignupMessage(cms['signup.password_too_short'], ERROR));
    }
  }

  _changeForm(newState) {
    this.props.dispatch(changeForm(newState));
  }

  _changeSignupForm(newState) {
    this.props.dispatch(changeSignupForm(newState));
  }

  _onSignupRecaptchaLoad() {
    this.props.dispatch(setSignupRecaptchaLoaded());
  }

  _onLoginRecaptchaLoad() {
    this.props.dispatch(setLoginRecaptchaLoaded());
  }

  _verifySignupCallback(gRecaptchaResponse) {
    this.props.dispatch(signupRecaptchaAccepted(gRecaptchaResponse));
  }

  _verifyLoginCallback(gRecaptchaResponse) {
    this.props.dispatch(loginRecaptchaAccepted(gRecaptchaResponse));
  }

  _clearSignupMessage() {
    this.props.dispatch(setSignupMessage('', ''));
  }

  _clearLoginErrorMessage() {
    this.props.dispatch(passwordResetMessage('', ''));
  }

  _toggleForgotPassword() {
    this.props.dispatch(toggleForgotPassword());
  }

  _toggleTOC = () => this.props.dispatch(toggleTOC());

  renderLoginGroup(loginData) {
    const {
      formState,
      errorMessage,
      loginAttempts,
      recaptchaLoaded,
      currentlySending,
      recaptchaAccepted,
      showForgotPasswordForm
    } = loginData;

    const loginGroupProps = {
      onLoginSubmit: ::this._sendData,
      onLoginChange: ::this._changeForm,
      loginAttempts,
      verifyCallback: ::this._verifyLoginCallback,
      loginFormState: formState,
      recaptchaLoaded,
      loginErrorMessage: errorMessage,
      recaptchaAccepted,
      loginCurrentlySending: currentlySending,
      showForgotPasswordForm,
      toggleForgotPassword: ::this._toggleForgotPassword,
      onRecaptchaLoadCallback: ::this._onLoginRecaptchaLoad,
    };

    return (<LoginGroup {...loginGroupProps} />);
  }

  renderSignupGroup(signupData) {
    const {
      formState,
      acceptedTOC,
      recaptchaLoaded,
      currentlySending,
      recaptchaAccepted
    } = signupData;

    const signupGroupProps = {
      toggleTOC: this._toggleTOC,
      acceptedTOC,
      onSignupSubmit: ::this._signup,
      verifyCallback: ::this._verifySignupCallback,
      onSignupChange: ::this._changeSignupForm,
      signupFormState: formState,
      recaptchaLoaded,
      recaptchaAccepted,
      signupCurrentlySending: currentlySending,
      onRecaptchaLoadCallback: ::this._onSignupRecaptchaLoad,
    };

    return (<SignupGroup {...signupGroupProps} />);
  }

  render() {
    const {
      loginData: {
        resetPasswordMessage,
        resetPasswordMessageType
      },
      signupData: {
        signupMessage,
        singupMessageType
      }
    } = this.props;
    const signupMessageTitle = singupMessageType === ERROR ?
      cms['signup.signup_error'] : cms['signup.signup_success'];

    return (
      <div className="home-component animated fadeIn">
        <LoggedOutHeader />
        {signupMessage && <Callout title={signupMessageTitle}
                                   message={signupMessage}
                                   onClick={::this._clearSignupMessage}
                                   calloutType={cx({
                                     'error-callout': singupMessageType === ERROR,
                                     'success-callout': singupMessageType === SUCCESS })} />}
        {resetPasswordMessage && <Callout title={cms['login.password_reset_success']}
                                                 message={resetPasswordMessage}
                                                 onClick={::this._clearLoginErrorMessage}
                                                 calloutType={cx({
                                                   'error-callout': resetPasswordMessageType === ERROR,
                                                   'success-callout': resetPasswordMessageType === SUCCESS })} />}
        <section className="lc-row lc-row--one">
          <div className="lc-row__form columns medium-6">
            {this.renderLoginGroup(this.props.loginData)}
          </div>
          <div className="lc-row__form columns medium-6">
            {this.renderSignupGroup(this.props.signupData)}
          </div>
          <div className="mouse-icon-container">
            <div className="mouse-icon-wrapper">
              <img src={mouse}
                   role="presentation" />
            </div>
          </div>
        </section>
        <section className="lc-row lc-row--two">
          <h4>WHAT WE DO</h4>
          <h1>WE MAKE IT EASY</h1>
          <div className="lc-row__details">
            <div className="lc-row__details-group">
              <div className="columns medium-4">
                <div className="lc-row__image columns medium-4">
                  <img src={barsImg}
                       role="presentation" />
                </div>
                <div className="columns medium-8">
                  <h5 className="lc-row__title">
                    Real-Time financial updates sent to your phone
                  </h5>
                  <p className="lc-row__text">
                    Be in control of your information by setting policies in
                    real-time knowing your personal or company information.
                  </p>
                </div>
              </div>
            </div>
            <div className="lc-row__details-group">
              <div className="columns medium-4">
                <div className="lc-row__image columns medium-4">
                  <img src={coinsImg}
                       role="presentation" />
                </div>
                <div className="columns medium-8">
                  <h5 className="lc-row__title">
                    Control Your Spending
                  </h5>
                  <p className="lc-row__text">
                    It&apos;s simple, fast and easy to use.  You can share your files
                    through our mobiles apps, web app, and desktop client.
                  </p>
                </div>
              </div>
            </div>
            <div className="lc-row__details-group">
              <div className="columns medium-4">
                <div className="lc-row__image columns medium-4">
                  <img src={fingerPrintImg}
                       role="presentation" />
                </div>
                <div className="columns medium-8">
                  <h5 className="lc-row__title">
                    Secure Statements
                  </h5>
                  <p className="lc-row__text">
                    Your business can keep running the way you are used to.
                    Use our advanced
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="lc-row lc-row--four">
          <h4>Personal Help</h4>
          <h1>We know its not easy to do it all yourself.</h1>
          <h1>We have people for that!</h1>
          <div className="lc-row__details row">
            <div className="lc-row__details-group columns medium-4">
              <div className="lc-row__image">1</div>
              <h3 className="lc-row__title">
                Import Bank Data into fisecal dashboard
              </h3>
              <p className="lc-row__text">
                fisecal connects you to all of your accounts,
                finds actionable ways to improve your financial health,
                and lets you act on the advice directly from the app
              </p>
            </div>
            <div className="lc-row__details-group columns medium-4">
              <div className="lc-row__image">2</div>
              <h3 className="lc-row__title">
                Build Personal Profile
              </h3>
              <p className="lc-row__text">
                We built fisecal on the idea that the best financial advice
                should be simple and jargon-free.  We made it easy to take
                action directly from the app, and we made it free.
              </p>
            </div>
            <div className="lc-row__details-group columns medium-4">
              <div className="lc-row__image">3</div>
              <h3 className="lc-row__title">
                Get Personal 1-1 Help
              </h3>
              <p className="lc-row__text">
                With all of your financial accounts in one place, fisecal
                connects the dots to ensure you make the best decisions with
                your money
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginData: state.login,
    signupData: state.signup
  };
}

export default connect(mapStateToProps)(Home);
