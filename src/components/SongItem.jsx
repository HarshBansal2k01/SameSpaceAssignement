import React from "react";

function SongItem({ song, onSelectSong }) {
  return (
    <div className="mb-2">
      
      <div
        className="p-2 cursor-pointer hover:bg-gray-700 transition rounded-md flex items-center space-x-4"
        onClick={onSelectSong}
      >
        <img
          src={`https://cms.samespace.com/assets/${song.cover}`}
          alt={song.title}
          className="w-12 h-12 rounded-full"
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
