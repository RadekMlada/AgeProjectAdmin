const fs = require('fs');
const path = require('path');

module.exports = (_config, { strapi }) => {
  const redirects = ['ageprojectadmin:1337',
    'ageprojectadmin:1337/', 
    'http://ageprojectadmin:1337',
    'http://ageprojectadmin:1337/', 
    'https://ageprojectadmin:1337',
    'https://ageprojectadmin:1337/', 
    'ageproject.cz/',
    'ageproject.cz',
    'https://ageproject.cz/',
    'https://ageproject.cz',
    '/',
    '/index.html'].map((routePath) => ({
    method: 'GET',
    path: routePath,
    handler: (ctx) => {
      // Read the index.html file
      const filePath = path.resolve(__dirname, '../public/index.html');
      const fileContents = fs.readFileSync(filePath, 'utf8');

      // Set the Content-Type header and send the file contents
      ctx.type = 'html';
      ctx.body = fileContents;
    },
    config: { auth: false },
  }));

  strapi.server.routes(redirects);
};