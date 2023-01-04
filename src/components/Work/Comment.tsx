import { Avatar } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { deepOrange } from "@mui/material/colors";
import React, {
  Dispatch,
  Fragment,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Comment as SemanticComment,
  Divider,
  Form,
  Header,
  Icon,
  Modal,
  Popup,
  TextArea,
} from "semantic-ui-react";
import { useCommentService } from "../../hooks";
import { IComment, IUserInfo } from "../../models/types";
import { AppState } from "../../redux/store";
import { getLocalStorage, updateCreppyDefaultImage } from "../../utils";
import { LoaderAction } from "../../redux/reducers/LoaderReducer";
import { NotificationAction } from "../../redux/reducers/NotifyReducer";
import { setError, setSuccess } from "../../redux/actions";
import { clearLoading, setLoading } from "../../redux/actions";
import BraftEditor from "braft-editor";

interface IProps {
  slug: string;
  authorId?: string;
}

export const Comment = ({ slug, authorId }: IProps) => {
  const [comment, setComment] = useState<string>("");

  const handleCommentChange = (e: any) => {
    if (e.target.value.length > 200) {
      setComment(e.target.value.substring(0, 200));
    } else {
      setComment(e.target.value);
    }
  };

  const commentService = useCommentService();
  const [comments, setComments] = useState<IComment[]>([]);
  const [singleComment, setSingleComment] = useState<string>("");
  const loaderDispatch = useDispatch<Dispatch<LoaderAction>>();
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();
  const { isAuthenticated } = useSelector((state: AppState) => state.auth);
  const userInfo: any = getLocalStorage("userInfo");
  const [commentId, setCommentId] = useState("");
  const [commentAId, setCommentAId] = useState("");
  const [commentNum, setCommentNum] = useState(0);
  const retrieveComments = async () => {
    const res = await commentService.getComments(slug);
    setComments(res.data.data.commentVoList);
    setCommentNum(res.data.data.commentNum);
  };

  const handleCommentAction = async (type: string, id?: string) => {
    try {
      loaderDispatch(setLoading(`begin ${type} comment`));

      switch (type) {
        case "submit":
          await commentService.sendComment(slug, comment, authorId);
          break;
        case "delete":
          await commentService.deleteComment(slug, id!);
          break;
      }
      await retrieveComments();
    } catch (error: any) {
      notifyDispatch(setError(error.data.errors));
    } finally {
      loaderDispatch(clearLoading());
    }
  };
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState("");
  const history = useHistory();
  const handleContent = (data: any) => {
    setContent(data.value);
  };
  useEffect(() => {
    // TODO : check whether we need async/await here
    retrieveComments();
  }, []);

  return (
    <div className="ui comments">
      <h3 className="ui  header">评论 ({`${commentNum}`})</h3>

      <div className="flex flex-row">
        <div className="w-8 mt-6">
          <Avatar
            src={updateCreppyDefaultImage(userInfo && userInfo.avatar)}
            sx={{ width: 30, height: 30, border: 1 }}
          />
        </div>
        <div className="w-full">
          <form
            className="ui reply form ui left pointing label w"
            style={{ width: "100%" }}
          >
            <div className="field ">
              <textarea
                rows={2}
                placeholder="发表你友善的评论"
                onChange={handleCommentChange}
                value={comment}
              ></textarea>
            </div>

            {`还可以输入${200 - comment.length}个字`}
            <button
              className="publishButton"
              onClick={() => handleCommentAction("submit")}
            >
              发表评论
            </button>
          </form>
        </div>
      </div>

      <h3 className="ui  header">全部评论</h3>
      {/* <div className="comment">
        <div className="avatar">
          <img src={updateCreppyDefaultImage(null)} />
        </div>
        <div className="content">
          <a className="author">Jamms</a>
          <div className="metadata">
            <div>2022-12-11 5:42</div>
          </div>
          <div className="text">好玩</div>
          <div className="actions action">
            <a className="">回复</a>
            <ThumbUpIcon sx={{ color: deepOrange[50] }} />
            {}
          </div>
        </div>
      </div> */}
      {comments.map((comment) => {
        return (
          <div className="comment" id={comment.id}>
            <div className="avatar">
              <img
                src={updateCreppyDefaultImage(comment.author.avatar ?? null)}
                onClick={() => {
                  history.push(`/profile/${comment && comment.author.id}`);
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="content">
              <a
                className="author"
                onClick={() => {
                  history.push(`/profile/${comment && comment.author.id}`);
                }}
              >
                {comment.author.nickname}
              </a>
              <div className="metadata">
                <div>{comment.createTime}</div>
              </div>
              <div className="text">
                <p>{comment.content}</p>
              </div>
              <div className="actions action">
                <Modal
                  closeIcon
                  open={open}
                  trigger={
                    <a
                      className=""
                      id={comment.id}
                      onClick={() => {
                        setCommentId(comment.id);
                        setCommentAId(comment.author.id);
                      }}
                    >
                      回复
                    </a>
                  }
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                >
                  <Header icon="archive" content={`回复`} />
                  <Modal.Content>
                    <Form>
                      <TextArea
                        placeholder="填写您的内容"
                        value={content}
                        onChange={(event: SyntheticEvent, data: object) => {
                          handleContent(data);
                        }}
                      />
                    </Form>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color="red" onClick={() => setOpen(false)}>
                      <Icon name="remove" /> 取消
                    </Button>
                    <Button
                      color="green"
                      onClick={async () => {
                        commentService.sendComment(
                          slug,
                          content,
                          authorId,
                          commentId,
                          commentAId
                        );
                        setOpen(false);
                        await retrieveComments();
                      }}
                    >
                      <Icon name="checkmark" /> 发送
                    </Button>
                  </Modal.Actions>
                </Modal>
                <ThumbUpIcon
                  sx={{ color: deepOrange[50] }}
                  onClick={() => {
                    commentService.thumbComment(comment.id).then((res) => {
                      notifyDispatch(setSuccess("点赞成功"));
                    });
                  }}
                  style={{ cursor: "pointer" }}
                />
                {}
              </div>
            </div>
            {comment.childrens.map((children: IComment) => {
              return (
                <div className="ui comments">
                  <div className="comment">
                    <div className="avatar">
                      <img
                        src={updateCreppyDefaultImage(
                          children.author.avatar ?? null
                        )}
                        onClick={() => {
                          history.push(
                            `/profile/${children && children.author.id}`
                          );
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div className="content">
                      <a
                        className="author"
                        onClick={() => {
                          history.push(
                            `/profile/${children && children.author.id}`
                          );
                        }}
                      >
                        {children.author.nickname}
                      </a>
                      <div className="metadata">
                        <div>{children.createTime}</div>
                      </div>
                      <div className="text">{children.content}</div>
                      <div className="actions action">
                        {/* <a className="">回复</a> */}
                        <ThumbUpIcon
                          sx={{ color: deepOrange[50] }}
                          onClick={() => {
                            commentService
                              .thumbComment(children.id)
                              .then((res) => {
                                notifyDispatch(setSuccess("点赞成功"));
                              });
                          }}
                          style={{ cursor: "pointer" }}
                        />
                        {}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* <div className="comment">
        <div className="avatar">
          <img src={updateCreppyDefaultImage(null)} />
        </div>
        <div className="content">
          <a className="author">Joe Henderson</a>
          <div className="metadata">
            <div>2022-12-11 5:42</div>
          </div>
          <div className="text">哈哈哈哈哈哈哈</div>
          <div className="actions action">
            <a className="">回复</a>
            <ThumbUpIcon sx={{ color: deepOrange[50] }} />
            {}
          </div>
        </div>
      </div> */}
    </div>
  );
};
