import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  })
);

router.get(
  '/auth/redirect/google',
  passport.authenticate('google', {
    failureRedirect: '/auth/google',
    failureMessage: true,
  }),
  (req, res) => {
    console.log(req.user, 'in /routes/login.ts');
    req.session.user = req.user;
    return res.status(200).redirect('/');
  }
);

export default router;
