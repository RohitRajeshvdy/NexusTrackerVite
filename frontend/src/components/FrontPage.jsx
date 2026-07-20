import { useEffect, useState } from "react";
import Carousel from "./Carousal";

import "../styles/FrontPage.css";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"

export default function FrontPage() {
  const [dbData, setdbData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFullDB() {
      try {
        const response = await fetch(`${apiBaseUrl}/db/getdata`);

        const data = await response.json();

        setdbData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getFullDB();
  }, []);

  if (loading) {
    return <p>Loading your list...</p>;
  }

  if (dbData.length === 0) {
    return <p>No items tracked yet. Add some to get started!</p>;
  }

  const animeList = dbData.filter((item) => item.mediaType === "anime");
  const mangaList = dbData.filter((item) => item.mediaType === "manga");

  return (
    <>
      <h2>Anime</h2>
      <Carousel animeList={animeList} type="anime" />
      <h2>Manga</h2>
      <Carousel animeList={mangaList} type="manga" />
    </>
  );
}
