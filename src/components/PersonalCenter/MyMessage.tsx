import { Dispatch, SyntheticEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Icon, Label, Message } from "semantic-ui-react";
import { IMyArticle } from "src/models/types";
import { setLoading, clearLoading } from "src/redux/actions";
import { LoaderAction } from "src/redux/reducers/LoaderReducer";
import { useArticleService } from "../../hooks";

const MyMessage = () => {
  const articleService = useArticleService();
  const [articleList, setArticleList] = useState<IMyArticle[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articleCount, setArticleCount] = useState<number>(0);
  const loaderDiapatch = useDispatch<Dispatch<LoaderAction>>();
  const history = useHistory();

  const gotoArticle = (e: any) => {
    history.push(`/article/${e.target.id}`);
  };
  const retrieveCheck = async () => {
    const res = await articleService.getCheckArticle({
      page: currentPage,
    });

    setArticleList(res.data.data.voList);
    setArticleCount(res.data.data.total);
  };

  useEffect(() => {
    const loadAllData = async () => {
      loaderDiapatch(setLoading("请等待"));
      await Promise.all([retrieveCheck()]);
      loaderDiapatch(clearLoading());
    };
    loadAllData();
    window.scrollTo(0, 0);
  }, [currentPage]);
  return (
    <>
      {articleList.map((art) => {
        return (
          <>
            <Message icon info>
              <Icon name="inbox" />
              <Message.Content id={art.id} onClick={(e: any) => gotoArticle(e)}>
                <Message.Header id={art.id}>{art.title}</Message.Header>
                {`${art.body.content.substring(0, 64)}...`}
                <Label id={art.id} color="teal" className="float-right">
                  共{art.noCheck ?? 22}条回复未读
                </Label>
              </Message.Content>
            </Message>
          </>
        );
      })}
    </>
  );
};
export default MyMessage;
