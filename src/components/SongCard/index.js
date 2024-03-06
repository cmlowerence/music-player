import React, { useEffect, useMemo, useState } from "react";
import "./songCard.css";
import AlbumInfo from "./AlbumInfo";
import AlbumImage from "./AlbumImage";
import apiClient from "../../spotify";

export default function SongCard({ currentTrack, coverImgs, trackState }) {

  const [albumInfo, setAlbumInfo] = useState({
    name: 'Unknown',
    artists : ['Unknown'],
    type : 'Album',
    tracks : 0,
    release_date : '0000/00/00'
  })

  useEffect(() => {
    if (trackState?.type === "album") {
      apiClient.get(`albums/${trackState?.id}`).then((response) => {
        const data = response.data
        setAlbumInfo({
          name: data?.name,
          artists : data?.artists?.map(artist=>artist?.name),
          type: data?.album_type,
          tracks: data?.total_tracks,
          release_date : data?.release_date
        })
      });
    } else if (trackState?.type==='playlist'){
      console.log(currentTrack)
      setAlbumInfo({
        name: currentTrack?.name,
        artists: currentTrack?.album?.artists?.map(artist=>artist?.name),
        type: currentTrack?.album?.album_type,
        tracks: currentTrack?.album?.total_tracks,
        release_date : currentTrack?.album?.release_date
      })
    }
  },[currentTrack, trackState]);

  useMemo(() => albumInfo, [albumInfo]);

  return (
    <div className='songCard-body flex'>
      <AlbumImage url={coverImgs?.[0]} />
      <AlbumInfo albumInfo={albumInfo}/>
    </div>
  );
}
