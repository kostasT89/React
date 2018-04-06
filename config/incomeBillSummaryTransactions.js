import frequencyTypes from '../constants/enums/frequencyTypes';

export const fields = [
  {
    name: 'date',
    mapping: 'date',
    header: 'Date',
    isVisible: true,
    isEditable: true,
    fieldType: 'date',
    colWidth: 100
  },
  {
    name: 'transactionName',
    mapping: 'name',
    header: 'Transaction Name',
    isVisible: true,
    isEditable: true,
    fieldType: 'text',
    colWidth: 190,
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
    name: 'frequency',
    header: 'Frequency',
    mapping: 'frequency',
    isVisible: true,
    isEditable: true,
    fieldType: 'select',
    selectOptions: frequencyTypes,
    selectOrder: Object.keys(frequencyTypes),
    colWidth: 170
  }
];

export const idMapping = 'id';

export const rowHeight = 25; // pixels
export const headerHeight = 35; // pixels
export const containerHeightTolerance = 20; // pixels
