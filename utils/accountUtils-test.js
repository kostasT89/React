
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { sideNavKeys } from '../schemas/sideNavSchema';
import yodleeContainers from '../constants/enums/yodleeContainers';
import { calculateNetworth } from './accountUtils';

describe('Math Utils', () => {
  describe('calculateNetworth', () => {
    // Initialize
    const {
      bank,
      loan,
      creditCard,
      investment
    } = yodleeContainers;
    const { additionalAssets } = sideNavKeys;
    const ARBITRARY_NUMBER_1 = 1234.12;
    const ARBITRARY_NUMBER_2 = 100.00;
    // Data
    const acct1 = { amount: ARBITRARY_NUMBER_1 };
    const acct2 = { amount: ARBITRARY_NUMBER_2 };
    const bankAccts = { [bank]: [acct1, acct2] };
    const investmentAccts = { [investment]: [acct1, acct2] };
    const additionalAccts = { [additionalAssets]: [acct1, acct2] };
    const loanAccts = { [loan]: [acct1, acct2] };
    const creditCardAccts = { [creditCard]: [acct1, acct2] };
    const multipleAccts = { ...bankAccts, ...creditCardAccts };
    const emptyAcctsObj = {};
    const unrecognizedAcct = { meow: [acct1, acct2] };

    it('should positively sum bank accounts', () => {
      const sum = calculateNetworth(bankAccts);
      expect(sum).to.equal(ARBITRARY_NUMBER_1 + ARBITRARY_NUMBER_2);
    });

    it('should positively sum investment accounts', () => {
      const sum = calculateNetworth(investmentAccts);
      expect(sum).to.equal(ARBITRARY_NUMBER_1 + ARBITRARY_NUMBER_2);
    });

    it('should positively sum additional asset accounts', () => {
      const sum = calculateNetworth(additionalAccts);
      expect(sum).to.equal(ARBITRARY_NUMBER_1 + ARBITRARY_NUMBER_2);
    });

    it('should negatively sum loan accounts', () => {
      const sum = calculateNetworth(loanAccts);
      expect(sum).to.equal(-ARBITRARY_NUMBER_1 - ARBITRARY_NUMBER_2);
    });

    it('should negatively sum credit card accounts', () => {
      const sum = calculateNetworth(creditCardAccts);
      expect(sum).to.equal(-ARBITRARY_NUMBER_1 - ARBITRARY_NUMBER_2);
    });

    it('should correctly sum multiple accounts', () => {
      const sum = calculateNetworth(multipleAccts);
      expect(sum).to.equal(0);
    });

    it('should return zero for empty accounts object', () => {
      const sum = calculateNetworth(emptyAcctsObj);
      expect(sum).to.equal(0);
    });

    it('should return zero for an unrecognized accounts object', () => {
      const sum = calculateNetworth(unrecognizedAcct);
      expect(sum).to.equal(0);
    });

    it('should throw an error if an undefined accounts object is passed in', () => {
      expect(() => calculateNetworth()).to.throw(Error);
    });
  });
});
