import React, { useState, useEffect } from "react";
import apiClient from "../../spotify";
import "./library.css";
import "./library-media.css";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Library() {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    apiClient.get("me/playlists").then((response) => {
      setPlaylists(response.data.items);
    });
  }, []);

  const navigate = useNavigate();

  const playPlaylist = (playlist_id)=>{
    navigate('/player', {state: {id : playlist_id, type: 'playlist'}})
  }
  return (
    <div className='screen-container'>
      <div className='library-body'>
        {playlists?.map((playlist) => (
          <div className='playlist-card' key={playlist.id} onClick={()=>playPlaylist(playlist.id)}>
            <img src={playlist.images[0].url} className="playlist-image" alt="Playlist-Art" />
            <p className="playlist-title">{playlist.name}</p>
            <p className="playlist-subtitle">{playlist.tracks.total} Songs</p>
            <div className="playlist-fade">
              <IconContext.Provider value={{size:'50px', color: "#e99d72"}}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
