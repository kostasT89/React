/* @flow */
import moment from 'moment';
import range from 'ramda/src/range';
import reverse from 'ramda/src/reverse';
import durationTypes from '../constants/enums/durationTypes';
import {
        defaultDateFormat,
        dbDateFormat,
        defaultTimeFormat,
        MS_PER_DAY
       } from '../config/properties';

export function getCurrentYear() { // eslint-disable-line
   return moment().format('YYYY');
}

const recapDateFormat = 'ddd MM/DD';
const dateInputDisplayFormat = 'MM/DD/YY';
const dateFormatFullYear = 'MM/DD/YYYY';

export const timeMeasurements = {
  days: 'days',
  week: 'week',
};

export function formatDate(momentDate: Object): string {
  return momentDate.format();
}

export function formatDateWithDefaultFormat(momentDate: Object): string {
  return momentDate.format(defaultDateFormat);
}

export function formatDateInputForDisplay(dateString: string): string {
  return moment(dateString).utc().format(dateInputDisplayFormat);
}

export function formatDateWithFullYear(dateString: string): string {
  return moment(dateString).format(dateFormatFullYear);
}

export function getPastDate(toSubtract: number, value: string): Object {
  return moment().subtract(toSubtract, value);
}

export function twoDatesAreTheSame(firstDate: string, secondDate: string): boolean {
  return moment(firstDate).diff(moment(secondDate), timeMeasurements.days) === 0;
}

export function createWeekDatesFromWeekEndingDate(weekEndingDate: string) {
  return reverse(range(0, 7))
         .map(days =>
           moment(weekEndingDate)
           .subtract(days, timeMeasurements.days)
           .format(recapDateFormat)
         );
}

export function calculateNinetyDayPastDate(endDate) {
  const endMoment = moment(endDate);
  const startMoment = moment(endMoment);
  startMoment.subtract(90, 'days');
  startMoment.startOf('day'); // set to midnight
  return startMoment;
}

export function formatMoment(dateMoment, dateFormat) {
  const format = dateFormat || defaultDateFormat;
  return dateMoment.format(format);
}

export function convertMomentToUtcAndFormat(dateMoment, dateFormat) {
  const format = dateFormat || defaultDateFormat;
  const utcMoment = moment.utc(dateMoment);
  return formatMoment(utcMoment, format);
}

export function createUtcMomentAndFormat(date, inputFormat, outputFormat) {
  const format = inputFormat || defaultDateFormat;
  const utcMoment = moment.utc(date, format);
  return formatMoment(utcMoment, outputFormat);
}

export function createMomentAndFormat(date, inputFormat, outputFormat) {
  const format = inputFormat || defaultDateFormat;
  const dateMoment = moment(date, format);
  return formatMoment(dateMoment, outputFormat);
}

export function getFirstOfMonth(dateMoment) {
  const copy = moment(dateMoment);
  return copy.startOf(durationTypes.month);
}

export function getLastOfMonth(dateMoment) {
  const copy = moment(dateMoment);
  return copy.endOf(durationTypes.month);
}

export function createUtcMoment(date, dateFormat) {
  const format = dateFormat || defaultDateFormat;
  return moment.utc(date, format);
}

export function createLocalMoment(date, dateFormat) {
  const format = dateFormat || defaultDateFormat;
  return moment(date, format);
}

export function convertDateFromDbToLocalFormat(date, newFormat) {
  const format = newFormat || defaultDateFormat;
  const dbDateMoment = moment(date, dbDateFormat);
  return dbDateMoment.format(format);
}

export function convertDateFromDbToUtcFormat(date, newFormat) {
  const format = newFormat || defaultDateFormat;
  const dbDateMoment = moment(date, dbDateFormat);
  return dbDateMoment.format(format);
}

export function convertDateToDbFormat(date) {
  return moment(date).format(dbDateFormat);
}

export function convertMillisecondsToDays(ms) {
  return Math.round(ms / MS_PER_DAY);
}

export function addDurationToMoment(dateMoment, duration, durationType) {
  const copy = moment(dateMoment);
  return copy.add(duration, durationType);
}

export function subtractDurationFromMoment(dateMoment, duration, durationType) {
  const copy = moment(dateMoment);
  return copy.subtract(duration, durationType);
}

export function addDurationToMomentAndFormat({
  dateMoment,
  duration,
  durationType,
  format }) {
    const dateFormat = format || defaultDateFormat;
    const newMoment = addDurationToMoment(dateMoment, duration, durationType);
    return formatMoment(newMoment, dateFormat);
}

export function subtractDurationFromMomentAndFormat({
  dateMoment,
  duration,
  durationType,
  format
}) {
  const dateFormat = format || defaultDateFormat;
  const newMoment = subtractDurationFromMoment(dateMoment, duration, durationType);
  return formatMoment(newMoment, dateFormat);
}

export function getTodayUtcAndFormat(dateFormat) {
  const format = dateFormat || defaultDateFormat;
  return moment.utc().format(format);
}

export function getTodayAndFormat(dateFormat) {
  const format = dateFormat || defaultDateFormat;
  return moment().format(format);
}

export function createNowMoment() {
  return moment();
}

export function formatMomentAsTime(dateMoment) {
  return dateMoment.format(defaultTimeFormat);
}

export function getNumberOfDaysFromToday(pastDate) {
  const updated = moment(pastDate);
  return moment().diff(updated, 'days');
}

export function getStartOfNextMonth() {
  return formatDateWithFullYear(moment().add(1, 'month').startOf('month'));
}

export function createTodayMoment() {
  return moment().startOf('day');
}
