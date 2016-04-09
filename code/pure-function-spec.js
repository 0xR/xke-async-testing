describe('pure function', () => {
  function pureFunction(request) {
    return `${request} response`;
  }
  it('should return response', () => {
    expect(pureFunction('my request'))
      .to.equal('my request response');
  });
});
