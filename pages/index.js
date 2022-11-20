import React, { useEffect, useState } from "react";
import Menu from "../src/components/Menu";
import { videoService } from "../src/services/videoService";
import { Header } from "../src/components/Header";
import { Timeline } from "../src/components/Timeline";

export default function HomePage() {
  const service = videoService();
  const [valorDoFiltro, setValorDoFiltro] = useState("");
  const [playlists, setPlaylists] = useState({});

  useEffect(() => {
    service
      .getAllVideos()
      .then((dados) => {
        const novasPlaylists = { ...playlists };
        dados.data.forEach((video) => {
          if (!novasPlaylists[video.playlists]) {
            novasPlaylists[video.playlists] = [];
          }
          novasPlaylists[video.playlists].push(video);
        })
        setPlaylists(novasPlaylists);
      });
  }, []);

  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}>
        {/* Prop Drilling */}
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={playlists}>
          Conteúdo
        </Timeline>
      </div>
    </>
  );
}