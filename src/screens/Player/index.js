import React from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../spotify";
import SongCard from "../../components/SongCard";
import Queue from "../../components/Queue";
import AudioPlayer from "../../components/AudioPlayer";
import Widgets from "../../components/Widgets";

export default function Player() {
  const location = useLocation();

  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (location.state) {
      apiClient
        .get(`playlists/${location.state?.id}/tracks`)
        .then((response) => {
          setTracks(response.data.items);
          setCurrentTrack(response.data?.items[0]?.track);
        });
    }
  }, [location.state]);

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track);
  }, [currentIndex, tracks]);

  return (
    <div className='screen-container flex'>
      <div className='left-player-body'>
        <AudioPlayer
          currentTrack={currentTrack}
          total={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <Widgets artistId={currentTrack?.album?.artists[0]?.id} />
      </div>
      <div className='right-player-body'>
        <SongCard album={currentTrack?.album} />
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
}
