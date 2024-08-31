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
  {/* Header component visible on screens larger than 1024px */}
  <Header className="hidden lg:block" />

  <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start lg:space-x-10 xl:space-x-20 -mt-10 lg:-mt-20">
    {/* SongList hidden on screens 1024px and below */}
    <div className="w-full lg:w-1/2 p-4 hidden xl:block">
      <SongList
        songs={songs}
        onSelectSong={handleSelectSong}
        backgroundColor={backgroundColor}
      />
    </div>

    {/* Player component, centered on small screens */}
    <div className="w-full lg:w-1/2 p-4 mt-9 flex justify-center lg:justify-start">
      <Player song={selectedSong} songs={songs} />
    </div>
  </div>
</div>

  );
}

export default App;
