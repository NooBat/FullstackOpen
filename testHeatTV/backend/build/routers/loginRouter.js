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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body || !req.body.token) {
        return res.status(404).send({ message: 'No Token Found' });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { token } = req.body;
    const payload = jsonwebtoken_1.default.decode(token);
    if (!payload.sub) {
        return res.status(404).send({ message: 'Invalid Token' });
    }
    let user;
    try {
        user = yield user_1.default.findOne({
            provider: 'google.com',
            providerId: payload.firebase.identities['google.com'][0],
        });
        if (!user) {
            user = new user_1.default({
                provider: 'google.com',
                providerId: payload.firebase.identities['google.com'][0],
                photoUrl: payload.picture,
                displayName: payload.name,
                email: payload.email,
                shows: [],
            });
            yield user.save();
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).send({ message: error.message });
        }
    }
    if (user) {
        req.session.user = {
            id: user.id,
            provider: user.provider,
            providerId: user.providerId,
            displayName: user.displayName,
            photoUrl: user.photoUrl,
            email: user.email,
            shows: user.shows,
        };
        req.session.save();
    }
    return res.status(200).json(user);
}));
exports.default = router;
