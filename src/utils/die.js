const { logger } = require('./logger');

const die = (err, browser) => {
  if (err) {
    logger.error(err);
  }

  if (browser && browser.constructor && browser.constructor.name === 'Browser') {
    browser.close();
  }

  process.exit(1);
};

module.exports = {
  die
};
