import findIndex from 'lodash/findIndex';
import findLastIndex from 'lodash/findLastIndex';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import finPlanPages from '../../constants/enums/finPlanPages';
// Local Deps:
import financialPlanSteps from '../../config/finPlan/financialPlanSteps';
import { forwardToFurthestFinPlanPage } from '../../utils/navigationUtils';

export const defaultStep = {
  index: 0,
  ...financialPlanSteps[0]
};

export const lastStep = {
  index: 9,
  ...financialPlanSteps[9]
};

// Sort breadcrumbs for
export function sortBreadcrumbs(breadcrumbs) {
  const availableBreadCrumbs = breadcrumbs.filter(tCrumb =>
    tCrumb.page !== finPlanPages.finPlanSuccess);
  const sortedBreadcrumbs = sortBy(availableBreadCrumbs, ((bcrumb) => {
    const index = findIndex(financialPlanSteps, { key: bcrumb.page });
    return index;
  }));
  return sortedBreadcrumbs;
}

export function determineFurthestStep(sortedBreadcrumbs) {
  if (isEmpty(sortedBreadcrumbs)) return defaultStep;
  const furthestStepIndex = findLastIndex(sortedBreadcrumbs, {
    isCompleted: true
  }) + 1; // we want to advance to the page *after* the last completed page
  if (furthestStepIndex > 10) return lastStep;
  if (furthestStepIndex < 0) return defaultStep;
  return {
    index: furthestStepIndex,
    ...sortedBreadcrumbs[furthestStepIndex],
    ...financialPlanSteps[furthestStepIndex]
  };
}

export function determineCurrentStep(sortedBreadcrumbs, location) {
  if (isEmpty(sortedBreadcrumbs)) return defaultStep;
  const index = findIndex(financialPlanSteps, { route: location.pathname });
  return {
    index,
    ...sortedBreadcrumbs[index],
    ...financialPlanSteps[index]
  };
}

export function analyzeSteps(breadcrumbs, location) {
  if (isEmpty(breadcrumbs)) return defaultStep;
  const sortedBreadcrumbs = sortBreadcrumbs(breadcrumbs);
  // Current Step:
  const currentStep = determineCurrentStep(sortedBreadcrumbs, location);
  const previousIndex = currentStep.index - 1;
  // Previous Step:
  const previousStep = previousIndex < 0 ? defaultStep : {
    index: previousIndex,
    ...sortedBreadcrumbs[previousIndex],
    ...financialPlanSteps[previousIndex]
  };
  // Furthest Step:
  const furthestStep = determineFurthestStep(sortedBreadcrumbs);
  return {
    currentStep,
    previousStep,
    furthestStep
  };
}

export function checkIfStepIsAllowed(breadcrumbs, location) {
  const {
    previousStep
  } = analyzeSteps(breadcrumbs, location);
  if (previousStep && !previousStep.isCompleted) {
    forwardToFurthestFinPlanPage(breadcrumbs);
  }
}

export const shouldChangeFormFieldType = (value, possibleValueObjectsArray = []) =>
  !possibleValueObjectsArray.find(obj => obj.value === value);

export const determineWhetherBreadcrumbStepIsIncomplete = (idx, currentStep, furthestStep) => {
  if (idx === currentStep.index) return false;
  if (idx === furthestStep.index && furthestStep.isVisited) return false;
  if (idx >= furthestStep.index) return true;
  return false;
};
