import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player"; // Import ReactPlayer
import play from "../assets/playBtn.svg";
import pause from "../assets/pausebtn.svg";
import next from "../assets/nextbtn.svg";
import prev from "../assets/prevbtn.svg";
import moreBtn from "../assets/morebtn.svg";
import audioBtn from "../assets/volbtn.svg";
import "./Player.css";

const Player = ({ song, songs }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0); // Track progress
  const [duration, setDuration] = useState(0); // Track total duration
  const [currentIndex, setCurrentIndex] = useState(
    songs.findIndex((s) => s.id === song.id) // Initialize with the current song's index
  );

  const audioRef = useRef(null);

  useEffect(() => {
    if (song) {
      const index = songs.findIndex((s) => s.id === song.id);
      setCurrentIndex(index);
    }
  }, [song, songs]);

  const handlePrev = () => {
    if (currentIndex !== null) {
      const newIndex = (currentIndex - 1 + songs.length) % songs.length; // Handle wrap-around
      setCurrentIndex(newIndex);
      setIsPlaying(false); // Pause the current song
    }
  };

  const handleNext = () => {
    if (currentIndex !== null) {
      const newIndex = (currentIndex + 1) % songs.length; // Handle wrap-around
      setCurrentIndex(newIndex);
      setIsPlaying(false); // Pause the current song
    }
  };

  useEffect(() => {
    if (currentIndex !== null && songs[currentIndex]) {
      const newSong = songs[currentIndex];
      setIsPlaying(true); // Automatically start playing the new song
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

  return (
    <div className="w-[480px] h-[692.24px] p-4 overflow-hidden">
      {currentSong && (
        <>
          <div className="flex flex-col">
            <span className="text-white text-[32px] font-semibold">
              {currentSong.name}
            </span>
            <span className="text-gray-400 text-[16px]">
              {currentSong.artist}
            </span>
          </div>

          <div className="flex-1 flex items-center h-[510px] justify-center overflow-hidden">
            <img
              src={`https://cms.samespace.com/assets/${currentSong.cover}`}
              alt={currentSong.name}
              className="w-[480px] h-[480px] object-cover rounded-lg"
            />
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp} // Seek to new position
            className="w-full h-[6px] rounded-[16px] slider"
          />
          <div className="mt-4 flex justify-between items-center">
            <button className="px-2 py-2">
              <img src={moreBtn} alt="More" className="w-[48px] h-[48px]" />
            </button>

            <div className="mt-4 flex justify-center">
              <button onClick={handlePrev}>
                <img src={prev} alt="Prev" className="w-[32px] h-[32px]" />
              </button>
              <button
                className="px-4 py-2 transition"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <img
                  src={isPlaying ? pause : play}
                  alt={isPlaying ? "Pause" : "Play"}
                  className="w-[48px] h-[48px]"
                />
              </button>
              <button onClick={handleNext}>
                <img src={next} alt="Next" className="w-[32px] h-[32px]" />
              </button>
            </div>

            <div className="flex items-center">
              <img src={audioBtn} alt="Audio" className="w-[48px] h- mr-2" />
            </div>
          </div>
        </>
      )}

      {currentSong && (
        <ReactPlayer
          ref={audioRef}
          url={currentSong.url}
          playing={isPlaying}
          controls={false} // Set to true if you want built-in controls
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
