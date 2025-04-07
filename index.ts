import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import shortUrl from "./routes/shortUrl";
dotenv.config();

mongoose
  .connect(
    "mongodb+srv://ajnstha2003:anjanshrestha8@url.smuzi0g.mongodb.net/url"
  )
  .then(() => {
    console.log("MongoDb is connected successfully.....");
  })
  .catch((error) => {
    console.log("Database not connected....", error);
  });

const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/api", shortUrl);

app.listen(port, () => {
  console.log(`Server is running sucessfully at ${port}`);
});
