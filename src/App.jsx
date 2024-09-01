import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SongList from "./components/SongList";
import Player from "./components/Player";
import axios from "axios";
import Vibrant from "node-vibrant/lib/bundle";
import "./App.css";
function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [showPlayer, setShowPlayer] = useState(true);
  const [showSongList, setShowSongList] = useState(false);
  const [isListVisible, setIsListVisible] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  const handleSelectSong = (song) => {
    setSelectedSong(song);
    changeBackgroundColor(song.cover);
    setShowPlayer(true);
    setShowSongList(false);
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
        setTimeout(() => {
          setShowLoader(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
        setShowLoader(false);
      });
  }, []);

  const toggleView = () => {
    setShowPlayer((prev) => !prev);
    setShowSongList((prev) => !prev);
  };

  return (
    <div
      style={{
        background: `linear-gradient(to right, ${backgroundColor}, #333333)`,
        transition: "background 0.5s ease",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {showLoader && (
        <div className="absolute inset-0 flex justify-center items-center bg-black">
          <Header />
        </div>
      )}

      {!showLoader && (
        <>
          <Header className="hidden lg:block" />

          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start lg:space-x-10 xl:space-x-20 -mt-10 lg:-mt-20">
            <div
              className={`w-full lg:w-1/2 p-4 ${
                showSongList ? "block" : "hidden"
              } xl:block lg:block lg:h-full`}
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
                toggleView={toggleView}
                isListVisible={isListVisible}
                setIsListVisible={setIsListVisible}
                onSelectSong={handleSelectSong}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
