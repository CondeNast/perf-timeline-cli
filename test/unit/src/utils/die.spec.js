const sinon = require('sinon');

const { die } = require('../../../../src/utils/die');
const logger = require('../../../../src/utils/logger');

const sandbox = sinon.createSandbox();

describe('src/utils/die', () => {
  let exitStub;
  let loggerErrorStub;

  beforeEach(() => {
    exitStub = sandbox.stub(process, 'exit');
    loggerErrorStub = sandbox.stub(logger.logger, 'error');
  });

  afterEach(() => {
    sandbox.restore();
  });

  test('should call process.exit', () => {
    die();
    expect(exitStub.calledOnce).toBe(true);
  });

  test('should call process.exit with correct args', () => {
    die();
    expect(exitStub.calledOnceWith(1)).toBe(true);
  });

  test('should call not call logger.error if err is not set', () => {
    die();
    expect(loggerErrorStub.notCalled).toBe(true);
  });

  test('should call logger.error when an error is passed', () => {
    die('foo');
    expect(loggerErrorStub.calledOnce).toBe(true);
  });

  test('should call logger.error when an error is passed with the right args', () => {
    const err = 'foo';
    die(err);
    expect(loggerErrorStub.calledOnceWith(err)).toBe(true);
  });

  test('should call browser.close when browser object is not a browser', () => {
    const fakeBrowser = {
      close: sandbox.stub()
    };
    die(null, fakeBrowser);
    expect(fakeBrowser.close.notCalled).toBe(true);
  });

  test('should call logger.error when an error is passed', () => {
    class Browser {
      close() {} // eslint-disable-line class-methods-use-this
    }
    const closeStub = sandbox.stub(Browser.prototype, 'close');

    die('foo', new Browser());
    expect(closeStub.calledOnce).toBe(true);
  });
});
