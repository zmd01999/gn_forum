import "./index.css";
import Work from "src/components/BaseUtils/tre/WorkSelect";
import { LgCard } from "../Auth/LgCard";
import { HotTable } from "./HotTable";
import { Card, Grid, Image } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { useProfileService, useProjectService } from "src/hooks";
import { Dispatch, useEffect, useState } from "react";
import { AppState } from "src/redux/store";
import { getLocalStorage, updateCreppyDefaultImage } from "src/utils";
import { useHistory } from "react-router-dom";
import { Avatar } from "@mui/material";
import {
  clearLoading,
  logoutUser,
  setLoading,
  setWarning,
} from "src/redux/actions";
import { NotificationAction } from "../../redux/reducers/NotifyReducer";
import { IProject } from "src/models/types";

export const MainPage = () => {
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();
  const profileService = useProfileService();
  const projectService = useProjectService();
  const { isAuthenticated } = useSelector((state: AppState) => state.auth);
  const history = useHistory();
  const userInfoLocal: any = getLocalStorage("userInfo");
  const [project1, setProject1] = useState<IProject[]>();
  useEffect(() => {
    let articleRes;
    const retrieve = async () => {
      articleRes = await projectService.getWeekProject({
        page: 1,
      });
      setProject1(articleRes.data.data);
    };
    retrieve();
  }, []);
  return (
    <div>
      <div
        className="p-10 bigPic"
        style={{ backgroundImage: "url(/assets/mainbg.png)" }}
      >
        <div>
          <img src="/assets/welcome.png" alt="" className="logo" />
        </div>
      </div>

      <div className="flex justify-between middleM px-8 py-6">
        <div>
          <div className="flex flex-row">
            <img
              src="/assets/tab1.png"
              onClick={() => {
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = "/scratch/index.html?scene=create";
                a.target = "_blank";
                document.body.appendChild(a);
                a.click();
              }}
            ></img>
            <div className="navlm">
              <div
                className="navBf"
                onClick={() => {
                  const a = document.createElement("a");
                  a.style.display = "none";
                  a.href = "/scratch/index.html?scene=create";
                  a.target = "_blank";
                  document.body.appendChild(a);
                  a.click();
                }}
              >
                在线创作
              </div>
              <div
                className="navSf"
                onClick={() => {
                  const a = document.createElement("a");
                  a.style.display = "none";
                  a.href = "/scratch/index.html?scene=create";
                  a.target = "_blank";
                  document.body.appendChild(a);
                  a.click();
                }}
              >
                把创意变成现实
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row">
          <div>
            <img
              src="/assets/tab2.png"
              onClick={() => history.push("/work")}
            ></img>
          </div>

          <div className="navlm">
            <div className="navBf" onClick={() => history.push("/work")}>
              发现作品
            </div>
            <div className="navSf" onClick={() => history.push("/work")}>
              高质量作品资源库
            </div>
          </div>
        </div>

        <div className="flex flex-row">
          <img
            src="/assets/tab3.png"
            onClick={() => history.push("/forum")}
          ></img>
          <div className="navlm" onClick={() => history.push("/forum")}>
            <div className="navBf">交流论坛</div>
            <div className="navSf">青少年编程学习必看</div>
          </div>
        </div>

        <div className="flex flex-row">
          <img
            src="/assets/tab4.png"
            onClick={() => {
              if (!isAuthenticated) {
                notifyDispatch(setWarning("您需要先登录"));

                return;
              }
              history.push(`/pcenter/${userInfoLocal.id}`);
            }}
          ></img>
          <div
            className="navlm"
            onClick={() => {
              if (!isAuthenticated) {
                notifyDispatch(setWarning("您需要先登录"));

                return;
              }
              history.push(`/pcenter/${userInfoLocal.id}`);
            }}
          >
            <div className="navBf">个人中心</div>
            <div className="navSf">专属你的灵感空间</div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-row">
          <div
            className="w-4/5"
            style={{
              paddingRight: "10%",
              marginTop: "-6rem",
              marginLeft: "10%",
            }}
          >
            <Work project={project1}></Work>
            <div className="mt-8">
              <div
                className="flex flex-row"
                style={{ overflow: "hidden", height: "2.5rem" }}
              >
                <div className="colorL2" style={{ fontSize: "5rem" }}>
                  |
                </div>
                <div
                  className="text-2xl font-bold mb-6 text-black ml-2"
                  style={{ marginTop: "0.5rem", marginBottom: "2rem" }}
                >
                  实时热榜
                </div>
              </div>
              <div style={{ marginTop: "2.5rem" }}>
                <HotTable></HotTable>
              </div>
            </div>
          </div>
          <div className="w-1/5 login">
            <div className="mt-10 mb-8">
              {isAuthenticated &&
              userInfoLocal !== null &&
              userInfoLocal !== "expire" ? (
                <div className="infoMP text-center shadow-2xl">
                  <div className="mt-8" style={{ marginLeft: "34%" }}>
                    {" "}
                    <Avatar
                      src={updateCreppyDefaultImage(userInfoLocal.avatar)}
                      sx={{ width: 80, height: 80, border: 0 }}
                    />
                  </div>
                  <div style={{ fontSize: "1.8rem" }} className="my-8">
                    {userInfoLocal.nickname}
                  </div>
                  <div className="mb-12">
                    {" "}
                    {userInfoLocal.introduction != null
                      ? `${userInfoLocal.introduction.substring(0, 8)}...`
                      : ""}
                  </div>
                  <div style={{ fontSize: "1.1rem", margin: "1rem" }}>
                    <Grid columns={3} divided>
                      <Grid.Column>
                        <div
                          className=""
                          onClick={() =>
                            history.push(`/pcenter/${userInfoLocal.id}`)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {`${userInfoLocal.projectNum}`}
                          <br />
                          <br />
                          作品
                        </div>
                      </Grid.Column>

                      <Grid.Column verticalAlign="middle">
                        <div
                          className=" text-center"
                          onClick={() =>
                            history.push(`/pcenter/${userInfoLocal.id}`)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {`${userInfoLocal.articleNum}`}
                          <br />
                          <br />
                          帖子
                        </div>
                      </Grid.Column>
                      <Grid.Column verticalAlign="middle">
                        <div
                          className="text-center"
                          onClick={() =>
                            history.push(`/pcenter/${userInfoLocal.id}`)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {`Lv${userInfoLocal.level}`}
                          <br />
                          <br />
                          等级
                        </div>
                      </Grid.Column>
                    </Grid>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: "-8rem" }}>
                  <LgCard></LgCard>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
