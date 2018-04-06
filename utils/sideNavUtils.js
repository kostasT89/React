import sideNavDisabledPages, { partiallyDisabledPages } from '../config/sideNavDisabledPages';
import checkAuthForRoute from './permissionUtils';
import { checkForCompletedConnectFlow } from './connectUtils';

export function checkIfSideNavIsDisabled(pathname, enabledAccounts) {
  const status = checkAuthForRoute(sideNavDisabledPages, pathname);
  const isPartiallyDisabled = partiallyDisabledPages.includes(pathname);
  if (isPartiallyDisabled && checkForCompletedConnectFlow(enabledAccounts)) return false;
  return status;
}

export default {
  checkIfSideNavIsDisabled
};
