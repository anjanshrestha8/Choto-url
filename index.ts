import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import shortUrl from "./routes/shortUrl";
import urlModel from "./models/url.schema";
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

app.use("/api", shortUrl);
app.get(
  "/:shortUrl",
  async (
    request: express.Request,
    response: express.Response
  ): Promise<any> => {
    const { shortUrl } = request.params;
    console.log(shortUrl);
    if (!shortUrl)
      return response.status(400).json({ message: "Bad request!!" });
    try {
      const url = await urlModel.findOne({ shortUrl });

      console.log(url);
      if (!url || url.expiryDate < new Date()) {
        return response.status(404).send("URL not found or expired.");
      }

      url.clicks += 1;
      await url.save();

      response.redirect(url.longUrl);
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "iNTERNAL SERVER ERRORE" });
    }
  }
);
app.get("/", async (request: express.Request, response: express.Response) => {
  const shortUrls = await urlModel.find();
  response.render("index", { shortUrls: shortUrls });
});

app.listen(port, () => {
  console.log(`Server is running sucessfully at ${port}`);
});
