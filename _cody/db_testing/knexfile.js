// Update with your config settings.

const config = require('./config.json');

module.exports = {

  development: {
    client: 'pg',
    connection: config
  },
};
