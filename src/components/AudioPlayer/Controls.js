import React, { useEffect, useCallback } from "react";
import "./controls.css";
import { IconContext } from "react-icons";
import {
  IoPlay,
  IoPlaySkipForward,
  IoPlaySkipBack,
  IoPause,
} from "react-icons/io5";

export default function Controls({
  isPlaying,
  togglePlay,
  handleNext,
  handlePrev,
  total,
}) {
  const togglePlayPause = useCallback(() => {
    togglePlay();
  }, [togglePlay]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        togglePlayPause();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [togglePlayPause]);

  return (
    <IconContext.Provider value={{ size: "35px", color: "#c4d0e3" }}>
      <div className='controls-wrapper flex'>
        <div className='action-btn flex' onClick={handlePrev}>
          <IoPlaySkipBack />
        </div>
        <div className='play-pause-btn flex' onClick={togglePlayPause}>
          {isPlaying ? <IoPause /> : <IoPlay />}
        </div>
        <div className='action-btn flex' onClick={handleNext}>
          <IoPlaySkipForward />
        </div>
      </div>
    </IconContext.Provider>
  );
}
