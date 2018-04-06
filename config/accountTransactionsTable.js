
import { fisecalCategories } from '../constants/enums/yodleeCategories';
import frequencyTypes from '../constants/enums/frequencyTypes';
import accountTypes from '../constants/enums/yodleeContainers';
import {
  formatYodleeCategorySelectOptions,
  formatYodleeCategorySelectOrder
} from '../utils/yodleeCategoryUtils';
import { findByValues } from '../utils/searchUtils';

const yodleeCategorySelectOptions = formatYodleeCategorySelectOptions(fisecalCategories);
const yodleeCategorySelectOrder = formatYodleeCategorySelectOrder(fisecalCategories);

export const idMapping = 'id';

export const tableFields = [
  {
    name: 'date',
    mapping: 'date',
    header: 'Date',
    isVisible: true,
    isEditable: true,
    fieldType: 'date',
    flexGrow: 1,
    colWidth: 110
  },
  {
    name: 'transactionName',
    mapping: 'name',
    header: 'Transaction Name',
    isVisible: true,
    isEditable: true,
    fieldType: 'text',
    colWidth: 210,
    flexGrow: 5
  },
  {
    name: 'amount',
    mapping: 'amount',
    header: 'Amount',
    isVisible: true,
    isEditable: true,
    fieldType: 'currency',
    flexGrow: 1,
    colWidth: 110
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
    colWidth: 170,
    flexGrow: 1
  },
  {
    name: 'recurringItem',
    header: 'Recurring Charges',
    mapping: 'isRecurring',
    isVisible: true,
    isToggleable: true,
    isEditable: true,
    fieldType: 'switch',
    colWidth: 110,
    flexGrow: 1
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
    colWidth: 170,
    flexGrow: 1
  }
];

export function createTableSchema(accountType) {
  switch (accountType) {
    case accountTypes.bank:
    case accountTypes.creditCard:
      return findByValues(tableFields, 'name', [
        'date',
        'transactionName',
        'amount',
        'category',
        'recurringItem',
        'frequency'
      ]);
    default:
      return findByValues(tableFields, 'name', [
        'date',
        'transactionName',
        'amount',
        'category',
      ]);
    }
}
