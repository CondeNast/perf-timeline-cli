const puppeteer = require('puppeteer');

const client = require('../../utils/client');
const dieModule = require('../../utils/die');

const internals = {};

internals.generate = async (url = '', options = {}) => {
  const { die } = dieModule;
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: options.ignoreHTTPSErrors,
    headless: options.headless,
    executablePath: options.executablePath,
    slowMo: options.slowMo,
    args: options.args,
    ignoreDefaultArgs: options.ignoreDefaultArgs,
    handleSIGINT: options.handleSigint,
    handleSIGTERM: options.handleSigterm,
    handleSIGHUP: options.handleSighup,
    timeout: options.timeout,
    dumpio: options.dumpio
  });
  const page = await browser.newPage();

  if (options.emulateNetworkConditions === true) {
    const command = client.buildCommand('NETWORK', 'EMULATE_NETWORK_CONDITIONS');

    try {
      await client.send(page, command, {
        offline: options.offline,
        latency: options.latency,
        downloadThroughput: options.downloadThroughput,
        uploadThroughput: options.uploadThroughput,
        connectionType: options.connectionType
      });
    } catch (err) {
      die(err, browser);
    }
  }

  if (options.setCpuThrottlingRate === true) {
    const command = client.buildCommand('EMULATION', 'SET_CPU_THROTTLING_RATE');

    try {
      await client.send(page, command, {
        rate: options.rate
      });
    } catch (err) {
      die(err, browser);
    }
  }

  const tracingStartOptions = {
    path: options.path,
    screenshots: options.screenshots
  };

  // Don't override Puppeteer's default unless explicitly called for. The default categories is a
  // very long array and by passing nothing, we automatically inherit it.
  if (options.categories && options.categories.length > 0) {
    tracingStartOptions.categories = options.categories;
  }

  await page.tracing.start(tracingStartOptions);

  try {
    await page.goto(url, {
      timeout: options.timeout,
      waitUntil: options.waitUntil
    });
  } catch (err) {
    die(err, browser);
  }

  await page.tracing.stop();
  await browser.close();
};

const handler = (argv = {}) => {
  const options = Object.assign({}, argv);
  const { url } = options;
  delete options.url;
  internals.generate(url, options);
};

module.exports = {
  __internals__: internals,
  handler
};
