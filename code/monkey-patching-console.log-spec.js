/* eslint-disable no-console*/
describe('monkey patching console.log', () => {
  beforeEach(() => {
    sinon.spy(console, 'log');
  });

  afterEach(() => {
    console.log.restore();
  });

  function printSomething(something) {
    console.log(something);
  }

  it('should print hello world', () => {
    printSomething('hello world');
    expect(console.log).to.have.been.calledWith('hello world');
  });
});
