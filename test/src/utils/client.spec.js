const sinon = require('sinon');

const { send } = require('../../../src/utils/client');

const sandbox = sinon.createSandbox();

describe('client', () => {
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

    test('should propogate error when page._client.send throws', async () => {
      page._client.send.throws(new Error());

      try {
        await send(page);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
