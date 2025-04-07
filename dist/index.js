"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const shortUrl_1 = __importDefault(require("./routes/shortUrl"));
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
app.get("/", (req, res) => {
    res.render("index");
});
app.use("/api", shortUrl_1.default);
app.listen(port, () => {
    console.log(`Server is running sucessfully at ${port}`);
});
