import { NUMBER_ZERO } from '../config/properties';

export const PMT = (rawRate, rawPeriods, rawPresent, rawFuture = 0, rawType = 0) => {
  // Credits: algorithm inspired by Apache OpenOffice
  // Initialize:
  const rate = parseFloat(rawRate);
  const periods = parseFloat(rawPeriods);
  const present = parseFloat(rawPresent);
  const future = parseFloat(rawFuture);
  const type = parseFloat(rawType);

  // Return payment
  let result;
  if (rate === 0) {
    result = (present + future) / periods;
  }
  else {
    const term = Math.pow(1 + rate, periods);
    if (type === 1) {
      // eslint-disable-next-line max-len
      result = (((future * rate) / (term - 1)) + ((present * rate) / (1 - (1 / term)))) / (1 + rate);
    }
    else {
      result = ((future * rate) / (term - 1)) + ((present * rate) / (1 - (1 / term)));
    }
  }
  if (!result) return 0;
  return -result;
};

export const CUMIPMT = (rawRate, rawPeriods, rawValue, start, end, type) => {
  // Credits: algorithm inspired by Apache OpenOffice
  // Credits: Hannes Stiebitzhofer for the translations of function and variable names
  // Requires exports.FV() and exports.PMT() from exports.js [http://stoic.com/exports/]
  // Initialize
  const rate = parseFloat(rawRate);
  const periods = parseFloat(rawPeriods);
  const value = parseFloat(rawValue);

  // Return zero if either rate, periods, or value are lower than or equal to zero
  if (rate <= 0 || periods <= 0 || value <= 0) return NUMBER_ZERO;

  // Return error if start < 1, end < 1, or start > end
  if (start < 1 || end < 1 || start > end) return NUMBER_ZERO;

  // Return error if type is neither 0 nor 1
  if (type !== 0 && type !== 1) return NUMBER_ZERO;

  // Compute cumulative interest
  const payment = PMT(rate, periods, value, 0, type);
  let interest = 0;

  if (start === 1) {
    if (type === 0) {
      interest = -value;
      start++; // eslint-disable-line no-plusplus,no-param-reassign
    }
  }
  // eslint-disable-next-line no-plusplus
  for (let i = start; i <= end; i++) {
    if (type === 1) {
      interest += exports.FV(rate, i - 2, payment, value, 1) - payment;
    }
    else {
      interest += exports.FV(rate, i - 1, payment, value, 0);
    }
  }
  interest *= rate;

  // Return cumulative interest
  if (!interest) return 0;
  return interest;
};

export const FV = (rawRate, rawPeriods, rawPayment, rawValue = 0, rawType = 0) => {
  // Credits: algorithm inspired by Apache OpenOffice

  const rate = parseFloat(rawRate);
  const periods = parseFloat(rawPeriods);
  const payment = parseFloat(rawPayment);
  const value = parseFloat(rawValue);
  const type = parseFloat(rawType);

  // Return future value
  let result;
  if (rate === 0) {
    result = value + (payment * periods);
  }
  else {
    const term = Math.pow(1 + rate, periods);
    if (type === 1) {
      result = (value * term) + (payment * ((1 + rate) * ((term - 1) / rate)));
    }
    else {
      result = (value * term) + (payment * ((term - 1) / rate));
    }
  }
  if (!result) return 0;
  return -result;
};

export const NPER = (rate, payment, present, future = 0, type = 0) => {
  // Return number of periods
  const num = (payment * (1 + (rate * type))) - (future * rate);
  const den = ((present * rate) + (payment * (1 + (rate * type))));
  return Math.log(num / den) / Math.log(1 + rate);
};
