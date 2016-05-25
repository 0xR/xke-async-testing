import { call, put } from 'redux-saga/effects';
import { fetchJson } from './fetch-utils.js';
import getPeople from './getPeopleSagaSimplified.js';

describe('redux saga simplified', () => {
  it('should fetch luke skywalker', () => {
    const generator = getPeople(1);

    const fetchCall = generator.next();
    expect(fetchCall.value).to.deep.equal(
      call(fetchJson, 'http://swapi.co/api/people/1/')
    );

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
