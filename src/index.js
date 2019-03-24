const yargs = require('yargs');

require('./utils/unhandled-rejection');

module.exports = yargs
  .commandDir('./commands')
  .demandCommand(1, 'You must enter a command')
  .help()
  .argv;
