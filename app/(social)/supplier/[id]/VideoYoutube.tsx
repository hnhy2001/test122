"use client";
import React from "react";
import ReactPlayer from "react-player";

const VideoYoutube = ({ path }: any) => {
  return <ReactPlayer controls={true} width={'100%'} height={'auto'} style={{aspectRatio: 16/9}} url={path} />;
};

export default VideoYoutube;
