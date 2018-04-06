import lowerCase from 'lodash/lowerCase';

import goalTypes from '../constants/enums/goalTypes';
import yodleeContainers from '../constants/enums/yodleeContainers';
import yodleeAccountTypes from '../constants/enums/yodleeAccountTypes';
import Routes from '../constants/Routes';
import cms from './messages';

export default {
  [goalTypes.savings]: {
    route: Routes.savingsGoal,
    header: cms['goals.savingsGoal.header'],
    text: cms['goals.selectAccount.text'](goalTypes.savings),
    pronoun: 'a',
    searchCriteria: {
      CONTAINER: yodleeContainers.bank,
      accountType: yodleeAccountTypes.savings
    }
  },
  [goalTypes.investment]: {
    route: Routes.investmentGoal,
    header: cms['goals.investmentGoal.header'],
    text: cms['goals.selectAccount.text'](goalTypes.investment),
    pronoun: 'an',
    searchCriteria: {
       CONTAINER: yodleeContainers.investment
    }
  },
  [goalTypes.creditCard]: {
    route: Routes.creditCardGoal,
    header: cms['goals.ccGoal.header'],
    text: cms['goals.selectAccount.text'](lowerCase(goalTypes.creditCard)),
    pronoun: 'a',
    searchCriteria: {
       CONTAINER: yodleeContainers.creditCard
     }
  },
  [goalTypes.loan]: {
    route: Routes.loanGoal,
    header: cms['goals.loanGoal.header'],
    text: cms['goals.selectAccount.text'](goalTypes.loan),
    pronoun: 'a',
    searchCriteria: {
       CONTAINER: yodleeContainers.loan
     }
   }
};
