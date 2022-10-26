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
const http_1 = __importDefault(require("http"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const schema_1 = require("./schema");
dotenv_1.default.config();
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default
            .connect(process.env.MONGODB_URI)
            .then(() => {
            console.log('🎉 Connected to MongoDB');
        })
            .catch((error) => {
            console.log('❌ Error connecting to MongoDB:', error.message);
        });
        const httpServer = http_1.default.createServer(app_1.default);
        const server = new server_1.ApolloServer({
            schema: schema_1.schema,
            plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
        });
        yield server.start();
        app_1.default.use((0, express4_1.expressMiddleware)(server, {
            context: ({ req, res }) => __awaiter(this, void 0, void 0, function* () {
                return ({
                    getUser: () => req.session.user,
                    logout: () => {
                        req.session.destroy((err) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.redirect('/');
                            }
                        });
                    },
                });
            }),
        }));
        const PORT = process.env.PORT || 4000;
        yield new Promise((resolve) => {
            httpServer.listen({ port: PORT }, resolve);
        });
        console.log('🚀 Server ready at', process.env.NODE_ENV === 'production'
            ? 'https://'
            : 'http://localhost:4000/');
    });
}
startApolloServer();
