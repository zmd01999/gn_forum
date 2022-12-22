import produce from "immer";
import React, { Dispatch, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { useArticleService, useProjectService } from "../../hooks";
import { NotificationAction } from "../../redux/reducers/NotifyReducer";
import { IArticle, IUser, IMyArticle, IProject } from "../../models/types";
import { setWarning } from "../../redux/actions";
import { AppState } from "../../redux/store";
import { useHistory } from "react-router-dom";

interface IProps {
  iarticle: IProject;
}

export const FavoriteButton = ({ iarticle }: IProps) => {
  const projectService = useProjectService();
  const history = useHistory();
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();
  const [article, setArticle] = useState<IProject>(iarticle);
  const { thumbsCounts, id, isZan } = article;
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
      if (isZan == 1) {
        res = await projectService.unfavoriteProject(id);
      } else {
        res = await projectService.favoriteProject(id);
      }
      // const article = res.data.article as IMyArticle;
      setArticle(
        produce(article, (draft) => {
          draft.isZan = draft.isZan == 0 ? 1 : 0;
          draft.thumbsCounts =
            draft.isZan == 0 ? draft.thumbsCounts - 1 : draft.thumbsCounts + 1;
        })
      );
    } catch (error) {
      // TODO handle error diapatch
    }
  };

  return (
    <Fragment>
      {/* <Button size="tiny" icon onClick={handleFavorite} className="float-right">
        <Icon name={isZan == 1 ? "heart outline" : "heart"} />
        {isZan == 1 ? "取消" : "点赞"}&nbsp; ({thumbsCounts})
      </Button> */}
      {/* <Button
        basic
        color="violet"
        content={isZan == 1 ? "取消" : "点赞"}
        icon={isZan == 1 ? "heart outline" : "heart"}
        label={{ as: "a", basic: true, content: "3", color: "violet" }}
        labelPosition="right"
        size="tiny"
        // onClick={handleFavorite}
        className="float-right"
      /> */}
      <Icon
        name={isZan == 1 ? "heart" : "heart outline"}
        size="big"
        color="red"
        onClick={handleFavorite}
      ></Icon>
      <div style={{ textAlign: "center" }}>{article.thumbsCounts}</div>
    </Fragment>
  );
};
