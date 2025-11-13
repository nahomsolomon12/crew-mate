import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "./supabaseClient"; // make sure this file is set up
import "./App.css";

import black from "./assets/black-among-us-character-png.png";
import blue from "./assets/dark-blue-among-us-character-png.png";
import orange from "./assets/orange-character.png";
import purple from "./assets/purple-among-us-character.png";
import red from "./assets/red-among-us-character-png.png";

const pics = [black, blue, orange, purple, red];

const images = {
  Black: black,
  Blue: blue,
  Orange: orange,
  Purple: purple,
  Red: red,
};


function CreateCrewmate() {
  const [name, setName] = useState("");
  const [speed, setSpeed] = useState("");
  const [color, setColor] = useState("");
  const colors = ["Red", "Blue", "Orange", "Purple", "Black"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("crewmates")
      .insert([{ name, speed, color }]);
    if (error) console.error(error);
    else {
      alert("Crewmate created!");
      setName("");
      setSpeed("");
      setColor("");
    }
  };

  return (
    <div className="main-content">
      <h2>Create a Crewmate</h2>
      <form onSubmit={handleSubmit} className="crewmate-form">
        <label>
          Name:
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Speed:
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            required
          />
        </label>
        <label>Color:</label>
        <div className="color-options">
          {colors.map((c) => (
            <label key={c}>
              <input
                type="radio"
                name="color"
                value={c}
                checked={color === c}
                onChange={(e) => setColor(e.target.value)}
              />
              {c}
            </label>
          ))}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

function CrewmateGallery() {
  const [crewmates, setCrewmates] = useState([]);
  const navigate = useNavigate();

  // Fetch crewmates from Supabase
  const fetchCrewmates = async () => {
    const { data, error } = await supabase.from("crewmates").select("*");
    if (error) console.error(error);
    else setCrewmates(data);
  };

  useEffect(() => {
    fetchCrewmates();
  }, []);

  // Delete a crewmate
  const handleDelete = async (id) => {
    const { error } = await supabase.from("crewmates").delete().eq("id", id);
    if (error) console.error("Delete error:", error);
    else setCrewmates((prev) => prev.filter((mate) => mate.id !== id));
  };

  return (
    <div className="main-content">
      <h2>Crewmate Gallery</h2>
      <div className="gallery-grid">
        {crewmates.map((mate) => (
          <div key={mate.id} className="crewmate-card">
            {/* Show correct image based on color */}
            <img
              src={images[mate.color]}
              alt={`${mate.color} crewmate`}
              style={{ width: "100px", height: "100px", marginBottom: "0.8rem" }}
            />

            <h3>{mate.name}</h3>
            <p>Speed: {mate.speed}</p>
            <p>Color: {mate.color}</p>

            {/* EDIT button: navigates to /edit/:id */}
            <button onClick={() => navigate(`/edit/${mate.id}`)}>Edit</button>

            {/* DELETE button */}
            <button
              onClick={() => handleDelete(mate.id)}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
function EditCrewmate() {
  const { id } = useParams(); // grabs the crewmate ID from the URL
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [speed, setSpeed] = useState("");
  const [color, setColor] = useState("");
  const colors = ["Red", "Blue", "Orange", "Purple", "Black"];
  const [loading, setLoading] = useState(true);

  // Fetch the existing crewmate data
  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from("crewmates")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        alert("Failed to fetch crewmate");
        navigate("/gallery"); // redirect back if fetch fails
      } else {
        setName(data.name);
        setSpeed(data.speed);
        setColor(data.color);
        setLoading(false);
      }
    };

    fetchCrewmate();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("crewmates")
      .update({ name, speed, color })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to update crewmate");
    } else {
      alert("Crewmate updated!");
      navigate("/gallery"); // navigate back to gallery
    }
  };

  if (loading) return <p>Loading crewmate...</p>;

  return (
    <div className="main-content">
      <h2>Edit Crewmate</h2>
      <form onSubmit={handleSubmit} className="crewmate-form">
        <label>
          Name:
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Speed:
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            required
          />
        </label>
        <label>Color:</label>
        <div className="color-options">
          {colors.map((c) => (
            <label key={c}>
              <input
                type="radio"
                name="color"
                value={c}
                checked={color === c}
                onChange={(e) => setColor(e.target.value)}
              />
              {c}
            </label>
          ))}
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleImageClick = () => {
    setCurrentImageIndex((prev) => (prev + 1) % pics.length);
  };

  return (
    <div className="main-content">
      <h1>Welcome to Crewmate Creator!</h1>
      <p>Click on the crewmate to change its color!</p>
      <img
        src={pics[currentImageIndex]}
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

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="sidebar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Create a Crewmate</Link>
            </li>
            <li>
              <Link to="/gallery">Crewmate Gallery</Link>
            </li>
          </ul>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateCrewmate />} />
          <Route path="/gallery" element={<CrewmateGallery />} />
          <Route path="/edit/:id" element={<EditCrewmate />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
