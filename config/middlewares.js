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
  { resolve: '../src/middlewares/admin-redirect' },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
