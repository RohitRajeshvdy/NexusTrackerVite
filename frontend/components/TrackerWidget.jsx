import { useState, useEffect } from "react";
import "../styles/TrackerWidget.css";

export default function TrackerWidget({
  mal_id,
  title,
  mediaType,
  totalEpisodes,
  image,
  genres
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("untracked");
  const [episodesWatched, setEpisodesWatched] = useState(0);
  const [rating, setRating] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchExistingTracking() {
      if (!mal_id || !mediaType) return;

      try {
        const response = await fetch(
          `http://localhost:3000/db/getdata/${mediaType}/${mal_id}`,
        );
        if (!response.ok) throw new Error("Failed to fetch tracking data");

        const data = await response.json();

        // If data exists in the DB, update the component states
        if (data) {
          setStatus(data.status);
          setEpisodesWatched(data.episodesWatched || 0);
          setRating(data.rating || 0);
        } else {
          // Reset to defaults if switching to an anime that isn't tracked yet
          setStatus("untracked");
          setEpisodesWatched(0);
          setRating(0);
        }
      } catch (error) {
        console.error("Error loading tracking status:", error);
      }
    }

    fetchExistingTracking();
  }, [mal_id, mediaType]);

  // Sends state to your /db/postdata backend route
  const saveTrackingData = async (updatedStatus = status) => {
    setIsSaving(true);

    const finalStatus =
      updatedStatus === "untracked" ? "planning" : updatedStatus;

    try {
      const response = await fetch("http://localhost:3000/db/postdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mal_id: Number(mal_id),
          title,
          mediaType,
          image,
          genres,
          status: finalStatus,
          episodesWatched: Number(episodesWatched),
          rating: Number(rating),
        }),
      });

      if (!response.ok) throw new Error("Network error");

      setStatus(finalStatus);
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating database entry:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteTrackingData = async () => {
    if (status === "untracked") return;
    setIsSaving(true);

    try {
      const response = await fetch(
        `http://localhost:3000/db/deletedata/${mediaType}/${mal_id}`,
        { method: "DELETE" },
      );

      if (!response.ok) throw new Error("Failed to delete record");

      // Reset frontend fields back to defaults
      setStatus("untracked");
      setEpisodesWatched(0);
      setRating(0);
      setIsOpen(false);
    } catch (error) {
      console.error("Error deleting database entry:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusSelect = (newStatus) => {
    saveTrackingData(newStatus);
  };

  return (
    <div className="tracker-widget-container">
      {/* Dropdown Selector Row */}
      <div className="tracker-dropdown-wrapper">
        <button
          className="tracker-main-action-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isSaving
            ? "Saving..."
            : status === "untracked"
              ? "Add to List"
              : `Status: ${status.toUpperCase()}`}
        </button>

        <button
          className="tracker-arrow-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          ▼
        </button>

        {isOpen && (
          <div className="tracker-floating-menu">
            <button
              onClick={() => handleStatusSelect("completed")}
              className="menu-option"
            >
              Set as Complete
            </button>
            <button
              onClick={() => handleStatusSelect("watching")}
              className="menu-option"
            >
              {mediaType === "anime" ? "Set as Watching" : "Set as Reading"}
            </button>
            <button
              onClick={() => handleStatusSelect("planning")}
              className="menu-option"
            >
              Set as Planning
            </button>
            <button
              onClick={() => handleStatusSelect("dropped")}
              className="menu-option"
            >
              Set as Dropped
            </button>
          </div>
        )}
      </div>

      {/* Numerical Metrics Panel */}
      <div className="tracker-metrics-panel">
        <div className="metric-input-field">
          <label className="metric-label">
            {mediaType === "anime" ? "Episodes Watched:" : "Chapters Read"}
          </label>
          <input
            type="number"
            min="0"
            max={totalEpisodes}
            className="metric-number-box"
            value={episodesWatched}
            onChange={(e) => setEpisodesWatched(e.target.value)}
          />
        </div>

        <div className="metric-input-field">
          <label className="metric-label">Rating (0 - 5):</label>
          <input
            type="number"
            min="0"
            max="5"
            step="1"
            className="metric-number-box"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>

        <button
          className="tracker-submit-metrics-btn"
          onClick={() => saveTrackingData(status)}
        >
          Update Statistics
        </button>
        {status !== "untracked" && (
          <button
            className="tracker-delete-btn"
            onClick={deleteTrackingData}
            disabled={status === "untracked" || isSaving}
          >
            delete
          </button>
        )}
      </div>
    </div>
  );
}
