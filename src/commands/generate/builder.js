const { megabitsToBytes } = require('../../utils/general');

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
  'ignore-https-errors': {
    default: false,
    type: 'boolean',
    describe: 'Whether to ignore HTTPS errors during navigation',
    group: 'Launch'
  },
  headless: {
    default: true,
    type: 'boolean',
    describe: 'Whether to run browser in headless mode',
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
  },
  // Page.set-viewport
  'page.set-viewport.width': {
    default: 800,
    type: 'number',
    describe: 'Page width in pixels',
    group: 'Page'
  },
  'page.set-viewport.height': {
    default: 600,
    type: 'number',
    describe: 'Page height in pixels',
    group: 'Page'
  },
  'page.set-viewport.deviceScaleFactor': {
    default: 1,
    type: 'number',
    describe: 'Specify device scale factor (can be thought of as dpr). Defaults to 1',
    group: 'Page'
  },
  'page.set-viewport.isMobile': {
    default: false,
    type: 'boolean',
    describe: 'Whether the meta viewport tag is taken into account. Defaults to false',
    group: 'Page'
  },
  'page.set-viewport.hasTouch': {
    default: false,
    type: 'boolean',
    describe: 'Specifies if viewport supports touch events.',
    group: 'Page'
  },
  'page.set-viewport.isLandscape': {
    default: false,
    type: 'boolean',
    describe: 'Specifies if viewport is in landscape mode.',
    group: 'Page'
  }
};

module.exports = {
  builder: OPTIONS
};
