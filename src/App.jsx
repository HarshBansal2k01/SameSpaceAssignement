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

  const handleSelectSong = (song) => {
    setSelectedSong(song);
    changeBackgroundColor(song.cover);
  };
  const changeBackgroundColor = (coverImage) => {
    console.log(coverImage);
    Vibrant.from(`https://cms.samespace.com/assets/${coverImage}`)
      .getPalette()
      .then((palette) => {
        console.log("palette", palette);
        const bgColor = palette.Vibrant.hex;
        setBackgroundColor(bgColor);
        console.log("Background color:", bgColor);
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

  return (
    <div
      style={{
        background: `linear-gradient(to right, ${backgroundColor}, #000000)`,
        transition: "background 0.5s ease",
        minHeight: "100vh",
      }}
    >
      <Header />
      <div className="flex items-start space-x-20 -mt-20">
        <div className="w-1/2 p-4">
          <SongList songs={songs} onSelectSong={handleSelectSong} backgroundColor={backgroundColor}/>
        </div>
        <div className="w-1/2 p-4 mt-10">
          <Player song={selectedSong} songs={songs} />
        </div>
      </div>
    </div>
  );
}

export default App;
