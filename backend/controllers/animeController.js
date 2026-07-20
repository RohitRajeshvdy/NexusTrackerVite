const { filterAnimeJSONData } = require("../models/animeModel.js");

const getAnimeSearch = async (req, res) => {
  try {
    const animeName = req.query.q;
    const page = req.query.page || 1;

    if (!animeName) {
      return res.status(400).json({ error: "Type something to search" });
    }

    const sanitizedQuery = encodeURIComponent(animeName);
    const tenraiURL = `https://api.tenrai.org/v1/anime?q=${sanitizedQuery}&page=${page}`;

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

    const filteredData = FullJSON.data.map((anime) => {
      return {
        mal_id: anime.mal_id,
        title: anime.title || anime.title_english,
        image:
          anime.images?.webp?.image_url || anime.images?.jpg?.image_url || "",
        genres: anime.genres || [],
      };
    });

    res.json({
      data: filteredData,
      pagination: FullJSON.pagination || null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong fetching anime data" });
  }
};

const currentSeason = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await fetch(
      `https://api.tenrai.org/v1/seasons/now?page=${page}`,
    );

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

    const filteredData = data.data.map((anime) => {
      return {
        mal_id: anime.mal_id,
        title: anime.title || anime.title_english,
        image:
          anime.images?.webp?.image_url || anime.images?.jpg?.image_url || "",
        genres: anime.genres || [],
      };
    });

    res.json({
      data: filteredData,
      pagination: data.pagination || null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong fetching anime data" });
  }
};

const getFullAnimeDetail = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Cannot find ID" });
  }
  try {
    const response = await fetch(`https://api.tenrai.org/v1/anime/${id}/full`);

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

    const filteredData = filterAnimeJSONData(data);
    res.json(filteredData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong fetching anime data" });
  }
};

module.exports = { getAnimeSearch, currentSeason, getFullAnimeDetail };
