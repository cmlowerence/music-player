import React, { useEffect, useState } from "react";
import "./widgets.css";
import apiClient from "../../spotify";
import WidgetCard from "./WidgetCard";

export default function Widgets({ artistId }) {
  const [similar, setSimilar] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        if (artistId) {
          const similarArtist = await apiClient.get(
            `/artists/${artistId}/related-artists`
          );
          setSimilar(similarArtist.data.artists.splice(0, 3));
        }

        const featuredPlaylists = await apiClient.get(
          `/browse/featured-playlists`
        );
        setFeatured(featuredPlaylists.data.playlists.items.splice(0, 3));

        const _newReleases = await apiClient.get(`/browse/new-releases`);
        setNewReleases(_newReleases.data.albums.items.splice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [artistId]);

  useEffect(() => {
    console.log("Similar Artists:"); console.log(similar);
  }, [similar]);

  useEffect(() => {
    console.log("Featured Playlists:");console.log(featured)
  }, [featured]);

  useEffect(() => {
    console.log("New Releases:");console.log(newReleases);
  }, [newReleases]);

  return (
    <div className='widget-body flex'>
      <WidgetCard title='Similar Artists' similar={similar} />
      <WidgetCard title='Made For You' featured={featured} />
      <WidgetCard title='New Releases' newReleases={newReleases} />
    </div>
  );
}
