import remove from 'lodash/remove';
import find from 'lodash/find';

import {
        GET_USER_SUCCESS,
        TOGGLE_LIABILITY,
        GET_FIN_PLAN_SUCCESS,
        TOGGLE_LIABILITY_ACCOUNTS,
        GET_ENABLED_ACCOUNTS_SUCCESS,
        UPDATE_FIN_PLAN_LIABILITY_SUCCESS,
        CREATE_FIN_PLAN_LIABILITY_SUCCESS,
        DELETE_FIN_PLAN_LIABILITY_SUCCESS,
      } from '../../constants/AppConstants';

const initialState = {
  accounts: [],
  liabilities: [],
  showAccounts: true,
};

const actionMappings = {
  [GET_USER_SUCCESS]: '_receiveUserData',
  [CREATE_FIN_PLAN_LIABILITY_SUCCESS]: '_addLiability',
  [UPDATE_FIN_PLAN_LIABILITY_SUCCESS]: '_updateLiability',
  [GET_ENABLED_ACCOUNTS_SUCCESS]: '_getAccountsSuccess',
  [TOGGLE_LIABILITY]: '_toggleLiability',
  [TOGGLE_LIABILITY_ACCOUNTS]: '_toggleLiabilityAccounts',
  [GET_FIN_PLAN_SUCCESS]: '_receiveFinPlanLiabilities',
  [DELETE_FIN_PLAN_LIABILITY_SUCCESS]: '_deleteLiability',
};

const reducer = {
  _receiveUserData(state, action) {
    return {
      ...state,
      user: action.userData
    };
  },

  _receiveFinPlanLiabilities(state, { finPlan: { finPlanLiabilities } }) {
    const newLiabilities = finPlanLiabilities.map((liability) => {
      const transformedLiability = {
        ...liability.data,
        id: liability.id,
        finPlanId: liability.finPlanId,
      };
       if (transformedLiability.yodleeId) {
        // sync the account balance
        const yodleeLiability = find(state.accounts, {
          id: transformedLiability.yodleeId,
        });
        if (yodleeLiability) {
          transformedLiability.value = yodleeLiability.balance.amount;
        }
      }
      return transformedLiability;
    });

    const newAccounts = state.accounts.map((account) => {
      const accountOn = find(newLiabilities, { // TODO --- fix
        yodleeId: account.id
      });
      if (accountOn) {
        return {
          ...account,
          value: true,
          fisecalId: accountOn.id
        };
      }
      return {
        ...account,
      };
    });
    return {
      ...state,
      liabilities: newLiabilities,
      accounts: newAccounts,
    };
  },

  _addLiability(state, action) {
    const {
      liability,
      liability: {
        data: {
          yodleeId,
        },
      },
    } = action;
    const newLiabilities = [...state.liabilities, {
      ...liability.data,
      id: liability.id,
      finPlanId: liability.finPlanId,
    }];
    const newAccounts = state.accounts.map((account) => {
      if (yodleeId && account.id === yodleeId) {
        return {
          ...account,
          value: true,
          fisecalId: liability.id
        };
      }
      return {
        ...account,
      };
    });
    return {
      ...state,
      accounts: newAccounts,
      liabilities: newLiabilities,
    };
  },

  _deleteLiability(state, action) {
    const {
      id,
    } = action;
    const liability = find(state.liabilities, { id });
    const newLiabilities = remove(state.liabilities, value => (value.id !== id));
    const newAccounts = state.accounts.map((account) => {
      if (liability.yodleeId && account.id === liability.yodleeId) {
        return {
          ...account,
          value: false,
          fisecalId: null
        };
      }
      return {
        ...account
      };
    });
    return {
      ...state,
      liabilities: newLiabilities,
      accounts: newAccounts,
      showAccounts: true
    };
  },

  _updateLiability(state, action) {
    const newLiabilities = state.liabilities.map((liability) => {
      if (action.liability && liability.id === action.liability.id) {
          return Object.assign({}, {
            ...action.liability.data,
            finPlanId: action.liability.finPlanId,
            id: action.liability.id,
          });
      }
      return liability;
    });
    return {
      ...state,
      liabilities: newLiabilities,
    };
  },

  _getAccountsSuccess(state, { enabledYodleeAccounts }) {
    const creditCard = enabledYodleeAccounts.filter(acct => acct.CONTAINER === 'creditCard');
    const loan = enabledYodleeAccounts.filter(acct => acct.CONTAINER === 'loan');
    let updatedAccounts = [].concat(creditCard, loan);
    updatedAccounts = updatedAccounts.map((account) => {
      // default all accounts to on
      const liabilityOn = find(state.liabilities, {
        yodleeId: account.id
      });
      if (liabilityOn) {
        return {
          ...account,
          value: true,
          fisecalId: liabilityOn.id
        };
      }
      return account;
    });

    return {
      ...state,
      accounts: updatedAccounts,
    };
  },

  _toggleLiabilityAccounts(state) {
    return {
      ...state,
      showAccounts: !state.showAccounts,
    };
  }
};

const finPlanLiabilities = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default finPlanLiabilities;
