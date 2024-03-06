import React from "react";
import "./widgetCard.css";
import WidgetEntry from "./WidgetEntry";
import { IconContext } from "react-icons";
import { FiChevronRight } from "react-icons/fi";

export default function WidgetCard({ title, similar, featured, newReleases }) {
  function formatNumber(num) {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixNum = Math.floor(('' + num).length / 3);
    let shortValue = parseFloat((suffixNum !== 0 ? (num / Math.pow(1000, suffixNum)) : num).toPrecision(3));
    if (shortValue % 1 !== 0) {
        shortValue = shortValue.toFixed(1);
    }
    return shortValue + suffixes[suffixNum];
}
  return (
    <div className='widgetcard-body'>
      <p className='widget-title'>{title}</p>
      {similar
        ? similar.map((artist) => (
            <WidgetEntry
              key={artist.id}
              title={artist.name}
              subtitle={formatNumber(artist.followers.total) + " Followers"}
              image={artist.images[2]?.url}
            />
          ))
        : featured
        ? featured.map((playlist) => (
            <WidgetEntry
              key={playlist.id}
              title={playlist.name}
              subtitle={formatNumber(playlist.tracks.total) + " songs"}
              image={playlist.images[0]?.url}
            />
          ))
        : newReleases
        ? newReleases.map((album) => (
            <WidgetEntry
              key={album.id}
              title={album.name}
              subtitle={album.artists[0]?.name}
              image={album.images[2]?.url}
            />
          ))
        : null}
      <div className='widget-fade'>
        <div className='fade-button'>
          <IconContext.Provider value={{ size: "24px", color: "#c4d0e3" }}>
            <FiChevronRight />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}
