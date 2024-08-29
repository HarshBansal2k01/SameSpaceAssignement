import React, { useState, useEffect, useRef } from 'react';

function Player({ song }) {
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     if (isPlaying) {
//       audioRef.current.play();
//     } else {
//       audioRef.current.pause();
//     }
//   }, [isPlaying]);

  return (
    // <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
    //   <div className="flex items-center justify-between">
    //     <div className="flex items-center space-x-4">
    //       <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.title} className="w-12 h-12 rounded" />
    //       <div>
    //         <h3 className="text-lg">{song.title}</h3>
    //         <p className="text-sm text-gray-400">{song.artist}</p>
    //       </div>
    //     </div>
    //     <div>
    //         <h1>player</h1>
    //       <button 
    //         className="px-4 py-2 bg-gray-700 rounded-full hover:bg-gray-600 transition"
    //         onClick={() => setIsPlaying(!isPlaying)}
    //       >
    //         {isPlaying ? 'Pause' : 'Play'}
    //       </button>
    //     </div>
    //   </div>
    //   <audio ref={audioRef} src={song.url} />
    // </div>
    <>
    <h1>Player</h1>
    </>
  );
}

export default Player;
