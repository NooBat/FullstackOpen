import http from 'http';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import app from './app';
import { schema } from './schema';
import { Context } from './types';

dotenv.config();

async function startApolloServer() {
  mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() => {
      console.log('🎉 Connected to MongoDB');
    })
    .catch((error) => {
      console.log('❌ Error connecting to MongoDB:', error.message);
    });

  const httpServer = http.createServer(app);

  const server = new ApolloServer<Context>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(
    expressMiddleware<Context>(server, {
      context: async ({ req, res }): Promise<Context> => ({
        getUser: () => req.session.user,
        logout: () => {
          req.session.destroy((err) => {
            if (err) {
              console.log(err);
            } else {
              res.redirect('/');
            }
          });
        },
        getSession: () => req.session,
      }),
    })
  );

  const PORT = process.env.PORT || 4000;
  await new Promise<void>((resolve) => {
    httpServer.listen({ port: PORT }, resolve);
  });

  console.log(
    '🚀 Server ready at',
    process.env.NODE_ENV === 'production'
      ? 'https://'
      : 'http://localhost:4000/'
  );
}

startApolloServer();
