import cms from '../messages';

/*
 * Fin Plan Liabilities Table
 */

export const columnKeys = {
  edit: 'edit',
  delete: 'delete',
  descripton: 'description',
  value: 'value',
};

export const columns = [
  {
    columnKey: columnKeys.delete,
    header: '',
    fieldType: 'icon',
    icon: 'times',
    colWidth: 50,
    isVisible: true,
    isEditable: false,
    isDelete: true,
  },
  {
    columnKey: columnKeys.description,
    header: cms['finPlanLiabilities.table.header.description'],
    mapping: 'description',
    colWidth: 150,
    flexGrow: 1,
    isVisible: true,
    isEditable: true,
    isSortable: false,
  },
  {
    columnKey: columnKeys.value,
    header: cms['finPlanLiabilities.table.header.value'],
    mapping: 'value',
    colWidth: 150,
    isVisible: true,
    isSortable: false,
    fieldType: 'currency',
    isEditable: true,
    flexGrow: 1,
  },
];

export const tableHeight = 300;
export const rowHeight = 30;
export const idMapping = 'id';
