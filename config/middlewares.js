const path = require('path');

module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'script-src': ["'self'", "'unsafe-eval'", '*.googleapis.com', '*.gstatic.com'],
          'img-src': ["'self'", 'data:', 'strapi.io', 'maps.gstatic.com', '*.googleapis.com', '*.ggpht.com'],
        },
      }
    },
  },
  { resolve: path.resolve(__dirname, '../src/middlewares/admin-redirect.js') },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
