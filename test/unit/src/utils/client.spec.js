const sinon = require('sinon');

const { buildCommand, send } = require('../../../../src/utils/client');

const sandbox = sinon.createSandbox();

describe('client', () => {
  describe('buildCommand', () => {
    test('should return a string if nothing is passed', () => {
      const actual = buildCommand();
      expect(typeof actual).toBe('string');
    });

    test('should return an empty string if nothing is passed', () => {
      const actual = buildCommand();
      expect(actual).toBe('');
    });

    test('should return a string if unknown values are passed', () => {
      const actual = buildCommand('foo', 'bar');
      expect(typeof actual).toBe('string');
    });

    test('should return an empty string if unknown values are passed', () => {
      const actual = buildCommand('foo', 'bar');
      expect(actual).toBe('');
    });

    test('should return the correct string', () => {
      const actual = buildCommand('NETWORK', 'EMULATE_NETWORK_CONDITIONS');
      expect(actual).toBe('Network.emulateNetworkConditions');
    });
  });

  describe('send', () => {
    let page;

    beforeEach(() => {
      page = {
        _client: {
          send: sandbox.stub()
        }
      };
    });

    afterEach(() => {
      sandbox.restore();
    });

    test('should be a function', () => {
      expect(send).toBeInstanceOf(Function);
    });

    test('should call page._client.send', () => {
      send(page);
      expect(page._client.send.calledOnce).toBe(true);
    });

    test('should call page._client.send with correct args', () => {
      const command = 'foo';
      const options = { bar: true };
      send(page, command, options);
      expect(page._client.send.calledOnceWith(command, options)).toBe(true);
    });

    test('should propagate error when page._client.send throws', async () => {
      page._client.send.throws(new Error());

      try {
        await send(page);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
