const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: '/storage/database/data.db',
    },
    useNullAsDefault: true,
  },
});
