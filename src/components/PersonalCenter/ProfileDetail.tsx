import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  useArticleService,
  useProfileService,
  useProjectService,
} from "../../hooks";
import {
  IArticle,
  IProfile,
  IMyArticle,
  ILikeArticle,
  IProject,
  IUserInfo,
} from "../../models/types";
import { useParams } from "react-router-dom";
import { Pagination } from "../Home/Pagination";
import { ArticleCard } from "../Article/ArticleCard";
import { ArticleLikeCard } from "../Article/ArticleLikeCard";

import { LoaderAction } from "../../redux/reducers/LoaderReducer";
import { useDispatch, useSelector } from "react-redux";
import { clearLoading, setLoading } from "../../redux/actions";
import { getLocalStorage } from "src/utils";
import { WorkCard } from "../Work/WorkCard";
import { MyFollow } from "./MyFollow";
import { MyHelp } from "./MyHelp";
import { MyFans } from "./MyFans";
import { ATable } from "./ArticleTable";
import TabAccount from "./Setting/TabAccount";
import "./myart.css";
import WorkMine from "../BaseUtils/tre/WorkMine";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface routeProps {
  username: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        // <Box sx={{ p: 3 }}>
        <div className="">{children}</div>
        // </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
interface Props {
  profile: IUserInfo;
}

export default function ProfileDetail({ profile }: Props) {
  const [value, setValue] = React.useState(0);
  const { username } = useParams<routeProps>();

  const articleService = useArticleService();

  //   const [profile, setProfile] = useState<IProfile>();
  const [articleList, setArticleList] = useState<IMyArticle[]>([]);
  const [articleLikeList, setArticleLikeList] = useState<ILikeArticle[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articleCount, setArticleCount] = useState<number>(0);
  const [articleLikeCount, setArticleLikeCount] = useState<number>(0);
  const userInfo: any = getLocalStorage("userInfo");
  const loaderDiapatch = useDispatch<Dispatch<LoaderAction>>();

  const retrieveProfile = async () => {
    // const res = await profileService.getUser(username);
    // setProfile(res.data.profile);
    return true;
  };

  const retrievePublishedArticle = async () => {
    return articleService.getMyArticle({
      page: currentPage,
      userId: profile && profile.id,
    });
  };

  const retrieveFavoritedArticle = async () => {
    return articleService.getTFArticle({
      page: currentPage,
      thumbs: 1,
    });
  };
  const retrieveFollowArticle = async () => {
    return articleService.getTFArticle({
      page: currentPage,
      follow: 1,
    });
  };

  const retrieveArticles = async () => {
    let res;
    switch (value) {
      case 1:
        res = await retrievePublishedArticle();
        setArticleList(res.data.data.voList);
        setArticleCount(res.data.data.total);
        break;
      case 3:
        res = await retrieveFollowArticle();
        // setArticleLikeList(res.data.data.articles);
        // setArticleLikeCount(res.data.data.total);
        setArticleList(res.data.data.voList);
        setArticleCount(res.data.data.total);
        break;
    }
  };

  const [projectCount, setProjectCount] = useState<number>(1);
  const projectService = useProjectService();

  const [projectList, setProjectList] = useState<IProject[]>([]);

  const retrievePublishedProject = async () => {
    return projectService.getMyProject({
      page: currentPage,
      userId: profile && profile.id,
    });
  };

  const retrieveFavoritedProject = async () => {
    return projectService.getTFProject({
      page: currentPage,
      thumbs: 1,
    });
  };
  const retrieveFollowProject = async () => {
    return projectService.getTFProject({
      page: currentPage,
      follow: 1,
    });
  };

  const retrieveProjects = async () => {
    let res;
    switch (value) {
      case 0:
        res = await retrievePublishedProject();
        setProjectList(res.data.data.voList);
        setProjectCount(res.data.data.total);
        break;
      case 2:
        res = await retrieveFavoritedProject();
        // setArticleLikeList(res.data.data.articles);
        // setArticleLikeCount(res.data.data.total);
        setProjectList(res.data.data.voList);
        setProjectCount(res.data.data.total);
        break;
      // case 2:
      //   res = await retrieveFollowProject();
    }
  };
  const [myFans, setMyFans] = useState<IUserInfo[]>([]);
  const [myFollow, setMyFollow] = useState<IUserInfo[]>([]);
  const retrieveFans = async () => {
    return articleService.getFans({ page: currentPage });
  };

  const retrieveFollow = async () => {
    return articleService.getFollow({ page: currentPage });
  };

  const retrieveFollows = async () => {
    let res;
    let res1;
    switch (value) {
      case 4:
        res = await retrieveFans();
        res1 = await retrieveFollow();

        // setArticleList(res.data.data.voList);
        // setArticleCount(res.data.data.total);
        setMyFans(res.data.data);
        setMyFollow(res1.data.data);
        break;
    }

    // setArticleCount(res.data.data.total);
  };

  useEffect(() => {
    const loadAllData = async () => {
      loaderDiapatch(setLoading("请等待"));
      await Promise.all([
        retrieveProfile(),
        retrieveArticles(),
        retrieveProjects(),
      ]);
      loaderDiapatch(clearLoading());
    };
    loadAllData();
    window.scrollTo(0, 0);
  }, [currentPage, value]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="magic">
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "auto",
          width: "auto",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", fontSize: 16 }}
        >
          <Tab
            label="他的作品"
            {...a11yProps(0)}
            sx={{ fontSize: 16, fontWeight: "600", color: "black" }}
          />

          <Tab
            label="他的帖子"
            {...a11yProps(1)}
            sx={{ fontSize: 16, fontWeight: "600", color: "black" }}
          />
          {/* <Tab
            label="喜欢"
            {...a11yProps(2)}
            sx={{ fontSize: 16, fontWeight: "600", color: "black" }}
          />
          <Tab
            label="收藏"
            {...a11yProps(3)}
            sx={{ fontSize: 16, fontWeight: "600", color: "black" }}
          />
          <Tab
            label="关注"
            {...a11yProps(4)}
            sx={{ fontSize: 16, fontWeight: "600", color: "black" }}
          />
          <Tab
            label="粉丝"
            {...a11yProps(5)}
            sx={{ fontSize: 16, fontWeight: "600", color: "black" }}
          />
          <Tab
            label="设置"
            {...a11yProps(6)}
            sx={{ fontSize: 16, fontWeight: "600", color: "black" }}
          />
          <Tab
            label="帮助"
            {...a11yProps(7)}
            sx={{ fontSize: 16, fontWeight: "600", color: "black" }}
          /> */}
        </Tabs>
        <div className="">
          <TabPanel value={value} index={0}>
            <div
              style={{
                width: "80rem",
                marginTop: "-1rem",
                marginLeft: "2.5rem",
              }}
            >
              <WorkMine project={projectList}></WorkMine>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div
              style={{
                width: "75rem",
                marginTop: "1rem",
                marginLeft: "2.5rem",
              }}
            >
              <ATable
                articleList={articleList}
                count={articleCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              ></ATable>
            </div>
          </TabPanel>
          {/* <TabPanel value={value} index={2}>
            <div
              style={{
                width: "80rem",
                marginTop: "-1rem",
                marginLeft: "2.5rem",
              }}
            >
              <WorkMine project={projectList}></WorkMine>
            </div>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <div
              style={{
                width: "75rem",
                marginTop: "0rem",
                marginLeft: "2.5rem",
              }}
            >
              <ATable
                articleList={articleList}
                count={articleCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              ></ATable>
            </div>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <div style={{ marginLeft: "2.5rem" }}>
              <MyFollow></MyFollow>
            </div>
          </TabPanel>
          <TabPanel value={value} index={5}>
            {" "}
            <div style={{ marginLeft: "2.5rem" }}>
              {" "}
              <MyFans />
            </div>
          </TabPanel>
          <TabPanel value={value} index={6}>
            {" "}
            <div style={{ marginLeft: "2.5rem" }}>
              <TabAccount></TabAccount>
            </div>
          </TabPanel>
          <TabPanel value={value} index={7}>
            <MyHelp></MyHelp>
          </TabPanel> */}
        </div>
      </Box>
    </div>
  );
}
