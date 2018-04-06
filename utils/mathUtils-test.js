/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { sumArrayByKey } from './mathUtils';

describe('Math Utils', () => {
  describe('sumArrayByKey', () => {
    // Initialize
    const ARBITRARY_NUMBER_1 = 1234.12;
    const ARBITRARY_NUMBER_2 = 0.15;
    const ARBITRARY_NUMBER_3 = 100.20;
    // Account Data
    const obj1 = { key: ARBITRARY_NUMBER_1 };
    const obj2 = { key: ARBITRARY_NUMBER_2 };
    const obj3 = { key: ARBITRARY_NUMBER_3 };
    const obj4 = { };

    const array1 = [obj1, obj2, obj3];
    const array2 = [obj1, obj2, obj3, obj4];

    it('should sum all keys together', () => {
      const sum = sumArrayByKey(array1, 'key');
      expect(sum).to.equal(ARBITRARY_NUMBER_1 + ARBITRARY_NUMBER_2 + ARBITRARY_NUMBER_3);
    });

    it('should not break if the key prop is not found in an account', () => {
      const sum = sumArrayByKey(array2, 'key');
      expect(sum).to.equal(ARBITRARY_NUMBER_1 + ARBITRARY_NUMBER_2 + ARBITRARY_NUMBER_3);
    });

    it('should return zero if no key is passed in', () => {
      const sum = sumArrayByKey(array1);
      expect(sum).to.equal(0);
    });

    it('should throw an error if no array is passed in', () => {
      expect(() => sumArrayByKey()).to.throw(TypeError);
    });
  });
});
