import { MyCarousel } from "./MyCarousel";
import WorkIndex from "src/components/BaseUtils/tre/WorkIndex";
import { Tabs } from "src/components/Home/Tabs";
import { useState } from "react";
import { IMyArticle } from "src/models/types";

export const Work = () => {
  const [TABS, setTabs] = useState<any>({
    "0": "全部",
    "1": "动画",
    "2": "游戏",
    "3": "实用工具",
    "4": "模拟",
    //   feed: "我的点赞",
  });
  const [currentTab, setCurrentTab] = useState<string>("0");
  const [articleList, setArticleList] = useState<IMyArticle[]>([]);
  const [count, setCount] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  return (
    <div className="work-container">
      {/* <MyCarousel></MyCarousel> */}
      <div style={{ marginLeft: "4rem", marginRight: "2rem" }}>
        <Tabs
          tabs={TABS}
          setCurrentTab={setCurrentTab}
          setArticleList={setArticleList}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          count={count}
        />
      </div>

      <WorkIndex />
    </div>
  );
};
