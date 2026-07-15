import { Link } from "react-router-dom";
import "../styles/Grid.css"; 

export default function Grid({ animeList , type }) {
  if (!Array.isArray(animeList) || animeList.length === 0) {
    return <div className="error-text">No results to show.</div>;
  }

  return (
    <div className="grid">
      {animeList.map((item) => (
        <Link to={`/${type}/${item.mal_id}`} key={item.mal_id} className="anime-card">
          <img src={item.image} alt={item.title} className="grid-img" />
          <p className="grid-title">{item.title}</p>
          <p className="grid-genres">
            {/* Map each genre string to a clean tag layout */}
            {item.genres.slice(0,3).map(genre => (
              <span key={genre.name} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </p>
        </Link>
      ))}
    </div>
  );
}