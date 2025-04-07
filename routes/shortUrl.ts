import express from "express";
import { createUrl } from "../controller/url.controller";

const router = express.Router();

router.post("/short", createUrl);

export default router;
