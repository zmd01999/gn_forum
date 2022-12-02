import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
interface routeProps {
  slug: string;
}
export const WorkDetail = () => {
  let { slug } = useParams<routeProps>();

  return (
    <>
      {/* <h1>作品详情</h1>
      <div className="project-detail">
        <div className="scratch-player">
          <iframe
            src="
          /scratch/player.html?workUrl=1
                "
            id="player"
            frameBorder="0"
            width="100%"
            height="100%"
            scrolling="yes"
          ></iframe>
        </div>
      </div>
      <a href="/scratch/index.html?scene=create">创作</a> */}
      <iframe
        src="
            /scratch/index.html?scene=create
                "
        id="player"
        frameBorder="0"
        width="100%"
        height="100%"
        scrolling="yes"
      ></iframe>
    </>
  );
};
