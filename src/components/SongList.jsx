import React, { useEffect, useState } from "react";
import SongItem from "./SongItem";
import Search from "./Search";

function SongList({ songs, onSelectSong }) {
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [selectedSection, setSelectedSection] = useState("For You");

  useEffect(() => {
    filterSongs();
  }, [songs, selectedSection]);

  const handleSearch = (searchResults) => {
    filterSongs(searchResults);
  };

  const filterSongs = (searchResults = songs) => {
    if (selectedSection === "Top Tracks") {
      setFilteredSongs(searchResults.filter((song) => song.top_track));
    } else {
      setFilteredSongs(searchResults);
    }
  };

  return (
    <div className="relative w-[432px] h-[856px] mt-[40px] ml-[280px] opacity-100 p-4">
      <div className="flex gap-0">
        <div
          className={`w-auto cursor-pointer pr-4 ${
            selectedSection === "For You" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => setSelectedSection("For You")}
        >
          <h2 className="font-inter text-[24px] font-bold leading-[32px] text-left">
            For You
          </h2>
        </div>
        <div
          className={`w-auto cursor-pointer pl-4 ${
            selectedSection === "Top Tracks" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => setSelectedSection("Top Tracks")}
        >
          <h2 className="font-inter text-[24px] font-bold leading-[32px] text-left">
            Top Tracks
          </h2>
        </div>
      </div>
      <div className="mt-4">
        <Search onFilter={handleSearch} songs={songs} />
      </div>
      <div className="space-y-2 mt-4">
        {filteredSongs.map((song) => (
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
