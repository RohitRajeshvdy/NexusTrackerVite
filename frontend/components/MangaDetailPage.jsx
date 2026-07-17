import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import "../styles/AnimeDetailPage.css";

import TrackerWidget from "../components/TrackerWidget";

export default function MangaDetailPage() {
  const { id } = useParams();
  const [mangaDetail, setMangaDetail] = useState(null);

  useEffect(() => {
    async function fetchMangaDetail() {
      try {
        const response = await fetch(`http://localhost:3000/api/manga/${id}`);
        const data = await response.json();
        setMangaDetail(data);
      } catch (error) {
        console.error("Error fetching manga details:", error);
      }
    }

    fetchMangaDetail();
  }, [id]);

  if (!mangaDetail) {
    return <div>Loading details...</div>;
  }

  return (
    <main className="detail-page-container">
      {/* Page Header Area */}
      <header className="detail-header">
        <h1 className="detail-title">{mangaDetail.title}</h1>
        <p className="detail-subtitle">
          Rank #{mangaDetail.rank || "N/A"} • {mangaDetail.type}
        </p>
      </header>

      {/* Main Layout Split */}
      <div className="detail-content-layout">
        {/* Sidebar: Media Profile & Technical Metrics */}
        <aside className="detail-sidebar">
          <img
            src={mangaDetail.image}
            alt={mangaDetail.title}
            className="detail-poster"
            width="250px"
          />

          <TrackerWidget
            mal_id={id}
            title={mangaDetail.title}
            mediaType="manga"
            totalEpisodes={mangaDetail.episodes}
          />

          <div className="sidebar-meta-group">
            <div className="meta-item">
              <span className="meta-label">Status:</span>
              <span className="meta-value">{mangaDetail.status}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Chapters:</span>
              <span className="meta-value">
                {mangaDetail.chapters || "N/A"}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Volumes:</span>
              <span className="meta-value">{mangaDetail.volumes || "N/A"}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Score:</span>
              <span className="meta-value">
                ⭐ {mangaDetail.score || "N/A"}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Published:</span>
              <span className="meta-value">{mangaDetail.published}</span>
            </div>
          </div>
        </aside>

        {/* Main Content Info: Creative Details & Story Elements */}
        <section className="detail-main-info">
          <div className="info-metadata-chips">
            <div className="metadata-row">
              <strong className="metadata-label">Authors:</strong>{" "}
              <span className="metadata-value">
                {mangaDetail.authors?.map((author) => author.name).join(", ") ||
                  "Unknown"}
              </span>
            </div>
            <div className="metadata-row">
              <strong className="metadata-label">Genres:</strong>{" "}
              <span className="metadata-value">
                {mangaDetail.genres?.map((genre) => genre.name).join(", ") ||
                  "None"}
              </span>
            </div>
            <div className="metadata-row">
              <strong className="metadata-label">Serialization:</strong>{" "}
              <span className="metadata-value">
                {mangaDetail.serializations
                  ?.map((ser) => ser.name)
                  .join(", ") || "None"}
              </span>
            </div>
          </div>

          <article className="detail-synopsis-section">
            <h2 className="synopsis-heading">Synopsis</h2>
            <p className="synopsis-text">
              {mangaDetail.synopsis || "No synopsis available for this entry."}
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
