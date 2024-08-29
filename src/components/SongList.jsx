import React from "react";
import SongItem from "./SongItem";

function SongList({ songs, onSelectSong }) {
  return (
    <div className="max-h-screen w-2/3  p-4 bg-gray-900">
      <div className="flex">
        <div className="w-1/2 p-4">
          <h2>Top Tracks</h2>
        </div>
        <div className="w-1/2 p-4">
          <h2>Top Tracks</h2>
        </div>
      </div>

      <div className="space-y-4">
        {songs.map((song) => (
          <SongItem
            key={song.id}
            song={song}
            onSelectSong={() => onSelectSong(song)}
          />
        ))}
      </div>
    </div>
  );
}

export default SongList;
