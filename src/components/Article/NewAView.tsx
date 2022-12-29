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
import copy from "copy-to-clipboard";

import "./style.css";
import { LoaderAction } from "../../redux/reducers/LoaderReducer";
import { Avatar } from "../Home/Avatar";
import { Header } from "./Header";
import { NewAComment } from "./NewAComment";
import { FollowArtButton } from "../Home/FollowArtButton";
import { getLocalStorage } from "src/utils";

interface routeProps {
  slug: string;
}

export const NewAView = () => {
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
  const { isAuthenticated } = useSelector((state: AppState) => state.auth);
  const userInfo: any = getLocalStorage("userInfo");
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
    <div>
      <div
        className="air-container flex flex-row space-x-12"
        style={{ marginTop: "-5rem" }}
      >
        <div className="w-1/6 leftInfo flex flex-col">
          <div className="airticleInfo p-6 text-black text-center">
            查看：{singleArticle.viewCounts} | 回复：
            {singleArticle.commentCounts}
          </div>
          <Header author={singleArticle.author}></Header>
        </div>
        <div className="articleview-container">
          <div className="flex flex-row space-x-8">
            <div className="text-center text-3xl my-auto">
              {singleArticle.title}
            </div>

            <div className="my-8">
              {isAuthenticated &&
              ((userInfo && userInfo.id) || "游客") ===
                singleArticle.author.id ? (
                <Fragment>
                  {/* <Link to={`/article/edit/${slug}`}>
                <Popup
                  content="编辑文章"
                  trigger={<Button size="mini" color={"green"} icon="pencil" />}
                />
              </Link> */}
                  <Popup
                    basic
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
              {((userInfo && userInfo.id) || "游客") !==
              singleArticle.author.id ? (
                <div>
                  <Popup
                    wide
                    trigger={
                      <Button icon className="moneyButton2 shadow-md">
                        <div className="flex flex-row">
                          <div
                            style={{
                              marginLeft: " 0.1rem",
                              paddingTop: "0.4rem",
                            }}
                          >
                            {"打赏"}
                          </div>
                          <img src="/assets/money.png"></img>
                        </div>
                      </Button>
                    }
                    on="click"
                    content="对该文章作者打赏金币"
                  >
                    <Grid divided columns="equal">
                      <Grid.Column>
                        <Button
                          style={{ cursor: "pointer" }}
                          className="ccc"
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
                  <Popup
                    content="分享文章"
                    trigger={
                      <Button
                        className="shareButton2"
                        onClick={() => {
                          const searchParams =
                            "http://www.funcodeworld.com" +
                            decodeURI(window.location.pathname);
                          copy(searchParams);
                          notifyDiapatch(
                            setSuccess(`该文章链接已复制到粘贴板`)
                          );
                        }}
                      >
                        <div className="flex flex-row">
                          <div
                            style={{
                              marginLeft: " 0.1rem",
                              paddingTop: "0.4rem",
                            }}
                          >
                            {"分享"}
                          </div>
                          <img src="/assets/share1.png"></img>
                        </div>
                      </Button>
                    }
                  />
                  <Popup
                    content="收藏文章"
                    trigger={
                      <FollowArtButton
                        iarticle={singleArticle}
                      ></FollowArtButton>
                    }
                  />
                </div>
              ) : (
                <>
                  {" "}
                  <Popup
                    content="分享文章"
                    trigger={
                      <Button
                        className="shareButton2"
                        onClick={() => {
                          const searchParams =
                            "http://www.funcodeworld.com" +
                            decodeURI(window.location.pathname);
                          copy(searchParams);
                          notifyDiapatch(
                            setSuccess(`该文章链接已复制到粘贴板`)
                          );
                        }}
                      >
                        <div className="flex flex-row">
                          <div
                            style={{
                              marginLeft: " 0.1rem",
                              paddingTop: "0.4rem",
                            }}
                          >
                            {"分享"}
                          </div>
                          <img src="/assets/share1.png"></img>
                        </div>
                      </Button>
                    }
                  />
                  <Popup
                    content="收藏文章"
                    trigger={
                      <FollowArtButton
                        iarticle={singleArticle}
                      ></FollowArtButton>
                    }
                  />
                </>
              )}
            </div>
          </div>
          <div style={{ display: "flex" }} className="text-lg text-black">
            {`发表于${singleArticle.createTime}`}

            {/* <div style={{ paddingBottom: "3px" }}>
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
          <FavoriteButton iarticle={singleArticle!} /> */}
          </div>
          <Divider className="customDividerD" />
          <div className="">
            <div className="articleHigh overflow-y-scroll element">
              <div
                dangerouslySetInnerHTML={{
                  __html: singleArticle.body.contentHtml,
                }}
              ></div>
            </div>
          </div>

          <Divider className="customDivider" />
          <div className="flex justify-between text-lg">
            <div className="text-gray-400 ">回复</div>
            <div className="text-gray-400 ">举报</div>
          </div>
        </div>
      </div>
      <NewAComment slug={slug} authorId={singleArticle.author.id} />
    </div>
  );
};
