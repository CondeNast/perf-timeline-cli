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

/**
 * Determine if value if valid JSON.
 *
 * Ref: https://stackoverflow.com/a/33369954
 *
 * @param {*} item - Value to test.
 * @returns {bool} Whether or not the value is parsable JSON.
 */
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

/**
 * Convert value to JSON if possible.
 *
 * The main purpose of this function is turning JSON-like data into a JavaScript object for use as
 * args. It enables users to pass in a JSON string as input and allow for conversion to an object
 * to be used as an argument.
 *
 * @param {*} value - Value to convert to a JS object.
 * @returns {object} The input value converted to a JS object.
 */
const maybeStringToJson = (value) => {
  const { die } = dieModule;
  let result = value;

  // If the value is a JSON-like JS object, it can be returned early
  if (isJson(value) && typeof value === 'object') {
    return result;
  }

  try {
    // If it parses into a JS object, it is JSON-like enough to use
    result = JSON.parse(value);

    if (typeof result !== 'object') {
      throw new Error('string cannot be converted to object');
    }
  } catch (err) {
    die(err);
  }

  return result;
};

module.exports = {
  isJson,
  maybeStringToJson,
  megabitsToBytes
};
