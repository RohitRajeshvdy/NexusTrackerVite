import { useState, useEffect } from "react";
import Grid from "./Grid";
import SearchBar from "./SearchBar";
import "../styles/Pages.css"; // Link styling

export default function AnimePage() {
  const [animeResult, setAnimeResult] = useState([]);
  const [currentSeason, setCurrentSeason] = useState([]);

  async function fetchAnime(searchQuery) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/anime/search?q=${searchQuery}`,
      );
      const data = await response.json();
      setAnimeResult(data);
    } catch (error) {
      console.error("Error searching anime:", error);
    }
  }

  useEffect(() => {
    async function fetchCurrentSeason() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/anime/currentSeason",
        );
        const data = await response.json();
        setCurrentSeason(data);
      } catch (error) {
        console.error("Error fetching seasonal anime:", error);
      }
    }

    fetchCurrentSeason();
  }, []);

  return (
    <div className="anime-page-container">
      <SearchBar onSearch={fetchAnime} placeholder="Search Anime Title..." />
      <h2>{animeResult.length > 0 ? "Search Results" : "Current Season"}</h2>
      <Grid
        animeList={animeResult.length > 0 ? animeResult : currentSeason}
        type="anime"
      />
    </div>
  );
}