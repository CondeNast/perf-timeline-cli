const { maybeStringToJson, megabitsToBytes } = require('../../utils/general');

const CONNECTION_TYPES = [
  'none',
  'cellular2g',
  'cellular3g',
  'cellular4g',
  'bluetooth',
  'ethernet',
  'wifi',
  'wimax',
  'other'
];

const WAIT_UNTIL_OPTIONS = [
  'load',
  'domcontentloaded',
  'networkidle0',
  'networkidle2'
];

const OPTIONS = {
  // Launch options
  'launch-ignore-https-errors': {
    default: false,
    type: 'boolean',
    describe: 'Whether to ignore HTTPS errors during navigation',
    group: 'Launch'
  },
  'launch-headless': {
    default: true,
    type: 'boolean',
    describe: 'Whether to run browser in headless mode',
    group: 'Launch'
  },
  'launch-executable-path': {
    default: null, // Empty string will throw an error in Puppeteer
    type: 'string',
    describe: 'Path to a Chromium or Chrome executable to run instead of the bundled Chromium',
    group: 'Launch'
  },
  'launch-slow-mo': {
    default: 0,
    type: 'number',
    describe: 'Slows down Puppeteer operations by the specified amount of milliseconds',
    group: 'Launch'
  },
  'launch-args': {
    default: [],
    type: 'array',
    describe: 'Additional arguments to pass to the browser instance',
    group: 'Launch'
  },
  'launch-ignore-default-args': {
    default: false,
    type: 'boolean',
    describe: 'Do not use Puppeteer\'s defaultArgs object',
    group: 'Launch'
  },
  'launch-handle-sigint': {
    default: true,
    type: 'boolean',
    describe: 'Close the browser process on Ctrl-C',
    group: 'Launch'
  },
  'launch-handle-sigterm': {
    default: true,
    type: 'boolean',
    describe: 'Close the browser process on SIGTERM',
    group: 'Launch'
  },
  'launch-handle-sighup': {
    default: true,
    type: 'boolean',
    describe: 'Close the browser process on SIGHUP',
    group: 'Launch'
  },
  'launch-timeout': {
    default: 30000,
    type: 'number',
    describe: 'Maximum time in milliseconds to wait for the browser instance to start',
    group: 'Launch'
  },
  'launch-dumpio': {
    default: false,
    type: 'boolean',
    describe: 'Whether to pipe the browser process stdout and stderr into process.stdout and process.stderr',
    group: 'Launch'
  },
  'launch-user-data-dir': {
    default: '',
    type: 'string',
    describe: 'Path to a User Data Directory',
    group: 'Launch'
  },
  'launch-env': {
    default: process.env,
    type: 'string',
    describe: 'Specify environment variables that will be visible to the browser',
    group: 'Launch',
    coerce: maybeStringToJson
  },
  'launch-devtools': {
    default: false,
    type: 'boolean',
    describe: 'Whether to auto-open a DevTools panel for each tab',
    group: 'Launch'
  },
  'launch-pipe': {
    default: false,
    type: 'boolean',
    describe: 'Connects to the browser over a pipe instead of a WebSocket',
    group: 'Launch'
  },

  // Network emulation options
  'emulate-network-conditions': {
    default: false,
    type: 'boolean',
    describe: 'Emulate network conditions',
    group: 'Emulate Network Conditions'
  },
  offline: {
    default: false,
    type: 'boolean',
    describe: 'Emulate internet disconnect',
    group: 'Emulate Network Conditions'
  },
  latency: {
    default: 0,
    type: 'number',
    describe: 'Network latency',
    group: 'Emulate Network Conditions'
  },
  'download-throughput': {
    default: 0,
    type: 'number',
    describe: 'Network download speed in mbps',
    group: 'Emulate Network Conditions',
    coerce: megabitsToBytes
  },
  'upload-throughput': {
    default: 0,
    type: 'number',
    describe: 'Network upload speed in mbps',
    group: 'Emulate Network Conditions',
    coerce: megabitsToBytes
  },
  'connection-type': {
    default: 'none',
    type: 'string',
    describe: 'Emulated connection type',
    choices: CONNECTION_TYPES,
    group: 'Emulate Network Conditions'
  },

  // CPU emulation options
  'set-cpu-throttling-rate': {
    default: false,
    type: 'boolean',
    describe: 'Whether or not to throttle CPU',
    group: 'CPU Emulation Options'
  },
  rate: {
    default: 1,
    type: 'number',
    describe: 'CPU throttle rate',
    group: 'CPU Emulation Options'
  },

  // Goto options
  timeout: {
    default: 30 * 1000,
    type: 'number',
    describe: 'How long to wait for the navigation to complete in ms',
    group: 'Goto Options'
  },
  'wait-until': {
    default: 'load',
    type: 'string',
    describe: 'How long to wait until stopping the page navigation',
    choices: WAIT_UNTIL_OPTIONS,
    group: 'Goto Options'
  },

  // Tracing options
  path: {
    default: './trace.json',
    type: 'string',
    describe: 'Where to save the file',
    normalize: true,
    group: 'Tracing options'
  },
  screenshots: {
    default: 'false',
    type: 'boolean',
    describe: 'Include screenshots in the trace',
    group: 'Tracing options'
  },
  categories: {
    default: [],
    type: 'array',
    describe: 'Categories to retrieve from the trace',
    group: 'Tracing options'
  }
};

module.exports = {
  builder: OPTIONS
};
