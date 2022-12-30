import { userInfo } from "os";
import { Dispatch, SyntheticEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Icon, Label, Message, Placeholder } from "semantic-ui-react";
import { IMsg, IMyArticle } from "src/models/types";
import { setLoading, clearLoading } from "src/redux/actions";
import { LoaderAction } from "src/redux/reducers/LoaderReducer";
import { getLocalStorage } from "src/utils";
import { useArticleService, useProfileService } from "../../hooks";
import "./style.css";

const MyPM = () => {
  const articleService = useArticleService();
  const profileService = useProfileService();
  const [articleList, setArticleList] = useState<IMyArticle[]>([]);
  const [articleList1, setArticleList1] = useState<IMsg[]>([]);

  const userInfo: any = getLocalStorage("userInfo");
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

    const res1 = await profileService.msgList(userInfo && userInfo.id);

    setArticleList(res.data.data.voList);
    setArticleCount(res.data.data.total);
    setArticleList1(res1.data.data.userMessage);
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
      {articleList1.length == 0 ? (
        <div className="msgSelector">
          <Message positive>
            <Message.Header>您目前没有消息</Message.Header>
            {/* <p>
              Go to your <b>special offers</b> page to see now.
            </p> */}
          </Message>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </div>
      ) : (
        articleList1.map((art) => {
          return (
            <>
              <Message icon info>
                <Icon name="inbox" />
                <Message.Content
                  id={art.id}
                  onClick={(e: any) => gotoArticle(e)}
                >
                  <Message.Header id={art.id}>{"我的私信"}</Message.Header>
                  {`${art.content.substring(0, 64)}...`}
                  <Label id={art.id} color="teal" className="float-right">
                    {art.createTime}
                  </Label>
                </Message.Content>
              </Message>
            </>
          );
        })
      )}
    </>
  );
};
export default MyPM;
