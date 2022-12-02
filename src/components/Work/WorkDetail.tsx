import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Comment } from "src/components/Article/Comment";
import "./style.css";
interface routeProps {
  slug: string;
}
export const WorkDetail = () => {
  let { slug } = useParams<routeProps>();

  return (
    <>
      <div className="project-detail">
        <h1>作品详情</h1>
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
        <Comment slug={slug} authorId={"1"} />
      </div>
    </>
  );
};
