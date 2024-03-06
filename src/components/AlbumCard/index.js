import React from "react";
import "./albumCard.css";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function AlbumCard({ album }) {

  const navigate = useNavigate();
  const playAlbum = (album_id)=>{
    navigate('/player',{state: {id : album_id, type: 'album',img_urls:`${album?.images?.map(img=>img?.url)}`}})
  }

  return (
    <div className='artist-album-item' onClick={()=>playAlbum(album?.id)}>
      <div className='artist-album-image'>
        <img src={album?.images?.[1]?.url} alt={album?.name} />
      </div>
      <p className='album-title'>{album?.name}</p>
      <p className='album-subtitle'>{album?.total_tracks} Songs</p>
      <div className='album-fade'>
          <IconContext.Provider value={{ size: "50px", color: "#e99d72" }}>
            <AiFillPlayCircle />
          </IconContext.Provider>
        </div>
    </div>
  );
}
