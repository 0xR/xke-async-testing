import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import fetch from 'node-fetch';

chai.use(sinonChai);

describe('Async tests', () => {
  describe('pure functions', () => {
    function pureFunction(request) {
      return `${request} response`;
    }
    it('should return response', () => {
      expect(pureFunction('my request')).to.equal('my request response');
    });
  });

  describe('pure functions', () => {
    function pureFunction(request) {
      return `${request} response`;
    }
    it('should return response', () => {
      expect(pureFunction('my request')).to.equal('my request response');
    });
  });
});
