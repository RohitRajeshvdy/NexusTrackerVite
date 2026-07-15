const express = require("express");
const router = express.Router();
const {
  getMangaSearch,
  getTopManga,
  getFullMangaDetail,
} = require("../controllers/mangaController");

router.get("/search", getMangaSearch);
router.get("/topManga", getTopManga);
router.get("/:id", getFullMangaDetail);

module.exports = router;
