import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
import containers from '../constants/enums/yodleeContainers';
import { sumArrayByKey } from '../utils/mathUtils';

const {
  bank,
  creditCard,
  loan,
  investment,
  additionalAsset
} = containers;

export function calculateNetworth(accounts) {
  const accountKeys = Object.keys(accounts);
  const nw = accountKeys.reduce((networth, acctKey) => {
    const sum = sumArrayByKey(accounts[acctKey], 'amount');
    switch (acctKey) {
      case bank:
      case investment:
      case additionalAsset:
        return networth + sum;
      case loan:
      case creditCard:
        return networth - sum;
    }
    return networth;
  }, 0);
  return nw;
}

export function createAccountsObject(accountsArray = []) {
  const accountsObject = {
    [bank]: [],
    [creditCard]: [],
    [investment]: [],
    [loan]: [],
    [additionalAsset]: []
  };

  const formattedAccounts = accountsArray.reduce((acctsObj, acct) => {
    switch (acct.CONTAINER) {
      case bank:
        acctsObj[bank].push(acct);
        return acctsObj;
      case creditCard:
        acctsObj[creditCard].push(acct);
        return acctsObj;
      case investment:
        acctsObj[investment].push(acct);
        return acctsObj;
      case loan:
        acctsObj[loan].push(acct);
        return acctsObj;
      case additionalAsset:
        acctsObj[additionalAsset].push(acct);
        return acctsObj;
      default:
        return acctsObj;
    }
  }, accountsObject);

  return formattedAccounts;
}


export function filterAccountsByStatus(connectedAccounts, status = true) {
  return Object.keys(
    pickBy(connectedAccounts, acctStatus => acctStatus === status)
  );
}

export function identifyBillImportAccounts(accounts) {
  const filteredAccounts = accounts.filter(account => !account.hasImportedBills);
  const accountIds = filteredAccounts.map(account => account.yodleeId);
  return accountIds;
}

function addBalance(accounts, yodleeAccounts, providerId) {
  const accountsWithBalance = [];
  if (!isEmpty(accounts) && !isEmpty(yodleeAccounts)) {
    accounts.filter(acc => acc.providerId === providerId).forEach((acc) => {
      yodleeAccounts.filter(yAcc => parseInt(yAcc.providerId, 10) === providerId)
      .forEach((yAcc) => {
        if (acc.yodleeId === yAcc.id) {
          acc.balance = yAcc.availableBalance || yAcc.balance;  // eslint-disable-line no-param-reassign, max-len
          accountsWithBalance.push(acc);
        }
      });
    });
  }
  return accountsWithBalance;
}

export function addBalanceToAccounts(accounts, yodleeAccounts) {
  // get all providers/providerIDs
  const providerIds = accounts.map(acc => acc.providerId);

  const accountsWithBalance = providerIds.map(id =>
    ({ id, data: addBalance(accounts, yodleeAccounts, id) }
  ));

  return uniqBy(accountsWithBalance, 'id');
}

export function updateSideNavEnabledAccounts(accounts, accountToRemove, toggleStates) {
  const { container } = accountToRemove;
  const modifiedAccounts = accounts[container].filter(acct =>
    toggleStates[acct.accountId]
  );

  return {
    ...accounts,
    [container]: modifiedAccounts
  };
}
