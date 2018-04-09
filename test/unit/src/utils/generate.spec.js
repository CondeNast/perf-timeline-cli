const general = require('../../../../src/utils/general');

describe('src/utils/general', () => {
  test('should convert number to correct value', () => {
    const megabits = 1.6;
    const actual = general.megabitsToBytes(megabits);
    const expected = 209715.2;
    expect(actual).toBe(expected);
  });
});
