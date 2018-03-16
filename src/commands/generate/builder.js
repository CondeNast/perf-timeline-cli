const CONNECTION_TYPES = [
  'none',
  'cellular2g',
  'cellular3g',
  'cellular4g',
  'bluetooth',
  'ethernet',
  'wifi',
  'wimax',
  'other',
];

const WAIT_UNTIL_OPTIONS = [
  'load',
  'domcontentloaded',
  'networkidle0',
  'networkidle2',
];

const OPTIONS = {
  // Launch options
  ignoreHttpsErrors: {
    default: false,
    type: 'boolean',
    describe: 'Whether to ignore HTTPS errors during navigation',
    group: 'Launch',
  },
  headless: {
    default: true,
    type: 'boolean',
    describe: 'Whether to run browser in headless mode',
    group: 'Launch',
  },
  devtools: {
    default: false,
    type: 'boolean',
    describe: 'Whether to auto-open a DevTools panel for each tab',
    group: 'Launch',
  },

  // Network emulation options
  emulateNetworkConditions: {
    default: false,
    type: 'boolean',
    describe: 'Emulate network conditions',
    group: 'Emulate Network Conditions',
  },
  offline: {
    default: false,
    type: 'boolean',
    describe: 'Emulate internet disconnect',
    group: 'Emulate Network Conditions',
  },
  latency: {
    default: 0,
    type: 'number',
    describe: 'Network latency',
    group: 'Emulate Network Conditions',
  },
  downloadThroughput: {
    default: 0,
    type: 'number',
    describe: 'Network download speed in mbps',
    group: 'Emulate Network Conditions',
    coerce: val => (val * 1024 * 1024) / 8,
  },
  uploadThroughput: {
    default: 0,
    type: 'number',
    describe: 'Network upload speed in mbps',
    group: 'Emulate Network Conditions',
    coerce: val => (val * 1024 * 1024) / 8,
  },
  connectionType: {
    default: 'none',
    type: 'string',
    describe: 'Emulated connection type',
    choices: CONNECTION_TYPES,
    group: 'Emulate Network Conditions',
  },

  // CPU emulation options
  setCpuThrottlingRate: {
    default: false,
    type: 'boolean',
    describe: 'Whether or not to throttle CPU',
    group: 'CPU Emulation Options',
  },
  rate: {
    default: 0,
    type: 'number',
    describe: 'CPU throttle rate',
    group: 'CPU Emulation Options',
  },

  // Goto options
  waitUntil: {
    default: 'load',
    type: 'string',
    describe: 'How long to wait until stopping the page navigation',
    choices: WAIT_UNTIL_OPTIONS,
    group: 'Goto Options',
  },
  timeout: {
    default: 30 * 1000,
    type: 'number',
    describe: 'How long to wait for the navigation to complete in ms',
    group: 'Goto Options',
  },

  // Tracing options
  path: {
    default: './trace.json',
    type: 'string',
    describe: 'Where to save the file',
    normalize: true,
    group: 'Tracing options',
  },
  screenshots: {
    default: 'false',
    type: 'boolean',
    describe: 'Include screenshots in the trace',
    group: 'Tracing options',
  },
  categories: {
    default: [],
    type: 'array',
    describe: 'Categories to retrieve from the trace',
    group: 'Tracing options',
  },
};

module.exports = {
  builder: OPTIONS,
};
