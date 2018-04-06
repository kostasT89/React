import cms from '../messages';

/*
 * Fin Plan Assets Table
 */

export const columnKeys = {
  edit: 'edit',
  delete: 'delete',
  type: 'insuranceType',
  company: 'insuranceCompany',
  premium: 'monthlyPremium',
};

export const columns = [
  {
    columnKey: columnKeys.edit,
    header: '',
    icon: 'pencil',
    type: 'icon',
    colWidth: 50,
    colHeight: 40,
  },
  {
    columnKey: columnKeys.delete,
    header: '',
    type: 'icon',
    icon: 'times',
    colWidth: 50,
    colHeight: 40,
  },
  {
    columnKey: columnKeys.type,
    header: cms['finPlanInsurance.table.header.type'],
    colWidth: 100,
    flexGrow: 1,
    isSortable: false,
    colHeight: 40,
  },
  {
    columnKey: columnKeys.company,
    header: cms['finPlanInsurance.table.header.company'],
    colWidth: 150,
    flexGrow: 1,
    colHeight: 40,
    isSortable: false,
  },
  {
    columnKey: columnKeys.premium,
    header: cms['finPlanInsurance.table.header.premium'],
    colWidth: 150,
    flexGrow: 1,
    colHeight: 40,
    isSortable: false,
  },
];

export const tableHeight = 500;
export const headerHeight = 40;
