import { Avatar } from "@mui/material";
import { userInfo } from "os";
import { Dispatch, SyntheticEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Icon,
  Label,
  Message,
  Modal,
  Placeholder,
  Image,
} from "semantic-ui-react";
import { IMsg, IMyArticle, IUserInfo } from "src/models/types";
import { setLoading, clearLoading } from "src/redux/actions";
import { LoaderAction } from "src/redux/reducers/LoaderReducer";
import { getLocalStorage, updateCreppyDefaultImage } from "src/utils";
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
  const [authors, setAuthors] = useState<IUserInfo[]>([]);
  const [open, setOpen] = useState(false);
  const [nowUser, setNowUser] = useState<IUserInfo>();

  const gotoArticle = (e: any) => {
    history.push(`/article/${e.target.id}`);
  };
  const retrieveCheck = async () => {
    // const res = await articleService.getCheckArticle({
    //   page: currentPage,
    // });

    // const res1 = await profileService.msgList(userInfo && userInfo.id);
    const res2 = await profileService.msgAuthorList();

    // setArticleList(res.data.data.voList);
    // setArticleCount(res.data.data.total);
    // setArticleList1(res1.data.data.userMessage);
    setAuthors(res2.data.data.userLetter);
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
      {authors && authors.length == 0 ? (
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
        <div className="grid grid-cols-4 gap-12">
          {authors.map((user) => {
            return (
              <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={
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
                    onClick={async () => {
                      setNowUser(user);
                      const res3 = await profileService.msgList(user.id);
                      setArticleList1(res3.data.data.userMessage);
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
                            {user && user.nickname && user.nickname.length > 8
                              ? user.nickname.substring(0, 7) + "..."
                              : user.nickname}{" "}
                          </span>

                          <div
                            className="flex flex-row text-sm text-gray-700"
                            style={{
                              fontWeight: "600",
                              fontSize: "1rem",
                              textAlign: "center",
                            }}
                          >
                            <div style={{ marginLeft: "1rem" }}>发来私信</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              >
                <Modal.Header>{nowUser?.nickname}发来的私信</Modal.Header>
                <Modal.Content
                  image
                  style={{ overflow: "scroll", minHeight: "50rem" }}
                >
                  {nowUser ? (
                    <Image
                      size="medium"
                      src={updateCreppyDefaultImage(nowUser.avatar ?? null)}
                      wrapped
                    />
                  ) : (
                    <></>
                  )}
                  <Modal.Description style={{ minWidth: "40rem" }}>
                    {articleList1.map((art) => {
                      return (
                        <p>
                          <Message icon info>
                            <Icon name="inbox" />
                            <Message.Content
                              id={art.id}
                              // onClick={(e: any) => gotoArticle(e)}
                            >
                              {/* <Message.Header id={art.id}>
                                {"我的私信"}
                              </Message.Header> */}
                              {`${art.content}`}
                              <Label
                                id={art.id}
                                color="teal"
                                className="float-right"
                              >
                                {art.createTime}
                              </Label>
                            </Message.Content>
                          </Message>
                        </p>
                      );
                    })}
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  {/* <Button onClick={() => setOpen(false)}>取消</Button> */}
                  <Button onClick={() => setOpen(false)} positive>
                    确定
                  </Button>
                </Modal.Actions>
              </Modal>
            );
          })}
        </div>

        // articleList1.map((art) => {
        //   return (
        //     <>
        //       <Message icon info>
        //         <Icon name="inbox" />
        //         <Message.Content
        //           id={art.id}
        //           onClick={(e: any) => gotoArticle(e)}
        //         >
        //           <Message.Header id={art.id}>{"我的私信"}</Message.Header>
        //           {`${art.content}`}
        //           <Label id={art.id} color="teal" className="float-right">
        //             {art.createTime}
        //           </Label>
        //         </Message.Content>
        //       </Message>
        //     </>
        //   );
        // })
      )}
    </>
  );
};
export default MyPM;
