import { NextFunction, Request, Response } from 'express';

import { firebaseAdmin } from '../config/firebase-config';
import User from '../models/user';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization
    ? req.headers.authorization
    : null;

  if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
    const token = authHeader.split(' ')[1];

    let firebaseUser;
    try {
      firebaseUser = await firebaseAdmin.auth().verifyIdToken(token);

      if (!firebaseUser) {
        return res.status(401).end();
      }

      const user = await User.findOne({ providerId: firebaseUser.uid });

      if (!user) {
        return res.status(401).end();
      }

      req.user = {
        id: user.id as string,
        provider: user.provider,
        providerId: user.providerId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
        photoUrl: user.photoUrl,
      };

      next();
    } catch (err) {
      res.status(401).end();
    }
  }
}
