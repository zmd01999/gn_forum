import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  Button,
  Divider,
  Form,
  Icon,
  Popup,
  TextArea,
} from "semantic-ui-react";
import { useArticleService, useProfileService } from "../../hooks";
import { IArticle, IMyArticle } from "../../models/types";
import { NotificationAction } from "../../redux/reducers/NotifyReducer";
import {
  clearLoading,
  setError,
  setLoading,
  setSuccess,
} from "../../redux/actions";
import { AppState } from "../../redux/store";
import { FavoriteButton } from "../Home/FavoriteButton";
import { FollowButton } from "../Home/FollowButton";
import { Comment } from "./Comment";

import "./style.css";
import { LoaderAction } from "../../redux/reducers/LoaderReducer";
import { Avatar } from "../Home/Avatar";

interface routeProps {
  slug: string;
}

export const ArticleView = () => {
  let { slug } = useParams<routeProps>();
  const articleService = useArticleService();
  const history = useHistory();
  const { isLoading, messageContent } = useSelector(
    (state: AppState) => state.loader
  );
  const loaderDiapatch = useDispatch<Dispatch<LoaderAction>>();
  const notifyDiapatch = useDispatch<Dispatch<NotificationAction>>();
  const [singleArticle, setSingleArticle] = useState<IMyArticle>();
  const [username, setUsername] = useState<string>();

  const { isAuthenticated, user } = useSelector(
    (state: AppState) => state.auth
  );
  const retrieveArticle = async () => {
    const singleArticleRes = await articleService.getSingleArticle(slug);
    const article = singleArticleRes.data.data as IMyArticle;
    setSingleArticle(article);
    setUsername(article.author.nickname);
  };
  useEffect(() => {
    const retrieveSingleArticle = async () => {
      loaderDiapatch(setLoading("获取文章"));
      await retrieveArticle();

      loaderDiapatch(clearLoading());
    };
    retrieveSingleArticle();
  }, []);

  const handleDeleteArticle = async () => {
    try {
      await articleService.deleteArticle(slug);
      notifyDiapatch(setSuccess("成功删除文章."));
      history.push("/");
    } catch (error: any) {
      notifyDiapatch(setError(error.data.errors));
    }
  };

  if (!isLoading || singleArticle === undefined) {
    return <Fragment></Fragment>;
  }
  return (
    <div className="main-container">
      <div className="articleview-container">
        <h2>{singleArticle.title}</h2>
        <div style={{ display: "flex" }}>
          <div style={{ paddingBottom: "3px" }}>
            <Icon name="write" size="small" />
          </div>
          &nbsp;&nbsp;
          <Link to={`/profile/${singleArticle.author.nickname}`}>
            <Avatar
              image={singleArticle.author.avatar!}
              username={singleArticle.author.nickname}
            />
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <FollowButton profile={singleArticle?.author} /> &nbsp;&nbsp;
          <FavoriteButton iarticle={singleArticle!} />
        </div>

        <Divider />
        <p>{singleArticle.body.content}</p>

        {isAuthenticated && user === singleArticle.author.nickname ? (
          <Fragment>
            <Link to={`/article/edit/${slug}`}>
              <Popup
                content="edit article"
                trigger={<Button size="mini" color={"green"} icon="pencil" />}
              />
            </Link>
            <Popup
              content="delete article"
              trigger={
                <Button
                  size="mini"
                  color={"grey"}
                  icon="trash"
                  onClick={handleDeleteArticle}
                />
              }
            />
          </Fragment>
        ) : (
          <></>
        )}

        <Comment slug={slug} />
      </div>
    </div>
  );
};
