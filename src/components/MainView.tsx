import React, {
  Dispatch,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { TagList } from "src/components/Home/TagList";

import "src/index.css";
import { useArticleService } from "src/hooks";
import { IArticle, IMyArticle, MyTab, Itag } from "src/models/types";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/redux/store";
import { LoaderAction } from "src/redux/reducers/LoaderReducer";
import { clearLoading, setLoading, setWarning } from "src/redux/actions";
import { Tabs } from "src/components/Home/Tabs";
import { NotificationAction } from "src/redux/reducers/NotifyReducer";
import { useHistory } from "react-router-dom";
import "src/components/Home/style.css";
import { Item, Segment, Label } from "semantic-ui-react";
import { ArticleGroup } from "src/components/Article/ArticleGroup";
import SpeedD from "src/components/BaseUtils/SpeedD";
import { getLocalStorage, getUserFromJWT } from "src/utils";
import { AuthAction } from "src/redux/reducers/AuthReducer";
import { loadUserInfo } from "src/redux/actions";
import "./style.css";
interface obj {
  [key: string]: any;
}

export const MainView = () => {
  const articleService = useArticleService();
  const [articleList, setArticleList] = useState<IMyArticle[]>([]);
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
  // var TABS: obj = {
  //   "global-feed": "全部",
  //   feed: "我的点赞",
  // };

  const [TABS, setTabs] = useState<any>({
    "0": "全部",
    //   feed: "我的点赞",
  });

  const retrieveTag = async () => {
    const tagRes = await articleService.getTags();

    setTagList(tagRes.data.data);
  };

  const retrieveCate = async () => {
    const cateRes = await articleService.getCategory();
    setCategoryList(cateRes.data.data);

    cateRes.data.data.map((cate: MyTab) => {
      TABS[`${cate.id}`] = cate.name;
    });
    setTabs(TABS);
  };
  const retrieveHotTag = async () => {
    const tagRes = await articleService.getTags();
    setHotTagList(tagRes.data.data);
  };

  const retrieveArticle = async () => {
    if (!isAuthenticated && currentTab !== "0") {
      notifyDispatch(setWarning("你需要先登录"));
      history.push("/login");
      return;
    }

    let articleRes;
    switch (currentTab) {
      case "0":
        articleRes = await articleService.getArticles({
          page: currentPage,
          tag: currentTag,
        });
        setArticleList(articleRes.data.data.voList);
        setCount(articleRes.data.data.total);
        break;
      default:
        // articleRes = await articleService.getFeed(currentPage);
        articleRes = await articleService.getCategoryById({
          id: currentTab,
          page: currentPage,
        });
        setArticleList(articleRes.data.data.articles);
        setCount(articleRes.data.data.total);
        break;
    }
  };

  const memorizedSetTag = useCallback(
    (_: SyntheticEvent, data: object) => {
      const newTag = "";
      if (newTag === currentTag) {
        // disable
        setCurrentTag(undefined);
      } else {
        setCurrentTag(newTag);
      }
    },
    [tagList]
  );

  const handleTag = (e: any) => {
    console.log(e.value);
  };

  useEffect(() => {
    const retrieve = async () => {
      loaderDiapatch(setLoading("获取文章中"));
      await Promise.all([
        retrieveArticle(),
        retrieveTag(),
        retrieveHotTag(),
        retrieveCate(),
      ]);
      setInitial(false);
      loaderDiapatch(clearLoading());
    };

    setUserInfo(getLocalStorage("userInfo"));
    retrieve();
  }, []);

  useEffect(() => {
    const retrieve = async () => {
      loaderDiapatch(setLoading("获取文章中"));
      await retrieveArticle();
      if (!isInitial) {
        loaderDiapatch(clearLoading());
      }
    };
    retrieve();
    window.scrollTo(0, 0);
  }, [currentPage, currentTag, currentTab]);

  return (
    <div className="main-container">
      <div className="article-container">
        {/* <BreadCrumb></BreadCrumb> */}
        <Tabs tabs={TABS} setCurrentTab={setCurrentTab} />
        <div>
          {tagList.map((topic) => {
            return (
              <Label
                tag
                value={topic.id}
                onClick={(event: SyntheticEvent, data: object) => {
                  handleTag(data);
                }}
              >
                {topic.tagName}
              </Label>
            );
          })}
        </div>
        <Item.Group divided>
          <ArticleGroup
            articleList={articleList}
            count={count}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          ></ArticleGroup>
        </Item.Group>
      </div>

      <div className="tag-container">
        <TagList
          currentTag={currentTag}
          tags={tagHotList}
          tab={currentTab}
          setCurrentTag={setCurrentTag}
          userInfo={userInfo}
          cateList={categoryList}
        />
        <SpeedD></SpeedD>
      </div>
    </div>
  );
};
