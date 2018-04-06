import Routes from '../constants/Routes';

import silhouetteImg from '../assets/svg/silhouette.svg';
import graphImg from '../assets/svg/graph.svg';
import goalsImg from '../assets/svg/goals.svg';
import cms from '../config/messages';

export const progressBarLabels = [
  'Income Planned',
  'Bills Planned',
  'PerEx Available'
];

export const progressBarIconBoxes = [
  {
    button: {
      text: cms['transactionsSummary.iconBox1.button.text'],
      route: Routes.advisorConnect
    },
    text: cms['transactionsSummary.iconBox1.text'],
    image: silhouetteImg
  },
  {
    button: {
      text: cms['transactionsSummary.iconBox2.button.text'],
      route: Routes.financialPlan
    },
    text: cms['transactionsSummary.iconBox2.text'],
    image: graphImg,
    optionalClassName: 'lc-icon-box--blue'
  },
  {
    button: {
      text: cms['transactionsSummary.iconBox3.button.text'],
      route: Routes.goalSelect
    },
    text: cms['transactionsSummary.iconBox3.text'],
    image: goalsImg
  }
];
