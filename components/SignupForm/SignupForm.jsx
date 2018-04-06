import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Recaptcha from 'react-recaptcha';

import Field from '../Form/Field/Field';
import LoadingWave from '../LoadingWave/LoadingWave';

import cms from '../../config/messages';
import { siteKey } from '../../config/properties';

import './SignupForm.scss';

export default class SignupForm extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    toggleTOC: PropTypes.func.isRequired,
    acceptedTOC: PropTypes.bool.isRequired,
    verifyCallback: PropTypes.func.isRequired,
    recaptchaLoaded: PropTypes.bool.isRequired,
    currentlySending: PropTypes.bool.isRequired,
    recaptchaAccepted: PropTypes.bool.isRequired,
    onRecaptchaLoadCallback: PropTypes.func.isRequired,
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
      password,
      firstName,
    },
    onSubmit,
    toggleTOC,
    acceptedTOC,
    verifyCallback,
    recaptchaLoaded,
    currentlySending,
    recaptchaAccepted,
    onRecaptchaLoadCallback
  } = this.props;

    return (
      <form onSubmit={onSubmit}
            className="lc-signup-form">
        <Field type="text"
               name="email"
               isRequired={true}
               value={email}
               placeholder={cms['signup.signup_form.email']}
               onChange={::this._changeAttribute} />
        <Field type="password"
               name="password"
               isRequired={true}
               value={password}
               placeholder={cms['signup.signup_form.password']}
               onChange={::this._changeAttribute} />
        <Field type="text"
                 name="firstName"
                 value={firstName}
                 isRequired={true}
                 placeholder={cms['signup.signup_form.name']}
                 onChange={::this._changeAttribute} />
        <div className="toc-wrapper">
          <input type="checkbox"
                    name="acceptedTOC"
                    onClick={toggleTOC}
                    required
                    className="toc-checkbox" />
          <a href="http://www.google.com"
             target="_blank"
             rel="noopener noreferrer"
             className="toc-text">
            {cms['signup.agree_to_terms']}
          </a>
        </div>
        {!recaptchaLoaded && <div className="lc-recaptcha-overlay">
          {cms['signup.signup_form.loading']}
        </div>}
        <Recaptcha sitekey={siteKey}
                     verifyCallback={verifyCallback}
                     onloadCallback={onRecaptchaLoadCallback} />
        {
            currentlySending ?
              <div>
                <LoadingWave />
              </div>
            :
              <div className="lc-signup-form__button-container">
                <button type="submit"
                        className="lc-signup-form__button button"
                        disabled={!recaptchaAccepted || !acceptedTOC}>
                  { cms['signup.signup_form.button'] }
                </button>
              </div>
          }
      </form>);
  }
}
