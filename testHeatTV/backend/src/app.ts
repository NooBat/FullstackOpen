import MongoStore from 'connect-mongo';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { v5 as uuid } from 'uuid';

import { passportConfig } from './auth/google';
import authRouter from './routes/login';

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
    genid: () => uuid('sessionID', process.env.NAMESPACE_SECRET as string),
    secret:
      process.env.NODE_ENV === 'production'
        ? (process.env.SESSION_SECRET as string)
        : 'not a secret',
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI as string }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      httpOnly: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passportConfig();

app.use(authRouter);

export default app;
