const { filterMangaJSONData } = require("../models/mangaModel.js");

const getMangaSearch = async (req, res) => {
  try {
    const mangaName = req.query.q;

    // Fixed !mangaName condition
    if (!mangaName) {
      return res.status(400).json({ error: "Type something to search" });
    }

    const sanitizedQuery = encodeURIComponent(mangaName);
    const tenraiURL = `https://api.tenrai.org/v1/manga?q=${sanitizedQuery}`;

    const tenraiResponse = await fetch(tenraiURL);

    if (!tenraiResponse.ok) {
      const errorPayload = await tenraiResponse.json().catch(() => ({}));
      console.error("tenrai upstream failure:", errorPayload);
      return res.status(tenraiResponse.status).json({
        error:
          errorPayload.message ||
          "tenrai API is currently having trouble connecting to MyAnimeList.",
      });
    }

    const FullJSON = await tenraiResponse.json();

    if (!FullJSON.data) {
      return res.json([]);
    }

    const filteredData = FullJSON.data.map((manga) => {
      return {
        mal_id: manga.mal_id,
        title: manga.title || manga.title_english,
        image:
          manga.images?.webp?.image_url || manga.images?.jpg?.image_url || "",
        genres: manga.genres || [],
      };
    });

    res.json(filteredData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong fetching manga data" });
  }
};

const getTopManga = async (req, res) => {
  try {
    const response = await fetch("https://api.tenrai.org/v1/top/manga");

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({}));
      console.error("tenrai upstream failure:", errorPayload);
      return res.status(response.status).json({
        error:
          errorPayload.message ||
          "tenrai API is currently having trouble connecting to MyAnimeList.",
      });
    }

    const data = await response.json();

    if (!data.data) {
      return res.json([]);
    }

    const filteredData = data.data.map((manga) => {
      return {
        mal_id: manga.mal_id,
        title: manga.title || manga.title_english,
        image:
          manga.images?.webp?.image_url || manga.images?.jpg?.image_url || "",
        genres: manga.genres || [],
      };
    });

    res.json(filteredData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong fetching manga data" });
  }
};

const getFullMangaDetail = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Cannot find ID" });
  }
  try {
    const response = await fetch(`https://api.tenrai.org/v1/manga/${id}/full`);

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({}));
      console.error("tenrai upstream failure:", errorPayload);
      return res.status(response.status).json({
        error:
          errorPayload.message ||
          "tenrai API is currently having trouble connecting to MyAnimeList.",
      });
    }

    const data = await response.json();

    if (!data.data) {
      return res.json([]);
    }

    const filteredData = filterMangaJSONData(data);
    res.json(filteredData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong fetching anime data" });
  }
};

module.exports = { getMangaSearch, getTopManga, getFullMangaDetail };
