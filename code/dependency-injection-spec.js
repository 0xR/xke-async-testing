import PeopleService from './PeopleService.js';
describe('dependency injection', () => {
  let peopleService;
  let fetchMock;

  beforeEach(() => {
    fetchMock = sinon.stub();
    peopleService = new PeopleService(fetchMock);
  });

  it('should fetch luke skywalker', () => {
    fetchMock.returns(Promise.resolve({
      json: () => ({ name: 'luke skywalker' }),
    }));
    const person1 = peopleService.getPeople(1);
    expect(fetchMock).to.have.been.calledWith(
      'http://swapi.co/api/people/1/'
    );

    return expect(person1).to.become({
      name: 'luke skywalker',
    });
  });
});
