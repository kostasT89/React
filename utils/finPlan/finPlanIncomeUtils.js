export function prepareInitialValues(income) {
  const {
    otherIncomeType,
    grossSalary,
    employedIndividual,
    payFrequency,
    comment
  } = income;
  if (otherIncomeType) {
    return {
      [`${otherIncomeType}_grossSalary`]: grossSalary,
      [`${otherIncomeType}_employedIndividual`]: employedIndividual,
      [`${otherIncomeType}_payFrequency`]: payFrequency,
      comment
    };
  }
}
