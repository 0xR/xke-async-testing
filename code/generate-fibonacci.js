export default function* generateFibonacci() {
  let a = 0;
  let b = 1;

  for (;;) {
    yield b;
    const newValue = a + b;
    a = b;
    b = newValue;
  }
}
