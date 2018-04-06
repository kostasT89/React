import durationTypes from '../constants/enums/durationTypes';
import {
        defaultDateFormat,
        dbDateFormat,
        pendingTransactionDurationInDays
      } from '../config/properties';
import {
        createUtcMoment,
        getTodayAndFormat,
        subtractDurationFromMomentAndFormat
      } from './dateUtils';

export function calculateRefreshStartDate(lastYodleeUpdate) {
  if (!lastYodleeUpdate) {
    return getTodayAndFormat();
  }
  const mmnt = createUtcMoment(lastYodleeUpdate, dbDateFormat);
  const date = subtractDurationFromMomentAndFormat({
    dateMoment: mmnt,
    duration: pendingTransactionDurationInDays,
    durationType: durationTypes.days,
    format: defaultDateFormat
  });
  return date;
}
