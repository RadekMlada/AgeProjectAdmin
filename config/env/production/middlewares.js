module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'script-src': ["'self'", "'unsafe-eval'", 'https://ageproject.radekmlada.com', '*.googleapis.com', '*.gstatic.com'],
          'img-src': ["'self'", 'data:', 'https://ageproject.radekmlada.com', 'strapi.io', 'maps.gstatic.com', '*.googleapis.com', '*.ggpht.com'],
        },
      }
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
