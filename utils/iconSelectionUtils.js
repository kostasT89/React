import cash from '../assets/svg/cash.svg';
import loan from '../assets/svg/loan.svg';
import house from '../assets/svg/house.svg';
import invest from '../assets/svg/invest.svg';
import wallet from '../assets/svg/wallet.svg';
import creditCard from '../assets/svg/credit-card.svg';

import piggy from '../assets/svg/np_piggy-bank-grey.svg';
import bank from '../assets/svg/np_bank-grey.svg';
import barGraph from '../assets/svg/np_bar-graph-grey.svg';
import creditCards from '../assets/svg/np_credit-cards-grey.svg';
import successBrowserIcon from '../assets/svg/np_success-browser.svg';

import { icons } from '../config/properties';

export default function selectIcon(key) {
  switch (key) {
    case icons.cash:
      return cash;
    case icons.loan:
      return loan;
    case icons.house:
      return house;
    case icons.invest:
      return invest;
    case icons.wallet:
      return wallet;
    case icons.creditCard:
      return creditCard;
    case icons.piggy:
      return piggy;
    case icons.bank:
      return bank;
    case icons.barGraph:
      return barGraph;
    case icons.creditCards:
      return creditCards;
    case icons.successBrowserIcon:
      return successBrowserIcon;
  }
}
