/* eslint-disable no-console*/
function printSomething(something) {
  console.log(something);
}

describe('monkey patching console.log', () => {
  beforeEach(() => {
    sinon.spy(console, 'log');
  });

  afterEach(() => {
    // note you always need to cleanup your monkey patch
    console.log.restore();
  });

  it('should print hello world', () => {
    printSomething('hello world');
    expect(console.log).to.have.been.calledWith('hello world');
  });
});
