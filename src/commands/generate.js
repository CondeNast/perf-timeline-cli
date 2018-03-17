const { builder } = require('./generate/builder');
const { handler } = require('./generate/handler');

module.exports = {
  command: 'generate <url>',
  desc: 'Generate a timeline',
  builder,
  handler
};
