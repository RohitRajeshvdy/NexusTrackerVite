import { useEffect, useState } from "react";
import Grid from "./Grid";

import "../styles/FrontPage.css";

export default function FrontPage() {
  const [dbData, setdbData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFullDB() {
      try {
        const response = await fetch(`http://localhost:3000/db/getdata`);

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
      <Grid animeList={animeList} type="anime" />
      <h2>Manga</h2>
      <Grid animeList={mangaList} type="manga" />
    </>
  );
}
