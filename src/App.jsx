import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import black from "./assets/black-among-us-character-png.png";
import blue from "./assets/dark-blue-among-us-character-png.png";
import orange from "./assets/orange-character.png";
import purple from "./assets/purple-among-us-character.png";
import red from "./assets/red-among-us-character-png.png";
import "./App.css";

const images = [black, blue, orange, purple, red];

// ----- Subcomponents -----
function Home({ images, currentImageIndex, handleImageClick }) {
  return (
    <div className="main-content">
      <h1>Welcome to Crewmate Creator!</h1>
      <p>Click on the crewmate to change its color!</p>
      <img
        src={images[currentImageIndex]}
        alt="Crewmate"
        onClick={handleImageClick}
        style={{
          cursor: "pointer",
          width: "200px",
          height: "200px",
          borderRadius: "10px",
        }}
      />
    </div>
  );
}

function CreateCrewmate() {
  return (
    <div className="main-content">
      <h2>Create a Crewmate</h2>
      <p>Here you can design your own crewmate! (Feature coming soon)</p>
    </div>
  );
}

function CrewmateGallery() {
  return (
    <div className="main-content">
      <h2>Crewmate Gallery</h2>
      <p>Explore all your saved crewmates here!</p>
    </div>
  );
}

// ----- Main App -----
function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <BrowserRouter>
      <div className="sidebar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create">Create a Crewmate</Link></li>
          <li><Link to="/gallery">Crewmate Gallery</Link></li>
        </ul>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              images={images}
              currentImageIndex={currentImageIndex}
              handleImageClick={handleImageClick}
            />
          }
        />
        <Route path="/create" element={<CreateCrewmate />} />
        <Route path="/gallery" element={<CrewmateGallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
