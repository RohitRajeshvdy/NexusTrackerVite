function filterAnimeJSONData(FullData) {
  const anime = FullData.data;

  return {
    mal_id: anime.mal_id,
    mal_url: anime.url,
    image: anime.images?.webp?.image_url || anime.images?.jpg?.image_url || "",
    title: anime.title || anime.title_english || "Unknown Title",
    type: anime.type,
    source: anime.source,
    episodes: anime.episodes,
    status: anime.status,
    airing: anime.airing,
    aired: anime.aired?.string || "Unknown",
    duration: anime.duration,
    pg_rating: anime.rating,
    score: anime.score,
    synopsis: anime.synopsis,
    season: anime.season,
    year: anime.year,
    studios: anime.studios,
    genres: anime.genres,
    themes: anime.themes,
    demographics: anime.demographics,
    explicit_genres: anime.explicit_genres,
    pagination: FullData.pagination,
  };
}

module.exports = { filterAnimeJSONData };
