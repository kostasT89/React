export function isFinPlanQuestionChecked(index, clientAnswers, coClient, coClientAnswers) {
  const questionName = `response${index + 1}`;
  if (coClient) {
    return clientAnswers[questionName] && coClientAnswers[questionName];
  }
  return clientAnswers[questionName];
}
