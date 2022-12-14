import React, { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { Icon, Pagination as SemanticPagination } from "semantic-ui-react";
import { PER_PAGE_COUNT } from "../../utils";
import "./style.css";

interface IProps {
  count: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

interface IData {
  activePage: string;
  [key: string]: string;
}

export const Pagination = ({ count, currentPage, setCurrentPage }: IProps) => {
  type xx = React.ButtonHTMLAttributes<HTMLButtonElement>;
  const totalPages =
    count % PER_PAGE_COUNT == 0
      ? Math.floor(count / PER_PAGE_COUNT)
      : Math.floor(count / PER_PAGE_COUNT) + 1;

  const handlePageChange = (event: SyntheticEvent, data: object) => {
    // TODO check whether we can handle it better (no need to use Number to force conversion)
    // why we cannot claim activePage string
    setCurrentPage(Number((data as IData).activePage));
  };

  return (
    <SemanticPagination
      activePage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      prevItem={{ content: "上一页", icon: true }}
      nextItem={{ content: "下一页", icon: true }}
      ellipsisItem={{
        content: <Icon name="ellipsis horizontal" />,
        icon: true,
      }}
      firstItem={{ content: <Icon name="angle double left" />, icon: true }}
      lastItem={{ content: <Icon name="angle double right" />, icon: true }}
    />
  );
};
