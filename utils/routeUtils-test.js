/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import {
  populateAccountTransactionsRoute
} from './routeUtils';
import {
  defaultPaginationPage,
  defaultPaginationCount
} from '../config/properties';

describe('Route Utils', () => {
  describe('populateAccountTransactionsRoute', () => {
    // Initialize
    const ACCOUNT_ID = 12345;
    const RANDOM_PAGE = 5;
    const RANDOM_COUNT = 100;

    const expectedBase = `/accounts/${ACCOUNT_ID}/transactions`;
    const expectedDefaultRoute = `${expectedBase}?page=${defaultPaginationPage}&count=${defaultPaginationCount}`;
    const expectedCustomRoute = `${expectedBase}?page=${RANDOM_PAGE}&count=${RANDOM_COUNT}`;

    it('should create a default query string is no params are supplied', () => {
      expect(populateAccountTransactionsRoute({
        accountId: ACCOUNT_ID,
      })).to.equal(expectedDefaultRoute);
    });

    it('should create a query string with params', () => {
      expect(populateAccountTransactionsRoute({
        accountId: ACCOUNT_ID,
        page: RANDOM_PAGE,
        count: RANDOM_COUNT
      })).to.equal(expectedCustomRoute);
    });

    it('should replace the account id placeholder in the route with undefined if no account id is found', () => {
      expect(() => populateAccountTransactionsRoute()).to.throw(Error);
    });
  });
});
