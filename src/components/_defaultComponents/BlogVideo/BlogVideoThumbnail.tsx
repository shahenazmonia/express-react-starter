import React, { StatelessComponent } from "react";
import Youtube from "react-youtube";
import webseans from "../../../logo.svg";
import config from "../../../_core/config";

interface IProps {
  media?: any;
}

const VideoThumbnail: StatelessComponent<IProps> = props => {
  const { media } = props;
  const {
    media: { type, image, url = "" }
  } = props;

  const youtube_parser = url => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

  const _onYoutubeReady = event => {
    event.target.stopVideo();
  };

  const opts = {
    height: "300",
    width: "100%",
    playerVars: {
      autoplay: 0
    }
  };
  const youtube_id = youtube_parser(url);
  if (youtube_id) {
    return (
      <Youtube
        style={{ width: "100%" }}
        videoId={youtube_id}
        opts={opts}
        onReady={_onYoutubeReady}
      />
    );
  }
  return null;
};

export default VideoThumbnail;
