import React, { useEffect, useState } from "react";
import "./trending.css";
import apiClient from "../../spotify";
import TrendingPlaylistCard from "../../components/TrendingPlaylist/TrendingPlaylistCard";
import { useNavigate } from "react-router-dom";

export default function Trending(props) {

  // const navigate = useNavigate();
  const [trendingPlaylists, setTrendingPlaylists] = useState([]);
  const [topArtists, setTopArtists] = useState([
    {
      id: "06HL4z0CvFAxyc27GXpf02",
      name: "",
      followers: 0,
      popularity: 0,
      image: "",
      top_tracks: [],
    },
    {
      id: "66CXWjxzNUsdJxJ2JdwvnR",
      name: "",
      followers: 0,
      popularity: 0,
      image: "",
      top_tracks: [],
    },
    {
      id: "1uNFoZAHBGtllmzznpCI3s",
      name: "",
      followers: 0,
      popularity: 0,
      image: "",
      top_tracks: [],
    },
    {
      id: "6eUKZXaKkcviH0Ku9w2n3V",
      name: "",
      followers: 0,
      popularity: 0,
      image: "",
      top_tracks: [],
    },
    {
      id: "0oOet2f43PA68X5RxKobEy",
      name: "",
      followers: 0,
      popularity: 0,
      image: "",
      top_tracks: [],
    },
    {
      id: "1zNqDE7qDGCsyzJwohVaoX",
      name: "",
      followers: 0,
      popularity: 0,
      image: "",
      top_tracks: [],
    },
  ]);

  const navigate = useNavigate();

  const formatNumber = (num)=> {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  useEffect(() => {
    apiClient
      .get("browse/featured-playlists/", {
        params: {
          locale: "en_US",
          country: "US",
          limit: 50,
        },
      })
      .then((response) => {
        setTrendingPlaylists(response.data.playlists.items.slice(0, 6));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  // 9129900786

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const artistRequests = topArtists.map(async (artist) => {
          const artistDetailsResponse = apiClient.get(`artists/${artist.id}`);
          const topTracksResponse = apiClient.get(
            `artists/${artist.id}/top-tracks`,
            { params: { market: "US" } }
          );
          const [artistDetails, topTracks] = await Promise.all([
            artistDetailsResponse,
            topTracksResponse,
          ]);
          return {
            ...artist,
            followers: artistDetails.data.followers.total,
            name: artistDetails.data.name,
            popularity: artistDetails.data.popularity,
            image: artistDetails.data.images[0]?.url,
            top_tracks: topTracks.data.tracks,
          };
        });

        const updatedTopArtists = await Promise.all(artistRequests);
        setTopArtists(updatedTopArtists);
      } catch (error) {
        console.error("Error fetching top artists:", error);
      }
    };

    fetchTopArtists();
  }, []);

  const playPlaylist = (playlist_id) => {
    navigate("/player", { state: { id: playlist_id, type:'playlist' } });
  };

  return (
    <div className='screen-container'>
      <div className='trending-playlist-container flex'>
        <h1 className='trending-playlist-heading'>Top Trending</h1>
        <div className='trending-playlist-wrapper'>
          {trendingPlaylists?.map((playlist) => (
            <div
              className='trending-playlist'
              onClick={() => playPlaylist(playlist?.id)}
              key={playlist?.id}
            >
              <TrendingPlaylistCard
                title={playlist?.name}
                image={
                  playlist?.images[2]?.url ||
                  playlist?.images[1]?.url ||
                  playlist?.images[0]?.url
                }
                id={playlist?.id}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='top-artists-container flex'>
        <h1 className='top-artists-heading'>Top Artists</h1>
        <div className='top-artists-wrapper'>
          {topArtists?.map((artist) => (
            <div className='top-artist-card' key={artist.id} onClick={()=>navigate(`/artist/${artist.id}`)}>
              <div className='top-artist-card-image'>
                <img src={artist.image} alt={artist.name} />
              </div>
              <div className='top-artist-card-details'>
                <div className='top-artist-name'>{artist.name}</div>
                <div className='top-artist-followers'>
                  Followers: {formatNumber(artist.followers)} {" "}
                </div>
                <div className='top-artist-popularity'>Popularity: {artist.popularity}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
