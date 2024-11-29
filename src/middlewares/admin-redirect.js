const fs = require('fs');
const path = require('path');

module.exports = (_config, { strapi }) => {
  const redirects = ['/', '/index.html'].map((routePath) => ({
    method: 'GET',
    path: routePath,
    handler: (ctx) => {
      // Read the index.html file
      const filePath = path.resolve(__dirname, '../../public/index.html');
      const fileContents = fs.readFileSync(filePath, 'utf8');

      // Set the Content-Type header and send the file contents
      ctx.type = 'html';
      ctx.body = fileContents;
    },
    config: { auth: false },
  }));

  strapi.server.routes(redirects);
};