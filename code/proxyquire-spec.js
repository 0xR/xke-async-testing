import proxyquire from 'proxyquire';

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
