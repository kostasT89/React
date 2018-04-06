import cms from '../messages';

/*
 * Fin Plan Assets Table
 */

export const columnKeys = {
  edit: 'edit',
  delete: 'delete',
  type: 'type',
  description: 'assetDescription',
  value: 'assetValue',
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
    columnKey: columnKeys.type,
    header: cms['finPlanAssets.table.header.type'],
    mapping: 'type',
    colWidth: 150,
    isSortable: false,
  },
  {
    columnKey: columnKeys.description,
    header: cms['finPlanAssets.table.header.description'],
    mapping: 'description',
    colWidth: 250,
    flexGrow: 1,
    isSortable: false,
  },
  {
    columnKey: columnKeys.value,
    header: cms['finPlanAssets.table.header.value'],
    mapping: 'value',
    colWidth: 200,
    isSortable: false,
  },
];

export const tableHeight = 500;
