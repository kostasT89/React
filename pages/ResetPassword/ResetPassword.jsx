import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cms from '../../config/messages';

import { minPasswordLength } from '../../config/properties';

import {
        errorMessage,
        updatePassword,
        toggleSuccessMessage,
        changeResetPasswordForm,
      } from '../../actions/resetPassword';

import { getTokenFromSearchParams } from '../../utils/parsingUtils';

import Footer from '../../components/Footer/Footer';
import Callout from '../../components/Callout/Callout';
import ResetPasswordGroup from '../../components/ResetPasswordGroup/ResetPasswordGroup';
import LoggedOutHeader from '../../components/LoggedOutHeader/LoggedOutHeader';

import './ResetPassword.scss';

class ResetPassword extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    resetPasswordData: PropTypes.object.isRequired
  }

  _onSubmit(event) {
    event.preventDefault();

    const {
      resetPasswordData: {
        formState: {
          password,
          passwordConfirmation
        }
      },
      dispatch
    } = this.props;
    if (password.length >= minPasswordLength) {
      if (password === passwordConfirmation) {
        const resetPasswordToken = getTokenFromSearchParams(window.location.search.substring(1));
        dispatch(updatePassword(password, resetPasswordToken));
      }
      else {
        dispatch(errorMessage(cms['reset_password.passwords_not_equal']));
      }
    }
    else {
      dispatch(errorMessage(cms['reset_password.password_too_short']));
    }
  }

  _changeResetPasswordForm(newState) {
    this.props.dispatch(changeResetPasswordForm(newState));
  }

  _toggleSuccessMessage() {
    this.props.dispatch(toggleSuccessMessage());
  }

  renderResetPasswordGroup(resetPasswordData) {
    const {
      error,
      formState,
      currentlySending,
    } = resetPasswordData;
    const resetPasswordGroupProps = {
      error,
      currentlySending,
      onResetPasswordSubmit: ::this._onSubmit,
      onResetPasswordChange: ::this._changeResetPasswordForm,
      resetPasswordFormState: formState
    };

    return (<ResetPasswordGroup {...resetPasswordGroupProps} />);
  }

  render() {
    const {
      resetPasswordData: {
        showSuccessMessage
      }
    } = this.props;
    return (
      <div className="reset-password-component animated fadeIn">
        <LoggedOutHeader />
        {showSuccessMessage && <Callout title={cms['reset_password.success_title']}
                                        message={cms['reset_password.success_message']}
                                        onClick={::this._toggleSuccessMessage}
                                        calloutType="success-callout" />}
        <section className="lc-row lc-row--one">
          <div className="lc-row__form columns small-6 small-centered">
            {this.renderResetPasswordGroup(this.props.resetPasswordData)}
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    resetPasswordData: state.resetPassword
  };
}

export default connect(mapStateToProps)(ResetPassword);
