import express from "express";
import urlModel from "../models/url.schema";

export const createUrl = async (
  request: express.Request,
  response: express.Response
): Promise<any> => {
  try {
    const { longUrl } = request.body;
    console.log(longUrl);
    const existingUrl = await urlModel.findOne({ longUrl });

    if (existingUrl) {
      return response.render("index", { shortUrl: existingUrl.shortUrl });
    }

    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 5);

    const shortUrl = await urlModel.create({ longUrl, expiryDate });

    await shortUrl.save();

    response.render("index", { shortUrl });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ message: "Something went wrong!!!!", error: error });
  }
};

export const getUrl = async (
  request: express.Request,
  response: express.Request
) => {};
