const { logger } = require('../../../../src/utils/logger');

describe('src/utils/logger', () => {
  test('should export an object', () => {
    expect(typeof logger).toBe('object');
  });

  test('should export an object with info property', () => {
    expect(logger.info instanceof Function).toBe(true);
  });

  test('should export an object with warn property', () => {
    expect(logger.warn instanceof Function).toBe(true);
  });

  test('should export an object with debug property', () => {
    expect(logger.debug instanceof Function).toBe(true);
  });

  test('should export an object with error property', () => {
    expect(logger.error instanceof Function).toBe(true);
  });

  test('should export an object with fatal property', () => {
    expect(logger.fatal instanceof Function).toBe(true);
  });
});
