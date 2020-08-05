import React from "react";
import "./Body.css";
import Header from "./Header";
import { useStateValue } from "./StateProvider";
import SongRow from "./SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

function Body({ spotify }) {
  const [{ discover_weekly }, dispatch] = useStateValue();

  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:37i9dQZEVXcJZyENOWUFo7`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
        });
      });
  }
};

const playSong = (id) => {
  spotify
    .paly({
      uris: [`spotify:track${id}`],
    })
    .then((res) => {
      spotify.getMyCurrentPlayingTrack().then((r) => {
        dispatch({
          type: "SET_ITEM",
          item: r.item,
        });
        dispatch({
          type: "SET_PLAYING",
          playing: true,
        });
      });
    });
};

return (
  <div className="body">
    <Header spotify={spotify} />

    <div className="body__info">
      <img src={discover_weekly?.images[0].url} alt="" />
      <div className="body__infoText">
        <strong>プレイリスト</strong>
        <h2>今週の音楽</h2>
        <p>{discover_weekly?.description}</p>
      </div>
    </div>
  
    <div className="body__songs">
      <div className="body__icons">
        <PlayCircleFilledIcon className="body__shuffle" onClick={playPlaylist} />
        <FavoriteIcon fontSize="large" />
        <MoreHorizIcon />
      </div>

      {discover_weekly?.tracks.items.map((item) => (
        <SongRow playSong={playSong} track={item.track} />
      ))}
    </div>
  </div>
);

export default Body;