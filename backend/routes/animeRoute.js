const express = require("express");
const router = express.Router();
const {
  getAnimeSearch,
  currentSeason,
  getFullAnimeDetail,
} = require("../controllers/animeController");

router.get("/search", getAnimeSearch);
router.get("/currentSeason", currentSeason);
router.get("/:id", getFullAnimeDetail);

module.exports = router;
