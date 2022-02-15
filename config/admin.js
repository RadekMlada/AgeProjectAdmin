module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'd6c4dcbd3bc1b9eaee2778d6232f848b'),
  },
});
