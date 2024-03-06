import React, { useEffect, useState } from "react";
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
          artists : data?.artists?.map(artist=>artist.name),
          type: data?.album_type,
          tracks: data?.total_tracks,
          release_date : data?.release_date
        })
      });
    }
  },[trackState]);
  return (
    <div className='songCard-body flex'>
      <AlbumImage url={coverImgs?.[0]} />
      <AlbumInfo albumInfo={albumInfo}/>
    </div>
  );
}
