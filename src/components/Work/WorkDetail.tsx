import React, { Dispatch, useState, Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Comment } from "src/components/Article/Comment";
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
import { useProfileService } from "src/hooks";
import { LeftList } from "./LeftList";

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

  useEffect(() => {});
  return (
    <>
      <div className="project-detail">
        <h1>作品详情</h1>
        <div className="scratch-player flex">
          <iframe
            src="
          /scratch/player.html?workUrl=1
                "
            id="player"
            frameBorder="0"
            width="100%"
            height="100%"
            // scrolling="yes"
          ></iframe>
          <div className="ml-8 mt-10">
            <LeftList></LeftList>
          </div>
        </div>
        <div className="mb-8 sameW mt-4">
          {true ? (
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
                      notifyDiapatch(setSuccess(`该文章链接已复制到粘贴板`));
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
              <Popup
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
                      notifyDiapatch(setSuccess(`该文章链接已复制到粘贴板`));
                    }}
                  />
                }
              />
            </>
          )}
        </div>

        <div></div>
        <Comment slug={slug} authorId={"1"} />
      </div>
    </>
  );
};
