import goalTypes from '../constants/enums/goalTypes';

export default {
  cx: 20,
  cy: 25,
  innerRadius: 12,
  outerRadius: 22,
  isAnimationActive: false,
  fill: '#ca5200',
  width: 50,
  height: 60,
  startAngle: 90,
  endAngle: -270,
  minAngle: 1,
  'fill.remaining': '#B9B9B9',
  'fill.perEx': '#e47d13',
  'fill.creditCardGoal': '#7a9dff',
  'fill.loanGoal': '#fdb702',
  'fill.savingsGoal': '#ff7a7a',
  'fill.investmentGoal': '#7ad4ff',
  goalsConfig: {
    [goalTypes.savings]: {
      remaining: null,
      progress: null,
      type: goalTypes.savings
    },
    [goalTypes.creditCard]: {
      remaining: null,
      progress: null,
      type: goalTypes.creditCard
    },
    [goalTypes.loan]: {
      remaining: null,
      progress: null,
      type: goalTypes.loan
    },
    [goalTypes.investment]: {
      remaining: null,
      progress: null,
      type: goalTypes.investment
    }
  }
};
