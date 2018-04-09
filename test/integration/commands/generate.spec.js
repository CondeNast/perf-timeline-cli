const yargs = require('yargs');

const { bool } = require('../../helper/args');

const { builder, command, desc } = require('../../../src/commands/generate');
const { handler } = require('../../helper/test-handler');

// Set up the fake test command
const testCommand = {
  builder,
  command,
  desc,
  handler
};

const cli = yargs.command(testCommand);

describe.only('src/commands/generate', () => {
  describe('ignore-https-errors', () => {
    bool(cli, 'ignore-https-errors');
  });
});
