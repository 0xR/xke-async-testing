import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

import fetch from 'node-fetch';
import nock from 'nock';

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Async tests', () => {
  describe('pure functions', () => {
    function pureFunction(request) {
      return `${request} response`;
    }
    it('should return response', () => {
      expect(pureFunction('my request')).to.equal('my request response');
    });
  });

  describe('monkey patching fetch', () => {
    afterEach(() => {
      // note you always need to cleanup your monkey patch
      nock.cleanAll();
    });

    function getPeople(id) {
      return fetch(`http://swapi.co/api/people/${id}/`)
        .then(res => res.json());
    }

    it('should fetch luke skywalker', () => {
      nock('http://swapi.co')
        .get('/api/people/1/')
        .reply(200, { name: 'luke skywalker' });
      return expect(getPeople(1)).to.become({ name: 'luke skywalker' });
    });
  });

  describe('monkey patching console.log', () => {
    let logSpy;
    let consoleLog;

    function patchConsoleLog() {
      logSpy = sinon.spy();
      consoleLog = console.log;
      console.log = logSpy;
    };

    function clearPatchConsoleLog() {
      // note you always need to cleanup your monkey patch
      console.log = consoleLog;
    };

    function printSomething(something) {
      console.log(something);
    }

    it('should print hello world', () => {
      patchConsoleLog();
      printSomething('hello world');
      clearPatchConsoleLog();
      expect(logSpy).to.have.been.calledWith('hello world');
    });
  });
});
