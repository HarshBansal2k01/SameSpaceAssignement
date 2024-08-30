import React, { useState, useEffect, useRef } from "react";

const Player = ({ song }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (song && audioRef.current) {
      console.log("Song loaded");
      audioRef.current.load();
    }
  }, [song?.id]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        console.log("isPlaying", isPlaying);
        audioRef.current.play();
      } else {
        console.log("isPlaying", isPlaying);
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <>
      <div className="w-[480px] h-[692.24px] p-4 overflow-hidden">
        {song && (
          <>
            <div className="flex flex-col">
              <span className="text-white text-[32px] font-semibold">
                {song.name}
              </span>
              <span className="text-gray-400 text-[16px]">{song.artist}</span>
            </div>
            <div className="flex-1 flex items-center h-[510px] justify-center overflow-hidden">
              <img
                src={`https://cms.samespace.com/assets/${song.cover}`}
                alt={song.name}
                className="w-[480px] h-[480px] object-cover rounded-lg"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                className="px-4 py-2 bg-gray-700 rounded-full hover:bg-gray-600 transition"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
            </div>
          </>
        )}
        {song && <audio ref={audioRef} src={song.url} />}
      </div>
    </>
  );
};

export default Player;
