import { useState } from "react";
import "../styles/SearchBar.css"; 

const formatText = (text) => text?.trim();

export default function SearchBar({ onSearch, placeholder }) {
  const [query, setQuery] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    const cleanedQuery = formatText(query);

    if (cleanedQuery) {
      onSearch(cleanedQuery);
    }
  }

  return (
    <form onSubmit={handleSearch} className="search-bar-form">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder || "Search...."}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-btn" type="submit">Search</button>
    </form>
  );
}