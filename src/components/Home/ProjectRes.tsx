import WorkRes from "src/components/BaseUtils/tre/WorkRes";
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
import { Tabs } from "../Work/Tabs";
import { NotificationAction } from "src/redux/reducers/NotifyReducer";
import { useHistory, useParams } from "react-router-dom";
import "src/components/Home/style.css";
import { Item, Segment, Label } from "semantic-ui-react";
import { ArticleGroup } from "src/components/Article/ArticleGroup";
import SpeedD from "src/components/BaseUtils/SpeedD";
import { getLocalStorage, getUserFromJWT } from "src/utils";
import { AuthAction } from "src/redux/reducers/AuthReducer";
import { loadUserInfo } from "src/redux/actions";

interface IProps {
  slug: string;
}

export const ProjectRes = () => {
  let { slug } = useParams<IProps>();
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

  const { isLoading, messageContent } = useSelector(
    (state: AppState) => state.loader
  );
  const loaderDiapatch = useDispatch<Dispatch<LoaderAction>>();

  const [currentTab, setCurrentTab] = useState<string>("0");
  const [TABS, setTabs] = useState<any>({
    "0": "搜索结果",
  });

  const retrieveArticle = async () => {
    // if (!isAuthenticated && currentTab !== "0") {
    //   notifyDispatch(setWarning("你需要先登录"));
    //   history.push("/login");
    //   return;
    // }

    let articleRes;
    switch (currentTab) {
      case "0":
        projectService.searchProject({ page: 1, title: slug }).then((res) => {
          setProjectList(res.data.data.voList);
          setCount(res.data.data.total);
        });
        break;

      default:
        // articleRes = await articleService.getFeed(currentPage);
        projectService.searchProject({ page: 1, title: slug }).then((res) => {
          setProjectList(res.data.data.voList);
          setCount(res.data.data.total);
        });

        break;
    }
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

      <WorkRes projectList={projectList} />
    </div>
  );
};
