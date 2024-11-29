module.exports =  ({ env }) => ({
    "users-permissions": {
      config: {
        jwtSecret: env('JWT_SECRET'),
      }
    },
    graphql: {
      config: {
        endpoint: '/graphql',
        shadowCRUD: true,
        playgroundAlways: false,
        depthLimit: 70,
        amountLimit: 25000,
        apolloServer: {
          tracing: false,
        },
      },
    },
  });