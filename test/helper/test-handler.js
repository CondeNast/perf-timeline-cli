/**
 * Passthrough handler that returns the args passed to it.
 *
 * This method allows setting up commands for testing. It ultimately allows for testing that the
 * builder interface produces the correct arguments for the handler. The method simply returns the
 * arguments passed to it. As such, one can compose a test where a command it set up with a builder,
 * this passthrough handler, and args for testing. By testing the the output of the handler, the
 * builder setup can be tested.
 *
 * @param {object} argv - The arguments passed to the command.
 * @returns {object} Passthrough arguments passed to the command.
 */
const handler = argv => argv;

module.exports = {
  handler
};
