import states from '../constants/enums/states';
import priorities from '../constants/enums/priorities';
import objectives from '../constants/enums/objectives';
import genderTypes from '../constants/enums/genderTypes';
import payFrequency from '../constants/enums/payFrequency';
import jobFrequency from '../constants/enums/jobFrequency';
import bonusFrequency from '../constants/enums/bonusFrequency';
import maritalStatus from '../constants/enums/maritalStatuses';
import experienceTypes from '../constants/enums/experienceTypes';
import permissionTypes from '../constants/enums/permissionTypes';
import coClientPermissionTypes from '../constants/enums/coClientPermissionTypes';
import filingStatusTypes from '../constants/enums/filingStatusTypes';

import cms from '../config/messages';

import { createOptionsFromEnums } from '../utils/formConfigUtils';

export const defaultOption = {
  text: cms['select.firstOption'],
  value: cms.disabled,
  isDisabled: true,
};

export const defaultOptionGen = text => ({
  text: text || cms['select.firstOption'],
  value: cms.disabled,
  isDisabled: true
});

// NOTE: The above defaultOptionGen is deprecated, use this instead
export const defaultEmptyValueOptionGen = text => ({
  text: text || cms['select.firstOption'],
  value: '',
  isDisabled: true
});

export const stateOptions = createOptionsFromEnums(states);
export const genderOptions = createOptionsFromEnums(genderTypes);
export const priorityOptions = createOptionsFromEnums(priorities);
export const objectiveOptions = createOptionsFromEnums(objectives);
export const payFrequencyOptions = createOptionsFromEnums(payFrequency);
export const jobFrequencyOptions = createOptionsFromEnums(jobFrequency);
export const experienceOptions = createOptionsFromEnums(experienceTypes);
export const maritalStatusOptions = createOptionsFromEnums(maritalStatus);
export const bonusFrequencyOptions = createOptionsFromEnums(bonusFrequency);
export const permissionTypeOptions = createOptionsFromEnums(permissionTypes);
export const filingStatusTypeOptions = createOptionsFromEnums(filingStatusTypes);
export const coClientPermissionTypeOptions =
  createOptionsFromEnums(coClientPermissionTypes);

export const yesNoOptions = [
  {
    text: 'Yes',
    value: 'yes'
  },
  {
    text: 'No',
    value: 'no'
  }
];


export const booleanOptions = [
  {
    text: 'Yes',
    value: true,
  },
  {
    text: 'No',
    value: false,
  }
];

export const yearlyMonthlyOptions = [
  {
    text: 'Yearly',
    value: 'yearly'
  },
  {
    text: 'Monthly',
    value: 'monthly'
  }
];

export const distributionOptions = [
  {
    text: 'Lump Sum',
    value: 'lumpSum'
  },
  {
    text: 'Distributions',
    value: 'distributions'
  }
];
const secondHome = 'Second Home / Vacation Property';
const primaryResidence = 'Primary Residence';
const investmentProperty = 'Investment Property';

export const propertyTypes = [
  {
    text: primaryResidence,
    value: primaryResidence
  },
  {
    text: secondHome,
    value: secondHome,
  },
  {
    text: investmentProperty,
    value: investmentProperty,
  },
  {
    text: 'Vehicle',
    value: 'Vehicle',
  },
  {
    text: 'Collectibles',
    value: 'Collectibles',
  },
  {
    text: 'Furnishings',
    value: 'Furnishings',
  },
];

export const housingPropertyTypes = [
  secondHome,
  primaryResidence,
  investmentProperty
];

const lifeInsuranceTerm = 'Life Insurance - Term';
const lifeInsuranceWhole = 'Life Insurance - Whole';
const lifeInsuranceVariable = 'Life Insurance - Variable';
const lifeInsuranceUniversal = 'Life Insurance - Universal';
const lifeInsuranceVariableUniversal = 'Life Insurance - Variable Universal';

export const lifeInsuranceTypes = [
  lifeInsuranceTerm,
  lifeInsuranceWhole,
  lifeInsuranceVariable,
  lifeInsuranceUniversal,
  lifeInsuranceVariableUniversal,
];

export const insuranceTypeOptions = [
  {
    text: 'Homeowner\'s Insurance',
    value: 'Homeowner\'s Insurance',
  },
  {
    text: 'Renter\'s Insurance',
    value: 'Renter\'s Insurance',
  },
  {
    text: 'Landlord/Rental Property Policy',
    value: 'Landlord/Rental Property Policy',
  },
  {
    text: 'Liability Insurance',
    value: 'Liability Insurance',
  },
  {
    text: 'Health Insurance',
    value: 'Health Insurance',
  },
  {
    text: lifeInsuranceTerm,
    value: lifeInsuranceTerm,
  },
  {
    text: lifeInsuranceWhole,
    value: lifeInsuranceWhole,
  },
  {
    text: lifeInsuranceUniversal,
    value: lifeInsuranceUniversal,
  },
  {
    text: lifeInsuranceVariable,
    value: lifeInsuranceVariable,
  },
  {
    text: lifeInsuranceVariableUniversal,
    value: lifeInsuranceVariableUniversal,
  },
  {
    text: 'Disability Insurance',
    value: 'Disability Insurance',
  },
  {
    text: 'Long Term Care Insurance',
    value: 'Long Term Care Insurance',
  },
  {
    text: 'Auto Insurance',
    value: 'Auto Insurance',
  },
  {
    text: 'Personal Liability Umbrella Policy',
    value: 'Personal Liability Umbrella Policy',
  },
  {
    text: 'EO / Malpractice Insurance',
    value: 'EO / Malpractice Insurance',
  },
];

