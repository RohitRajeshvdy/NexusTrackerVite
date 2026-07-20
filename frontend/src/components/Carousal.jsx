import { useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Carousal.css";

export default function Carousel({ animeList, type }) {
  const scrollContainerRef = useRef(null);

  if (!Array.isArray(animeList) || animeList.length === 0) {
    return <div className="error-text">Loading...</div>;
  }

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      // Calculates scroll distance based on container width
      const scrollAmount = container.clientWidth * 0.75;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="carousel-wrapper">
      {/* Navigation Buttons */}
      <button className="carousel-btn left" onClick={() => scroll("left")} aria-label="Scroll Left">
        &#10094;
      </button>
      <button className="carousel-btn right" onClick={() => scroll("right")} aria-label="Scroll Right">
        &#10095;
      </button>

      {/* Scrollable Track */}
      <div className="carousel-track" ref={scrollContainerRef}>
        {animeList.map((item) => (
          <Link to={`/${type}/${item.mal_id}`} key={item.mal_id} className="carousel-card">
            <div className="carousel-img-container">
              <img src={item.image} alt={item.title} className="carousel-img" />
            </div>
            <p className="carousel-title">{item.title}</p>
            <p className="carousel-genres">
              {item.genres.slice(0, 2).map((genre) => (
                <span key={genre.name} className="carousel-genre-tag">
                  {genre.name}
                </span>
              ))}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}