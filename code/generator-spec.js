import fetch from 'node-fetch';
import { call } from 'redux-saga/effects';

import getPersonSaga from './getPersonSaga.js';

describe('generator', () => {
  it('should fetch luke skywalker', () => {
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
  });
});
