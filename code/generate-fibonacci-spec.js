import generateFibonacci from './generate-fibonacci.js';

describe('Generator: generateFibonacci', () => {
  it('should return fibonacci numbers', () => {
    const fibonacciNumbers = [];
    const generator = generateFibonacci();

    for (let i = 0, number; i < 8; i++) {
      number = generator.next();
      fibonacciNumbers.push(number.value);
    }

    expect(fibonacciNumbers).to.deep.equal(
      [1, 1, 2, 3, 5, 8, 13, 21]
    );
  });

  it('should return fibonacci numbers asynchronously', () => {
    const fibonacciNumbersPromise = new Promise((resolve) => {
      let i = 0;
      const fibonacciNumbers = [];
      const fibonacciGenerator = generateFibonacci();
      function getNextFibonacciNumber() {
        const numberResult = fibonacciGenerator.next();
        fibonacciNumbers.push(numberResult.value);

        i++;
        if (i === 8) {
          resolve(fibonacciNumbers);
        } else {
          setTimeout(getNextFibonacciNumber, 0);
        }
      }
      getNextFibonacciNumber();
    });

    return expect(fibonacciNumbersPromise).to.become(
      [1, 1, 2, 3, 5, 8, 13, 21]
    );
  });
});
