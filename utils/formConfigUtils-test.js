/* eslint-disable no-unused-expressions */

import { expect } from 'chai';

import { createOptionsFromEnums } from './formConfigUtils';

describe('Form Configuration Utils', () => {
  describe('createOptionsFromEnums', () => {
    const KEY1 = 'bowler1';
    const KEY2 = 'bowler2';
    const KEY3 = 'bowler3';
    const VALUE1 = 'Kelly Kulick';
    const VALUE2 = 'Hui Fen New';
    const VALUE3 = 'Diana Zavjalova';
    const arbitraryEnum = {
      [KEY1]: VALUE1,
      [KEY2]: VALUE2,
      [KEY3]: VALUE3
    };
    const enumWithMissingValue = {
      [KEY1]: VALUE1,
      [KEY2]: VALUE2,
      [KEY3]: undefined
    };

    expect('should create an option for every key', () => {
      const options = createOptionsFromEnums(arbitraryEnum);
      expect(options.length).to.equal(Object.keys(arbitraryEnum.length));
    });

    expect('should return options with text', () => {
      const options = createOptionsFromEnums(arbitraryEnum);
      expect(options[1].text).to.equal(VALUE1);
    });

    expect('should return options with values', () => {
      const options = createOptionsFromEnums(arbitraryEnum);
      expect(options[0].value).to.equal(KEY1);
    });

    expect('should not break if the enum contains an undefined balue', () => {
      const options = createOptionsFromEnums(enumWithMissingValue);
      expect(options[2].text).to.be.undefined;
      expect(options[2].value).to.equal(KEY3);
    });
  });
});
