import { Link, NavLink } from "react-router-dom";
import "../styles/NavBar.css";

export default function NavBar() {
  return (
    <header className="navbar">
      <div className="left_navbar">
        <Link to="/" className="logo">
          NexusTracker
        </Link>
      </div>
      <div className="center_navbar">
        <NavLink className="center-link" to="/anime">
          Anime
        </NavLink>
        <NavLink className="center-link" to="/manga">
          Manga
        </NavLink>
        <NavLink className="center-link" to="/games">
          Games
        </NavLink>
      </div>
      <div className="right_navbar">
        <button className="theme_btn">🌙</button>
        <button className="sign_in_btn">Sign in</button>
        <button className="sign_up_btn">Sign Up</button>
      </div>
    </header>
  );
}
