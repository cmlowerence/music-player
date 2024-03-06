import React from "react";
import "./trackCard.css";

export default function TrackCard({ track, artistData }) {
  console.log(track);
  console.log(track?.album?.images?.[2].url);
  return (
    <div className='track-card'>
      <div className='track-card-image'>
        <img src={track?.album?.images?.[2].url} alt={""} />
      </div>
      <div className='track-card-name'>
        <p className='track-name control-text-overflow_1'>{track?.name}</p>
        <p className='track-card-artist-name control-text-overflow_1'>
          {track?.album?.artists?.map((artist) => artist.name)?.join(" | ")}
        </p>
      </div>
      <div className='track-card-album control-text-overflow_2'><p>{track?.album?.name}</p></div>
    </div>
  );
}
