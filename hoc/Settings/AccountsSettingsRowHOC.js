import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function AccountsSettingsRowHOC(WrappedComponent) {
  class WrappedAccountsSettingsRowComponent extends Component {
    static propTypes = {
      account: PropTypes.object.isRequired,
      toggleStates: PropTypes.object.isRequired
    };

    render() {
      const {
        account,
        toggleStates
      } = this.props;
      const index = account.yodleeId;

      const massagedProps = {
        data: {
          index,
          account
        },
        onToggle: this._onToggle,
        toggleStates
      };

      return (
        <WrappedComponent {...massagedProps} />
      );
    }

  }

  function mapStateToProps({ settings }) {
    return settings;
  }

  return connect(mapStateToProps)(WrappedAccountsSettingsRowComponent);
}

export default AccountsSettingsRowHOC;
