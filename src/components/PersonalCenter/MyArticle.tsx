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
import { IArticle, IProfile } from "../../models/types";
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
          <Typography>{children}</Typography>
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

  const profileService = useProfileService();
  const articleService = useArticleService();

  const [profile, setProfile] = useState<IProfile>();
  const [articleList, setArticleList] = useState<IArticle[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articleCount, setArticleCount] = useState<number>(0);
  const loaderDiapatch = useDispatch<Dispatch<LoaderAction>>();

  const retrieveProfile = async () => {
    // const res = await profileService.getUser(username);
    // setProfile(res.data.profile);
    return true;
  };

  const retrievePublishedArticle = async () => {
    return articleService.getArticles({
      page: currentPage,
      author: username,
    });
  };

  const retrieveFavoritedArticle = async () => {
    return articleService.getArticles({
      page: currentPage,
      favorited: username,
    });
  };

  const retrieveArticles = async () => {
    // let res;
    // switch (value) {
    //   case 0:
    //     res = await retrievePublishedArticle();
    //     break;
    //   case 1:
    //     res = await retrieveFavoritedArticle();
    //     break;
    // }
    // setArticleList(res.data.articles);
    // setArticleCount(res.data.articlesCount);
    setArticleList(articleList);
    setArticleCount(1);
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
        height: 224,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="我的帖子" {...a11yProps(0)} />
        <Tab label="我的喜欢" {...a11yProps(1)} />
      </Tabs>
      <Box sx={{ mx: "auto", minHeight: "100%" }}>
        <TabPanel value={value} index={0}>
          <Fragment>
            {articleList.map((article) => {
              return <ArticleCard key={article.slug} article={article} />;
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
              return <ArticleCard key={article.slug} article={article} />;
            })}

            <Pagination
              count={articleCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Fragment>{" "}
        </TabPanel>
      </Box>
    </Box>
  );
}
