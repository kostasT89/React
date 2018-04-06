import cms from '../messages';

// --------------------------------
// Fin Plan Income Table:
// --------------------------------

export const columnKeys = {
  edit: 'edit',
  delete: 'delete',
  client: 'employedIndividual',
  employerIncomeSource: 'employerName',
  payFrequencyPayday: 'payFrequency',
  amount: 'grossSalary',
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
    columnKey: columnKeys.client,
    mapping: 'employedIndividual',
    header: cms['finPlanIncome.table.header.client'],
    colWidth: 50,
    flexGrow: 1,
    isSortable: false
  },
  {
    columnKey: columnKeys.employerIncomeSource,
    mapping: 'employerName',
    header: cms['finPlanIncome.table.header.employerIncomeSource'],
    colWidth: 150,
    flexGrow: 1,
    isSortable: false
  },
  {
    columnKey: columnKeys.payFrequencyPayday,
    mapping: 'payFrequencyPayday',
    header: cms['finPlanIncome.table.header.payFrequencyPayday'],
    colWidth: 150,
    flexGrow: 1,
    isSortable: false
  },
  {
    columnKey: columnKeys.amount,
    mapping: 'amount',
    header: cms['finPlanIncome.table.header.amount'],
    colWidth: 50,
    flexGrow: 1,
    isSortable: false
  },
];

export const tableHeight = 300;

// --------------------------------
// Fin Plan Income Select Dropdown:
// --------------------------------

export const defaultOption = {
  value: 'default',
  text: 'Select Type'
};
