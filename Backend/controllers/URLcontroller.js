import crypto from "crypto";
import Url from "../models/URLmodel.js";
import { nextPrime } from "../utils/primes.js";
import { encodeBase62 } from "../utils/base62.js";

export const shortenUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ msg: "Long URL required" });

    let n = await Url.countDocuments();
    let L = nextPrime(n);

    const hash = crypto.createHash("sha256").update(longUrl).digest("hex");
    let base62 = encodeBase62(hash);

    let candidate = base62.substring(0, L);

    let existing = await Url.findOne({ shortCode: candidate });
    let attempts = 0;
    while (existing && existing.longUrl !== longUrl && attempts < 5) {
      L = nextPrime(L);
      candidate = base62.substring(0, L);
      existing = await Url.findOne({ shortCode: candidate });
      attempts++;
    }

    if (existing && existing.longUrl === longUrl) {
      return res.json({ shortCode: existing.shortCode });
    }

    const newUrl = new Url({ longUrl, shortCode: candidate });
    await newUrl.save();

    res.json({ shortCode: newUrl.shortCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });
    if (!url) return res.status(404).json({ msg: "URL not found" });
    res.redirect(url.longUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
