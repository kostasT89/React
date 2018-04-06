import { fisecalCategories } from '../constants/enums/yodleeCategories';
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
    colWidth: 120
  },
  {
    name: 'transactionName',
    mapping: 'name',
    header: 'Transaction Name',
    isVisible: true,
    isEditable: true,
    fieldType: 'text',
    colWidth: 250,
    flexGrow: 3
  },
  {
    name: 'amount',
    mapping: 'amount',
    header: 'Amount',
    isVisible: true,
    isEditable: true,
    fieldType: 'currency',
    colWidth: 150
  },
  {
    name: 'category',
    header: 'Category',
    mapping: 'category',
    isVisible: true,
    isEditable: false,
    fieldType: 'select',
    selectOptions: yodleeCategorySelectOptions,
    selectOrder: yodleeCategorySelectOrder,
    colWidth: 220
  }
];

export const idMapping = 'id';
