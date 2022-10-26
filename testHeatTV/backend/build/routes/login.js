"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get('/auth/google', passport_1.default.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
    ],
}));
router.get('/auth/redirect/google', passport_1.default.authenticate('google', {
    failureRedirect: '/auth/google',
    failureMessage: true,
}), (req, res) => {
    req.session.user = req.user;
    res.status(200).redirect('/');
});
exports.default = router;
