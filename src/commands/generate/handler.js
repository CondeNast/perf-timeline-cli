const puppeteer = require('puppeteer');

const client = require('../../utils/client');

const generate = async (url, options) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  if (options.emulateNetworkConditions === true) {
    await client.send(page, 'Network.emulateNetworkConditions', {
      offline: options.offline,
      latency: options.latency,
      downloadThroughput: options.downloadThroughput,
      uploadThroughput: options.uploadThroughput,
      connectionType: options.connectionType,
    });
  }

  if (options.setCpuThrottlingRate === true) {
    // Note that the case use for CPU in the command name is sensitive
    await client.send(page, 'Emulation.setCPUThrottlingRate', {
      rate: options.rate,
    });
  }

  const tracingStartOptions = {
    path: options.path,
    screenshots: options.screenshots,
  };

  // Don't override Puppeteer's default unless explicitly called for.
  // The default categories is a very long array and by passing nothing,
  // we automatically inherit it.
  if (options.categories.length > 0) {
    tracingStartOptions.categories = options.categories;
  }

  await page.tracing.start(tracingStartOptions);

  try {
    await page.goto(url, {
      timeout: options.timeout,
      waitUntil: options.waitUntil,
    });
  } catch (err) {
    throw (err);
  }

  await page.tracing.stop();
  await browser.close();
};

const handler = (argv) => {
  const { url, ...options } = argv;
  generate(url, options);
};

module.exports = {
  handler,
};
