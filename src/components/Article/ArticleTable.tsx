import { Avatar } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IMyArticle } from "src/models/types";
import { setWarning } from "src/redux/actions";
import { AppState } from "src/redux/store";
import { updateCreppyDefaultImage } from "src/utils";
import { NotificationAction } from "../../redux/reducers/NotifyReducer";
import { Pagination } from "../Home/Pagination";

interface IProps {
  article: IMyArticle;
}

function TableRow({ article }: IProps) {
  const history = useHistory();
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();
  const { isAuthenticated } = useSelector((state: AppState) => state.auth);

  const gotoArticle = () => {
    if (!isAuthenticated) {
      notifyDispatch(setWarning("你需要先登录"));
      history.push("/login");
      return;
    }
    history.push(`/article/${article.id}`);
  };

  const gotoAuthor = () => {
    history.push(`/profile/${article.author.nickname}`);
  };
  return (
    <tr className="">
      <td className="" style={{ width: "40%" }} onClick={gotoArticle}>
        {article.title}
      </td>
      <td className="" style={{ textAlign: "center" }}>
        {article.tagName}
      </td>
      <td style={{ textAlign: "center" }}>
        <div
          className="flex justify-start  my-auto"
          style={{ paddingLeft: "20%" }}
        >
          <div style={{ textAlign: "center", marginRight: "0.5rem" }}>
            <Avatar
              src={updateCreppyDefaultImage(article.author.avatar ?? null)}
              sx={{ width: 30, height: 30, border: 1 }}
            />
          </div>
          <div className="my-auto" style={{ textAlign: "center" }}>
            {article.author.nickname.length > 8
              ? `${article.author.nickname.substring(0, 7)}...`
              : article.author.nickname}
          </div>
        </div>
      </td>
      <td className="" style={{ textAlign: "center" }}>
        {article.viewCounts}/{article.commentCounts}
      </td>
      <td className="" style={{ textAlign: "center" }}>
        {article.createTime}
      </td>
    </tr>
  );
}

interface MProps {
  articleList: IMyArticle[];
  count: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}
export const ATable = ({
  articleList,
  count,
  currentPage,
  setCurrentPage,
}: MProps) => {
  return (
    <div>
      <table className="ui very basic table tableMain">
        <thead className="">
          <tr className="">
            <th className="">标题</th>
            <th className="" style={{ textAlign: "center" }}>
              标签
            </th>
            <th className="" style={{ textAlign: "center" }}>
              作者
            </th>
            <th className="" style={{ textAlign: "center" }}>
              查看/回复
            </th>
            <th className="" style={{ textAlign: "center" }}>
              发表时间
            </th>
          </tr>
        </thead>
        <tbody className="">
          {articleList.map((articles) => {
            return <TableRow article={articles}></TableRow>;
          })}
        </tbody>
      </table>
      <div className="pstyle">
        <Pagination
          count={count}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
