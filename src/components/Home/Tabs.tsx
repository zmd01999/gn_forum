import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import { Tab, Search } from "semantic-ui-react";
import _ from "lodash";
import "./style.css";
import { SearchInp } from "./Search";
import { IMyArticle } from "src/models/types";
import { Pagination } from "./Pagination";
interface IProps {
  tabs: object;
  setCurrentTab: Dispatch<SetStateAction<string>>;
  setArticleList?: Dispatch<React.SetStateAction<IMyArticle[]>>;
  currentPage?: number;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
  count?: number;
}

interface ITabChangeEvent {
  activeIndex: string;
  [key: string]: string;
}

export const Tabs = ({
  tabs,
  setCurrentTab,
  setArticleList,
  currentPage,
  setCurrentPage,
  count,
}: IProps) => {
  const [number, setNumber] = useState<number>(1);
  const handleTabChange = (event: SyntheticEvent, data: object) => {
    // TODO destruct activeIndex in data directly
    const { activeIndex } = data as ITabChangeEvent;
    setCurrentTab(Object.keys(tabs)[Number(activeIndex)]);
  };

  const pan1 = Object.entries(tabs).map(([key, value]) => {
    return {
      menuItem: value,
      render: () => (
        <Tab.Pane key={key} attached={false} className="paneTab"></Tab.Pane>
      ),
    };
  });

  return (
    <Fragment>
      <div className="tab-container flex justify-between">
        <Tab
          onTabChange={handleTabChange}
          menu={{ secondary: true, pointing: true }}
          panes={pan1}
          className="paneTab"
        />
        {/* <Search placeholder="搜索..." className="float-right !import" /> */}
        {setArticleList !== undefined && false ? (
          <SearchInp setArticleList={setArticleList}></SearchInp>
        ) : (
          <div
            className="float-right"
            style={{
              // marginLeft: "40%",
              // position: "relative",
              // left: "4%",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            {/* <Pagination
              count={count ?? 1}
              currentPage={currentPage ?? 1}
              setCurrentPage={setCurrentPage ?? setNumber}
            ></Pagination> */}
          </div>
        )}
      </div>
    </Fragment>
  );
};
