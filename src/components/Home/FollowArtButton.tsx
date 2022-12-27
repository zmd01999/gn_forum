import produce from "immer";
import React, { Dispatch, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon, Popup } from "semantic-ui-react";
import { useArticleService } from "../../hooks";
import { NotificationAction } from "../../redux/reducers/NotifyReducer";
import { IArticle, IUser, IMyArticle } from "../../models/types";
import { setWarning } from "../../redux/actions";
import { AppState } from "../../redux/store";
import { useHistory } from "react-router-dom";
import "../Article/style.css";

interface IProps {
  iarticle: IMyArticle;
}

export const FollowArtButton = ({ iarticle }: IProps) => {
  const articleService = useArticleService();
  const history = useHistory();
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();
  const [article, setArticle] = useState<IMyArticle>(iarticle);
  const { thumbsCounts, id, isFollow } = article;
  const { isAuthenticated } = useSelector((state: AppState) => state.auth);
  const handleFavorite = async () => {
    // TODO use anothe way to handle any
    // it's a little annoying here

    if (!isAuthenticated) {
      notifyDispatch(setWarning("你需要先登录"));
      history.push("/login");
      return;
    }

    let res: any;
    try {
      if (isFollow == 1) {
        res = await articleService.unfollowArticle(id);
      } else {
        res = await articleService.followArticle(id);
      }
      // const article = res.data.article as IMyArticle;
      setArticle(
        produce(article, (draft) => {
          draft.isFollow = draft.isFollow == 0 ? 1 : 0;
          // draft.thumbsCounts =
          //   draft.isFollow == 0 ? draft.thumbsCounts - 1 : draft.thumbsCounts + 1;
        })
      );
    } catch (error) {
      // TODO handle error diapatch
    }
  };

  return (
    <Fragment>
      <Popup
        content="收藏"
        trigger={
          <Button
            icon
            className="thumbButton2 shadow-md"
            style={
              isFollow == 0
                ? { backgroundColor: "rgb(172 172 172)" }
                : { backgroundColor: "rgb(59 109 199)" }
            }
            onClick={handleFavorite}
          >
            <div className="flex flex-row" style={{ cursor: "pointer" }}>
              <div
                style={{
                  marginLeft: " 0.1rem",
                  cursor: "pointer",
                }}
              >
                {"收藏"}
              </div>
              <img
                src="/assets/follow.png"
                style={{ marginLeft: "0.4rem" }}
              ></img>
            </div>
          </Button>
        }
      />
    </Fragment>
  );
};
