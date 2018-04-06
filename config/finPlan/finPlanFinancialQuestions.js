import cms from '../messages';

/*
 * Fin Plan Questions Major Income Events Table
 */

export const majorIncomeEventsColumnKeys = {
  edit: 'edit',
  delete: 'delete',
  fieldType: 'type',
  description: 'description',
  value: 'value',
  date: 'date',
  plans: 'plans',
};

export const majorIncomeEventsColumns = [
  {
    columnKey: majorIncomeEventsColumnKeys.delete,
    header: '',
    fieldType: 'icon',
    icon: 'times',
    colWidth: 50,
    isVisible: true,
    isEditable: false,
    isDelete: true,
  },
  {
    columnKey: majorIncomeEventsColumnKeys.description,
    header: cms['finPlanQuestions.major-income-events.table.description'],
    mapping: 'description',
    colWidth: 150,
    flexGrow: 1,
    isVisible: true,
    isEditable: true,
    fieldType: 'text',
    isSortable: false,
  },
  {
    columnKey: majorIncomeEventsColumnKeys.value,
    header: cms['finPlanQuestions.major-income-events.table.value'],
    mapping: 'value',
    colWidth: 150,
    isVisible: true,
    isSortable: false,
    isEditable: true,
    fieldType: 'currency',
    flexGrow: 1,
  },
  {
    columnKey: majorIncomeEventsColumnKeys.date,
    header: cms['finPlanQuestions.major-income-events.table.date'],
    mapping: 'date',
    colWidth: 150,
    isVisible: true,
    isSortable: false,
    fieldType: 'date',
    isEditable: true,
    flexGrow: 1,
  },
  {
    columnKey: majorIncomeEventsColumnKeys.plans,
    header: cms['finPlanQuestions.major-income-events.table.plans'],
    mapping: 'plans',
    colWidth: 150,
    isVisible: true,
    fieldType: 'text',
    isSortable: false,
    isEditable: true,
    flexGrow: 1,
  },
];

/*
 * Fin Plan Questions Major Expense Events Table
 */

export const majorExpenseEventsColumnKeys = {
  edit: 'edit',
  delete: 'delete',
  fieldType: 'type',
  description: 'description',
  value: 'value',
  date: 'date',
  plans: 'plans',
};

export const majorExpenseEventsColumns = [
  {
    columnKey: majorExpenseEventsColumnKeys.delete,
    header: '',
    fieldType: 'icon',
    icon: 'times',
    colWidth: 50,
    isVisible: true,
    isEditable: false,
    isDelete: true,
  },
  {
    columnKey: majorExpenseEventsColumnKeys.description,
    header: cms['finPlanQuestions.major-expense-events.table.description'],
    mapping: 'description',
    colWidth: 150,
    flexGrow: 1,
    isVisible: true,
    fieldType: 'text',
    isEditable: true,
    isSortable: false,
  },
  {
    columnKey: majorExpenseEventsColumnKeys.value,
    header: cms['finPlanQuestions.major-expense-events.table.value'],
    mapping: 'value',
    colWidth: 150,
    fieldType: 'currency',
    isVisible: true,
    isSortable: false,
    isEditable: true,
    flexGrow: 1,
  },
  {
    columnKey: majorExpenseEventsColumnKeys.date,
    header: cms['finPlanQuestions.major-expense-events.table.date'],
    mapping: 'date',
    colWidth: 150,
    isVisible: true,
    fieldType: 'date',
    isSortable: false,
    isEditable: true,
    flexGrow: 1,
  },
  {
    columnKey: majorExpenseEventsColumnKeys.plans,
    header: cms['finPlanQuestions.major-expense-events.table.plans'],
    mapping: 'plans',
    colWidth: 150,
    isVisible: true,
    isSortable: false,
    fieldType: 'text',
    isEditable: true,
    flexGrow: 1,
  },
];
export const tableHeight = rows => (100 + (30 * (rows + 1)));
export const rowHeight = 30;
export const idMapping = 'id';
