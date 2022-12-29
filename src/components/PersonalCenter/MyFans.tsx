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
import {
  IArticle,
  IProfile,
  IMyArticle,
  ILikeArticle,
  IUserInfo,
} from "../../models/types";
import { useHistory, useParams } from "react-router-dom";
import { Pagination } from "../Home/Pagination";
import { ArticleCard } from "../Article/ArticleCard";
import { ArticleLikeCard } from "../Article/ArticleLikeCard";

import { LoaderAction } from "../../redux/reducers/LoaderReducer";
import { useDispatch, useSelector } from "react-redux";
import { clearLoading, setLoading } from "../../redux/actions";
import { Icon, Item } from "semantic-ui-react";
import { updateCreppyDefaultImage } from "src/utils";
import { Avatar } from "@mui/material";

export const MyFans = () => {
  const articleService = useArticleService();
  const [value, setValue] = React.useState(0);

  const [profile, setProfile] = useState<IProfile>();
  const [articleList, setArticleList] = useState<IUserInfo[]>([]);
  const [articleList1, setArticleList1] = useState<IUserInfo[]>([]);

  const [articleLikeList, setArticleLikeList] = useState<ILikeArticle[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articleCount, setArticleCount] = useState<number>(0);
  const [articleLikeCount, setArticleLikeCount] = useState<number>(0);
  const history = useHistory();
  const loaderDiapatch = useDispatch<Dispatch<LoaderAction>>();

  const retrieveFans = async () => {
    return articleService.getFans({ page: currentPage });
  };

  const retrieveFollow = async () => {
    return articleService.getFollow({ page: currentPage });
  };

  const retrieveArticles = async () => {
    let res;
    let res1;
    switch (value) {
      case 0:
        res = await retrieveFans();
        res1 = await retrieveFollow();

        // setArticleList(res.data.data.voList);
        // setArticleCount(res.data.data.total);
        break;
    }

    setArticleList(res.data.data);
    setArticleList1(res1.data.data);

    // setArticleCount(res.data.data.total);
  };
  useEffect(() => {
    const loadAllData = async () => {
      loaderDiapatch(setLoading("请等待"));
      await Promise.all([retrieveArticles()]);
      loaderDiapatch(clearLoading());
    };
    retrieveArticles();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ marginRight: "3%" }}>
      {" "}
      <div>
        <div style={{ fontSize: "1.5rem", fontWeight: "700" }}></div>
        <div className="grid grid-cols-4 gap-12">
          {articleList.map((user) => {
            return (
              <div
                className="shadow-2xl"
                style={{
                  border: "1px solid",
                  borderColor: "rgb(255 216 145)",
                  borderWidth: "2px",
                  width: "17rem",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  history.push(`/profile/${user.id}`);
                }}
              >
                <div className="flex flex-row py-4 space-x-4">
                  <div style={{ marginLeft: "1rem" }}>
                    <Avatar
                      alt={user.nickname}
                      src={updateCreppyDefaultImage(user.avatar ?? null)}
                      sx={{ width: 80, height: 80 }}
                      // variant="square"
                    />
                  </div>
                  <div className="">
                    <div className="flex flex-col  space-y-4">
                      <span
                        className="text-2xl font-semibold text-black"
                        style={{ marginLeft: "1rem" }}
                      >
                        {user.nickname.length > 8
                          ? user.nickname.substring(0, 7) + "..."
                          : user.nickname}
                      </span>

                      <div
                        className="flex flex-row text-sm text-gray-700"
                        style={{
                          fontWeight: "600",
                          fontSize: "1rem",
                          textAlign: "center",
                        }}
                      >
                        <div>
                          <div>{user.articleNum}</div>
                          <div>帖子</div>
                        </div>
                        <div style={{ marginLeft: "0.5rem" }}>
                          {" "}
                          <div>{user.projectNum}</div>
                          <div>作品</div>
                        </div>
                        <div style={{ marginLeft: "0.5rem" }}>
                          {" "}
                          <div>Lv{user.level}</div>
                          <div>等级</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
