import proxyquire from 'proxyquire';

describe('redux thunk', () => {
  let getPeople;
  let fetchMock;

  beforeEach(() => {
    fetchMock = sinon.stub();
    getPeople = proxyquire('./getPeopleThunk.js', {
      'node-fetch': fetchMock,
    }).default;
  });

  it('should fetch luke skywalker', () => {
    fetchMock.returns(Promise.resolve({
      json: () => ({ name: 'luke skywalker' }),
    }));

    let dispatchedActionResolve;
    const dispatchedActionsPromise = new Promise(resolve => {
      dispatchedActionResolve = resolve;
    });

    const dispatchMock = dispatchedAction =>
      dispatchedActionResolve(dispatchedAction);

    const thunk = getPeople(1);
    thunk(dispatchMock);
    expect(fetchMock).to.have.been.calledWith(
      'http://swapi.co/api/people/1/'
    );
    return expect(dispatchedActionsPromise).to.become({
      type: 'GOT_PERSON',
      person: { name: 'luke skywalker' },
    });
  });
});
