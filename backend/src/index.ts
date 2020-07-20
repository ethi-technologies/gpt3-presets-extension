import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { typeDefs, resolvers } from './schema';


const startServer = async () => {
    const app = express();

    const loggingMiddleware = (req, res, next) => {
      console.log('ip:', req.ip);
      next();
    }

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        engine: {
          apiKey: process.env.APOLLO_KEY,
          reportSchema: true
        },
        introspection: true,
        playground: true
    });

    app.use(loggingMiddleware);
    server.applyMiddleware({ app });
    const port = process.env.PORT || 4000;
    const url = `http://localhost:${port}${server.graphqlPath}`

    app.listen({ port:port }, () =>
        console.log(`🚀 Server ready at ${url}`)
    )
}

startServer();
