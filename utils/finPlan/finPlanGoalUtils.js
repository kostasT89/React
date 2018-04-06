import tap from 'lodash/tap';
import range from 'lodash/range';

import attrs from '../../constants/enums/finPlanGoalAttributes';
import finPlanGoalTypes from '../../constants/enums/finPlanGoalTypes';
import finPlanGoalFormTypes from '../../constants/enums/finPlanGoalFormTypes';
import { defaultFormValues } from '../../config/finPlan/finPlanGoals';
import { lookupFinPlanGoal, lookupFinPlanGoalEquivalent } from '../cmsUtils';

const {
  retirement,
  carPurchase,
  wedding,
  primaryResidence,
  investmentProperty,
  homeImprovements,
  travel,
  majorPurchase,
  giftsOrDonation,
  startBusiness,
  leaveRequest,
  college,
  healthCare,
  celebration,
  provideCare,
  privateSchool,
  other
} = finPlanGoalTypes;

const secondHomeVacationHome = finPlanGoalTypes['2NdHomeVacationHome'];

const {
  purchaseForm,
  educationForm,
  retirementForm
} = finPlanGoalFormTypes;

export const shouldShowDesiredDownpayment = formType =>
  [carPurchase, primaryResidence, investmentProperty, secondHomeVacationHome].includes(formType);

export const lookupFormTypeByKey = (key) => {
  switch (key) {
    case retirement:
      return retirementForm;
    case college:
    case privateSchool:
      return educationForm;
    case carPurchase:
    case wedding:
    case primaryResidence:
    case secondHomeVacationHome:
    case investmentProperty:
    case homeImprovements:
    case travel:
    case majorPurchase:
    case giftsOrDonation:
    case startBusiness:
    case leaveRequest:
    case healthCare:
    case celebration:
    case provideCare:
    case other:
    default:
      return purchaseForm;
  }
};

export const lookupCaptionByGoalType = (type) => {
  switch (type) {
    case primaryResidence:
    case secondHomeVacationHome:
    case investmentProperty:
      return lookupFinPlanGoalEquivalent(primaryResidence);
    case homeImprovements:
    case travel:
    case majorPurchase:
    case giftsOrDonation:
    case healthCare:
    case celebration:
    case wedding:
      return lookupFinPlanGoal(type);
    case carPurchase:
    case startBusiness:
    case leaveRequest:
    case provideCare:
    case other:
    default:
    return lookupFinPlanGoalEquivalent(type);
  }
};

export const getDefaultValuesByFormType = formType => defaultFormValues[formType] || {};

const createChildValuesForSave = ({ formValues, formValues: { numberOfChildren } }) =>
  range(0, numberOfChildren).map(idx => ({
    [attrs.name]: formValues[`${attrs.name}-${idx}`],
    [attrs.birthdate]: formValues[`${attrs.birthdate}-${idx}`],
    [attrs.ageOfChildAtStartOfCollege]: formValues[`${attrs.ageOfChildAtStartOfCollege}-${idx}`],
    [attrs.amountCovered]: formValues[`${attrs.amountCovered}-${idx}`],
    [attrs.yearOfCoverage]: formValues[`${attrs.yearOfCoverage}-${idx}`],
  }));

export const createChildValuesForDisplay = children =>
  tap({}, results =>
    range(0, children.length).forEach((idx) => {
      results[`${attrs.name}-${idx}`] = children[idx][attrs.name]; // eslint-disable-line
      results[`${attrs.birthdate}-${idx}`] = children[idx][attrs.birthdate]; // eslint-disable-line
      results[`${attrs.ageOfChildAtStartOfCollege}-${idx}`] = children[idx][attrs.ageOfChildAtStartOfCollege]; // eslint-disable-line
      results[`${attrs.amountCovered}-${idx}`] = children[idx][attrs.amountCovered]; // eslint-disable-line
      results[`${attrs.yearOfCoverage}-${idx}`] = children[idx][attrs.yearOfCoverage]; // eslint-disable-line
    })
  );

export const createEducationFormModelForSave = formValues =>
  ({
    [attrs.priority]: formValues[attrs.priority],
    [attrs.children]: createChildValuesForSave({ formValues }),
    [attrs.comments]: formValues[attrs.comments],
  });

export const updateEducationGoalChildFields = goalValues => // eslint-disable-line
  !goalValues.children ? goalValues :
    ({
      id: goalValues.id,
      finPlanId: goalValues.finPlanId,
      numberOfChildren: goalValues.children.length,
      [attrs.priority]: goalValues[attrs.priority],
      ...createChildValuesForDisplay(goalValues.children),
      [attrs.comments]: goalValues[attrs.comments],
    });

export default {
  lookupFormTypeByKey,
  lookupCaptionByGoalType,
  getDefaultValuesByFormType
};
