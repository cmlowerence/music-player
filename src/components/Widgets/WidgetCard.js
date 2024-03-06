import React from "react";
import "./widgetCard.css";
import WidgetEntry from "./WidgetEntry";
import { IconContext } from "react-icons";
import { FiChevronRight } from "react-icons/fi";

export default function WidgetCard({ title, similar, featured, newReleases }) {
  const formatNumber = (num) => {
    if (num >= 1000) {
      const units = ["K", "M", "B", "T"];
      let unitIndex = Math.floor(Math.log10(num) / 3) - 1;
      let formattedNum = num / Math.pow(10, unitIndex * 3);
      return formattedNum.toFixed(1) + units[unitIndex];
    } else {
      return num.toString();
    }
  };
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
