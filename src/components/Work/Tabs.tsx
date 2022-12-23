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
import { IMyArticle, IProject } from "src/models/types";
import { Pagination } from "src/components/Home/Pagination";
interface IProps {
  tabs: object;
  setCurrentTab: Dispatch<SetStateAction<string>>;
  setProjectList: Dispatch<React.SetStateAction<IProject[]>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  count: number;
}

interface ITabChangeEvent {
  activeIndex: string;
  [key: string]: string;
}

export const Tabs = ({
  tabs,
  setCurrentTab,
  setProjectList,
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
          style={{ zIndex: "5" }}
        />
        {/* <Search placeholder="搜索..." className="float-right !import" /> */}
        {setProjectList !== undefined && false ? (
          <div></div>
        ) : (
          <div
            className="float-right"
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              cursor: "pointer",
              zIndex: "2",
            }}
          >
            <Pagination
              count={count}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              project={true}
            ></Pagination>
          </div>
        )}
      </div>
    </Fragment>
  );
};
