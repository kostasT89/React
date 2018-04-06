import Routes from '../constants/Routes';
import {
          removeFisecalUser,
          removeFisecalToken,
          removeFisecalAccounts,
          removeCoBrowsingToken,
        } from './localStorageUtils';

export default function logout() {
  removeFisecalUser();
  removeFisecalToken();
  removeCoBrowsingToken();
  removeFisecalAccounts();
  window.location.href = '/';
}

export const exitCoBrowsingMode = () => {
  removeFisecalUser();
  removeFisecalToken();
  removeFisecalAccounts();
  window.location.href = Routes.advisorDashboard;
};
