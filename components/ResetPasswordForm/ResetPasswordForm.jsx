import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingWave from '../LoadingWave/LoadingWave';
import Field from '../Form/Field/Field';
import cms from '../../config/messages';
import './ResetPasswordForm.scss';

export default class ResetPasswordForm extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    currentlySending: PropTypes.bool.isRequired,
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
        password,
        passwordConfirmation
      },
      onSubmit,
      currentlySending,
    } = this.props;

    return (
      <form onSubmit={onSubmit}
            className="lc-reset-password-form">
        <Field icon="fa-unlock-alt"
               type="password"
               name="password"
               value={password}
               placeholder={cms['reset_password.reset_password_form.password']}
               onChange={::this._changeAttribute}
               isRequired />
        <Field icon="fa-unlock-alt"
               type="password"
               name="passwordConfirmation"
               value={passwordConfirmation}
               placeholder={cms['reset_password.reset_password_form.password_confirmation']}
               onChange={::this._changeAttribute}
               isRequired />
        {
          currentlySending ?
            <div>
              <LoadingWave />
            </div>
          :
            <div className="lc-reset-password-form__button-container">
              <button type="submit"
                      className="lc-reset-password-form__button button">
                {cms['reset_password.reset_password_button.title']}
              </button>
            </div>
        }
      </form>);
  }
}
