import React from "react";
import "./audioPlayer.css";
import ProgressCircle from "./ProgressCircle";
import Controls from "./Controls";
import WaveAnimation from "./WaveAnimation";

export default function AudioPlayer({ currentTrack }) {
  const artists = [];
  currentTrack?.album?.artists.forEach((artist) => artists.push(artist.name));
  console.log(artists);
  return (
    <div className='player-body flex'>
      <div className='player-left-body'>
        <ProgressCircle
          percentage={75}
          isPlaying={true}
          image={currentTrack?.album?.images[0]?.url}
          size={300}
          color='#c96850'
        />
      </div>
      <div className='player-right-body flex'>
        <p className='song-title'>{currentTrack?.name}</p>
        <p className='song-artist'>{artists.join(" | ")}</p>
        <div className='player-right-bottom flex'>
          <div className='song-duration flex'>
            <p className='duration'>00:01</p>
            <WaveAnimation />
            <p className='duration'>00:30</p>
          </div>
        </div>
        <Controls
        // isPlaying = {isPlaying}
        // setIsPlaying={setIsPlaying}
        // handleNext={handleNext}
        // handlePrev={handlePrev}
        // total={total}
        />
      </div>
    </div>
  );
}
