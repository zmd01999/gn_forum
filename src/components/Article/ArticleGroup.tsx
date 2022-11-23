import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useArticleService } from "../../hooks";
import { IArticle, IMyArticle } from "../../models/types";
import ArticleItem from "./ArticleItem";
import { Pagination } from "../Home/Pagination";
import SpeedD from "src/components/BaseUtils/SpeedD";
import "./style.css";
interface IProps {
  articleList: IMyArticle[];
  count: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const ArticleGroup = ({
  articleList,
  count,
  currentPage,
  setCurrentPage,
}: IProps) => {
  return (
    <Fragment>
      {articleList.map((article) => {
        return <ArticleItem key={article.id} article={article} />;
      })}

      <div className="absolute inset-x-0 bottom-0 h-16">
        <Pagination
          count={count}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </Fragment>
  );
};
