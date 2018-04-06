import { parseCurrency } from './parsingUtils';

export const required = function required(value) {
  return value ? undefined : 'This field is required.';
};

export const optionSelected = value => (value !== 'disabled' ? undefined : 'Please make a selection.');

export const maxLength = max => value => (
  value && value.length > max ? `Must be ${max} characters or less` : undefined
);

export const maxLength15 = maxLength(15);
export const maxLength25 = maxLength(25);
export const maxLength2 = maxLength(2);

export const number = value => (
  value && isNaN(Number(value)) ? 'Must be a number' : undefined
);

export const minValue = min => value => (
  value && value < min ? `Must be at least ${min}` : undefined
);

export const minValue18 = minValue(18);

export const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
);

export const phone = value => (
  value && !/[(]\d{3}[)] \d{3}[-]\d{4}$/i.test(value) ?
  'Invalid phone number. Make sure it is in the following format: (555) 555-5555' : undefined
);

export const tooOld = value => (
  value && value > 65 ? 'You might be too old for this' : undefined
);

export const aol = function aol(value) {
  return value && /.+@aol\.com/.test(value) ?
    'Really? You still use AOL for your email?' : undefined;
};

export const dollarAmount = (value) => {
  const parsedValue = parseCurrency(value);
  return parsedValue < 0.01 ? 'Must be a value greater than $0.00' : undefined;
};

export const birthdate = value => (
  value && !/[0-9]{2}\/[0-9]{2}\/[0-9]{2}$/i.test(value) ?
    'Birthdate must be in format: 01/02/90' : undefined
);
