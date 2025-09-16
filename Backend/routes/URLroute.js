import express from "express";
import { shortenUrl, redirectUrl } from "../controllers/URLcontroller.js";

const router = express.Router();

router.post("/shorten", shortenUrl);
router.get("/r/:shortCode", redirectUrl);

export default router;
