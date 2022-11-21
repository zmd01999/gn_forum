import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  SyntheticEvent,
} from "react";
import { Tab, Search } from "semantic-ui-react";
import _ from "lodash";
import "./style.css";
import { SearchInp } from "./Search";
import { IMyArticle } from "src/models/types";
interface IProps {
  tabs: object;
  setCurrentTab: Dispatch<SetStateAction<string>>;
  setArticleList?: Dispatch<React.SetStateAction<IMyArticle[]>>;
}

interface ITabChangeEvent {
  activeIndex: string;
  [key: string]: string;
}

export const Tabs = ({ tabs, setCurrentTab, setArticleList }: IProps) => {
  const handleTabChange = (event: SyntheticEvent, data: object) => {
    // TODO destruct activeIndex in data directly
    const { activeIndex } = data as ITabChangeEvent;
    setCurrentTab(Object.keys(tabs)[Number(activeIndex)]);
  };

  const pan1 = Object.entries(tabs).map(([key, value]) => {
    return {
      menuItem: value,
      render: () => <Tab.Pane key={key} attached={false}></Tab.Pane>,
    };
  });

  return (
    <Fragment>
      <div className="tab-container">
        <Tab
          onTabChange={handleTabChange}
          menu={{ secondary: true, pointing: true }}
          panes={pan1}
        />
        {/* <Search placeholder="搜索..." className="float-right !import" /> */}
        {setArticleList !== undefined ? (
          <SearchInp setArticleList={setArticleList}></SearchInp>
        ) : (
          <></>
        )}
      </div>
    </Fragment>
  );
};
