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
      className="relative flex items-center rounded-lg overflow-hidden w-[400px] h-[48px] p-2.5 pr-[40px]"
      style={{
        backgroundColor,
      }}
    >
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search Song, Artist"
        className="w-full h-full text-gray-200 placeholder-gray-350  border-none focus:outline-none bg-transparent"
        style={{
          backgroundColor,
        }}
      />
      <img
        src={searchLogo}
        alt="Search Icon"
        className="w-[32px] h-[32px] absolute right-4 top-1/2 transform -translate-y-1/2"
      />
    </div>
  );
}

export default Search;
