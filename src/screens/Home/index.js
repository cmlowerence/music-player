import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Library from "../Library";
import Trending from "../Trending";
import Player from "../Player";
import "./home.css";
import Sidebar from "../../components/Sidebar";
import Login from "../auth/Login";
import { setClientToken } from "../../spotify";
import Artists from "../Artists";

export default function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const time = new Date();
    const token =
      parseInt(window.localStorage.getItem("spotifyToken_expiry")) <
      time.getTime()
        ? ""
        : window.localStorage.getItem("spotifyToken_token");
    const hash = window.location.hash;
    window.location.hash = "";

    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      const expiresAt = time.getTime() + 3600 * 1000;
      window.localStorage.setItem("spotifyToken_token", _token);
      window.localStorage.setItem("spotifyToken_expiry", expiresAt);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);
  return !token ? (
    <Login />
  ) : (
    <Router>
      <div className='main-body'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Library />}></Route>
          <Route path='/trending' element={<Trending />}></Route>
          <Route path='/player' element={<Player />}></Route>
          <Route path='/artist/:id' element={<Artists />} />
        </Routes>
      </div>
    </Router>
  );
}
