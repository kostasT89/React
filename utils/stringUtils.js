import upperFirst from 'lodash/upperFirst';
import toLower from 'lodash/toLower';
import accounting, { formatMoney } from 'accounting';

import displayTypes from '../constants/enums/displayTypes';
import { createUtcMomentAndFormat } from '../utils/dateUtils';
import {
        emptyValue,
        currencyPrecision,
        percentagePrecision
      } from '../config/properties';

export function capitalizeFirstLetter(str) {
  return upperFirst(toLower(str));
}

export function capitalizeFirstLetterOfEachWord(str) {
  const items = str.split(' ');
  let capitalizedString = '';
  items.forEach((item) => {
    capitalizedString = capitalizedString.concat(upperFirst(toLower(item)), ' ');
  });
  return capitalizedString;
}

export function formatNumberWithCommas(number, precision = 0) {
  const prec = precision || 0;
  return formatMoney(number, '', prec, ',');
}

export function formatCurrency(number, precision = currencyPrecision) {
  const parsedNumber = parseFloat(number);
  const isNegative = parsedNumber < 0;
  const safeNumber = Math.abs(parsedNumber);
  const formattedString = formatMoney(safeNumber, {
      precision,
      symbol: '$'
    }, precision, ',');
  return isNegative ? `-${formattedString}` : formattedString;
}

export function formatStringForDisplay({ value, type, inputDateFormat, outputDateFormat }) {
  // Override default settings for the accounting lib for
  accounting.settings.currency.format = {
    pos: '%s%v',
    neg: '%s%v',
    zero: '%s%v'
  };
  // Check for default empty value
  if (value === emptyValue) {
    return emptyValue;
  }
  // Format types
  switch (type) {
    case displayTypes.currency:
      return formatMoney(value, {
        precision: currencyPrecision,
        symbol: '$'
      });
    case displayTypes.percentage:
      return formatMoney(value, {
        precision: percentagePrecision,
        symbol: '%',
        format: '%v%s'
      });
    case displayTypes.date:
      return createUtcMomentAndFormat(value, inputDateFormat, outputDateFormat);
    default:
      return value;
  }
}
