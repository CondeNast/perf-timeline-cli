const cliLogger = require('cli-logger');

const level = (process.env.NODE_ENV === 'test')
  ? cliLogger.levels.none
  : cliLogger.levels.info;

const logger = cliLogger({
  console: true,
  level,
  src: false
});

module.exports = {
  logger
};
