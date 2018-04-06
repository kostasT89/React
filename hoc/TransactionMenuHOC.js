import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { forwardToDashboard } from '../utils/navigationUtils';
import { updateSideNavData } from '../actions/sideNav';

function TransactionMenuHOC(WrappedComponent) {
  class TransactionMenuWrappedComponent extends Component {

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      showAccountOptionsMenu: PropTypes.bool,
      accountId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      itemHasBeenUpdated: PropTypes.bool,
      accountData: PropTypes.object,
      enabledAccounts: PropTypes.array,
      enabledYodleeAccounts: PropTypes.array
    };

    componentWillReceiveProps(nextProps) {
      const { dispatch, itemHasBeenUpdated } = nextProps;
      if (itemHasBeenUpdated) {
        dispatch(updateSideNavData());
        forwardToDashboard();
      }
    }

    render() {
      const {
        dispatch,
        showAccountOptionsMenu,
        accountId,
        accountData,
        enabledAccounts,
        enabledYodleeAccounts
      } = this.props;


      const massagedProps = {
        dispatch,
        showAccountOptionsMenu,
        accountId,
        accountData,
        accounts: enabledAccounts,
        enabledYodleeAccounts
      };
      return (<WrappedComponent {...massagedProps} />);
    }
  }

  function mapStateToProps(state) {
    const {
      settings,
      transactionMenu
    } = state;
    return {
      toggleStates: settings.toggleStates,
      ...transactionMenu
    };
  }

  return connect(mapStateToProps)(TransactionMenuWrappedComponent);
}

export default TransactionMenuHOC;
