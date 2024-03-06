import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../spotify";
import "./artists.css";
import { IconContext } from "react-icons";
import { SlSocialSpotify } from "react-icons/sl";
import AlbumCard from "../../components/AlbumCard";

export default function Artists() {
  const { id } = useParams();
  const [artistData, setArtistData] = useState({});
  const [artistTopTracks, setArtistTopTracks] = useState({});
  const [artistTopAlbums, setArtistTopAlbums] = useState({});
  const [expendedTracks, setExpendedTracks] = useState(false);
  const [expendedAlbums, setExpendedAlbums] = useState(false);
  function toProperCase(str) {
    return str.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    });
  }
  function formatNumber(num) {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  useEffect(() => {
    const fetchData = async () => {
      const getArtistData = apiClient.get(`/artists/${id}`);
      const getArtistTopTracks = apiClient.get(`/artists/${id}/top-tracks`);
      const getArtistTopAlbums = apiClient.get(`/artists/${id}/albums`);

      const [_artistData, _artistTopTracks, _artistTopAlbums] =
        await Promise.all([
          getArtistData,
          getArtistTopTracks,
          getArtistTopAlbums,
        ]);

      setArtistData(_artistData.data);
      setArtistTopTracks(_artistTopTracks.data);
      setArtistTopAlbums(_artistTopAlbums.data);
    };
    fetchData();
  }, [id]);

  return (
    <div className='screen-container flex'>
      <div className='artist-left'>
        <p className='artist-name flex'>{artistData?.name}</p>
        <div className='artist-albums flex'>
          <span
            className='album_see-more'
            onClick={() => setExpendedAlbums(!expendedAlbums)}
          >
            Show {expendedAlbums ? "Less ▲" : "More ▼"}
          </span>
          {expendedAlbums
            ? artistTopAlbums?.items
                ?.slice(0, 10)
                ?.map((album) => <AlbumCard album={album} key={album?.id} />)
            : artistTopAlbums?.items
                ?.slice(0, 3)
                ?.map((album) => <AlbumCard album={album} key={album?.id} />)}
        </div>
        <div className='artist-tracks flex'>Tracks</div>
      </div>

      <div className='artist-right flex'>
        <div className='artist-image'>
          <img
            src={artistData?.images?.[0]?.url}
            alt={artistData?.name}
            className='artist-image-base'
          />
        </div>
        <div className='artist-details'>
          <h1>{artistData?.name}</h1>
          <span className='artist-data'>
            <p className='artist-data-item'>
              <b>Followers: </b>
              {formatNumber(artistData?.followers?.total)}
            </p>
            <p className='artist-data-item'>
              <b>Genres: </b>
              {" " + artistData?.genres?.map((g) => toProperCase(g)).join(", ")}
            </p>
            <p className='artist-data-item'>
              <b>Popularity: </b>
              {artistData?.popularity}
            </p>
            <button
              className='artist-spotify-link'
              onClick={() =>
                (window.location.href = `https://open.spotify.com/artist/${id}`)
              }
            >
              <p>View on spotify</p>{" "}
              <p>
                {" "}
                <IconContext.Provider value={{ size: "22px", color: "#ddd" }}>
                  <SlSocialSpotify />
                </IconContext.Provider>
              </p>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
