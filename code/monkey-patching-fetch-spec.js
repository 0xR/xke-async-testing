import fetch from 'node-fetch';
import nock from 'nock';

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
