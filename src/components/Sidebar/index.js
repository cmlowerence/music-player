import React, { useState,useEffect } from "react";
import "./sidebar.css";
import { MdFavorite, MdSpaceDashboard } from 'react-icons/md'
import { FaGripfire, FaPlay, FaSignOutAlt } from 'react-icons/fa'
import { IoLibrary } from 'react-icons/io5'

import SidebarButton from "./SidebarButton";
import apiClient from "../../spotify";


export default function Sidebar() {
  const [image, setImage] = useState("https://i.pravatar.cc/300")
  useEffect(() => {
    apiClient.get("me")
    .then((response)=> setImage(response.data.images[1].url))
  }, [])

  return (
    <div className='sidebar-container'>
      <img
        src={image}
        className='profile-img'
        alt='Profile'
      />
      <div>
        <SidebarButton title='Feed' to='/feed' icon={<MdSpaceDashboard />}/>
        <SidebarButton title='Trending' to='/trending' icon={<FaGripfire />}/>
        <SidebarButton title='Player' to='/player' icon={<FaPlay />}/>
        <SidebarButton title='Favorites' to='/favorites' icon={<MdFavorite />}/>
        <SidebarButton title='Library' to='/' icon={<IoLibrary />}/>
      </div>
        <SidebarButton title='Sign Out' to='/' icon={<FaSignOutAlt/>}/>
    </div>
  );
}
