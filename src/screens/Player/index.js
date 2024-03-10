// import React, { useRef } from "react";
import "./player-media.css";
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
  const [cachedObject, setCachedObject] = useState({});

  useEffect(() => {
    // Set the cached data if it doesn't exist
    if (!window.localStorage.getItem("spotifyToken_cachedData")) {
      const cacheData = {
        id: "37i9dQZF1DX0ieekvzt1Ic",
        type: "playlist",
        coverImage: undefined,
      };
      const cacheDataStr = JSON.stringify(cacheData);
      window.localStorage.setItem("spotifyToken_cachedData", cacheDataStr);
    }
  }, [coverImgs]);
  useEffect(() => {
    if (location.state) {
      if (location.state?.type === "playlist") {
        apiClient
          .get(`playlists/${location.state?.id}/tracks`)
          .then((response) => {
            setTracks(response.data.items);
            setCurrentTrack(response.data?.items[0]?.track);
          });
      } else if (location.state?.type === "album") {
        apiClient
          .get(`albums/${location.state?.id}/tracks`)
          .then((response) => {
            setTracks(response.data.items);
            setCurrentTrack(response.data?.items?.[0]);
          })
          .catch((err) => {
            throw new Error(err.message);
          });
      } else if (location.state?.type === "track") {
        // do something
      } else {
        throw new Error("No id type given");
      }
      const _obj = {
        id: location.state?.id,
        type: location.state?.type,
        coverImage: location.state?.img_urls,
      };
      setCachedObject(_obj);
      const _objStr = JSON.stringify(_obj);
      window.localStorage.setItem("spotifyToken_cachedData", _objStr);
    } else {
      const cachedDataString = window.localStorage.getItem(
        "spotifyToken_cachedData"
      );
      let cachedData;
      cachedDataString
        ? (cachedData = JSON.parse(cachedDataString))
        : (cachedData = { id: "37i9dQZF1DX0ieekvzt1Ic", type: "playlist" });
      setCachedObject(cachedData);
      apiClient
        .get(
          `${
            cachedData?.type === "playlist"
              ? "playlists"
              : cachedData?.type === "album"
              ? "albums"
              : "playlists"
          }/${cachedData?.id}/tracks`
        )
        .then((response) => {
          if (cachedData?.type === "playlist") {
            setTracks(response.data.items);
            setCurrentTrack(response.data?.items[0]?.track);
          } else if (cachedData?.type === "album") {
            setTracks(response.data.items);
            setCurrentTrack(response.data?.items?.[0]);
          }
          let _data = JSON.parse(
            window.localStorage.getItem("spotifyToken_cachedData")
          );
          if (_data?.coverImage) {
            setCoverImgs(_data?.coverImage.split(","));
          }
        });
    }
  }, [location.state]);

  useEffect(() => {
    location.state?.type === "playlist" || cachedObject?.type === "playlist"
      ? setCurrentTrack(tracks[currentIndex]?.track)
      : location.state?.type === "album" || cachedObject?.type === "album"
      ? setCurrentTrack(tracks[currentIndex])
      : setCurrentTrack({});
  }, [currentIndex, tracks, location, cachedObject]);

  useEffect(() => {
    setCoverImgs(
      location.state?.img_urls
        ? location.state?.img_urls.split(",")
        : currentTrack?.album?.images?.map((img) => img?.url)
    );
  }, [location, currentTrack?.album]);

  return (
    <div className='screen-container playerComponent-body flex'>
      <div className='left-player-body'>
        <AudioPlayer
          currentTrack={currentTrack}
          total={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          trackOrigin={location.state?.type || cachedObject?.type}
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
          trackState={location.state || cachedObject}
        />
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
}
// 2Mj5Mpi1wwNXpjtTTFfNZz
// 1zbLfcXuRLe7wPA4nQLmQD
