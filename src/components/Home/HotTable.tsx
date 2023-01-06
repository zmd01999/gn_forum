import React, { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, Feed, Icon } from "semantic-ui-react";
import { useArticleService } from "src/hooks";
import { IMyArticle } from "src/models/types";
import { setWarning } from "src/redux/actions";
import { AppState } from "src/redux/store";
import { NotificationAction } from "../../redux/reducers/NotifyReducer";
interface IProps {
  article: IMyArticle;
  rank: number;
}

function TableRow({ article, rank }: IProps) {
  const history = useHistory();
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();
  const { isAuthenticated } = useSelector((state: AppState) => state.auth);

  const gotoArticle = () => {
    // if (!isAuthenticated) {
    //   notifyDispatch(setWarning("你需要先登录"));
    //   history.push("/login");
    //   return;
    // }
    history.push(`/article/${article.id}`);
  };

  const gotoAuthor = () => {
    history.push(`/profile/${article.author.nickname}`);
  };
  return (
    <tr className="">
      <td
        className="text-gray-400"
        style={{
          textAlign: "center",
          margin: "auto",
          width: "3rem",
          padding: "0.3rem",
        }}
      >
        {rank <= 3 ? (
          <img
            src={`/assets/rank${rank}.png`}
            style={{ maxHeight: "3rem", margin: "auto" }}
          ></img>
        ) : (
          `${rank}`
        )}
      </td>
      <td
        className="font-bold"
        style={{ width: "40%", cursor: "pointer" }}
        onClick={gotoArticle}
      >
        {article.title}
      </td>
      <td className="" style={{ textAlign: "center" }}>
        {article.tagName}
      </td>
    </tr>
  );
}

export const HotTable = () => {
  const articleService = useArticleService();
  const [articleList, setArticleList] = useState<IMyArticle[]>([]);
  let x = 0;
  useEffect(() => {
    let articleRes;
    const retrieve = async () => {
      articleRes = await articleService.getTopArticle({
        page: 1,
        limit: 10,
      });
      setArticleList(articleRes.data.data.voList);
    };
    retrieve();
  }, []);
  return (
    <div style={{ fontSize: "1.3rem" }}>
      <table className="ui very basic table tableMain">
        {/* <thead className="">
  
          <tr className="">
            <th className="">标题</th>
            <th className="" style={{ textAlign: "center" }}>
              标签
            </th>
          </tr>
        </thead> */}
        <tbody className="">
          {articleList.map((articles) => {
            x = x + 1;
            return <TableRow article={articles} rank={x}></TableRow>;
          })}
        </tbody>
      </table>
    </div>
  );
};
