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
    firstName: {
        type: String,
        required: true,
        minLength: 2,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
    },
    displayName: {
        type: String,
        required: true,
        minLength: 2,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate: {
            validator: (email) => {
                const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
                return regex.test(email);
            },
            message: 'Please use an appropriate email',
        },
    },
    photoUrl: {
        type: String,
        trim: true,
        required: true,
    },
});
const User = mongoose_1.default.model('User', schema);
exports.default = User;
