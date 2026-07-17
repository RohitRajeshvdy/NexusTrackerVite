import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import NavBar from "../components/NavBar";
import AnimePage from "../components/AnimePage";
import MangaPage from "../components/MangaPage";
import AnimeDetailPage from "../components/AnimeDetailPage";
import MangaDetailPage from "../components/MangaDetailPage";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<div>Welcome to Nexus Tracker Home Page</div>}
        />
        <Route path="/anime" element={<AnimePage />} />
        <Route path="/anime/:id" element={<AnimeDetailPage />} />
        <Route path="/manga" element={<MangaPage />} />
        <Route path="/manga/:id" element={<MangaDetailPage />} />
        <Route path="/games" element={<div>Games Page Layout coming soon....</div>} />
      </Routes>
    </Router>
  );
}

export default App;
