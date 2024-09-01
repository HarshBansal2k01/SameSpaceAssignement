import React, { useState } from "react";
import searchLogo from "../assets/searchLogo.svg";

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
    <div className="relative flex items-center rounded-lg overflow-hidden w-full sm:w-[400px] h-[48px] pt-2 pb-2 pl-4 pr-4 sm:pr-[40px] bg-black bg-opacity-25">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search Song, Artist"
        className="w-full h-full text-gray-200 placeholder-gray-350 bg-transparent border-none focus:outline-none text-[18px]"
      />
      <img
        src={searchLogo}
        alt="Search Icon"
        className="w-[19.33px] h-[19.33px] absolute right-2 sm:right-4 text-gray-300"
      />
    </div>
  );
}

export default Search;
