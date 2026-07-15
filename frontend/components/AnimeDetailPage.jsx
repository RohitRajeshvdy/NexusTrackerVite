import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import "../styles/AnimeDetailPage.css";

export default function AnimeDetailPage() {
  const { id } = useParams();
  const [animeDetail, setAnimeDetail] = useState(null);

  useEffect(() => {
    async function fetchAnimeDetail() {
      try {
        const response = await fetch(`http://localhost:3000/api/anime/${id}`);
        const data = await response.json();
        setAnimeDetail(data);
      } catch (error) {
        console.error("Error fetching seasonal anime:", error);
      }
    }

    fetchAnimeDetail();
  }, [id]);

  if (!animeDetail) {
    return <div>Loading details...</div>;
  }

  return (
    <main className="detail-page-container">
      {/* Page Header Area */}
      <header className="detail-header">
        <h1 className="detail-title">{animeDetail.title}</h1>
        <p className="detail-subtitle">
          {animeDetail.season} {animeDetail.year} • {animeDetail.type}
        </p>
      </header>

      {/* Main Layout Split */}
      <div className="detail-content-layout">
        {/* Sidebar: Media Profile & Technical Metrics */}
        <aside className="detail-sidebar">
          <img
            src={animeDetail.image}
            alt={animeDetail.title}
            className="detail-poster"
            width="250px"
          />

          <div className="sidebar-meta-group">
            <div className="meta-item">
              <span className="meta-label">Status:</span>
              <span className="meta-value">
                {animeDetail.airing ? "Currently Airing" : "Finished Airing"}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Episodes:</span>
              <span className="meta-value">
                {animeDetail.episodes || "N/A"}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Duration:</span>
              <span className="meta-value">{animeDetail.duration}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Aired:</span>
              <span className="meta-value">{animeDetail.aired}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Rating:</span>
              <span className="meta-value">{animeDetail.pg_rating}</span>
            </div>
          </div>
        </aside>

        {/* Main Content Info: Creative Details & Story Elements */}
        <section className="detail-main-info">
          <div className="info-metadata-chips">
            <div className="metadata-row">
              <strong className="metadata-label">Genres:</strong>{" "}
              <span className="metadata-value">
                {animeDetail.genres?.map((genre) => genre.name).join(", ") ||
                  "None"}
              </span>
            </div>
            <div className="metadata-row">
              <strong className="metadata-label">Studios:</strong>{" "}
              <span className="metadata-value">
                {animeDetail.studios?.map((studio) => studio.name).join(", ") ||
                  "Unknown"}
              </span>
            </div>
          </div>

          <article className="detail-synopsis-section">
            <h2 className="synopsis-heading">Synopsis</h2>
            <p className="synopsis-text">
              {animeDetail.synopsis || "No synopsis available for this entry."}
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}

{
  /* <>
      <h1>{animeDetail.title}</h1>
      <img src={animeDetail.image} width="250px"></img>
      <p>{animeDetail.type} . {animeDetail.episodes} . {animeDetail.duration} . {animeDetail.airing ? "Currently Airing" : "Finished"} . {animeDetail.aired}</p>
      <p>{animeDetail.genres.map(genre=>genre.name)}</p>
      <p>{animeDetail.season} . {animeDetail.year}</p>
      <p>{animeDetail.pg_rating}</p>
      <p>{animeDetail.synopsis}</p>
      {<p>{animeDetail.studios.map(studio=>studio.name)}</p>}
    </> */
}
