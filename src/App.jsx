import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import black from "./assets/black-among-us-character-png.png";
import blue from "./assets/dark-blue-among-us-character-png.png";
import orange from "./assets/orange-character.png";
import purple from "./assets/purple-among-us-character.png";
import red from "./assets/red-among-us-character-png.png";

const images = [black, blue, orange, purple, red];

import './App.css'

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const images = [black, blue, orange, purple, red];

  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <>

      <div className='sidebar'>
        <ul>
          <li>Home</li>
          <li>Create a Crewmate</li>
          <li>Crewmate Gallery</li>
        </ul>
      </div>
      <div className='main-content'>
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

    </>
  )
}

export default App
