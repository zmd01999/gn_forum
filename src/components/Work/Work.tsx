import { MyCarousel } from "./MyCarousel";
import WorkIndex from "src/components/BaseUtils/tre/WorkIndex";
import React, {
  Dispatch,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { TagList } from "src/components/Home/TagList";

import "src/index.css";
import { useArticleService, useProjectService } from "src/hooks";
import { IArticle, IMyArticle, MyTab, Itag, IProject } from "src/models/types";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/redux/store";
import { LoaderAction } from "src/redux/reducers/LoaderReducer";
import {
  clearLoading,
  logoutUser,
  setLoading,
  setWarning,
} from "src/redux/actions";
import { Tabs } from "./Tabs";
import { NotificationAction } from "src/redux/reducers/NotifyReducer";
import { useHistory } from "react-router-dom";
import "src/components/Home/style.css";
import { Item, Segment, Label } from "semantic-ui-react";
import { ArticleGroup } from "src/components/Article/ArticleGroup";
import SpeedD from "src/components/BaseUtils/SpeedD";
import { getLocalStorage, getUserFromJWT } from "src/utils";
import { AuthAction } from "src/redux/reducers/AuthReducer";
import { loadUserInfo } from "src/redux/actions";

export const Work = () => {
  const projectService = useProjectService();
  const [projectList, setProjectList] = useState<IProject[]>([]);
  const [tagList, setTagList] = useState<Itag[]>([]);
  const [categoryList, setCategoryList] = useState<MyTab[]>([]);

  const [tagHotList, setHotTagList] = useState<
    {
      id: string;
      tagName: string;
      avatar: string;
    }[]
  >([]);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentTag, setCurrentTag] = useState<string | undefined>(undefined);
  const [isInitial, setInitial] = useState<boolean>(true);
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();
  const history = useHistory();
  const authDispatch = useDispatch<Dispatch<AuthAction>>();

  const { isAuthenticated } = useSelector((state: AppState) => state.auth);
  const [userInfo, setUserInfo] = useState<string | null>(null);
  const [recom, setRecom] = useState<IProject[]>();
  const { isLoading, messageContent } = useSelector(
    (state: AppState) => state.loader
  );
  const loaderDiapatch = useDispatch<Dispatch<LoaderAction>>();

  const [currentTab, setCurrentTab] = useState<string>("0");
  const [TABS, setTabs] = useState<any>({
    "0": "全部",
    "1": "动画",
    "2": "游戏",
    "3": "实用工具",
    "4": "模拟",
    //   feed: "我的点赞",
  });

  const retrieveArticle = async () => {
    // if (!isAuthenticated && currentTab !== "0") {
    //   notifyDispatch(setWarning("你需要先登录"));
    //   history.push("/login");
    //   return;
    // }
    let res;
    res = await projectService.getRecom();
    let articleRes;
    switch (currentTab) {
      case "0":
        articleRes = await projectService.listProject({
          page: currentPage,
        });
        break;
      case "1":
        articleRes = await projectService.getCateProject({
          page: currentPage,
          categoryId: "1602196644605063169",
        });
        break;
      case "2":
        articleRes = await projectService.getCateProject({
          page: currentPage,
          categoryId: "1602196713374871554",
        });
        break;
      case "3":
        articleRes = await projectService.getCateProject({
          page: currentPage,
          categoryId: "1602196785894387713",
        });
        break;
      case "4":
        articleRes = await projectService.getCateProject({
          page: currentPage,
          categoryId: "1602196856455163906",
        });
        break;
      default:
        // articleRes = await articleService.getFeed(currentPage);
        articleRes = await projectService.listProject({
          page: currentPage,
        });

        break;
    }
    setRecom(res.data.data);
    setProjectList(articleRes.data.data.voList);
    setCount(articleRes.data.data.total);
  };
  useEffect(() => {
    const retrieve = async () => {
      loaderDiapatch(setLoading("获取作品中"));
      await Promise.all([retrieveArticle()]);
      setInitial(false);
      loaderDiapatch(clearLoading());
    };

    setUserInfo(getLocalStorage("userInfo"));
    if (
      getLocalStorage("userInfo") == null ||
      getLocalStorage("userInfo") == "expire"
    ) {
      authDispatch(logoutUser());
    }
    retrieve();
  }, []);

  useEffect(() => {
    const retrieve = async () => {
      loaderDiapatch(setLoading("获取作品中"));
      await retrieveArticle();
      if (!isInitial) {
        loaderDiapatch(clearLoading());
      }
    };
    if (
      getLocalStorage("userInfo") == null ||
      getLocalStorage("userInfo") == "expire"
    ) {
      authDispatch(logoutUser());
    }
    retrieve();
    window.scrollTo(0, 0);
  }, [currentPage, currentTag, currentTab]);

  return (
    <div className="work-container">
      {/* <MyCarousel></MyCarousel> */}
      <div
        style={{
          marginLeft: "4rem",
          marginRight: "6rem",
          marginBottom: "-2.6rem",
          zIndex: "5",
        }}
      >
        <Tabs
          tabs={TABS}
          setCurrentTab={setCurrentTab}
          setProjectList={setProjectList}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          count={count}
        />
      </div>

      <WorkIndex
        projectList={projectList}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        count={count}
        recom={recom}
      />
    </div>
  );
};
