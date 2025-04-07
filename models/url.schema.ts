import mongoose from "mongoose";
import { nanoid } from "nanoid";
interface IUrl extends Document {
  longUrl: string;
  shortUrl: string;
  expiryDate: Date;
  clicks: number;
}

const urlSchema = new mongoose.Schema<IUrl>(
  {
    longUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      default: () => nanoid().substring(0, 10),
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
  },
  { timestamps: true }
);
const urlModel = mongoose.model<IUrl>("Url", urlSchema);
export default urlModel;
