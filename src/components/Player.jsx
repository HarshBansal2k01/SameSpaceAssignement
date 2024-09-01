import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import next from "../assets/nextbtn.svg";
import prev from "../assets/prevbtn.svg";
import { useMediaQuery } from "@mui/material";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
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
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(
    songs.findIndex((s) => s.id === song.id)
  );
  const [volume, setVolume] = useState(0.8);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [initialStart, setInitialStart] = useState(0);
  const audioRef = useRef(null);
  const isMobileOrTablet = useMediaQuery("(max-width: 1024px)");

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
      setIsPlaying(false);
      onSelectSong(songs[newIndex]);
    }
  };

  useEffect(() => {
    if (currentIndex !== null && songs[currentIndex]) {
      const newSong = songs[currentIndex];
      if (initialStart === 0) {
        setIsPlaying(false);
        setInitialStart(1);
      } else {
        setIsPlaying(true);
      }
    }
  }, [currentIndex, songs]);

  const currentSong = songs[currentIndex];

  const handleSeekChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setPlayed(newValue);
  };

  const handleProgress = (progress) => {
    setPlayed(progress.played);
  };

  const handleSeekMouseUp = (e) => {
    const newValue = parseFloat(e.target.value);
    setPlayed(newValue);
    audioRef.current.seekTo(newValue);
  };

  const handleVolumeClick = () => {
    setShowVolumeControl((prev) => !prev);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleMoreButtonClick = () => {
    if (isMobileOrTablet) {
      toggleView();
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
            <div className="flex-1 flex items-center h-[300px] md:h-[400px] lg:h-[480px] justify-center overflow-hidden mt-4">
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
            <div className="relative mt-0.5">
              <button
                onClick={handleMoreButtonClick}
                className="bg-black/20 rounded-full p-2 md:p-2 lg:p-4"
              >
                <MoreHorizIcon className="w-[24px] md:w-[32px] lg:w-[48px] h-[24px] md:h-[32px] lg:h-[48px] text-white -mt-1" />
              </button>
            </div>

            <div className="flex justify-center">
              <button onClick={handlePrev} className="p-1 md:p-2 lg:p-3">
                <img
                  src={prev}
                  alt="Prev"
                  className="w-[24px] lg:w-[32px] h-[24px] lg:h-[32px]"
                />
              </button>
              <button
                className="relative p-1 md:p-2 lg:p-1 bg-white rounded-full flex items-center justify-center transition"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <div className="flex items-center justify-center bg-white rounded-full w-[32px] md:w-[48px] lg:w-[48px] h-[32px] md:h-[48px] lg:h-[48px]">
                  {isPlaying ? (
                    <PauseIcon className="w-[40px] h-[40px] text-black" />
                  ) : (
                    <PlayArrowIcon className="w-[24px] h-[24px] text-black" />
                  )}
                </div>
              </button>
              <button onClick={handleNext} className="p-1 md:p-2 lg:p-3">
                <img
                  src={next}
                  alt="Next"
                  className="w-[24px] lg:w-[32px] h-[24px] lg:h-[32px]"
                />
              </button>
            </div>
            <div className="relative mt-0.5">
              <button
                onClick={handleVolumeClick}
                className="bg-black/20 rounded-full p-2 md:p-2 lg:p-4 flex items-center justify-center"
              >
                {volume === 0 ? (
                  <VolumeOffIcon className="w-[24px] md:w-[32px] lg:w-[48px] h-[24px] md:h-[32px] lg:h-[48px] text-white -mt-1" />
                ) : (
                  <VolumeUpIcon className="w-[20px] md:w-[32px] lg:w-[48px] h-[20px] md:h-[32px] lg:h-[48px] text-white -mt-1" />
                )}
              </button>

              {showVolumeControl && (
                <div className="absolute -top-[20px] right-0 w-max rounded-lg flex items-center">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-[120px] md:w-[140px] lg:w-[160px] h-[4px] md:h-[5px] lg:h-[6px] rounded-lg slider"
                    style={{
                      background: `linear-gradient(to right, white ${
                        volume * 100
                      }%, transparent 0%)`,
                      appearance: "none",
                      cursor: "pointer",
                    }}
                  />
                  <div className="text-white text-xs text-center ml-2">
                    {Math.round(volume * 100)}%
                  </div>
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
          controls={false}
          volume={volume}
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
