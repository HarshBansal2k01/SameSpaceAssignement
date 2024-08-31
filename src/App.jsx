import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SongList from "./components/SongList";
import Player from "./components/Player";
import axios from "axios";
import Vibrant from "node-vibrant/lib/bundle";

function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [showPlayer, setShowPlayer] = useState(true); // Show Player by default
  const [showSongList, setShowSongList] = useState(false); // Hide SongList by default

  const handleSelectSong = (song) => {
    setSelectedSong(song);
    changeBackgroundColor(song.cover);
    setShowPlayer(true); // Show Player when a song is selected
    setShowSongList(false); // Hide SongList when a song is selected
  };

  const changeBackgroundColor = (coverImage) => {
    Vibrant.from(`https://cms.samespace.com/assets/${coverImage}`)
      .getPalette()
      .then((palette) => {
        const bgColor = palette.Vibrant.hex;
        setBackgroundColor(bgColor);
      })
      .catch((err) => console.error("Error extracting color:", err));
  };

  useEffect(() => {
    axios
      .get("https://cms.samespace.com/items/songs")
      .then((response) => {
        const fetchedSongs = response.data.data;
        setSongs(fetchedSongs);
        if (fetchedSongs.length > 0) {
          setSelectedSong(fetchedSongs[0]);
          changeBackgroundColor(fetchedSongs[0].cover);
        }
      })
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  const toggleView = () => {
    setShowPlayer((prev) => !prev);
    setShowSongList((prev) => !prev);
  };

  return (
    <div
      style={{
        background: `linear-gradient(to right, ${backgroundColor}, #000000)`,
        transition: "background 0.5s ease",
        minHeight: "100vh",
      }}
    >
      <Header className="hidden lg:block" />

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start lg:space-x-10 xl:space-x-20 -mt-10 lg:-mt-20">
        {/* Conditional rendering based on screen size and button click */}
        <div
          className={`w-full lg:w-1/2 p-4 ${
            showSongList ? "block" : "hidden"
          } xl:block`}
        >
          <SongList
            songs={songs}
            onSelectSong={handleSelectSong}
            backgroundColor={backgroundColor}
          />
        </div>

        <div
          className={`w-full lg:w-1/2 p-4 mt-9 flex justify-center lg:justify-start ${
            showPlayer ? "block" : "hidden"
          }`}
        >
          <Player
            song={selectedSong}
            songs={songs}
            toggleView={toggleView} // Pass toggle function
          />
        </div>
      </div>
    </div>
  );
}

export default App;
