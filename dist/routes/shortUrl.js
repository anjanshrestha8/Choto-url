"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const url_controller_1 = require("../controller/url.controller");
const router = express_1.default.Router();
router.post("/short", url_controller_1.createUrl);
router.get("/short/:id", url_controller_1.getUrl);
exports.default = router;
