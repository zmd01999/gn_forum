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

      <Pagination
        count={count}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Fragment>
  );
};
