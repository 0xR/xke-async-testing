import nock from 'nock';
import getPeople from './getPeople.js';

describe('monkey patching fetch', () => {
  afterEach(() => {
    // note you always need to cleanup your monkey patch
    nock.cleanAll();
  });

  it('should fetch luke skywalker', () => {
    nock('http://swapi.co')
      .get('/api/people/1/')
      .reply(200, { name: 'luke skywalker' });

    return expect(getPeople(1)).to.become({
      name: 'luke skywalker',
    });
  });
});
