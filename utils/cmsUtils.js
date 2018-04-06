import cms from '../config/messages';

export const lookupMessage = (root, key) => {
  const lookup = `${root}.${key}`;
  return cms[lookup];
};

export const lookupFinPlanGoal = (key) => {
  const ROOT = 'goals';
  return lookupMessage(ROOT, key);
};

export const lookupFinPlanGoalEquivalent = (key) => {
  const ROOT = 'goals.equivalent';
  return lookupMessage(ROOT, key);
};

export const lookupFinPlanQuestion = (key) => {
  const ROOT = 'finPlanQuestions';
  return lookupMessage(ROOT, key);
};

export const lookupFinPlanLiabilities = (key) => {
  const ROOT = 'finPlanLiabilities';
  return lookupMessage(ROOT, key);
};
