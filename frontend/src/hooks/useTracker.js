import { useState, useEffect } from "react";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function useTracker({
  mal_id,
  mediaType,
  title,
  image,
  genres,
}) {
  const [status, setStatus] = useState("untracked");
  const [episodesWatched, setEpisodesWatched] = useState(0);
  const [rating, setRating] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch tracking data on mount or when ID/Type changes
  useEffect(() => {
    async function fetchExistingTracking() {
      if (!mal_id || !mediaType) return;

      try {
        const response = await fetch(
          `${apiBaseUrl}/db/getdata/${mediaType}/${mal_id}`,
        );
        if (!response.ok) throw new Error("Failed to fetch tracking data");

        const data = await response.json();

        if (data) {
          setStatus(data.status);
          setEpisodesWatched(data.episodesWatched || 0);
          setRating(data.rating || 0);
        } else {
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

  // Handle saving data
  const saveTrackingData = async (updatedStatus = status) => {
    setIsSaving(true);
    const finalStatus =
      updatedStatus === "untracked" ? "planning" : updatedStatus;

    try {
      const response = await fetch(`${apiBaseUrl}/db/postdata`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    } catch (error) {
      console.error("Error updating database entry:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle deleting data
  const deleteTrackingData = async () => {
    if (status === "untracked") return;
    setIsSaving(true);

    try {
      const response = await fetch(
        `${apiBaseUrl}/db/deletedata/${mediaType}/${mal_id}`,
        { method: "DELETE" },
      );

      if (!response.ok) throw new Error("Failed to delete record");

      setStatus("untracked");
      setEpisodesWatched(0);
      setRating(0);
    } catch (error) {
      console.error("Error deleting database entry:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    status,
    setStatus,
    episodesWatched,
    setEpisodesWatched,
    rating,
    setRating,
    isSaving,
    saveTrackingData,
    deleteTrackingData,
  };
}
