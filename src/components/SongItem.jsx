import React, { useState } from "react";
import ReactPlayer from "react-player";
import "./SongItem.css";

function SongItem({ song, onSelectSong, url }) {
  const [duration, setDuration] = useState(null);

  return (
    <div className="mb-2">
      <div
        className="p-2 sm:p-4 cursor-pointer transition rounded-md flex items-center space-x-4 hover:bg-black hover:bg-opacity-25"
        onClick={onSelectSong}
      >
        <img
          src={`https://cms.samespace.com/assets/${song.cover}`}
          alt={song.title}
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-full"
        />
        <div className="flex-1 flex items-center justify-between">
          <div>
            <h3 className="text-[18px] text-white truncate">{song.name}</h3>
            <p className="text-[14px] text-gray-400 truncate">{song.artist}</p>
          </div>
          <p className="text-[18px] text-gray-400">
            {duration
              ? `${Math.floor(duration / 60)}:${(
                  "0" + Math.floor(duration % 60)
                ).slice(-2)}`
              : "Loading..."}
          </p>
        </div>
      </div>
      <ReactPlayer
        url={url}
        width="0"
        height="0"
        onDuration={(d) => setDuration(d)}
        playing={false}
        controls={false}
      />
    </div>
  );
}

export default SongItem;
