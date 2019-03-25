const camelCase = require('camelcase');

const bool = (cli, name) => {
  let camel;

  beforeEach(() => {
    camel = camelCase(name);
  });

  test('should return true', () => {
    const output = cli.parse(`generate url --${name}`);
    expect(output[name]).toBe(true);
    expect(output[camel]).toBe(true);
  });

  test('should be false by default', () => {
    const output = cli.parse('generate url');
    expect(output[name]).toBe(false);
    expect(output[camel]).toBe(false);
  });

  test('should be false when the no variant is passed', () => {
    const output = cli.parse(`generate url --no-${name}`);
    expect(output[name]).toBe(false);
    expect(output[camel]).toBe(false);
  });
};

module.exports = {
  bool
};
