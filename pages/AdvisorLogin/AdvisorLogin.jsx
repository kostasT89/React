import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Local Deps:
import { maxLoginAttempts } from '../../config/properties';
import {
        login,
        changeForm,
        clearLoginMessage,
      } from '../../actions/advisorLogin';
// Components
import Footer from '../../components/Footer/Footer';
import LoginGroup from '../../components/LoginGroup/LoginGroup';
import LoggedOutHeader from '../../components/LoggedOutHeader/LoggedOutHeader';

import './AdvisorLogin.scss';

class AdvisorLogin extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    advisorLoginData: PropTypes.object.isRequired
  }

  _sendData(event) {
    event.preventDefault();

    const {
      dispatch,
      advisorLoginData: {
        formState: {
          email,
          password
        },
        loginAttempts
      }
    } = this.props;

    if (loginAttempts < maxLoginAttempts) {
      dispatch(login(email, password));
    }
    else {
      dispatch(clearLoginMessage());
    }
  }

  _changeForm(newState) {
    this.props.dispatch(changeForm(newState));
  }

  renderAdvisorLoginGroup(advisorLoginData) {
    const {
      formState,
      errorMessage,
      loginAttempts,
      currentlySending,
    } = advisorLoginData;
    const advisorLoginGroupProps = {
      loginAttempts,
      onLoginSubmit: ::this._sendData,
      onLoginChange: ::this._changeForm,
      loginFormState: formState,
      loginErrorMessage: errorMessage,
      loginCurrentlySending: currentlySending
    };

    return (<LoginGroup {...advisorLoginGroupProps} />);
  }

  render() {
    return (
      <div className="lc-advisor-login-component animated fadeIn">
        <LoggedOutHeader />
        <section className="lc-row lc-row--one">
          <div className="lc-row__form columns small-6 small-centered">
            {this.renderAdvisorLoginGroup(this.props.advisorLoginData)}
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    advisorLoginData: state.advisorLogin
  };
}

export default connect(mapStateToProps)(AdvisorLogin);
