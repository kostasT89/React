/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import {
         parseAccountsForSideNav,
         parseYodleeTransaction
       } from './parsingUtils';

const ARBITRARY_STRING = 'MOO';
const ARBITRARY_NUMBER = 1234.12;

describe('Parsing Utils', () => {
  describe.only('parseYodleeTransaction', () => {
    // Initialize
    const yodleeTransaction = {
      id: ARBITRARY_NUMBER,
      postDate: ARBITRARY_STRING,
      description: {
        original: ARBITRARY_STRING
      },
      amount: {
        amount: ARBITRARY_NUMBER
      },
      categoryId: ARBITRARY_NUMBER,
      baseType: ARBITRARY_STRING,
      merchant: {
        name: ARBITRARY_STRING
      },
      accountId: ARBITRARY_NUMBER
    };

    it('should map appropriate yodlee properties if they exist', () => {
      const parsedTransaction = parseYodleeTransaction(yodleeTransaction);
      expect(typeof parsedTransaction.originalData).to.eql('object');
      expect(parsedTransaction.id).to.eql(ARBITRARY_NUMBER);
      expect(parsedTransaction.postDate).to.eql(ARBITRARY_STRING);
      expect(parsedTransaction.name).to.eql(ARBITRARY_STRING);
      expect(parsedTransaction.amount).to.eql(ARBITRARY_NUMBER);
      expect(parsedTransaction.category).to.eql(`yodlee_${ARBITRARY_NUMBER}`);
      expect(parsedTransaction.baseType).to.eql(ARBITRARY_STRING);
      expect(parsedTransaction.merchantName).to.eql(ARBITRARY_STRING);
      expect(parsedTransaction.accountId).to.eql(ARBITRARY_NUMBER);
    });

    it('should add a default frequency', () => {
      const parsedTransaction = parseYodleeTransaction(yodleeTransaction);
      expect(parsedTransaction.isRecurring).to.be.false;
    });

    it('should add a default recurring status', () => {
      const parsedTransaction = parseYodleeTransaction(yodleeTransaction);
      expect(parsedTransaction.isRecurring).to.be.null;
    });
  });

  describe('parseAccountsForSideNav', () => {
    // Initialize
    const ACCOUNT_TYPE1 = 'bank';
    const ACCOUNT_TYPE2 = 'creditCard';
    const ACCOUNT_TYPE3 = 'loan';
    const FORMATTED_ARBITRARY_STRING = 'Moo';
    const ARBITRARY_NUMBER2 = 0.15;
    const EMPTY_STRING = '';
    // Account Data
    const acct1 = {
      providerName: ARBITRARY_STRING,
      balance: {
        amount: ARBITRARY_NUMBER
      },
      accountName: ARBITRARY_STRING
    };
    const acct2 = {
      availableBalance: {
        amount: ARBITRARY_NUMBER2
      },
      ...acct1
    };
    const acct3 = {};
    const accounts = {
      [ACCOUNT_TYPE1]: [acct1],
      [ACCOUNT_TYPE2]: [acct2],
      [ACCOUNT_TYPE3]: [acct3]
    };

    it('should prefer the availableBalance prop if available', () => {
      const parsedAccounts = parseAccountsForSideNav(accounts);
      expect(parsedAccounts[ACCOUNT_TYPE2][0].amount).to.equal(ARBITRARY_NUMBER2);
    });

    it('should use the balance prop if no availableBalance is found', () => {
      const parsedAccounts = parseAccountsForSideNav(accounts);
      expect(parsedAccounts[ACCOUNT_TYPE1][0].amount).to.equal(ARBITRARY_NUMBER);
    });

    it('should throw an error if an array is passed in', () => {
      // TODO;
    });

    it(`should capitalize the first letter and lower case sequential letters
       for the subtitle property`, () => {
         const parsedAccounts = parseAccountsForSideNav(accounts);
         expect(parsedAccounts[ACCOUNT_TYPE1][0].subTitle).to.equal(FORMATTED_ARBITRARY_STRING);
     });

     it('should not break if property is not found', () => {
       const parsedAccounts = parseAccountsForSideNav(accounts);
       expect(parsedAccounts[ACCOUNT_TYPE3][0].title).to.be.undefined;
       expect(parsedAccounts[ACCOUNT_TYPE3][0].amount).to.be.undefined;
       expect(parsedAccounts[ACCOUNT_TYPE3][0].subTitle).to.equal(EMPTY_STRING);
     });
    //
  });
});
