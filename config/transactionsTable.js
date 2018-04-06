import { fisecalCategories } from '../constants/enums/yodleeCategories';
import frequencyTypes from '../constants/enums/frequencyTypes';
import {
        formatYodleeCategorySelectOptions,
        formatYodleeCategorySelectOrder
      } from '../utils/yodleeCategoryUtils';

const yodleeCategorySelectOptions = formatYodleeCategorySelectOptions(fisecalCategories);
const yodleeCategorySelectOrder = formatYodleeCategorySelectOrder(fisecalCategories);

export const fields = [
  {
    name: 'date',
    mapping: 'date',
    header: 'Date',
    isVisible: true,
    isEditable: true,
    fieldType: 'date',
    flexGrow: 2,
    colWidth: 55
  },
  {
    name: 'transactionName',
    mapping: 'name',
    header: 'Transaction Name',
    isVisible: true,
    isEditable: true,
    fieldType: 'text',
    colWidth: 105,
    flexGrow: 5
  },
  {
    name: 'amount',
    mapping: 'amount',
    header: 'Amount',
    isVisible: true,
    isEditable: true,
    fieldType: 'currency',
    flexGrow: 2,
    colWidth: 55
  },
  {
    name: 'category',
    mapping: 'category',
    header: 'Category',
    isVisible: true,
    isEditable: true,
    fieldType: 'select',
    selectOptions: yodleeCategorySelectOptions,
    selectOrder: yodleeCategorySelectOrder,
    colWidth: 85,
    flexGrow: 2
  },
  {
    name: 'recurringItem',
    header: 'Recurring Income/Charge',
    mapping: 'isRecurring',
    isVisible: true,
    isToggleable: true,
    isEditable: true,
    fieldType: 'switch',
    colWidth: 50,
    flexGrow: 2
  },
  {
    name: 'frequency',
    header: 'Frequency',
    mapping: 'frequency',
    isVisible: true,
    isEditable: true,
    fieldType: 'select',
    selectOptions: frequencyTypes,
    selectOrder: Object.keys(frequencyTypes),
    colWidth: 85,
    flexGrow: 2
  }
];

export const idMapping = 'id';
