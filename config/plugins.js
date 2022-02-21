module.exports = {
    //
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
  };