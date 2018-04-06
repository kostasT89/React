/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import {
  capitalizeFirstLetter,
  formatNumberWithCommas,
  formatStringForDisplay
} from './stringUtils';
import displayTypes from '../constants/enums/displayTypes';

describe('String Utils', () => {
  describe('capitalizeFirstLetter', () => {
    // Initialize
    const ARBITRARY_STRING = 'MOO';
    const ARBITRARY_STRING2 = 'moo';
    const ARBITRARY_STRING3 = 'mOO';
    const FORMATTED_ARBITRARY_STRING = 'Moo';

    it('should take any string and capitalizes first letter with lowering the rest', () => {
      expect(capitalizeFirstLetter(ARBITRARY_STRING)).to.equal(FORMATTED_ARBITRARY_STRING);
      expect(capitalizeFirstLetter(ARBITRARY_STRING2)).to.equal(FORMATTED_ARBITRARY_STRING);
      expect(capitalizeFirstLetter(ARBITRARY_STRING3)).to.equal(FORMATTED_ARBITRARY_STRING);
    });

    it('should return an empty string if no string is passed in', () => {
      expect(capitalizeFirstLetter()).to.equal('');
    });
    //
  });
  describe('formatNumberWithCommas', () => {
    // Initialize
    const SINGLE_DIGIT_NUMBER = 0;
    const FOUR_DIGIT_NUMBER = 1000;
    const SEVEN_DIGIT_NUMBER = 1000000.00;
    const ARBITRARY_STRING = 'Mooooo';
    const FOUR_DIGIT_STRING = '1234';

    it('should know how to format a single digit number', () => {
      expect(formatNumberWithCommas(SINGLE_DIGIT_NUMBER)).to.equal('0');
    });

    it('should know how to format a four digit number', () => {
      expect(formatNumberWithCommas(FOUR_DIGIT_NUMBER)).to.equal('1,000');
    });

    it('should know how to format a seven digit number', () => {
      expect(formatNumberWithCommas(SEVEN_DIGIT_NUMBER, 2)).to.equal('1,000,000.00');
    });

    it('should return zero for a string that is not a number', () => {
      expect(formatNumberWithCommas(ARBITRARY_STRING)).to.equal('0');
    });

    it('should know how to format a numeric string', () => {
      expect(formatNumberWithCommas(FOUR_DIGIT_STRING)).to.equal('1,234');
    });
  });

  describe('formatStringForDisplay', () => {
    // Initialize
    const NUMBER_VALUE = 12.5678;
    const DATE_VALUE = '7-1-98';
    const DATE_VALUE_2 = '07-01-1998';
    const INPUT_DATE_FORMAT = 'M-D-YY';
    const OUTPUT_DATE_FORMAT = 'MMMM D, YYYY';

    const currencyFormattedNumber = '$12.57';
    const percentageFormattedNumber = '12.57%';
    const formattedDate = 'July 1, 1998';
    const defaultFormattedDate = '07-01-1998';

    it('should know how to format currency', () => {
      expect(formatStringForDisplay({
        value: NUMBER_VALUE,
        type: displayTypes.currency
      })).to.equal(currencyFormattedNumber);
    });

    it('should know how to format perecentages', () => {
      expect(formatStringForDisplay({
        value: NUMBER_VALUE,
        type: displayTypes.percentage
      })).to.equal(percentageFormattedNumber);
    });

    it('should know how to format dates', () => {
      expect(formatStringForDisplay({
        value: DATE_VALUE,
        type: displayTypes.date,
        inputDateFormat: INPUT_DATE_FORMAT,
        outputDateFormat: OUTPUT_DATE_FORMAT
      })).to.equal(formattedDate);
    });

    it('will use default input date format if not specified', () => {
      expect(formatStringForDisplay({
        value: DATE_VALUE,
        type: displayTypes.date,
      })).to.equal(defaultFormattedDate);
      expect(formatStringForDisplay({
        value: DATE_VALUE_2,
        type: displayTypes.date,
      })).to.equal(defaultFormattedDate);
    });

    it('should return the original value if the type is not recognized', () => {
      expect(formatStringForDisplay({
        value: NUMBER_VALUE
      })).to.equal(NUMBER_VALUE);
    });

    it('should return throw a Type Error if no value is passed in', () => {
      expect(() => formatStringForDisplay()).to.throw(TypeError);
    });
  });
});
