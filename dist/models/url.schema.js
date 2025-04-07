"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const nanoid_1 = require("nanoid");
const urlSchema = new mongoose_1.default.Schema({
    longUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        default: () => (0, nanoid_1.nanoid)().substring(0, 10),
        unique: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    clicks: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
const urlModel = mongoose_1.default.model("Url", urlSchema);
exports.default = urlModel;
