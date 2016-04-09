import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import proxyquire from 'proxyquire';
import { call } from 'redux-saga/effects'

import fetch from 'node-fetch';
import nock from 'nock';

import getPersonSaga from './getPersonSaga.js';

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
      // note you always need to cleanup you monkey patch
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
    function printSomething(something) {
      console.log(something);
    }

    it('should print hello world', () => {
      sinon.spy(console, 'log');
      printSomething('hello world');
      expect(console.log).to.have.been.calledWith('hello world');
      console.log.restore();
    });
  });

  describe('depedencency injection', () => {
    function getPeople(fetch, id) {
      return fetch(`http://swapi.co/api/people/${id}/`)
        .then(res => res.json());
    }

    it('should fetch luke skywalker', () => {
      const fetchMock = sinon.stub()
        .returns(Promise.resolve({
          json() {
            return { name: 'luke skywalker' };
          },
        }));
      const person1 = getPeople(fetchMock, 1);
      expect(fetchMock).to.have.been.calledWith('http://swapi.co/api/people/1/');

      return expect(person1).to.become({ name: 'luke skywalker' });
    });
  });

  describe('proxyquire', () => {
    let getPeople;
    let fetchMock;
    beforeEach(() => {
      fetchMock = sinon.stub();
      getPeople = proxyquire('./getPeople.js', {
        'node-fetch': fetchMock,
      }).default;
    });

    it('should fetch luke skywalker', () => {
      fetchMock.returns(Promise.resolve({
        json() {
          return { name: 'luke skywalker' };
        },
      }));
      return expect(getPeople(1)).to.become({ name: 'luke skywalker' });
    });
  });

  describe('generators', () => {
    it('should fetch luke skyqalker', () => {
      const generator = getPersonSaga(1);

      const fetchCall = generator.next();
      expect(fetchCall.value).to.deep.equal(call(fetch, 'http://swapi.co/api/people/1/'));

      const result = generator.next({
        json() {
          return { name: 'luke skywalker' };
        },
      });

      expect(result.value).to.deep.equal({ name: 'luke skywalker' });
      expect(result.done).to.equal(true);
    })
  });
});
