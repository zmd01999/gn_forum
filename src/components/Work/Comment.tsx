import { Avatar } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { updateCreppyDefaultImage } from "src/utils";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { deepOrange } from "@mui/material/colors";

export const Comment = () => {
  const [comment, setComment] = useState<string>("");

  const handleCommentChange = (e: any) => {
    if (e.target.value.length > 200) {
      setComment(e.target.value.substring(0, 200));
    } else {
      setComment(e.target.value);
    }
  };
  return (
    <div className="ui comments">
      <h3 className="ui  header">评论 ({`${2}`})</h3>

      <div className="flex flex-row">
        <div className="w-8 mt-6">
          <Avatar
            src={updateCreppyDefaultImage(null)}
            sx={{ width: 30, height: 30, border: 1 }}
          />
        </div>
        <div className="w-full">
          <form
            className="ui reply form ui left pointing label w"
            style={{ width: "100%" }}
          >
            <div className="field ">
              <textarea
                rows={2}
                placeholder="发表你友善的评论"
                onChange={handleCommentChange}
                value={comment}
              ></textarea>
            </div>

            {`还可以输入${200 - comment.length}个字`}
            <button className="publishButton">发表评论</button>
          </form>
        </div>
      </div>

      <h3 className="ui  header">全部评论</h3>
      <div className="comment">
        <div className="avatar">
          <img src={updateCreppyDefaultImage(null)} />
        </div>
        <div className="content">
          <a className="author">Jamms</a>
          <div className="metadata">
            <div>2022-12-11 5:42</div>
          </div>
          <div className="text">好玩</div>
          <div className="actions action">
            <a className="">回复</a>
            <ThumbUpIcon sx={{ color: deepOrange[50] }} />
            {}
          </div>
        </div>
      </div>
      <div className="comment">
        <div className="avatar">
          <img src={updateCreppyDefaultImage(null)} />
        </div>
        <div className="content">
          <a className="author">JackChen</a>
          <div className="metadata">
            <div>2022-12-11 5:42</div>
          </div>
          <div className="text">
            <p>太有用了</p>
          </div>
          <div className="actions action">
            <a className="">回复</a>
            <ThumbUpIcon sx={{ color: deepOrange[50] }} />
            {}
          </div>
        </div>
        <div className="ui comments">
          <div className="comment">
            <div className="avatar">
              <img src={updateCreppyDefaultImage(null)} />
            </div>
            <div className="content">
              <a className="author">Jenny Hess</a>
              <div className="metadata">
                <div>2022-12-11 5:42</div>
              </div>
              <div className="text">我顶</div>
              <div className="actions action">
                <a className="">回复</a>
                <ThumbUpIcon sx={{ color: deepOrange[50] }} />
                {}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="comment">
        <div className="avatar">
          <img src={updateCreppyDefaultImage(null)} />
        </div>
        <div className="content">
          <a className="author">Joe Henderson</a>
          <div className="metadata">
            <div>2022-12-11 5:42</div>
          </div>
          <div className="text">哈哈哈哈哈哈哈</div>
          <div className="actions action">
            <a className="">回复</a>
            <ThumbUpIcon sx={{ color: deepOrange[50] }} />
            {}
          </div>
        </div>
      </div>
    </div>
  );
};
