"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const uuid_1 = require("uuid");
const google_1 = require("./auth/google");
const login_1 = __importDefault(require("./routes/login"));
const app = (0, express_1.default)();
app.use('/', (0, cors_1.default)({
    origin: 'https://studio.apollographql.com',
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    genid: () => (0, uuid_1.v5)('sessionID', process.env.NAMESPACE_SECRET),
    secret: process.env.NODE_ENV === 'production'
        ? process.env.SESSION_SECRET
        : 'not a secret',
    store: connect_mongo_1.default.create({ mongoUrl: process.env.MONGODB_URI }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        httpOnly: false,
    },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, google_1.passportConfig)();
app.use(login_1.default);
exports.default = app;
