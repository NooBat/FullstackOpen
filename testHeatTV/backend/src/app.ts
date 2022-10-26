import MongoStore from 'connect-mongo';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { v5 as uuid } from 'uuid';

import config from './env/config';
import loginRouter from './routers/loginRouter';

const app = express();

app.use(
  '/',
  cors<cors.CorsRequest>({
    origin: ['https://studio.apollographql.com', 'http://localhost:3000'],
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    genid: () => uuid('sessionID', config.NAMESPACE_SECRET as string),
    secret:
      process.env.NODE_ENV === 'production'
        ? config.SESSION_SECRET
        : 'not a secret',
    store: MongoStore.create({ mongoUrl: config.MONGODB_URI }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      httpOnly: false,
    },
  })
);
app.use(loginRouter);

export default app;
