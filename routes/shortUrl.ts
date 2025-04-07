import express from "express";
import { createUrl, getUrl } from "../controller/url.controller";

const router = express.Router();

router.post("/short", createUrl);
router.get("/short/:id", getUrl);

export default router;
