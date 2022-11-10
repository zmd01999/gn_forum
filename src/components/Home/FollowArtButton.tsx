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
  const { thumbsCounts, id } = article;
  const { isAuthenticated } = useSelector((state: AppState) => state.auth);
  const favorited = false;
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
      if (favorited) {
        res = await articleService.unfavoriteArticle(id);
      } else {
        res = await articleService.favoriteArticle(id);
      }
      const article = res.data.article as IMyArticle;
      setArticle(
        produce(article, (draft) => {
          // draft.favorited = article.favorited;
          draft.thumbsCounts = article.thumbsCounts;
        })
      );
    } catch (error) {
      // TODO handle error diapatch
    }
  };

  return (
    <Fragment>
      <Button size="tiny" icon >
        <Icon name={favorited ? "folder open outline" : "folder open"} />
        {favorited ? "取消收藏" : "收藏"}&nbsp; ({thumbsCounts})
      </Button>
    </Fragment>
  );
};
