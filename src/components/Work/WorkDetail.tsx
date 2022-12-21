import React, { Dispatch, useState, Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Comment } from "./Comment";
import { FavoriteButton } from "./FavoriteButton";
import "./style.css";
import copy from "copy-to-clipboard";
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
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/redux/store";
import { LoaderAction } from "src/redux/reducers/LoaderReducer";
import { NotificationAction } from "src/redux/reducers/NotifyReducer";
import {
  clearLoading,
  setError,
  setLoading,
  setSuccess,
} from "src/redux/actions";
import { useProfileService, useProjectService } from "src/hooks";
import { LeftList } from "./LeftList";
import { Avatar } from "@mui/material";
import { updateCreppyDefaultImage } from "src/utils";
import { FollowButton } from "./FollowButton";
import "./hook";
import { exitF, isFull, launch } from "./hook";
import { useHistory } from "react-router";
import { useArticleService } from "../../hooks";
import { IArticle, IMyArticle, IProject } from "../../models/types";

interface routeProps {
  slug: string;
}

export const WorkDetail = () => {
  let { slug } = useParams<routeProps>();
  const profileService = useProfileService();

  const loaderDiapatch = useDispatch<Dispatch<LoaderAction>>();
  const notifyDiapatch = useDispatch<Dispatch<NotificationAction>>();
  const [username, setUsername] = useState<string>();
  const { isAuthenticated, userInfo } = useSelector(
    (state: AppState) => state.auth
  );

  const projectService = useProjectService();
  const history = useHistory();
  const { isLoading, messageContent } = useSelector(
    (state: AppState) => state.loader
  );

  const [singleProject, setSingleProject] = useState<IProject>();

  const [isF, setIsF] = useState<boolean>();

  const retrieveArticle = async () => {
    const singleArticleRes = await projectService.getProject(slug);
    const article = singleArticleRes.data.data as IProject;
    await profileService.isFollow(article.author.id).then((res) => {
      console.log(res.data);
      setIsF(res.data.data);
    });

    setSingleProject(article);
    setUsername(article.author.nickname);
  };
  useEffect(() => {
    const retrieveSingleArticle = async () => {
      loaderDiapatch(setLoading("获取项目"));
      await retrieveArticle();

      loaderDiapatch(clearLoading());
    };
    retrieveSingleArticle();
  }, []);

  // const handleDeleteArticle = async () => {
  //   try {
  //     await articleService.deleteArticle(slug);
  //     notifyDiapatch(setSuccess("成功删除文章."));
  //     history.push("/");
  //   } catch (error: any) {
  //     notifyDiapatch(setError(error.data.errors));
  //   }
  // };

  useEffect(() => {
    //scratch全屏
    launch();
    exitF();
    isFull();
  });
  if (slug == "1" || singleProject === undefined) {
    return (
      <>
        <script src="/js/common.js"></script>

        <div className="project-detail">
          <div className="flex justify-between">
            <div className="text-4xl font-medium text-black">
              我的世界：历史
            </div>
            <Button primary className="toDesign">
              转到设计页
            </Button>
          </div>

          <div
            style={{ display: "flex" }}
            className="text-2xl mt-6 space-x-8 items-center text-black font-normal"
          >
            <Avatar
              src={updateCreppyDefaultImage(null)}
              sx={{ width: 30, height: 30, border: 1 }}
            />
            <div>{"JackChen"}</div>
            <div>
              {/* <FollowButton
                profile={singleProject?.author ?? null}
                isF={isF}
                setIsF={setIsF}
              ></FollowButton> */}
            </div>
            <div>{"LV1"}</div>
            <div>{"发布于2022-12-11 5:42"}</div>
          </div>
          <div className="scratch-player flex">
            <div className="w-4/5 overflow-hidden">
              <iframe
                src="
            /scratch/player.html?workUrl=1
                  "
                id="player"
                frameBorder="0"
                width="100%"
                height="100%"
                scrolling="no"
              ></iframe>
              <div className="mb-8 sameW mt-4">
                {false ? (
                  <div>
                    <Popup
                      wide
                      trigger={
                        <Button icon basic color="violet" size="large">
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
                              // profileService
                              //   .userReward({
                              //     id: singleArticle.id,
                              //     num: 1,
                              //   })
                              //   .then((res) => {
                              //     if (res.data.success) {
                              //       notifyDiapatch(
                              //         setSuccess(
                              //           `成功为用户${singleArticle.author.nickname}打赏1金币.`
                              //         )
                              //       );
                              //     }
                              //   });
                            }}
                          />
                        </Grid.Column>
                        <Grid.Column>
                          <Button
                            color="red"
                            content="2金币"
                            fluid
                            onClick={() => {
                              // profileService
                              //   .userReward({
                              //     id: singleArticle.id,
                              //     num: 2,
                              //   })
                              //   .then((res) => {
                              //     if (res.data.success) {
                              //       notifyDiapatch(
                              //         setSuccess(
                              //           `成功为用户${singleArticle.author.nickname}打赏2金币.`
                              //         )
                              //       );
                              //     }
                              //   });
                            }}
                          />
                        </Grid.Column>
                      </Grid>
                    </Popup>
                    <Popup
                      content="分享文章"
                      trigger={
                        <Button
                          basic
                          size="large"
                          color={"violet"}
                          icon="share"
                          onClick={() => {
                            const searchParams =
                              "http://www.funcodeworld.com" +
                              decodeURI(window.location.pathname);
                            copy(searchParams);
                            notifyDiapatch(
                              setSuccess(`该文章链接已复制到粘贴板`)
                            );
                          }}
                        />
                      }
                    />
                    <div className="float-right flex space-x-4 mr-4">
                      <FavoriteButton></FavoriteButton>
                      <Icon
                        name={true ? "star outline" : "star"}
                        size="big"
                        color="yellow"
                      ></Icon>
                      132
                    </div>
                    <Divider></Divider>
                  </div>
                ) : (
                  <>
                    {" "}
                    {/* <Popup
                      content="分享文章"
                      trigger={
                        <Button
                          basic
                          size="small"
                          color={"violet"}
                          icon="share"
                          onClick={() => {
                            const searchParams =
                              "http://www.funcodeworld.com" +
                              decodeURI(window.location.pathname);
                            copy(searchParams);
                            notifyDiapatch(
                              setSuccess(`该文章链接已复制到粘贴板`)
                            );
                          }}
                        />
                      }
                    /> */}
                  </>
                )}
              </div>

              <div></div>
              {/* <Comment slug={slug} authorId={"1"} /> */}
              <Comment
                slug={slug}
                authorId={singleProject?.author.id}
              ></Comment>
            </div>

            <div className=" mt-10 ml-8 w-2/5">
              <div className="intro">
                <div className="flex mt-10">
                  <a className="ui basic label1 ">游戏</a>
                  <a className="ui basic label1 ">MC</a>
                </div>
                <div>
                  <div className="text-2xl mt-10 font-black">游戏介绍</div>
                  <div className="mt-6 text-lg">
                    实用鼠标控制角色运动，在生存模式生存30天获得胜利。不要忘了回去看看那个由你一手创造的历史。
                  </div>
                </div>
                <div>
                  <div className="text-2xl mt-10 font-black">操作说明</div>
                  <div className="mt-6 text-lg">
                    鼠标控制角色运动 <br />
                    R键打开背包
                    <br /> J键攻击
                  </div>
                </div>
              </div>
              <LeftList></LeftList>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <script src="/js/common.js"></script>

      <div className="project-detail">
        <div className="flex justify-between">
          <div className="text-4xl font-medium text-black">
            {singleProject?.title}
          </div>
          <Button primary className="toDesign">
            转到设计页
          </Button>
        </div>

        <div
          style={{ display: "flex" }}
          className="text-2xl mt-6 space-x-8 items-center text-black font-normal"
        >
          <Avatar
            src={updateCreppyDefaultImage(singleProject?.author.avatar ?? null)}
            sx={{ width: 30, height: 30, border: 1 }}
          />
          <div>{singleProject?.author.nickname}</div>
          <div>
            <FollowButton
              profile={singleProject?.author}
              isF={isF}
              setIsF={setIsF}
            ></FollowButton>
          </div>
          <div>{`LV${singleProject?.author.level}`}</div>
          <div>{`发布于${singleProject?.createTime}`}</div>
        </div>
        <div className="scratch-player flex">
          <div className="w-4/5 overflow-hidden">
            <iframe
              src={`/scratch/player.html?workId=${slug}`}
              id="player"
              frameBorder="0"
              width="100%"
              height="100%"
              scrolling="no"
            ></iframe>
            <div className="mb-8 sameW mt-4">
              {false ? (
                <div>
                  <Popup
                    wide
                    trigger={
                      <Button icon basic color="violet" size="large">
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
                            // profileService
                            //   .userReward({
                            //     id: singleArticle.id,
                            //     num: 1,
                            //   })
                            //   .then((res) => {
                            //     if (res.data.success) {
                            //       notifyDiapatch(
                            //         setSuccess(
                            //           `成功为用户${singleArticle.author.nickname}打赏1金币.`
                            //         )
                            //       );
                            //     }
                            //   });
                          }}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Button
                          color="red"
                          content="2金币"
                          fluid
                          onClick={() => {
                            // profileService
                            //   .userReward({
                            //     id: singleArticle.id,
                            //     num: 2,
                            //   })
                            //   .then((res) => {
                            //     if (res.data.success) {
                            //       notifyDiapatch(
                            //         setSuccess(
                            //           `成功为用户${singleArticle.author.nickname}打赏2金币.`
                            //         )
                            //       );
                            //     }
                            //   });
                          }}
                        />
                      </Grid.Column>
                    </Grid>
                  </Popup>
                  <Popup
                    content="分享文章"
                    trigger={
                      <Button
                        basic
                        size="large"
                        color={"violet"}
                        icon="share"
                        onClick={() => {
                          const searchParams =
                            "http://www.funcodeworld.com" +
                            decodeURI(window.location.pathname);
                          copy(searchParams);
                          notifyDiapatch(
                            setSuccess(`该文章链接已复制到粘贴板`)
                          );
                        }}
                      />
                    }
                  />
                  <div className="float-right flex space-x-4 mr-4">
                    <FavoriteButton></FavoriteButton>
                    <Icon
                      name={true ? "star outline" : "star"}
                      size="big"
                      color="yellow"
                    ></Icon>
                    132
                  </div>
                  <Divider></Divider>
                </div>
              ) : (
                <>
                  {" "}
                  {/* <Popup
                    content="分享文章"
                    trigger={
                      <Button
                        basic
                        size="small"
                        color={"violet"}
                        icon="share"
                        onClick={() => {
                          const searchParams =
                            "http://www.funcodeworld.com" +
                            decodeURI(window.location.pathname);
                          copy(searchParams);
                          notifyDiapatch(
                            setSuccess(`该文章链接已复制到粘贴板`)
                          );
                        }}
                      />
                    }
                  /> */}
                </>
              )}
            </div>

            <div></div>
            {/* <Comment slug={slug} authorId={"1"} /> */}
            <Comment slug={slug} authorId={singleProject?.author.id}></Comment>
          </div>

          <div className=" mt-10 ml-8 w-2/5">
            <div className="intro">
              <div className="flex mt-10">
                {singleProject?.tagName?.split(",").map((tag) => {
                  <a className="ui basic label1 ">{tag}</a>;
                })}
                <a className="ui basic label1 ">游戏</a>
                <a className="ui basic label1 ">MC</a>
              </div>
              <div>
                <div className="text-2xl mt-10 font-black">游戏介绍</div>
                <div className="mt-6 text-lg">{singleProject?.summary}</div>
              </div>
              <div>
                <div className="text-2xl mt-10 font-black">操作说明</div>
                <div className="mt-6 text-lg">{singleProject?.description}</div>
              </div>
            </div>
            <LeftList></LeftList>
          </div>
        </div>
      </div>
    </>
  );
};
