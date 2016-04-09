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
      json: () => ({ name: 'luke skywalker' }),
    }));

    const person1 = getPeople(1);
    expect(fetchMock).to.have.been.calledWith(
      'http://swapi.co/api/people/1/'
    );
    return expect(person1).to.become({
      name: 'luke skywalker',
    });
  });
});
