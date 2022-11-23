import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  Button,
  Divider,
  Form,
  Grid,
  Icon,
  Label,
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
  const profileService = useProfileService();
  const history = useHistory();
  const { isLoading, messageContent } = useSelector(
    (state: AppState) => state.loader
  );
  const loaderDiapatch = useDispatch<Dispatch<LoaderAction>>();
  const notifyDiapatch = useDispatch<Dispatch<NotificationAction>>();
  const [singleArticle, setSingleArticle] = useState<IMyArticle>();
  const [username, setUsername] = useState<string>();
  const [isF, setIsF] = useState<boolean>();
  const { isAuthenticated, userInfo } = useSelector(
    (state: AppState) => state.auth
  );
  const retrieveArticle = async () => {
    const singleArticleRes = await articleService.getSingleArticle(slug);
    const article = singleArticleRes.data.data as IMyArticle;
    await profileService.isFollow(article.author.id).then((res) => {
      console.log(res.data);
      setIsF(res.data.data);
    });

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
          {userInfo.id === singleArticle.author.id ? (
            <></>
          ) : (
            <FollowButton
              profile={singleArticle?.author}
              isF={isF}
              setIsF={setIsF}
            />
          )}{" "}
          &nbsp;&nbsp;
          <FavoriteButton iarticle={singleArticle!} />
        </div>

        <Divider />
        <div
          dangerouslySetInnerHTML={{ __html: singleArticle.body.contentHtml }}
        ></div>
        <div className="my-8">
          {isAuthenticated && userInfo.id === singleArticle.author.id ? (
            <Fragment>
              {/* <Link to={`/article/edit/${slug}`}>
                <Popup
                  content="编辑文章"
                  trigger={<Button size="mini" color={"green"} icon="pencil" />}
                />
              </Link> */}
              <Popup
                content="删除文章"
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
          {userInfo.id !== singleArticle.author.id ? (
            <div>
              <Popup
                wide
                trigger={
                  <Button icon>
                    {"打赏"}
                    <Icon name="world" />
                  </Button>
                }
                on="click"
                content="对该文章作者打赏金币"
              >
                <Grid divided columns="equal">
                  <Grid.Column>
                    <Button
                      color="blue"
                      content="1金币"
                      fluid
                      onClick={() => {
                        profileService
                          .userReward({
                            id: singleArticle.id,
                            num: 1,
                          })
                          .then((res) => {
                            if (res.data.success) {
                              notifyDiapatch(
                                setSuccess(
                                  `成功为用户${singleArticle.author.nickname}打赏1金币.`
                                )
                              );
                            }
                          });
                      }}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Button
                      color="red"
                      content="2金币"
                      fluid
                      onClick={() => {
                        profileService
                          .userReward({
                            id: singleArticle.id,
                            num: 2,
                          })
                          .then((res) => {
                            if (res.data.success) {
                              notifyDiapatch(
                                setSuccess(
                                  `成功为用户${singleArticle.author.nickname}打赏2金币.`
                                )
                              );
                            }
                          });
                      }}
                    />
                  </Grid.Column>
                </Grid>
              </Popup>
            </div>
          ) : (
            <></>
          )}
        </div>

        <Comment slug={slug} authorId={singleArticle.author.id} />
      </div>
    </div>
  );
};
