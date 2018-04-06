import yodleeContainers from '../constants/enums/yodleeContainers';
import { icons } from '../config/properties';
import selectIcon from '../utils/iconSelectionUtils';
import cms from '../config/messages';

const {
  bank,
  creditCard,
  investment,
  loan,
  additionalAsset,
} = yodleeContainers;

export const sideNavKeys = {
  bank,
  creditCard,
  investment,
  loan,
  netWorth: 'netWorth',
  additionalAsset
};

const sideNavNames = {
  [sideNavKeys.bank]: cms['menu.bank'],
  [sideNavKeys.loan]: cms['menu.loan'],
  [sideNavKeys.investment]: cms['menu.investment'],
  [sideNavKeys.creditCard]: cms['menu.creditCard'],
  [sideNavKeys.additionalAsset]: cms['menu.additionalAsset']
};

export const schema = [
  {
    navClass: 'lc-nav-parent-element--assets',
    icon: selectIcon(icons.cash),
    title: sideNavNames.bank,
    navKey: sideNavKeys.bank
  },
  {
    navClass: 'lc-nav-parent-element--assets',
    icon: selectIcon(icons.invest),
    title: sideNavNames.investment,
    navKey: sideNavKeys.investment,
  },
  {
    navClass: 'lc-nav-parent-element--assets',
    icon: selectIcon(icons.house),
    title: sideNavNames.additionalAsset,
    navKey: sideNavKeys.additionalAsset,
  },
  {
    navClass: 'lc-nav-parent-element--liabilities',
    icon: selectIcon(icons.creditCard),
    title: sideNavNames.creditCard,
    navKey: sideNavKeys.creditCard,
  },
  {
    navClass: 'lc-nav-parent-element--liabilities',
    icon: selectIcon(icons.loan),
    title: sideNavNames.loan,
    navKey: sideNavKeys.loan
  }
];

export const networth = {
  icon: selectIcon(icons.wallet),
  title: cms['menu.netWorth']
};
