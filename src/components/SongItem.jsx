import React from "react";
import "./SongItem.css"
function SongItem({ song, onSelectSong,backgroundColor }) {

  return (
    <div className="mb-2">
      
      <div
    className="p-2 sm:p-4 cursor-pointer transition rounded-md flex items-center space-x-4 song-item"
    onClick={onSelectSong}
        style={{
          "--hover-background-color": backgroundColor, // Set the custom property
        }}
      >
        <img
          src={`https://cms.samespace.com/assets/${song.cover}`}
          alt={song.title}
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-full"
          />
        <div className="flex-1">
          <h3 className="text-lg text-white truncate">{song.name}</h3>
          <p className="text-sm text-gray-400 truncate">{song.artist}</p>
        </div>
      </div>
    </div>
  );
}

export default SongItem;
