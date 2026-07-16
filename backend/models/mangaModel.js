// function filterMangaJSONData(FullData) {
//   return FullData.data.map((manga) => ({
//     mal_id: manga.mal_id,
//     mal_url: manga.url,
//     image:
//       manga.images?.webp?.image_url ||
//       manga.images?.jpg?.image_url ||
//       "No Image Found",
//     title: manga.title || manga.title_english || "Unknown Title",
//     type: manga.type,
//     chapters: manga.chapters,
//     volumes: manga.volumes,
//     status: manga.status,
//     publishing: manga.publishing,
//     published: manga.published?.string || "Unknown",
//     score: manga.score,
//     rank:manga.rank,
//     synopsis: manga.synopsis,
//     serializations: manga.serializations,
//     authors: manga.authors,
//     genres: manga.genres,
//     themes: manga.themes,
//     demographics: manga.demographics,
//     relations:manga.relations,
//   }));
// }

// module.exports = { filterMangaJSONData };

function filterMangaJSONData(FullData) {
  const manga = FullData.data;

  return {
    mal_id: manga.mal_id,
    mal_url: manga.url,
    image:
      manga.images?.webp?.image_url ||
      manga.images?.jpg?.image_url ||
      "No Image Found",
    title: manga.title || manga.title_english || "Unknown Title",
    type: manga.type,
    chapters: manga.chapters,
    volumes: manga.volumes,
    status: manga.status,
    publishing: manga.publishing,
    published: manga.published?.string || "Unknown",
    score: manga.score,
    rank: manga.rank,
    synopsis: manga.synopsis,
    serializations: manga.serializations,
    authors: manga.authors,
    genres: manga.genres,
    themes: manga.themes,
    demographics: manga.demographics,
    relations: manga.relations,
    pagination : FullData.pagination,
  };
}

module.exports = { filterMangaJSONData };
