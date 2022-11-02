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
import { IArticle } from "src/models/types";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/redux/store";
import { LoaderAction } from "src/redux/reducers/LoaderReducer";
import { clearLoading, setLoading, setWarning } from "src/redux/actions";
import { Tabs } from "src/components/Home/Tabs";
import { NotificationAction } from "src/redux/reducers/NotifyReducer";
import { useHistory } from "react-router-dom";
import "src/components/Home/style.css";
import { Item } from "semantic-ui-react";
import { ArticleGroup } from "src/components/Article/ArticleGroup";
import SpeedD from "src/components/BaseUtils/SpeedD";
import BreadCrumb from "src/components/BaseUtils/BreadCrumb";
export const Work = () => {
  const articleService = useArticleService();
  const [articleList, setArticleList] = useState<IArticle[]>([]);
  const [tagList, setTagList] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentTag, setCurrentTag] = useState<string | undefined>(undefined);
  const [isInitial, setInitial] = useState<boolean>(true);
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();
  const history = useHistory();

  const { isAuthenticated } = useSelector((state: AppState) => state.auth);

  const { isLoading, messageContent } = useSelector(
    (state: AppState) => state.loader
  );
  const loaderDiapatch = useDispatch<Dispatch<LoaderAction>>();
  const TABS = {
    "global-feed": "全部",
    feed: "我的点赞",
  };
  const [currentTab, setCurrentTab] = useState<string>("global-feed");

  const retrieveTag = async () => {
    const tagRes = await articleService.getTags();
    setTagList(tagRes.data.tags);
  };

  const retrieveArticle = async () => {
    if (!isAuthenticated && currentTab === "feed") {
      notifyDispatch(setWarning("你需要先登录"));
      history.push("/login");
      return;
    }

    let articleRes;
    switch (currentTab) {
      case "global-feed":
        articleRes = await articleService.getArticles({
          page: currentPage,
          tag: currentTag,
        });
        break;
      case "feed":
        articleRes = await articleService.getFeed(currentPage);
        break;
    }

    setArticleList(articleRes.data.articles);
    setCount(articleRes.data.articlesCount);
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

  useEffect(() => {
    const retrieve = async () => {
      loaderDiapatch(
        setLoading("fetch articles , tags , generating pagination")
      );
      await Promise.all([retrieveArticle(), retrieveTag()]);
      setInitial(false);
      loaderDiapatch(clearLoading());
    };
    retrieve();
  }, []);

  useEffect(() => {
    const retrieve = async () => {
      loaderDiapatch(setLoading("fetch articles , generating pagination"));
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
        <BreadCrumb></BreadCrumb>
        <Tabs tabs={TABS} setCurrentTab={setCurrentTab} />
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
          tags={tagList}
          tab={currentTab}
          setCurrentTag={setCurrentTag}
        />
        <SpeedD></SpeedD>
      </div>
    </div>
  );
};
