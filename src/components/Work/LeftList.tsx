import React, { Dispatch, SetStateAction } from "react";
import { Divider, Icon, Image, Item } from "semantic-ui-react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { cyan, deepOrange } from "@mui/material/colors";
import { Avatar } from "@mui/material";
import { updateCreppyDefaultImage } from "src/utils";
import { IProject } from "src/models/types";
import { useHistory } from "react-router-dom";
const paragraph = <Image src="/images/wireframe/short-paragraph.png" />;

const sameple = [
  <Item>
    <div className="w-2/3 h-24 border-2 border-blue-800 rounded-3xl mr-6 ">
      <img src="/assets/example.png" className="w-full h-full rounded-3xl" />
    </div>
    <Item.Content>
      <div className="text-2xl font-black text-black">特种作战</div>
      <Item.Meta></Item.Meta>
      <Item.Description>
        <div className="flex space-x-2 mr-4 mb-2">
          <VisibilityIcon />
          {1}k<CommentIcon sx={{ color: cyan[200] }} />
          {5.5}k<ThumbUpIcon sx={{ color: deepOrange[50] }} />
          {3}k
        </div>
      </Item.Description>

      <Item.Extra>
        <div className="flex flex-row space-x-6">
          <Avatar
            src={updateCreppyDefaultImage(null)}
            sx={{ width: 30, height: 30, border: 1 }}
          />
          <div className="text-xl font-black text-gray-900 my-auto">
            {"aaa"}
          </div>
        </div>
      </Item.Extra>
    </Item.Content>
  </Item>,
];

interface Props {
  hotList: IProject[];
  setCurrentPage: Dispatch<SetStateAction<number>>;
}
export const LeftList = ({ hotList, setCurrentPage }: Props) => {
  const history = useHistory();
  let x = 1;
  return (
    <div className="border rounded-xl p-4 bgc w-5/6">
      <div className=" flex  justify-between">
        <div className="flex flex-row text-lg text-black">
          <div style={{ fontWeight: "900" }}>| </div>{" "}
          <div className="ml-4">推荐作品</div>
        </div>
        <div
          className="text-gray-400"
          onClick={() => {
            setCurrentPage(x + 1);
            x = x + 1;
          }}
          style={{ cursor: "pointer" }}
        >
          换一批
        </div>
      </div>
      <div className="p-4 mt-6">
        <Item.Group>
          {hotList.map((hot) => {
            return (
              <Item>
                <div
                  className="w-2/3 h-24 border-2 border-blue-800 rounded-3xl mr-6 "
                  style={{
                    maxWidth: "9.5rem",
                    width: "9.5rem",
                    minWidth: "9.5rem",
                  }}
                >
                  <img
                    src={updateCreppyDefaultImage(hot.avatar)}
                    className="w-full h-full rounded-3xl"
                    style={{ borderRadius: "1.3rem", cursor: "pointer" }}
                    onClick={() => {
                      const a = document.createElement("a");
                      a.style.display = "none";
                      a.href = `/work/${hot.id}`;
                      // a.target = "_blank";
                      document.body.appendChild(a);
                      a.click();
                    }}
                  />
                </div>
                <Item.Content>
                  <div
                    className="text-2xl font-black text-black"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      const a = document.createElement("a");
                      a.style.display = "none";
                      a.href = `/work/${hot.id}`;
                      // a.target = "_blank";
                      document.body.appendChild(a);
                      a.click();
                    }}
                  >
                    {hot.title}
                  </div>
                  <Item.Meta></Item.Meta>
                  <Item.Description>
                    <div className="flex space-x-2 mr-4 mb-2">
                      <VisibilityIcon fontSize="small" />
                      {hot.viewCounts}
                      <CommentIcon fontSize="small" sx={{ color: cyan[200] }} />
                      {hot.commentCounts}
                      <ThumbUpIcon
                        fontSize="small"
                        sx={{ color: deepOrange[50] }}
                      />
                      {hot.thumbsCounts}
                    </div>
                  </Item.Description>

                  <Item.Extra>
                    <div
                      className="flex flex-row space-x-6"
                      style={{ cursor: "pointer" }}
                    >
                      <Avatar
                        src={updateCreppyDefaultImage(
                          hot.author.avatar ?? null
                        )}
                        sx={{ width: 25, height: 25, border: 0 }}
                        onClick={() => {
                          history.push(`/profile/${hot.author.id}`);
                        }}
                      />
                      <div
                        className="text-xl font-black text-gray-900 my-auto"
                        style={{ marginLeft: "0.2rem" }}
                      >
                        {hot.author.nickname.length > 5
                          ? hot.author.nickname.substring(0, 5) + "..."
                          : hot.author.nickname}
                      </div>
                    </div>
                  </Item.Extra>
                </Item.Content>
              </Item>
            );
          })}
        </Item.Group>
      </div>
    </div>
  );
};
