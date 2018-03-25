const { die } = require('./die');

process.on('unhandledRejection', die);
