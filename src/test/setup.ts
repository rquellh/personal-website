import '@testing-library/jest-dom/vitest';

// Suppress React DOM warnings caused by react95/styled-components passing
// non-standard props (active, fullWidth, primary, etc.) to DOM elements.
// These originate from the library and cannot be fixed in our code.
const originalConsoleError = console.error;
console.error = (...args: Parameters<typeof console.error>) => {
  const msg = typeof args[0] === 'string' ? args[0] : '';
  if (
    msg.includes('for a non-boolean attribute') ||
    msg.includes('React does not recognize the')
  ) {
    return;
  }
  originalConsoleError(...args);
};
