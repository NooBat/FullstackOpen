"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const uuid_1 = require("uuid");
const config_1 = __importDefault(require("./env/config"));
const loginRouter_1 = __importDefault(require("./routers/loginRouter"));
const app = (0, express_1.default)();
app.use('/', (0, cors_1.default)({
    origin: ['https://studio.apollographql.com', 'http://localhost:3000'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    genid: () => (0, uuid_1.v5)('sessionID', config_1.default.NAMESPACE_SECRET),
    secret: process.env.NODE_ENV === 'production'
        ? config_1.default.SESSION_SECRET
        : 'not a secret',
    store: connect_mongo_1.default.create({ mongoUrl: config_1.default.MONGODB_URI }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        httpOnly: false,
    },
}));
app.use(loginRouter_1.default);
exports.default = app;
