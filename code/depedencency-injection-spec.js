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
