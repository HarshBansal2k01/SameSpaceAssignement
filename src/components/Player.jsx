import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player"; // Import ReactPlayer
import play from "../assets/playBtn.svg";
import pause from "../assets/pausebtn.svg";
import next from "../assets/nextbtn.svg";
import prev from "../assets/prevbtn.svg";
import moreBtn from "../assets/morebtn.svg";
import audioBtn from "../assets/volbtn.svg";
import { useMediaQuery } from "@mui/material";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import "./Player.css";

const Player = ({
  song,
  songs,
  toggleView,
  isListVisible,
  setIsListVisible,
  onSelectSong,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0); // Track progress
  const [duration, setDuration] = useState(0); // Track total duration
  const [currentIndex, setCurrentIndex] = useState(
    songs.findIndex((s) => s.id === song.id) // Initialize with the current song's index
  );
  const [volume, setVolume] = useState(0.8); // Default volume (80%)
  const [showVolumeControl, setShowVolumeControl] = useState(false); // Track volume control visibility
  const [initialStart, setInitialStart] = useState(0);
  const audioRef = useRef(null);
  const isMobileOrTablet = useMediaQuery("(max-width: 1024px)"); // Detects md or smaller screens

  useEffect(() => {
    if (!isMobileOrTablet && !isListVisible) {
      setIsListVisible(true);
    } else if (isMobileOrTablet && isListVisible) {
      setIsListVisible(false);
    }
  }, [isMobileOrTablet, isListVisible, setIsListVisible]);

  useEffect(() => {
    if (song) {
      const index = songs.findIndex((s) => s.id === song.id);
      setCurrentIndex(index);
    }
  }, [song, songs]);

  const handlePrev = () => {
    if (currentIndex !== null) {
      const newIndex = (currentIndex - 1 + songs.length) % songs.length;
      setCurrentIndex(newIndex);
      setIsPlaying(false);
      onSelectSong(songs[newIndex]);
    }
  };

  const handleNext = () => {
    if (currentIndex !== null) {
      const newIndex = (currentIndex + 1) % songs.length;
      setCurrentIndex(newIndex);
      setIsPlaying(false); // Pause the current song
      onSelectSong(songs[newIndex]);
    }
  };

  useEffect(() => {
    if (currentIndex !== null && songs[currentIndex]) {
      const newSong = songs[currentIndex];
      if (initialStart == 0) {
        setIsPlaying(false);
        setInitialStart(1);
      } else {
        setIsPlaying(true);
      }
    }
  }, [currentIndex, songs]);

  const currentSong = songs[currentIndex];

  // Handle progress bar change
  const handleSeekChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setPlayed(newValue);
  };

  // Handle progress updates from ReactPlayer
  const handleProgress = (progress) => {
    setPlayed(progress.played);
  };

  // Seek to the new position when the user stops dragging the seeker
  const handleSeekMouseUp = (e) => {
    const newValue = parseFloat(e.target.value);
    setPlayed(newValue);
    audioRef.current.seekTo(newValue);
  };

  // Toggle volume control visibility
  const handleVolumeClick = () => {
    setShowVolumeControl((prev) => !prev);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };
  const handleMoreButtonClick = () => {
    if (isMobileOrTablet) {
      toggleView(); // Only toggle the view when in mobile or tablet view
    }
  };

  return (
    <div className="w-full h-auto lg:w-[480px] lg:h-[800px] p-4 overflow-hidden">
      {currentSong && (
        <>
          <div className="flex flex-col">
            <span className="text-white text-[24px] lg:text-[32px] font-semibold">
              {currentSong.name}
            </span>
            <span className="text-gray-400 text-[14px] lg:text-[16px]">
              {currentSong.artist}
            </span>
          </div>
          {currentSong.cover ? (
            <div className="flex-1 flex items-center h-[300px] md:h-[400px] lg:h-[510px] justify-center overflow-hidden mt-4">
              <img
                src={`https://cms.samespace.com/assets/${currentSong.cover}`}
                alt={currentSong.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-700 rounded-lg">
              <HeadphonesIcon style={{ fontSize: 100, color: "white" }} />
            </div>
          )}

          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
            className="w-full h-[6px] rounded-[16px] slider mt-4"
            style={{
              background: `linear-gradient(to right, white ${
                played * 100
              }%, transparent 0%)`,
              appearance: "none",
              cursor: "pointer",
            }}
          />
          <div className="flex justify-between items-center mt-4">
            <button className="px-2 py-2 " onClick={handleMoreButtonClick}>
              <img
                src={moreBtn}
                alt="More"
                className="w-[32px] lg:w-[48px] h-[32px] lg:h-[48px] "
              />
            </button>

            <div className="flex justify-center">
              <button onClick={handlePrev}>
                <img
                  src={prev}
                  alt="Prev"
                  className="w-[24px] lg:w-[32px] h-[24px] lg:h-[32px] "
                />
              </button>
              <button
                className="px-4 py-2 transition"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <img
                  src={isPlaying ? pause : play}
                  alt={isPlaying ? "Pause" : "Play"}
                  className="w-[32px] lg:w-[48px] h-[32px] lg:h-[48px]"
                />
              </button>
              <button onClick={handleNext}>
                <img
                  src={next}
                  alt="Next"
                  className="w-[24px] lg:w-[32px] h-[24px] lg:h-[32px]"
                />
              </button>
            </div>

            <div className="relative">
              <button onClick={handleVolumeClick}>
                <img
                  src={audioBtn}
                  alt="Audio"
                  className="w-[32px] lg:w-[48px] h-[32px] lg:h-[48px] "
                />
              </button>
              {showVolumeControl && (
                <div className="absolute -top-[160px] right-0 bg-gray-800 p-2 rounded-lg shadow-lg">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-[160px] h-[6px] rounded-lg slider"
                    style={{
                      background: `linear-gradient(to right, white ${
                        volume * 100
                      }%, transparent 0%)`,
                      appearance: "none",
                      cursor: "pointer",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {currentSong && (
        <ReactPlayer
          ref={audioRef}
          url={currentSong.url}
          playing={isPlaying}
          controls={false} // We don't need built-in controls anymore
          volume={volume} // Set volume for the player
          width="0"
          height="0"
          onProgress={handleProgress}
          onDuration={setDuration}
          onEnded={handleNext}
        />
      )}
    </div>
  );
};

export default Player;
