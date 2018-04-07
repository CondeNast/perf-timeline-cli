const sinon = require('sinon');

const die = require('../../../src/utils/die');
const general = require('../../../src/utils/general');

const sandbox = sinon.createSandbox();

describe('src/utils/general', () => {
  describe('megabitsToBytes', () => {
    test('should convert number to correct value', () => {
      const megabits = 1.6;
      const actual = general.megabitsToBytes(megabits);
      const expected = 209715.2;
      expect(actual).toBe(expected);
    });
  });

  describe('isJson', () => {
    describe('valid JSON cases', () => {
      test('should be true when empty object is passed', () => {
        const item = {};
        const expected = true;
        const actual = general.isJson(item);
        expect(actual).toBe(expected);
      });

      test('should be true when non empty object is passed', () => {
        const item = { foo: 'bar' };
        const expected = true;
        const actual = general.isJson(item);
        expect(actual).toBe(expected);
      });
    });

    describe('invalid JSON cases', () => {
      test('should be false when an empty string is passed', () => {
        const item = '';
        const expected = false;
        const actual = general.isJson(item);
        expect(actual).toBe(expected);
      });

      test('should be false when a number is passed', () => {
        const item = 5;
        const expected = false;
        const actual = general.isJson(item);
        expect(actual).toBe(expected);
      });
    });
  });

  describe('maybeStringToJson', () => {
    let dieStub;

    beforeEach(() => {
      dieStub = sandbox.stub(die, 'die');
    });

    afterEach(() => {
      sandbox.restore();
    });

    test('should return input if it is an empty js object', () => {
      const item = {};
      const expected = item;
      const actual = general.maybeStringToJson(item);
      expect(actual).toBe(expected);
    });

    test('should return input if it is a js object', () => {
      const item = { foo: 'bar' };
      const expected = item;
      const actual = general.maybeStringToJson(item);
      expect(actual).toBe(expected);
    });

    test('should die when passed non-JSON string', () => {
      const item = 'foo';
      general.maybeStringToJson(item);
      expect(dieStub.calledOnce).toBe(true);
    });

    test('should die when passed number', () => {
      const item = 10;
      general.maybeStringToJson(item);
      expect(dieStub.calledOnce).toBe(true);
    });

    test('should return js object when JSON string is passed', () => {
      const item = '{"test":"value"}';
      const expected = JSON.parse(item);
      const actual = general.maybeStringToJson(item);
      expect(actual).toEqual(expected);
    });

    test('should return value when JSON string contains non-string key', () => {
      const item = '{test:"value"}';
      general.maybeStringToJson(item);
      expect(dieStub.calledOnce).toBe(true);
    });

    test('should return value when JSON string contains badly quoted key', () => {
      const item = '{\'test\':"value"}';
      general.maybeStringToJson(item);
      expect(dieStub.calledOnce).toBe(true);
    });
  });
});
