import cms from '../messages';
import frequencyTypes from '../../constants/enums/frequencyTypes';
import statusTypes from '../../constants/enums/statusTypes';

/*
 * Fin Plan Bills Table
 */
export const billsColumnKeys = {
  fieldType: 'fieldType',
  amount: 'amount',
  date: 'date',
  status: 'billStatus',
};

export const billsColumns = [
  {
    columnKey: billsColumnKeys.type,
    header: cms['finPlanBills.table.header.description'],
    mapping: 'name',
    isVisible: true,
    isSortable: false,
    isEditable: true,
    flexGrow: 1,
    colWidth: 150,
  },
  {
    columnKey: billsColumnKeys.amount,
    header: cms['finPlanBills.table.header.amount'],
    mapping: 'amount',
    colWidth: 150,
    isVisible: true,
    isSortable: false,
    fieldType: 'currency',
    isEditable: true,
    flexGrow: 1,
  },
  {
    columnKey: billsColumnKeys.date,
    header: cms['finPlanBills.table.header.date'],
    mapping: 'date',
    colWidth: 150,
    isVisible: true,
    isSortable: false,
    fieldType: 'date',
    isEditable: true,
    flexGrow: 1,
  },
  {
    columnKey: billsColumnKeys.status,
    header: cms['finPlanBills.table.header.status'],
    mapping: 'billStatus',
    colWidth: 150,
    isVisible: true,
    isSortable: false,
    fieldType: 'select',
    selectOptions: statusTypes,
    selectOrder: Object.keys(statusTypes),
    isEditable: true,
    flexGrow: 1,
  },
];
/*
 * Fin Plan Other Bills Table
 */

export const otherBillsColumnKeys = {
  delete: 'delete',
  fieldType: 'type',
  value: 'value',
  frequency: 'frequency',
};

export const otherBillsColumns = [
  {
    columnKey: otherBillsColumnKeys.delete,
    header: '',
    fieldType: 'icon',
    icon: 'times',
    colWidth: 50,
    isVisible: true,
    isEditable: false,
    isDelete: true,
  },
  {
    columnKey: otherBillsColumnKeys.type,
    header: cms['finPlanBills.table.header.type'],
    mapping: 'type',
    colWidth: 150,
    flexGrow: 1,
    isVisible: true,
    isEditable: true,
    isSortable: false,
  },
  {
    columnKey: otherBillsColumnKeys.value,
    header: cms['finPlanBills.table.header.value'],
    mapping: 'value',
    colWidth: 150,
    isVisible: true,
    isSortable: false,
    fieldType: 'currency',
    isEditable: true,
    flexGrow: 1,
  },
  {
    columnKey: otherBillsColumnKeys.frequency,
    header: cms['finPlanBills.table.header.frequency'],
    mapping: 'frequency',
    colWidth: 150,
    isVisible: true,
    isSortable: false,
    fieldType: 'select',
    selectOptions: frequencyTypes,
    selectOrder: Object.keys(frequencyTypes),
    isEditable: true,
    flexGrow: 1,
  },
];

export const tableHeight = rows => (100 + (30 * (rows + 1)));
export const rowHeight = 30;
export const idMapping = 'id';

const typeConst = 'type';
export const defaultOtherRecurringExpenses = [
  {
    data: {
      type: 'Medical',
      value: 0,
      frequency: 'monthly',
      uneditableFieldKeys: [typeConst]
    },
  },
  {
    data: {
      type: 'Alimony',
      value: 0,
      frequency: 'monthly',
      uneditableFieldKeys: [typeConst]
    }
  },
  {
    data: {
      type: 'Child Support',
      value: 0,
      frequency: 'monthly',
      uneditableFieldKeys: [typeConst]
    }
  },
  {
    data: {
      type: 'Gifts to Individuals',
      value: 0,
      frequency: 'monthly',
      uneditableFieldKeys: [typeConst]
    }
  },
  {
    data: {
      type: 'Gifts/Donations to Charity',
      value: 0,
      frequency: 'monthly',
      uneditableFieldKeys: [typeConst]
    }
  }
];
