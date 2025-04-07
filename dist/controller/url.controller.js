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
exports.createUrl = void 0;
const url_schema_1 = __importDefault(require("../models/url.schema"));
const createUrl = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { longUrl } = request.body;
        console.log(longUrl);
        const shortUrls = yield url_schema_1.default.findOne({ longUrl });
        console.log("existingdata", shortUrls);
        if (shortUrls) {
            return response.render("index", { shortUrls: shortUrls });
        }
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 5);
        const shortUrl = yield url_schema_1.default.create({ longUrl, expiryDate });
        yield shortUrl.save();
        console.log("asfasf", shortUrl);
        response.redirect("/");
    }
    catch (error) {
        console.log(error);
        return response
            .status(500)
            .json({ message: "Something went wrong!!!!", error: error });
    }
});
exports.createUrl = createUrl;
