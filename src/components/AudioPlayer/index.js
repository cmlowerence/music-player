import React, { useState, useRef, useEffect, useCallback } from "react";
import "./audioPlayer.css";
import ProgressCircle from "./ProgressCircle";
import Controls from "./Controls";
import WaveAnimation from "./WaveAnimation";

export default function AudioPlayer({
  currentTrack,
  currentIndex,
  setCurrentIndex,
  total,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);

  // Refs for audio and interval
  const audioRef = useRef(new Audio());
  const intervalRef = useRef();
  const isReady = useRef(false);

  // Function to handle next track
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % total.length);
  }, [setCurrentIndex, total.length]);

  // Function to handle previous track
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? total.length - 1 : prevIndex - 1
    );
  };

  // Function to start timer for track progress
  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  }, [handleNext]);

  // Effect to handle changes in currentIndex
  useEffect(() => {
    audioRef.current.pause();
    clearInterval(intervalRef.current);
    setIsPlaying(false);

    // Set up audio for the new track
    audioRef.current = new Audio(total[currentIndex]?.track.preview_url);
    audioRef.current.onloadedmetadata = () => {
      setTrackProgress(audioRef.current.currentTime);
      if (isReady.current) {
        audioRef.current.play();
        setIsPlaying(true);
        startTimer();
      } else {
        isReady.current = true;
      }
    };

    // Clean up function
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, [currentIndex, total, startTimer]);


  // Function to toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      clearInterval(intervalRef.current);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    }
  };

  // Calculate track duration and current percentage
  const duration = audioRef.current.duration || 0;
  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  // Collect artist names
  const artists =
    currentTrack?.album?.artists.map((artist) => artist.name) || [];

  // Function to add leading zero to numbers less than 10
  const addZero = (n) => (n < 10 ? `0${n}` : n);

  return (
    <div className='player-body flex'>
      <div className='player-left-body'>
        <ProgressCircle
          percentage={currentPercentage}
          isPlaying={isPlaying}
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
            <p className='duration'>00:{addZero(Math.round(trackProgress))}</p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className='duration'>00:30</p>
          </div>
        </div>
        <Controls
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          handleNext={handleNext}
          handlePrev={handlePrev}
          total={total}
        />
      </div>
    </div>
  );
}
