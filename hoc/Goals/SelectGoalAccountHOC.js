// Global Deps
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
 import get from 'lodash/get';
import filter from 'lodash/filter';
import camelCase from 'lodash/camelCase';
import isEmpty from 'lodash/isEmpty';
// Local Deps
import { setSelectedAccountId } from '../../actions/goals';
import { EMPTY_STRING } from '../../config/properties';
import config from '../../config/selectGoalAccount';
// Utils
import { forwardTo } from '../../utils/navigationUtils';
import { populateGoalPageRoute } from '../../utils/routeUtils';

function SelectGoalAccountHOC(WrappedComponent) {
  class WrappedSelectGoalAccountComponent extends Component {

    static propTypes = {
      data: PropTypes.shape({
        selectedAccountId: PropTypes.number.isRequired,
        accounts: PropTypes.array.isRequired,
        isLoadingAccounts: PropTypes.bool.isRequired
      }).isRequired,
      params: PropTypes.shape({
        goalType: PropTypes.string.isRequired
      }),
      dispatch: PropTypes.func.isRequired
    };

    static _filterAccounts(accounts, goalType) {
      const { searchCriteria } = get(config, goalType);
      if (!searchCriteria || isEmpty(accounts)) return [];
      const filteredAccounts = filter(accounts, searchCriteria);
      return filteredAccounts;
    }

    static _setAccountValues(accounts, selectedAccountId) {
      const modifiedAccounts = accounts.map(acct => ({
        ...acct,
        value: acct.id === selectedAccountId
      }));
      return modifiedAccounts;
    }

    static _getHeader(goalType) {
      const { header } = get(config, goalType, EMPTY_STRING);
      return header;
    }

    static _getText(goalType) {
      const { text } = get(config, goalType, EMPTY_STRING);
      return text;
    }

    static _getPronoun(goalType) {
      const { pronoun } = get(config, goalType, EMPTY_STRING);
      return pronoun;
    }

    _onSetUpGoalClick() {
      const {
        data: { selectedAccountId },
        params: { goalType }
      } = this.props;
      const { route } = get(config, camelCase(goalType));
      if (!route) return;
      const populatedRoute = populateGoalPageRoute(route, selectedAccountId);
      return forwardTo(populatedRoute);
    }

    _onAccountToggle({ id }) {
      const { dispatch } = this.props;
      dispatch(setSelectedAccountId(id));
    }

    render() {
      const {
        params: { goalType },
        data: {
          accounts,
          selectedAccountId,
          isLoadingAccounts
        }
      } = this.props;

      const massagedGoalType = camelCase(goalType);
      const header = WrappedSelectGoalAccountComponent._getHeader(massagedGoalType);
      const text = WrappedSelectGoalAccountComponent._getText(massagedGoalType);
      const pronoun = WrappedSelectGoalAccountComponent._getPronoun(massagedGoalType);
      const filteredAccounts = WrappedSelectGoalAccountComponent._filterAccounts(
        accounts,
        massagedGoalType
      );
      const massagedAccounts = WrappedSelectGoalAccountComponent._setAccountValues(
        filteredAccounts,
        selectedAccountId
      );
      const massagedProps = {
        header,
        text,
        pronoun,
        goalType: massagedGoalType,
        accounts: massagedAccounts,
        selectedAccountId,
        isLoadingAccounts,
        onAccountToggle: ::this._onAccountToggle,
        onSetUpGoalClick: ::this._onSetUpGoalClick,
      };
      return (
        <WrappedComponent {...massagedProps} />
      );
    }

  }

  function mapStateToProps(state) {
    return {
      data: state.goals
    };
  }

  return connect(mapStateToProps)(WrappedSelectGoalAccountComponent);
}

export default SelectGoalAccountHOC;
