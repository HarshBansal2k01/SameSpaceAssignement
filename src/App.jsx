import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SongList from "./components/SongList";
import Player from "./components/Player";
import axios from "axios";
function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    axios
      .get("https://cms.samespace.com/items/songs")
      .then((response) => {
        setSongs(response.data.data);
      })
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  const handleSelectSong = (song) => {
    setSelectedSong(song);
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header />
      <div className="flex -mt-14">
        <div className="w-1/2 p-4">
          <SongList songs={songs} onSelectSong={handleSelectSong} />
        </div>
        <div className="w-1/2 p-4">
          <Player song={selectedSong} />
        </div>
      </div>
    </div>
  );
}

export default App;
