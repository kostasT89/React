import {
          defaultPrecision,
          currencyPrecision,
          percentagePrecision,
          NUMBER_ZERO
        } from '../config/properties';

export function sumArrayByKey(array, key) {
  return array.reduce((sum, obj) => {
    const amount = obj[key] || 0;
    return sum + amount;
  }, 0);
}

/*
* All of the following rounding utils return a string output
* because we have to make use of Number.toFixed().
*/
export function roundNumber(number, digits = defaultPrecision) {
  try {
    const roundedNumberString = parseFloat(number).toFixed(digits);
    return roundedNumberString;
  }
  catch (e) {
    return number;
  }
}

export function roundCurrencyNumber(number, digits = currencyPrecision) {
  return roundNumber(number, digits);
}

export function roundPercentageNumber(number, digits = percentagePrecision) {
  return roundNumber(number, digits);
}

export function roundWholeNumber(number, digits = NUMBER_ZERO) {
  return roundNumber(number, digits);
}
