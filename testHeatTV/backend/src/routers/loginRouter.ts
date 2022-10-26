import express from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import { Show } from '../types';

const router = express.Router();

interface Payload extends jwt.JwtPayload {
  name?: string;
  picture?: string;
  iss?: string;
  aud?: string;
  email?: string;
  firebase: {
    identities: {
      [key: string]: [string];
    };
  };
  sign_in_provider?: string;
}

router.post('/login', async (req, res) => {
  if (!req.body || !req.body.token) {
    return res.status(404).send({ message: 'No Token Found' });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { token } = req.body;
  const payload = jwt.decode(token) as Payload;

  if (!payload.sub) {
    return res.status(404).send({ message: 'Invalid Token' });
  }

  let user;

  try {
    user = await User.findOne({
      provider: 'google.com',
      providerId: payload.firebase.identities['google.com'][0],
    });

    if (!user) {
      user = new User({
        provider: 'google.com',
        providerId: payload.firebase.identities['google.com'][0],
        photoUrl: payload.picture,
        displayName: payload.name,
        email: payload.email,
        shows: [],
      });

      await user.save();
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({ message: error.message });
    }
  }
  if (user) {
    req.session.user = {
      id: user.id as string,
      provider: user.provider,
      providerId: user.providerId,
      displayName: user.displayName,
      photoUrl: user.photoUrl,
      email: user.email,
      shows: user.shows as Show[],
    };
    req.session.save();
  }

  return res.status(200).json(user);
});

export default router;
