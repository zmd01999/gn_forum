import produce from "immer";
import React, { Dispatch, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { useArticleService } from "../../hooks";
import { NotificationAction } from "../../redux/reducers/NotifyReducer";
import { IArticle, IUser, IMyArticle } from "../../models/types";
import { setWarning } from "../../redux/actions";
import { AppState } from "../../redux/store";
import { useHistory } from "react-router-dom";

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
      <Button
        size="small"
        icon
        onClick={handleFavorite}
        className="float-right"
        basic
        color="violet"
      >
        <Icon
          name={isFollow == 1 ? "folder open outline" : "folder open"}
          basic
          color="violet"
        />
        {isFollow == 1 ? "取消" : "收藏"}&nbsp;
      </Button>
    </Fragment>
  );
};
