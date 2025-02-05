import express from "express";
import { scrapeColleges } from "../controller/scraper.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const scrapedData = await scrapeColleges();
    res.json(scrapedData);
  } catch (error) {
    res.status(500).json({ message: "Scraping failed", error: error.message });
  }
});

export default router;
