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
import { useArticleService, useProfileService } from "../../hooks";
import { IArticle, IProfile, IMyArticle } from "../../models/types";
import { useParams } from "react-router-dom";
import { Pagination } from "../Home/Pagination";
import { ArticleCard } from "../Article/ArticleCard";
import { LoaderAction } from "../../redux/reducers/LoaderReducer";
import { useDispatch, useSelector } from "react-redux";
import { clearLoading, setLoading } from "../../redux/actions";

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
        <Box sx={{ p: 3 }}>
          <div className="w-5/6 mx-auto">{children}</div>
        </Box>
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

export default function MyArticle() {
  const [value, setValue] = React.useState(0);
  const { username } = useParams<routeProps>();

  const articleService = useArticleService();

  const [profile, setProfile] = useState<IProfile>();
  const [articleList, setArticleList] = useState<IMyArticle[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articleCount, setArticleCount] = useState<number>(0);
  const loaderDiapatch = useDispatch<Dispatch<LoaderAction>>();

  const retrieveProfile = async () => {
    // const res = await profileService.getUser(username);
    // setProfile(res.data.profile);
    return true;
  };

  const retrievePublishedArticle = async () => {
    return articleService.getMyArticle({ page: currentPage });
  };

  const retrieveFavoritedArticle = async () => {
    return articleService.getTFArticle({
      page: currentPage,
      thumbs: 1,
    });
  };

  const retrieveArticles = async () => {
    let res;
    switch (value) {
      case 0:
        res = await retrievePublishedArticle();
        setArticleList(res.data.data.voList);
        setArticleCount(res.data.data.total);
        break;
      case 1:
        res = await retrieveFavoritedArticle();
        setArticleList(res.data.data.articles);
        setArticleCount(res.data.data.total);
        break;
    }
    // setArticleList(res.data.data.voList);
    // setArticleCount(res.data.data.total);
    // console.log(res.data.data.voList);
    // console.log(res.data.data.total);

    // setArticleList(articleList);
    // setArticleCount(1);
  };

  useEffect(() => {
    const loadAllData = async () => {
      loaderDiapatch(setLoading("请等待"));
      await Promise.all([retrieveProfile(), retrieveArticles()]);
      loaderDiapatch(clearLoading());
    };
    loadAllData();
    window.scrollTo(0, 0);
  }, [currentPage, value]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
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
        <Tab label="我的帖子" {...a11yProps(0)} sx={{ fontSize: 16 }} />
        <Tab label="我的喜欢" {...a11yProps(1)} sx={{ fontSize: 16 }} />
      </Tabs>
      <div className="w-5/6">
        <TabPanel value={value} index={0}>
          <Fragment>
            {articleList.map((article) => {
              return <ArticleCard key={article.id} article={article} />;
            })}

            <Pagination
              count={articleCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Fragment>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Fragment>
            {articleList.map((article) => {
              return <ArticleCard key={article.id} article={article} />;
            })}

            <Pagination
              count={articleCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Fragment>{" "}
        </TabPanel>
      </div>
    </Box>
  );
}
