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
import { useParams } from "react-router-dom";
import { Pagination } from "../Home/Pagination";
import { ArticleCard } from "../Article/ArticleCard";
import { ArticleLikeCard } from "../Article/ArticleLikeCard";

import { LoaderAction } from "../../redux/reducers/LoaderReducer";
import { useDispatch, useSelector } from "react-redux";
import { clearLoading, setLoading } from "../../redux/actions";
import { Icon, Item } from "semantic-ui-react";

export const MyFollow = () => {
  const articleService = useArticleService();
  const [value, setValue] = React.useState(0);

  const [profile, setProfile] = useState<IProfile>();
  const [articleList, setArticleList] = useState<IUserInfo[]>([]);
  const [articleList1, setArticleList1] = useState<IUserInfo[]>([]);

  const [articleLikeList, setArticleLikeList] = useState<ILikeArticle[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articleCount, setArticleCount] = useState<number>(0);
  const [articleLikeCount, setArticleLikeCount] = useState<number>(0);

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
    <div style={{ marginLeft: "3%", marginRight: "3%" }}>
      {" "}
      <div>
        <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>关注我的</div>

        <Item.Group>
          {articleList.map((user) => {
            return (
              <Item>
                <Item.Image size="tiny" src={`https://${user.avatar}`} />

                <Item.Content verticalAlign="middle">
                  <Item.Header>
                    <Icon name="like" />
                    {user.nickname}
                  </Item.Header>
                </Item.Content>
              </Item>
            );
          })}
        </Item.Group>
      </div>
      <div>
        <div
          style={{ fontSize: "1.5rem", fontWeight: "700", marginTop: "1rem" }}
        >
          我的关注
        </div>

        <Item.Group>
          {articleList1.map((user) => {
            return (
              <Item>
                <Item.Image size="tiny" src={`https://${user.avatar}`} />

                <Item.Content verticalAlign="middle">
                  <Item.Header>
                    <Icon name="like" />
                    {user.nickname}
                  </Item.Header>
                </Item.Content>
              </Item>
            );
          })}
        </Item.Group>
      </div>
    </div>
  );
};
