import { EMPTY_STRING } from '../config/properties';
import {
        notAlphabetic,
        notAlphaNumeric,
        noNumbers,
        notNumeric
      } from '../constants/enums/regex';

export function stripNumbers(str) {
  return str.replace(noNumbers, EMPTY_STRING);
}

export function stripNonAlphaNumericCharacters(str) {
  return str.replace(notAlphaNumeric, EMPTY_STRING);
}

export function stripNonAlphabeticCharacters(str) {
  return str.replace(notAlphabetic, EMPTY_STRING);
}

export function stripNonNumbers(str) {
  return str.replace(notNumeric, EMPTY_STRING);
}
