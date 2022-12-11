import React from "react";
import { Divider, Icon, Image, Item } from "semantic-ui-react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { cyan, deepOrange } from "@mui/material/colors";
import { Avatar } from "@mui/material";
import { updateCreppyDefaultImage } from "src/utils";
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
export const LeftList = () => {
  return (
    <div className="border rounded-xl p-4 bgc w-5/6">
      <div className=" flex  justify-between">
        <div className="text-lg text-black">|推荐作品</div>
        <div className="text-gray-400">换一批</div>
      </div>
      <div className="p-4 mt-6">
        <Item.Group>
          <Item>
            <div className="w-2/3 h-24 border-2 border-blue-800 rounded-3xl mr-6 ">
              <img
                src="/assets/example.png"
                className="w-full h-full rounded-3xl"
              />
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
          </Item>
          {sameple}
          {sameple}
          {sameple}
          {sameple}
          {sameple}
          {sameple}
          {sameple}
        </Item.Group>
      </div>
    </div>
  );
};
