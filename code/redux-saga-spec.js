import fetch from 'node-fetch';
import { call, put } from 'redux-saga/effects';
import getPeople from './getPeopleSaga.js';

describe('redux saga', () => {
  it('should fetch luke skywalker', () => {
    const generator = getPeople(1);

    const fetchCall = generator.next();
    expect(fetchCall.value).to.deep.equal(
      call(fetch, 'http://swapi.co/api/people/1/')
    );

    const yieldJson = generator.next({
      json: () => 'json promise',
    });

    expect(yieldJson.value).to.deep.equal('json promise');

    const dispatchedAction = generator.next({
      name: 'luke skywalker',
    });

    expect(dispatchedAction.value).to.deep.equal(put({
      type: 'GOT_PERSON',
      person: { name: 'luke skywalker' },
    }));

    const afterPut = generator.next();
    expect(afterPut.done).to.equal(true);
  });
});
