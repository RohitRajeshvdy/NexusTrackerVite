import { useState, useEffect } from "react";
import Grid from "./Grid";
import SearchBar from "./SearchBar";
import "../styles/Pages.css";
import { PaginationShadCN } from "./PaginationShadCN";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"

export default function MangaPage() {
  const [mangaResult, setMangaResult] = useState([]);
  const [topManga, setTopManga] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  // Handle new search submission from SearchBar
  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1); // Reset back to page 1 on a new search
  };

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      try {
        const endpoint = searchQuery
          ? `${apiBaseUrl}/api/manga/search?q=${searchQuery}&page=${page}`
          : `${apiBaseUrl}/api/manga/topManga?page=${page}`;

        const response = await fetch(endpoint);
        const data = await response.json();

        if (ignore) return;

        const results = data.data || [];

        if (searchQuery) {
          setMangaResult(results);
        } else {
          setTopManga(results);
        }

        // Extract pagination metadata sent from backend
        if (data.pagination) {
          setTotalPages(data.pagination.last_visible_page || 1);
          setHasNextPage(data.pagination.has_next_page ?? false);
        }
      } catch (error) {
        if (!ignore) {
          console.error("Error fetching manga data:", error);
        }
      }
    }

    loadData();

    return () => {
      ignore = true; // Cleanup flag to prevent race conditions
    };
  }, [searchQuery, page]);

  return (
    <div className="manga-page-container">
      <SearchBar onSearch={handleSearch} placeholder="Search Manga Title..." />
      <h2>{searchQuery ? "Search Results" : "Top Manga"}</h2>
      <Grid animeList={searchQuery ? mangaResult : topManga} type="manga" />
      <PaginationShadCN
        currentPage={page}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
