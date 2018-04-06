import frequencyTypes from '../constants/enums/frequencyTypes';
import statusTypes from '../constants/enums/statusTypes';

export const fields = [
  {
    name: 'name',
    mapping: 'name',
    header: 'Bill Description',
    isVisible: true,
    isEditable: true,
    fieldType: 'text',
    colWidth: 250,
    flexGrow: 3
  },
  {
    name: 'averageAmount',
    mapping: 'averageAmount',
    header: 'Amount',
    isVisible: true,
    isEditable: false,
    fieldType: 'currency',
    colWidth: 150
  },
  {
    name: 'startingDate',
    mapping: 'startingDate',
    header: 'Date',
    isVisible: true,
    isEditable: true,
    fieldType: 'date',
    colWidth: 120
  },
  {
    name: 'accountStatus',
    mapping: 'accountStatus',
    header: 'Account Status',
    isVisible: true,
    isEditable: true,
    fieldType: 'select',
    selectOptions: statusTypes,
    selectOrder: Object.keys(statusTypes)
  },
  {
    name: 'frequency',
    mapping: 'frequency',
    header: 'Frequency',
    isVisible: true,
    isEditable: true,
    fieldType: 'select',
    selectOptions: frequencyTypes,
    selectOrder: Object.keys(frequencyTypes),
    colWidth: 170
  }
];

export const idMapping = 'id';
