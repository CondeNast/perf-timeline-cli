const { builder } = require('../../../../../src/commands/generate/builder');

describe('src/commands/generate/builder', () => {
  test('should export options with required properties', () => {
    Object.keys(builder).forEach((option) => {
      expect(builder[option]).toHaveProperty('default');
      expect(builder[option]).toHaveProperty('type');
      expect(builder[option]).toHaveProperty('describe');
      expect(builder[option]).toHaveProperty('group');

      if (builder[option].coerce) {
        expect(builder[option].coerce).toBeInstanceOf(Function);
      }
    });
  });
});
