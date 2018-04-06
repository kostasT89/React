import Routes from '../constants/Routes';
import logout from '../utils/logoutUtils';

export default [
  {
    name: 'Home',
    route: Routes.dashboard
  },
  {
    name: 'Talk With A Planner',
    route: Routes.advisorConnect
  },
  {
    name: 'Log Out',
    onClick: logout,
  }
];
