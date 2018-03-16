const yargs = require('yargs');

module.exports = yargs
  .commandDir('./commands')
  .demandCommand(1, 'You must enter a command')
  .help()
  .argv;

