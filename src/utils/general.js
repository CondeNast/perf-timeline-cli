const dieModule = require('./die');

/**
 * Converts megabits to bytes.
 *
 * This function converts megabits to bytes. Bytes are the input needed for Chrome Headless network
 * throttling APIs. This function allows you to enter megabits and not worry about the conversion.
 * There appear to be different ways to do this conversion (https://stackoverflow.com/questions/5824661/1-mbit-bytes).
 * This function takes its' formula from that used by Lighthouse
 * (https://github.com/GoogleChrome/lighthouse/blob/202d04b3359526cbe49531f03c61258002da073c/lighthouse-core/lib/emulation.js#L43).
 * Since that is used elsewhere in the Lighthouse/Puppeteer/Chrome Headless ecosystem, it is
 * probably the most accurate to use for this project.
 *
 * @param {number} megabits - Megabits value to convert.
 * @returns {number} Megabits represented as bytes.
 */
const megabitsToBytes = megabits => (megabits * 1024 * 1024) / 8;

// h/t https://stackoverflow.com/a/33369954
const isJson = (item) => {
  let value = (typeof item !== 'string') ? JSON.stringify(item) : item;

  try {
    value = JSON.parse(value);
  } catch (e) {
    return false;
  }

  if (typeof value === 'object' && value !== null) {
    return true;
  }

  return false;
};

const maybeStringToJson = (value) => {
  const { die } = dieModule;

  if (isJson(value)) {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch (err) {
    die(err);
  }
};

module.exports = {
  isJson,
  maybeStringToJson,
  megabitsToBytes
};
