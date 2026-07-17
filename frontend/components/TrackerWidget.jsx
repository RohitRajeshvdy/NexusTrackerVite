import { useState } from "react";
import useTracker from "../hooks/useTracker";

import "../styles/TrackerWidget.css";

export default function TrackerWidget(props) {
  const { mediaType, totalEpisodes } = props;
  const [isOpen, setIsOpen] = useState(false);

  // Bring in all our backend state & functions
  const {
    status,
    episodesWatched,
    setEpisodesWatched,
    rating,
    setRating,
    isSaving,
    saveTrackingData,
    deleteTrackingData,
  } = useTracker(props);

  const handleStatusSelect = (newStatus) => {
    saveTrackingData(newStatus);
    setIsOpen(false);
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
            {mediaType === "anime" ? "Episodes Watched:" : "Chapters Read:"}
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
            disabled={isSaving}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
