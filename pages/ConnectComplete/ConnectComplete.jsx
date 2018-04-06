import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
// Local Deps:
import goalIcon from '../../assets/svg/goal-icon.svg';
import cms from '../../config/messages';
import Routes from '../../constants/Routes';
// Utils
import {
        parseFastLinkMessages,
        checkForFastLinkError
      } from '../../utils/yodleeFastLinkUtils';
// Actions
import { getUserData } from '../../actions/global/users';
import { getEnabledAccounts } from '../../actions/global/accounts';
// Components:
import IconBox from '../../components/IconBox/IconBox';
import GenericButton from '../../components/GenericButton/GenericButton';

class ConnectComplete extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getUserData());
    dispatch(getEnabledAccounts());
  }

  render() {
    const { location } = this.props;
    const yodleeResponse = get(location.query, 'JSONcallBackStatus', undefined);
    const hasError = checkForFastLinkError(yodleeResponse);
    const messages = parseFastLinkMessages(yodleeResponse);
    const { origin } = window.location;
    return (
      <div className="lc-connect-complete">
        <div className="lc-connect-complete__content">
          <div className="lc-row row">
            {/* <!--HEADER--> */}
            <h1 className="lc-connect-complete__header">
              {hasError ?
                cms['fastlink.complete.header.error'] :
                cms['fastlink.complete.header.success']
              }
            </h1>
            <div className="lc-connect-complete__messages">
              { !isEmpty(messages) &&
                messages.map((msg, key) => (
                  <div key={key} className="lc-connect-complete__text" >
                    {msg}
                  </div>
                ))
             }
            </div>
            {/* <!--ICON BOX--> */}
            <IconBox image={goalIcon} />
            {/* <!--MAGIC BUTTONS--> */}
            <div className="lc-connect-complete__button-container">
              <a className="lc-connect-complete__anchor"
                target="_top"
                href={`${origin}${Routes.connect}`}>
                <GenericButton text={cms['fastlink.complete.button.1']} />
              </a>
              <a className="lc-connect-complete__anchor"
                target="_top"
                href={`${origin}${Routes.incomeSummary}`}>
                <GenericButton className="lc-button--blue"
                  text={cms['fastlink.complete.button.3']} />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ConnectComplete.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.object.isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return state.connect;
}

export default connect(mapStateToProps)(ConnectComplete);
