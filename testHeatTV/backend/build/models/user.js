"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    provider: {
        type: String,
        required: true,
    },
    providerId: {
        type: String,
        required: true,
        unique: true,
    },
    displayName: {
        type: String,
        minLength: 1,
        default: 'Anonymous',
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        validate: {
            validator: (email) => {
                const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
                return regex.test(email);
            },
            message: 'Please use a valid email',
        },
    },
    photoUrl: {
        type: String,
        trim: true,
    },
    shows: {
        type: [
            {
                type: String,
            },
        ],
        default: [],
    },
});
const User = mongoose_1.default.model('User', schema);
exports.default = User;
