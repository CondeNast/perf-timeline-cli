const yargs = require('yargs');

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
    test('should return true', () => {
      const output = cli.parse('generate url --ignore-https-errors');
      expect(output.ignoreHttpsErrors).toBe(true);
    });

    test('should be false by default', () => {
      const output = cli.parse('generate url');
      expect(output.ignoreHttpsErrors).toBe(false);
    });

    test('should be false when the no variant is passed', () => {
      const output = cli.parse('generate url --no-ignore-https-errors');
      expect(output.ignoreHttpsErrors).toBe(false);
    });
  });
});
