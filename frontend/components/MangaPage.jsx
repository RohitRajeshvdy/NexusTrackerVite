import { useState, useEffect } from "react";
import Grid from "./Grid";
import SearchBar from "./SearchBar";
import "../styles/Pages.css"; // Link styling

export default function MangaPage() {
  const [mangaResult, setMangaResult] = useState([]);
  const [topManga, setTopManga] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  async function fetchManga(searchQuery) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/manga/search?q=${searchQuery}`,
      );
      const data = await response.json();
      setMangaResult(data);
      setHasSearched(true);
    } catch (error) {
      console.error("Error searching manga:", error);
    }
  }

  useEffect(() => {
    async function fetchTopManga() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/manga/topManga",
        );
        const data = await response.json();
        setTopManga(data);
      } catch (error) {
        console.error("Error fetching top manga:", error);
      }
    }
    fetchTopManga();
  }, []);

  return (
    <div className="manga-page-container">
      <SearchBar onSearch={fetchManga} placeholder="Search Manga Title..." />
      <h2>{hasSearched ? "Search Results" : "Top Manga"}</h2>
      <Grid animeList={hasSearched ? mangaResult : topManga} type="manga" />
    </div>
  );
}