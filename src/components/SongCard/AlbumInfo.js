import React from "react";
import "./albumInfo.css";

export default function AlbumInfo({ albumInfo }) {
  // const artists = [];
  // album?.artists.forEach((e) => artists.push(e.name));
  return (
    <div className='albumInfo-card'>
      <div className='albumName-container'>
        <div className='marquee'>
          <p>{`${albumInfo?.name} - ${albumInfo?.artists?.join(", ")}`}</p>
        </div>
      </div>
      <div className='album-info'>
        <p>{`${albumInfo?.name} is an ${albumInfo?.type} by ${albumInfo?.artists?.join(
          ", "
        )}, with ${albumInfo?.tracks} track(s).`}</p>
      </div>
      <div className='album-release'>
        <p>Released On: {albumInfo?.release_date}</p>
      </div>
    </div>
  );
}
