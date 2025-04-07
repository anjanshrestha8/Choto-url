import express from "express";
import urlModel from "../models/url.schema";

export const createUrl = async (
  request: express.Request,
  response: express.Response
): Promise<any> => {
  try {
    const { longUrl } = request.body;
    console.log(longUrl);
    const shortUrls = await urlModel.findOne({ longUrl });
    console.log("existingdata", shortUrls);
    if (shortUrls) {
      return response.render("index", { shortUrls: shortUrls });
    }

    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 5);

    const shortUrl = await urlModel.create({ longUrl, expiryDate });

    await shortUrl.save();
    console.log("asfasf", shortUrl);
    response.redirect("/");
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ message: "Something went wrong!!!!", error: error });
  }
};
