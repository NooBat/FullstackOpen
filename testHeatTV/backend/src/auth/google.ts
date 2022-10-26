import dotenv from 'dotenv';
import passport from 'passport';
import googlePassport from 'passport-google-oauth20';

import User from '../models/user';
import { createUser, isString } from '../utils';

dotenv.config();

const GoogleStrategy = googlePassport.Strategy;

export const passportConfig = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: '/auth/redirect/google',
        scope: ['profile'],
      },
      async (_accessToken, _refreshToken, profile, done) => {
        let user;
        try {
          user = await User.findOne({ providerId: profile.id });
          if (!user) {
            if (!profile.emails || !profile.name || !profile.photos) {
              return done('No verified email or name', undefined);
            }

            const verifiedEmail =
              profile.emails.find((email) => email.verified) ||
              profile.emails[0];

            user = await createUser(
              profile.provider,
              profile.id,
              profile.name?.givenName,
              profile.name?.familyName,
              profile.displayName,
              verifiedEmail.value,
              profile.photos[0].value
            );
          }

          return done(null, {
            provider: user.provider,
            providerId: user.providerId,
            id: user.id as string,
            firstName: user.firstName,
            lastName: user.lastName,
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoUrl,
          } as Express.User);
        } catch (err) {
          if (isString(err)) {
            return done(err, undefined);
          } else if (err instanceof Error) {
            return done(err.message, undefined);
          }
        }

        return done(null, undefined);
      }
    )
  );

  passport.serializeUser(async (user: Express.User, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let user;
    try {
      user = await User.findById(id);
      if (!user) {
        return done(null, null);
      }

      return done(null, {
        provider: user.provider,
        providerId: user.providerId,
        id: user.id as string,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
        email: user.email,
      } as Express.User);
    } catch (err) {
      if (isString(err)) {
        return done(err, undefined);
      } else if (err instanceof Error) {
        return done(err.message, undefined);
      }
    }

    return done(null, undefined);
  });
};
