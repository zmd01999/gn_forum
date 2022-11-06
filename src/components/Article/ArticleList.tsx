import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useArticleService } from "../../hooks";
import { IArticle, IMyArticle } from "../../models/types";
import { ArticleCard } from "./ArticleCard";
import { Pagination } from "../Home/Pagination";

interface IProps {
  articleList: IMyArticle[];
  count: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const ArticleList = ({
  articleList,
  count,
  currentPage,
  setCurrentPage,
}: IProps) => {
  return (
    <Fragment>
      {articleList.map((article) => {
        return <ArticleCard key={article.id} article={article} />;
      })}

      <Pagination
        count={count}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Fragment>
  );
};
