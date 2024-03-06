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
  const [coverImgs, setCoverImgs] = useState([]);

  useEffect(() => {
    if (location.state) {
      if (location.state?.type === "playlist") {
        apiClient
          .get(`playlists/${location.state?.id}/tracks`)
          .then((response) => {
            setTracks(response.data.items);
            setCurrentTrack(response.data?.items[0]?.track);
            window.localStorage.setItem(
              "spotifyToken_playlist_id",
              (location.state?.id).toString() || "1zbLfcXuRLe7wPA4nQLmQD"
            );
          });
      } else if (location.state?.type === "album") {
        apiClient
          .get(`albums/${location.state?.id}/tracks`)
          .then((response) => {
            setTracks(response.data.items);
            setCurrentTrack(response.data?.items?.[0]);
          });
      } else if (location.state?.type === "track") {
        // do something
      } else {
        throw new Error("No id type given");
      }
    } else {
      apiClient
        .get(
          `playlists/${
            window.localStorage.getItem("spotifyToken_playlist_id") ||
            "2Mj5Mpi1wwNXpjtTTFfNZz"
          }/tracks`
        )
        .then((response) => {
          setTracks(response.data.items);
          setCurrentTrack(response.data?.items[0]?.track);
        });
    }
  }, [location.state]);
  useEffect(() => {
    location.state?.type === "playlist"
      ? setCurrentTrack(tracks[currentIndex]?.track)
      : location.state?.type === "album"
      ? setCurrentTrack(tracks[currentIndex])
      : setCurrentTrack({})
  }, [currentIndex, tracks, location,]);

  useEffect(()=>{
    setCoverImgs(
      location.state?.img_urls
        ? location.state?.img_urls.split(",")
        : currentTrack?.album?.images?.map((img) => img?.url)
    );
  },[location, currentTrack?.album])

  return (
    <div className='screen-container flex'>
      <div className='left-player-body'>
        <AudioPlayer
          currentTrack={currentTrack}
          total={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          trackOrigin={location.state?.type}
          coverImgs={coverImgs}
        />
        <Widgets
          artistId={
            currentTrack?.album?.artists[0]?.id ||
            currentTrack?.artists?.[0]?.id
          }
        />
      </div>
      <div className='right-player-body'>
        <SongCard
          currentTrack={currentTrack}
          coverImgs={coverImgs}
          trackState={location.state}
        />
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
}
// 2Mj5Mpi1wwNXpjtTTFfNZz
// 1zbLfcXuRLe7wPA4nQLmQD
