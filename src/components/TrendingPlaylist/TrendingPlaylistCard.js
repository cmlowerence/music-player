import React from "react";
import "./trendingPlaylistCard.css";
import "./trendingPlaylistCard-media.css";

export default function TrendingPlaylistCard({ title, image }) {
  return (
    <div className='trending-playlist-element flex'>
      <div className='trending-playlist-image'>
        <img src={image} alt={title} />
      </div>
      <div className='trending-playlist-name'>{title}</div>
    </div>
  );
}
