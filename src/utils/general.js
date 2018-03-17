// Using the formula suggested here: https://github.com/GoogleChrome/lighthouse/blob/202d04b3359526cbe49531f03c61258002da073c/lighthouse-core/lib/emulation.js#L43
// Seems there is disagreement on the formulas: https://stackoverflow.com/questions/5824661/1-mbit-bytes
const megabitsToBytes = megabits => (megabits * 1024 * 1024) / 8;

module.exports = {
  megabitsToBytes
};
