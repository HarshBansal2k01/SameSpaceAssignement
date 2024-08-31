import React, { useState } from "react";
import searchLogo from "../assets/search logo.png";

function Search({ songs, onFilter, backgroundColor }) {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    const filteredSongs = songs.filter(
      (song) =>
        (song.name || song.artist) &&
        (song.name.toLowerCase().includes(newQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(newQuery.toLowerCase()))
    );

    onFilter(filteredSongs);
  };

  return (
    <div
      className="relative flex items-center rounded-lg overflow-hidden w-full sm:w-[400px] h-[48px] p-2 sm:pr-[40px]"
      style={{
        backgroundColor,
      }}
    >
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search Song, Artist"
        className="w-full h-full text-gray-200 placeholder-gray-350 bg-transparent border-none focus:outline-none"
        style={{
          backgroundColor,
        }}
      />
      <img
        src={searchLogo}
        alt="Search Icon"
        className="w-[32px] h-[32px] absolute right-2 sm:right-4"
      />
    </div>
  );
}

export default Search;
