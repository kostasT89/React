import transactionAttributes from '../constants/enums/transactionAttributes';
import pubPages from './publicPages';

// reCAPTCHA Site Key
export const siteKey = '6LdkmzIUAAAAAG4jenndgcOsHOX5D0kmefVE2ypa';

// Stripe api Key
export const stripePk = 'pk_test_P0MB7tU4LN978NmxV5K6g6X8';

// Public Pages:
export const publicPages = pubPages;

export const EMPTY_STRING = '';
export const NUMBER_ZERO = 0;
export const NUMBER_ONE = 1;
export const NUMBER_HUNDRED = 100;
export const STRING_ZERO = '0';
export const CURRENCY_ZERO = '0.00';
export const NUMBER_ZEROZERO = 0.00;
export const MONTHS_PER_YEAR = 12;
export const DAYS_PER_MONTH = 30;
export const MS_PER_DAY = 8.64e+7;
export const WINDOW_WIDTH = window.innerWidth;


export const scrollableContentDivClassName = 'lc-page-wrapper__scrollable-content';

/*
* The following metric estimates how many days a pending transaction
* will stay pending.  A merchant has up to 180 days to post pending transactions,
* but usually they do not exceed a period of 5 days.
*/
export const pendingTransactionDurationInDays = 14;

export const maxLoginAttempts = 4;

export const minPasswordLength = 8;

export const icons = {
  cash: 'cash',
  loan: 'loan',
  invest: 'invest',
  house: 'house',
  wallet: 'wallet',
  creditCard: 'creditCard',
  successBrowserIcon: 'successBrowserIcon',
};

export const transactionFieldsToPropagate = [
  transactionAttributes.name,
  transactionAttributes.category,
  transactionAttributes.isRecurring,
  transactionAttributes.frequency,
];

export const inputTypes = {
  date: 'date',
  select: 'select'
};

export const welcomeSteps = [
  'Connect your accounts',
  'Select Monthly Recurring Income and Charges/Bills',
  'Fisecal will calculate how much is available to spend until your next paycheck; what we like to call PerEx.'
];

export const sortTypes = {
  asc: 'asc',
  desc: 'desc',
};

export const yodleeFastLink = {
  finappId: '10003600',
  redirectReq: true
};

export const emptyValue = '-';

// Generic Table
export const defaultCellWidth = 190;
export const defaultCellHeight = 57;
// Static Table
export const staticTableCellHeight = 30;

// Transactions List:
export const maxListLength = 8; // max number of viewable items in list
export const defaultListItemHeight = 50; // pixels

/*
* Progres threshold set to 30 as this is when the progress bar
* meter text typically starts to be pushed out of view.
* We want the text to remain visible and to be fixed regardless of
* how small the meter gets.
*/
export const progressThreshold = 30;

export const advisorCallAppointmentDurationInMins = 30;

export const defaultDateFormat = 'MM-DD-YYYY';
export const shortDefaultDateFormat = 'MM/DD/YY';
export const dbDateFormat = 'YYYY-MM-DD HH:mm:ssZ';
export const yodleeDateFormat = 'YYYY-MM-DD';
export const defaultMonthDayFormat = 'M/D';
export const monthWordAndDayFormat = 'MMMM D';
export const defaultTimeFormat = 'h:mm A';
export const defaultWeekdayFormat = 'dddd';
export const sortableDateFormat = 'YYYYMMDD';
export const longDateFormat = 'MMMM Do, YYYY';

export const defaultPrecision = 2;
export const currencyPrecision = 2;
export const percentagePrecision = 2;

export const defaultPaginationPage = 1;
export const defaultPaginationCount = 50;
export const defaultPageRangeDisplayed = 10;

// Parent Classes for Tables
export const tableDimensionsWidthClass = 'lc-table-dimensions-parent--width';
export const tableDimensionsHeightClass = 'lc-table-dimensions-parent--height';
export const inlineTableDimensionsWidthClass = 'lc-inline-table-dimensions-parent--width';
export const inlineTableDimensionsHeightClass = 'lc-inline-table-dimensions-parent--height';

// Fin Plan Goals
export const defaultRetirementTerm = 35;
// Fin Plan Forms
export const debounceMS = 100;

export const retirementTerm = 99;

// Settings - Preferences
export const rulesTableContainerHeight = 300;
// export const container
