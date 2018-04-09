const generate = require('../../../../src/commands/generate');

describe('src/commands/generate', () => {
  describe('command', () => {
    test('should export property', () => {
      expect(generate.command).toBeTruthy();
    });

    test('should export a string', () => {
      expect(typeof generate.command).toBe('string');
    });
  });

  describe('desc', () => {
    test('should export property', () => {
      expect(generate.desc).toBeTruthy();
    });

    test('should export a string', () => {
      expect(typeof generate.desc).toBe('string');
    });
  });

  describe('builder', () => {
    test('should export property', () => {
      expect(generate.builder).toBeTruthy();
    });

    test('should export an object', () => {
      expect(typeof generate.builder).toBe('object');
    });
  });

  describe('handler', () => {
    test('should export property', () => {
      expect(generate.handler).toBeTruthy();
    });

    test('should export a function', () => {
      expect(generate.handler).toBeInstanceOf(Function);
    });
  });
});
