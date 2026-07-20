import { useState, useEffect } from "react";
import Grid from "./Grid";
import SearchBar from "./SearchBar";
import "../styles/Pages.css";
import { PaginationShadCN } from "./PaginationShadCN";

export default function AnimePage() {
  const [animeResult, setAnimeResult] = useState([]);
  const [currentSeason, setCurrentSeason] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states driven by your API response
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1); // Reset to page 1 on new search
  };

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      try {
        const endpoint = searchQuery
          ? `http://localhost:3000/api/anime/search?q=${searchQuery}&page=${page}`
          : `http://localhost:3000/api/anime/currentSeason?page=${page}`;

        const response = await fetch(endpoint);
        const data = await response.json();

        if (ignore) return;

        // Set card results
        const results = data.data || [];
        if (searchQuery) {
          setAnimeResult(results);
        } else {
          setCurrentSeason(results);
        }

        // Extract metadata from API pagination object
        if (data.pagination) {
          setTotalPages(data.pagination.last_visible_page || 1);
          setHasNextPage(data.pagination.has_next_page ?? false);
        }
      } catch (error) {
        if (!ignore) {
          console.error("Error fetching anime data:", error);
        }
      }
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, [searchQuery, page]);

  return (
    <div className="anime-page-container">
      <SearchBar onSearch={handleSearch} placeholder="Search Anime Title..." />
      <h2>{searchQuery ? "Search Results" : "Current Season"}</h2>
      <Grid
        animeList={searchQuery ? animeResult : currentSeason}
        type="anime"
      />
      <PaginationShadCN
        currentPage={page}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
