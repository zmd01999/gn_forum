import React, {
  Dispatch,
  Fragment,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
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
  Modal,
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
import { stringToHTML, urlToBlob } from "src/util";

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
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const [content, setContent] = useState("");
  const [commentId, setCommentId] = useState("");
  const [commentAId, setCommentAId] = useState("");
  const [rCon, setRCon] = useState("");
  const handleContent = (data: any) => {
    setContent(data.value);
  };

  const callBack = (res: any) => {
    // console.log("callback" + res);
    setRCon(res);
  };

  const retrieveArticle = async () => {
    const singleArticleRes = await articleService.getSingleArticle(slug);
    const article = singleArticleRes.data.data as IMyArticle;
    await profileService.isFollow(article.author.id).then((res) => {
      console.log(res.data);
      setIsF(res.data.data);
    });

    setSingleArticle(article);
    setUsername(article.author.nickname);
    // console.log("content:" + singleArticle?.body.content);
  };
  useEffect(() => {
    const retrieveSingleArticle = async () => {
      loaderDiapatch(setLoading("获取文章"));
      await retrieveArticle();

      loaderDiapatch(clearLoading());
    };
    retrieveSingleArticle();
  }, []);

  useEffect(() => {
    if (singleArticle?.body.content != undefined) {
      urlToBlob(singleArticle?.body.content, callBack);
    }
  }, [singleArticle]);

  const handleDeleteArticle = async () => {
    try {
      await articleService.deleteArticle(slug);
      notifyDiapatch(setSuccess("成功删除文章."));
      history.push("/");
    } catch (error: any) {
      notifyDiapatch(setError(error.data.errors));
    }
  };
  const handleDeleteSysArticle = async (id: string) => {
    try {
      await articleService.deleteSysArticle(slug, id);
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
              {(isAuthenticated &&
                ((userInfo && userInfo.id) || "游客") ===
                  singleArticle.author.id) ||
              (userInfo && userInfo.administrators == 2) ? (
                <Popup
                  basic
                  content="删除文章"
                  trigger={
                    <Modal
                      closeIcon
                      open={open1}
                      trigger={
                        <Button
                          size="small"
                          color={"grey"}
                          icon="trash"
                          style={{ marginLeft: "1rem" }}
                          onClick={() => {}}
                        />
                      }
                      onClose={() => setOpen1(false)}
                      onOpen={() => setOpen1(true)}
                    >
                      <Modal.Header icon="archive" content="删除" />
                      <Modal.Content>
                        <p>确定删除吗？</p>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button color="green" onClick={() => setOpen1(false)}>
                          <Icon name="remove" /> 否
                        </Button>
                        <Button
                          color="red"
                          onClick={() => {
                            if (userInfo.administrators == 2) {
                              handleDeleteSysArticle(singleArticle.author.id);
                            } else {
                              handleDeleteArticle();
                            }

                            setOpen1(false);
                          }}
                        >
                          <Icon name="checkmark" />是
                        </Button>
                      </Modal.Actions>
                    </Modal>
                  }
                />
              ) : (
                <></>
              )}
            </div>

            <div className="my-8">
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
                  __html: rCon,
                }}
              ></div>
            </div>
          </div>

          <Divider className="customDivider" />
          <div className="flex justify-between text-lg">
            <div className="text-gray-400 ">回复</div>
            <Modal
              closeIcon
              open={open}
              trigger={
                <div className="text-gray-400 " style={{ cursor: "pointer" }}>
                  举报
                </div>
              }
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
            >
              <Modal.Header icon="archive" content={`举报`} />
              <Modal.Content>
                <Form>
                  <TextArea
                    placeholder="填写您的举报内容"
                    value={content}
                    onChange={(event: SyntheticEvent, data: object) => {
                      handleContent(data);
                    }}
                  />
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button color="red" onClick={() => setOpen(false)}>
                  <Icon name="remove" /> 取消
                </Button>
                <Button
                  color="green"
                  onClick={async (event: SyntheticEvent, data: any) => {
                    articleService
                      .report({
                        articleId: singleArticle.id,
                        content: content,
                      })
                      .then((res) => {
                        if (res.data.success) {
                          notifyDiapatch(setSuccess("举报成功"));
                        }
                      });
                    setOpen(false);
                  }}
                >
                  <Icon name="checkmark" /> 发送
                </Button>
              </Modal.Actions>
            </Modal>
          </div>
        </div>
      </div>
      <NewAComment slug={slug} authorId={singleArticle.author.id} />
    </div>
  );
};
