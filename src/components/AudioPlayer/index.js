import React, { useState, useRef, useEffect, useCallback } from "react";
import "./audioPlayer.css";
import ProgressCircle from "./ProgressCircle";
import Controls from "./Controls";
import WaveAnimation from "./WaveAnimation";
import { useLocation } from "react-router-dom";

export default function AudioPlayer({
  currentTrack,
  currentIndex,
  setCurrentIndex,
  total,
  trackOrigin,
  coverImgs,
}) {
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [currentTrackDetails, setCurrentTrackDetails] = useState({
    id: "",
    name: "",
    images: [],
    artists: [],
  });

  // Refs for audio and interval
  const audioRef = useRef(new Audio());
  const intervalRef = useRef();
  const isReady = useRef(false);

  // Function to handle next track
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % total.length);
  }, [setCurrentIndex, total?.length]);

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
  useEffect(() => {
    audioRef.current.pause();
    clearInterval(intervalRef.current);
    setIsPlaying(false);
    if (trackOrigin === "playlist") {
      setCurrentTrackDetails({
        id: currentTrack?.id,
        name: currentTrack?.name,
        images: coverImgs,
        artists: currentTrack?.album?.artists?.map((artist) => artist?.name),
      });
    } else if (trackOrigin === "album") {
      setCurrentTrackDetails({
        id: currentTrack?.id,
        name: currentTrack?.name,
        images: coverImgs,
        artists: currentTrack?.artists?.map((artist) => artist?.name),
      });
    }

    // Set up audio for the new track
    const trackUrl =
      trackOrigin === "playlist"
        ? total[currentIndex]?.track.preview_url
        : trackOrigin === "album"
        ? total[currentIndex]?.preview_url
        : "";
    audioRef.current = new Audio(trackUrl);
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
  }, [currentTrack, currentIndex, total, startTimer, trackOrigin, coverImgs]);

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

  // Function to add leading zero to numbers less than 10
  const addZero = (n) => (n < 10 ? `0${n}` : n);

  return (
    <div className='player-body flex'>
      <div className='player-left-body'>
        <ProgressCircle
          percentage={currentPercentage || 0}
          isPlaying={isPlaying || false}
          image={currentTrackDetails.images?.[1] || ""}
          size={300}
          color='#c96850'
        />
      </div>
      <div className='player-right-body flex'>
        <p className='song-title'>
          {currentTrackDetails?.name || "Unknown Song"}
        </p>
        <p className='song-artist'>
          {currentTrackDetails?.artists?.join(" | ") || "Unknown artist"}
        </p>
        <div className='player-right-bottom flex'>
          <div className='song-duration flex'>
            <p className='duration'>
              00:{addZero(Math.round(trackProgress)) || 0}
            </p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className='duration'>00:30</p>
          </div>
        </div>
        <Controls
          isPlaying={isPlaying || false}
          togglePlay={togglePlay}
          handleNext={handleNext}
          handlePrev={handlePrev}
          total={total}
        />
      </div>
    </div>
  );
}
