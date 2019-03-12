const puppeteer = require('puppeteer');
const sinon = require('sinon');

const {
  __internals__: internals,
  handler
} = require('../../../../src/commands/generate/handler');
const client = require('../../../../src/utils/client');
const die = require('../../../../src/utils/die');

const sandbox = sinon.createSandbox();

describe('src/commands/generate/handler', () => {
  describe('generate', () => {
    let puppeteerLaunchStub;
    let page;
    let browser;
    let clientSendStub;
    let dieStub;

    beforeEach(() => {
      page = {
        tracing: {
          start: sandbox.stub().resolves(),
          stop: sandbox.stub().resolves()
        },
        goto: sandbox.stub().resolves(),
        setViewport: sandbox.stub().resolves()
      };
      browser = {
        newPage: sandbox.stub().resolves(page),
        close: sandbox.stub().resolves()
      };
      puppeteerLaunchStub = sandbox.stub(puppeteer, 'launch').resolves(browser);
      clientSendStub = sandbox.stub(client, 'send').resolves();
      dieStub = sandbox.stub(die, 'die');
    });

    afterEach(() => {
      sandbox.restore();
    });

    describe('url with no options', () => {
      const url = 'foo';

      test('should call puppeteer.launch', async () => {
        await internals.generate(url);
        expect(puppeteerLaunchStub.calledOnce).toBe(true);
      });

      test('should create a new page', async () => {
        await internals.generate(url);
        expect(browser.newPage.calledOnce).toBe(true);
      });

      test('should not emulate network conditions', async () => {
        await internals.generate(url);
        expect(clientSendStub.called).toBe(false);
      });

      test('should not emulate cpu conditions', async () => {
        await internals.generate(url);
        expect(clientSendStub.called).toBe(false);
      });

      test('should call page.tracing.start', async () => {
        await internals.generate(url);
        expect(page.tracing.start.calledOnce).toBe(true);
      });

      test('should call page.tracing.start with correct args', async () => {
        const options = {
          path: undefined,
          screenshots: undefined
        };

        await internals.generate(url);
        expect(page.tracing.start.calledOnceWith(options)).toBe(true);
      });

      test('should call page.goto', async () => {
        await internals.generate(url);
        expect(page.goto.calledOnce).toBe(true);
      });

      test('should call page.goto with correct args', async () => {
        const options = {
          timeout: undefined,
          waitUntil: undefined
        };

        await internals.generate(url);
        expect(page.goto.calledOnceWith(url, options)).toBe(true);
      });

      test('should throw an error when page.goto throws', async () => {
        page.goto.throws();
        try {
          await internals.generate(url);
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
        }
      });

      test('should call page.tracing.stop', async () => {
        await internals.generate(url);
        expect(page.tracing.stop.calledOnce).toBe(true);
      });

      test('should call browser.close', async () => {
        await internals.generate(url);
        expect(browser.close.calledOnce).toBe(true);
      });
    });

    describe('url with options', () => {
      const url = 'foo';

      test('should call client.send when emulateNetworkConditions is true', async () => {
        const options = {
          emulateNetworkConditions: true
        };
        await internals.generate(url, options);
        expect(clientSendStub.calledOnce).toBe(true);
      });

      test('should call die when client send throws for the network command', async () => {
        clientSendStub.throws();
        await internals.generate(url, {
          emulateNetworkConditions: true
        });

        expect(clientSendStub.called).toBe(true);
        expect(dieStub.called).toBe(true);
      });

      test('should call client.send with correct args when emulateNetworkConditions is true', async () => {
        const clientSendArgs = {
          offline: 'foo',
          latency: 'bar',
          downloadThroughput: 'biz',
          uploadThroughput: 'baz',
          connectionType: 'ban'
        };
        const options = Object.assign({}, clientSendArgs, {
          emulateNetworkConditions: true
        });
        const command = client.buildCommand('NETWORK', 'EMULATE_NETWORK_CONDITIONS');

        await internals.generate(url, options);
        expect(clientSendStub.calledOnceWith(page, command, clientSendArgs)).toBe(true);
      });

      test('should call client.send when setCpuThrottlingRate is true', async () => {
        const options = {
          setCpuThrottlingRate: true
        };
        await internals.generate(url, options);
        expect(clientSendStub.calledOnce).toBe(true);
      });

      test('should call client.send with correct args when setCpuThrottlingRate is true', async () => {
        const clientSendArgs = {
          rate: 'foo'
        };
        const options = Object.assign({}, clientSendArgs, {
          setCpuThrottlingRate: true
        });
        const command = client.buildCommand('EMULATION', 'SET_CPU_THROTTLING_RATE');

        await internals.generate(url, options);
        expect(clientSendStub.calledOnceWith(page, command, clientSendArgs)).toBe(true);
      });

      test('should call die when client send throws for the cpu command', async () => {
        clientSendStub.throws();
        await internals.generate(url, {
          setCpuThrottlingRate: true
        });

        expect(clientSendStub.called).toBe(true);
        expect(dieStub.called).toBe(true);
      });

      test('should call page.tracing.start with correct args', async () => {
        const options = {
          path: 'foo',
          screenshots: 'bar'
        };

        await internals.generate(url, options);
        expect(page.tracing.start.calledOnceWith(options)).toBe(true);
      });

      test('should call page.tracing.start with correct args when categories are passed', async () => {
        const options = {
          path: 'foo',
          screenshots: 'bar',
          categories: [
            'baz'
          ]
        };

        await internals.generate(url, options);
        expect(page.tracing.start.calledOnceWith(options)).toBe(true);
      });

      test('should call page.tracing.start with correct args when categories is empty', async () => {
        const tracingStartArgs = {
          path: 'foo',
          screenshots: 'bar'
        };
        const options = Object.assign({}, tracingStartArgs, {
          categories: []
        });

        await internals.generate(url, options);
        expect(page.tracing.start.calledOnceWith(tracingStartArgs)).toBe(true);
      });

      test('should call page.goto with correct args', async () => {
        const options = {
          timeout: 'foo',
          waitUntil: 'bar'
        };

        await internals.generate(url, options);
        expect(page.goto.calledOnceWith(url, options)).toBe(true);
      });

      test('should set page viewport with correct args', async () => {
        const viewportOptions = {
          width: 320,
          height: 568,
          isMobile: false,
          hasTouch: false,
          isLandscape: false
        };
        const options = {
          page: {
            'set-viewport': viewportOptions
          }
        };

        await internals.generate(url, options);
        expect(page.setViewport.calledOnceWith(viewportOptions)).toBe(true);
      });

      test('should call die when client set page view port throws an error', async () => {
        page.setViewport.throws();
        await internals.generate(url, {
          page: {
            'set-viewport': {}
          }
        });

        expect(page.setViewport.called).toBe(true);
        expect(dieStub.called).toBe(true);
      });
    });
  });

  describe('handler', () => {
    let generateStub;

    beforeEach(() => {
      generateStub = sandbox.stub(internals, 'generate');
    });

    afterEach(() => {
      sandbox.restore();
    });

    test('should call generate', () => {
      handler();
      expect(generateStub.calledOnce).toBe(true);
    });

    test('should call generate with correct args', () => {
      const url = 'foo';
      const option1 = 'bar';
      const option2 = 'biz';

      const args = { url, option1, option2 };

      handler(args);
      expect(generateStub.calledOnceWith(url, { option1, option2 })).toBe(true);
    });
  });
});
