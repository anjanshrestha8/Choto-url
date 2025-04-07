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
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const shortUrl_1 = __importDefault(require("./routes/shortUrl"));
const url_schema_1 = __importDefault(require("./models/url.schema"));
dotenv_1.default.config();
mongoose_1.default
    .connect("mongodb+srv://ajnstha2003:anjanshrestha8@url.smuzi0g.mongodb.net/url")
    .then(() => {
    console.log("MongoDb is connected successfully.....");
})
    .catch((error) => {
    console.log("Database not connected....", error);
});
const port = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/api", shortUrl_1.default);
app.get("/:shortUrl", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { shortUrl } = request.params;
    console.log(shortUrl);
    if (!shortUrl)
        return response.status(400).json({ message: "Bad request!!" });
    try {
        const url = yield url_schema_1.default.findOne({ shortUrl });
        console.log(url);
        if (!url || url.expiryDate < new Date()) {
            return response.status(404).send("URL not found or expired.");
        }
        url.clicks += 1;
        yield url.save();
        response.redirect(url.longUrl);
    }
    catch (error) {
        console.log(error);
        response.status(500).json({ message: "iNTERNAL SERVER ERRORE" });
    }
}));
app.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const shortUrls = yield url_schema_1.default.find();
    response.render("index", { shortUrls: shortUrls });
}));
app.listen(port, () => {
    console.log(`Server is running sucessfully at ${port}`);
});