export const insuranceProviderOptions = [
  {
    text: 'Employer',
    value: 'employer',
  },
  {
    text: 'Provider',
    value: 'provider',
  },
];

export const retirementTypeOptions = [
  {
    text: '401(k)',
    value: '401(k)',
  },
  {
    text: '403(b)',
    value: '403(b)',
  },
  {
    text: '457(b)',
    value: '457(b)',
  },
  {
    text: 'Roth 401(k)',
    value: 'Roth 401(k)',
  },
  {
    text: 'IRA',
    value: 'IRA',
  },
  {
    text: 'Roth IRA',
    value: 'Roth IRA',
  },
  {
    text: 'SEP IRA',
    value: 'SEP IRA',
  },
  {
    text: 'Simple IRA',
    value: 'Simple IRA',
  },
  {
    text: 'Pension',
    value: 'Pension',
  },
];

export const finPlanTypes = [
  {
    text: '$149 - Financial Plan Only',
    value: 'fin-plan-only',
  },
  {
    text: '$149 + $15 Per Month - Financial Plan & Monthly Advisor Call',
    value: 'fin-plan-monthly-call',
  },
  {
    text: '$149 + $25 Per Month - Financial Plan & Weekly Advisor Call',
    value: 'fin-plan-weekly-call',
  },
];

export const finPlanQuestionTypes = [
  {
    text: 'Strongly Agree',
    value: 'Strongly Agree',
  },
  {
    text: 'Agree',
    value: 'Agree',
  },
  {
    text: 'Neutral',
    value: 'Neutral',
  },
  {
    text: 'Disagree',
    value: 'Disagree',
  },
  {
    text: 'Strongly Disagree',
    value: 'Strongly Disagree',
  },
];

export const projectedRRPercentages = [
  {
    text: '0.00%',
    value: '0.00',
  },
  {
    text: '0.50%',
    value: '0.50',
  },
  {
    text: '1.00%',
    value: '1.00',
  },
  {
    text: '1.50%',
    value: '1.50',
  },
  {
    text: '2.00%',
    value: '2.00',
  },
  {
    text: '2.50%',
    value: '2.50',
  },
  {
    text: '3.00%',
    value: '3.00',
  },
  {
    text: '3.50%',
    value: '3.50',
  },
  {
    text: '4.00%',
    value: '4.00',
  },
  {
    text: '4.50%',
    value: '4.50',
  },
  {
    text: '5.00%',
    value: '5.00',
  },
  {
    text: '5.50%',
    value: '5.50',
  },
  {
    text: '6.00%',
    value: '6.00',
  },
  {
    text: '6.50%',
    value: '6.50',
  },
  {
    text: '7.00%',
    value: '7.00',
  },
  {
    text: '7.50%',
    value: '7.50',
  },
  {
    text: '8.00%',
    value: '8.00',
  },
  {
    text: '8.50%',
    value: '8.50',
  },
  {
    text: '9.00%',
    value: '9.00',
  },
  {
    text: '9.50%',
    value: '9.50',
  },
  {
    text: '10.00%',
    value: '10.00',
  },
  {
    text: '10.50%',
    value: '10.50',
  },
  {
    text: '11.00%',
    value: '11.00',
  },
  {
    text: '11.50%',
    value: '11.50',
  },
  {
    text: '12.00%',
    value: '12.00',
  },
  {
    text: '12.50%',
    value: '12.50',
  },
  {
    text: '13.00%',
    value: '13.00',
  },
  {
    text: '13.50%',
    value: '13.50',
  },
  {
    text: '14.00%',
    value: '14.00',
  },
  {
    text: '14.50%',
    value: '14.50',
  },
  {
    text: '15.00%',
    value: '15.00',
  },
  {
    text: '15.50%',
    value: '15.50',
  },
  {
    text: '16.00%',
    value: '16.00',
  },
  {
    text: '16.50%',
    value: '16.50',
  },
  {
    text: '17.00%',
    value: '17.00',
  },
  {
    text: '17.50%',
    value: '17.50',
  },
  {
    text: '18.00%',
    value: '18.00',
  },
  {
    text: '18.50%',
    value: '18.50',
  },
  {
    text: '19.00%',
    value: '19.00',
  },
  {
    text: '19.50%',
    value: '19.50',
  },
  {
    text: '20.00%',
    value: '20.00',
  },
  {
    text: '20.50%',
    value: '20.50',
  },
  {
    text: '21.00%',
    value: '21.00',
  },
  {
    text: '21.50%',
    value: '21.50',
  },
  {
    text: '22.00%',
    value: '22.00',
  },
  {
    text: '22.50%',
    value: '22.50',
  },
  {
    text: '23.00%',
    value: '23.00',
  },
];

export const transactionMenuOptions = {
  refresh: 'Refresh',
  disable: 'Disable Account',
  delete: 'Delete Account'
};
