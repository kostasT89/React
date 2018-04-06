import finPlanGoalTypes from '../../constants/enums/finPlanGoalTypes';
import finPlanGoalFormTypes from '../../constants/enums/finPlanGoalFormTypes';
import finPlanGoalAttributes from '../../constants/enums/finPlanGoalAttributes';
import { lookupFinPlanGoal } from '../../utils/cmsUtils';
import { defaultRetirementTerm } from '../properties';
import { defaultEmptyValueOptionGen } from '../formFieldOptions';
import cms from '../messages';

// --------------------------------
// Fin Plan Goals Table:
// --------------------------------

export const columnKeys = {
  edit: 'edit',
  delete: 'delete',
  priority: 'priority',
  type: 'type'
};

export const columns = [
  {
    columnKey: columnKeys.edit,
    header: '',
    icon: 'pencil',
    type: 'icon',
    colWidth: 50,
  },
  {
    columnKey: columnKeys.delete,
    header: '',
    type: 'icon',
    icon: 'times',
    colWidth: 50,
  },
  {
    columnKey: columnKeys.priority,
    mapping: 'priority',
    header: cms['finPlanGoals.table.header.priority'],
    colWidth: 100,
    flexGrow: 1,
    isSortable: false
  },
  {
    columnKey: columnKeys.type,
    mapping: 'type',
    header: cms['finPlanGoals.table.header.type'],
    colWidth: 150,
    flexGrow: 3,
    cellDataGetter: (cellDataKey, rowData) => (
      lookupFinPlanGoal(rowData[cellDataKey])
    ),
    isSortable: false
  },
];

export const tableHeight = 300;

// --------------------------------
// Fin Plan Goals Select Dropdown:
// --------------------------------

export const options = [
  {
    value: finPlanGoalTypes.retirement,
    text: lookupFinPlanGoal(finPlanGoalTypes.retirement)
  },
  {
    value: finPlanGoalTypes.carPurchase,
    text: lookupFinPlanGoal(finPlanGoalTypes.carPurchase)
  },
  {
    value: finPlanGoalTypes.wedding,
    text: lookupFinPlanGoal(finPlanGoalTypes.wedding)
  },
  {
    value: finPlanGoalTypes.primaryResidence,
    text: lookupFinPlanGoal(finPlanGoalTypes.primaryResidence)
  },
  {
    value: finPlanGoalTypes['2NdHomeVacationHome'],
    text: lookupFinPlanGoal(finPlanGoalTypes['2NdHomeVacationHome'])
  },
  {
    value: finPlanGoalTypes.investmentProperty,
    text: lookupFinPlanGoal(finPlanGoalTypes.investmentProperty)
  },
  {
    value: finPlanGoalTypes.homeImprovements,
    text: lookupFinPlanGoal(finPlanGoalTypes.homeImprovements)
  },
  {
    value: finPlanGoalTypes.travel,
    text: lookupFinPlanGoal(finPlanGoalTypes.travel)
  },
  {
    value: finPlanGoalTypes.majorPurchase,
    text: lookupFinPlanGoal(finPlanGoalTypes.majorPurchase)
  },
  {
    value: finPlanGoalTypes.giftsOrDonation,
    text: lookupFinPlanGoal(finPlanGoalTypes.giftsOrDonation)
  },
  {
    value: finPlanGoalTypes.startBusiness,
    text: lookupFinPlanGoal(finPlanGoalTypes.startBusiness)
  },
  {
    value: finPlanGoalTypes.leaveRequest,
    text: lookupFinPlanGoal(finPlanGoalTypes.leaveRequest)
  },
  {
    value: finPlanGoalTypes.college,
    text: lookupFinPlanGoal(finPlanGoalTypes.college)
  },
  {
    value: finPlanGoalTypes.healthCare,
    text: lookupFinPlanGoal(finPlanGoalTypes.healthCare)
  },
  {
    value: finPlanGoalTypes.celebration,
    text: lookupFinPlanGoal(finPlanGoalTypes.celebration)
  },
  {
    value: finPlanGoalTypes.provideCare,
    text: lookupFinPlanGoal(finPlanGoalTypes.provideCare)
  },
  {
    value: finPlanGoalTypes.privateSchool,
    text: lookupFinPlanGoal(finPlanGoalTypes.privateSchool)
  },
];

export const selectOptions = [
  defaultEmptyValueOptionGen(cms['finPlanGoals.select.defaultOption']),
  ...options
];

// --------------------------------
// Fin Plan Goal Forms:
// --------------------------------

export const retirementFormDefaultValues = {
  [finPlanGoalAttributes.retirementTerm]: defaultRetirementTerm,
};

export const defaultFormValues = {
  [finPlanGoalFormTypes.retirementForm]: retirementFormDefaultValues,
};
