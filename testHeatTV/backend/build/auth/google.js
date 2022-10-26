"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const user_1 = __importDefault(require("../models/user"));
const utils_1 = require("../utils");
dotenv_1.default.config();
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
const passportConfig = () => {
    passport_1.default.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/redirect/google',
        scope: ['profile'],
    }, (_accessToken, _refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        let user;
        try {
            user = yield user_1.default.findOne({ providerId: profile.id });
            if (!user) {
                if (!profile.emails || !profile.name || !profile.photos) {
                    return done('No verified email or name', undefined);
                }
                const verifiedEmail = profile.emails.find((email) => email.verified) ||
                    profile.emails[0];
                user = yield (0, utils_1.createUser)(profile.provider, profile.id, (_a = profile.name) === null || _a === void 0 ? void 0 : _a.givenName, (_b = profile.name) === null || _b === void 0 ? void 0 : _b.familyName, profile.displayName, verifiedEmail.value, profile.photos[0].value);
            }
            return done(null, {
                provider: user.provider,
                providerId: user.providerId,
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                displayName: user.displayName,
                email: user.email,
                photoUrl: user.photoUrl,
            });
        }
        catch (err) {
            if ((0, utils_1.isString)(err)) {
                return done(err, undefined);
            }
            else if (err instanceof Error) {
                return done(err.message, undefined);
            }
        }
        return done(null, undefined);
    })));
    passport_1.default.serializeUser((user, done) => __awaiter(void 0, void 0, void 0, function* () {
        done(null, user.id);
    }));
    passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
        let user;
        try {
            user = yield user_1.default.findById(id);
            if (!user) {
                return done(null, undefined);
            }
            return done(null, {
                provider: user.provider,
                providerId: user.providerId,
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                displayName: user.displayName,
                email: user.email,
            });
        }
        catch (err) {
            if ((0, utils_1.isString)(err)) {
                return done(err, undefined);
            }
            else if (err instanceof Error) {
                return done(err.message, undefined);
            }
        }
        return done(null, undefined);
    }));
};
exports.passportConfig = passportConfig;
