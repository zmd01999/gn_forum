import React, {
  Dispatch,
  Fragment,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Comment as SemanticComment,
  Divider,
  Form,
  Icon,
  Popup,
  TextArea,
} from "semantic-ui-react";
import { useCommentService } from "../../hooks";
import { IComment } from "../../models/types";
import { AppState } from "../../redux/store";
import { updateCreppyDefaultImage } from "../../utils";
import { LoaderAction } from "../../redux/reducers/LoaderReducer";
import { NotificationAction } from "../../redux/reducers/NotifyReducer";
import { setError } from "../../redux/actions";
import "./style.css";
import { clearLoading, setLoading } from "../../redux/actions";

interface IProps {
  slug: string;
}

export const Comment = ({ slug }: IProps) => {
  const commentService = useCommentService();
  const [comments, setComments] = useState<IComment[]>([]);
  const [singleComment, setSingleComment] = useState<string>("");
  const loaderDispatch = useDispatch<Dispatch<LoaderAction>>();
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();
  const { isAuthenticated, user } = useSelector(
    (state: AppState) => state.auth
  );

  const handleCommentChange = (event: SyntheticEvent, data: object) => {
    setSingleComment((data as any).value.trim());
  };

  const retrieveComments = async () => {
    const res = await commentService.getComments(slug);
    setComments(res.data.data);
  };

  const handleCommentAction = async (type: string, id?: string) => {
    try {
      loaderDispatch(setLoading(`begin ${type} comment`));

      switch (type) {
        case "submit":
          await commentService.sendComment(slug, singleComment);
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

  useEffect(() => {
    // TODO : check whether we need async/await here
    retrieveComments();
  }, []);

  return (
    <Fragment>
      <h4>评论</h4>
      <Divider />
      <SemanticComment.Group>
        {comments.map((comment) => {
          return (
            <SemanticComment>
              <SemanticComment.Avatar
                src={updateCreppyDefaultImage(
                  comment.author.avatar ?? "/assets/avatar.jfif"
                )}
              />
              <SemanticComment.Content>
                <Link to={`/profile/${comment.author.nickname}`}>
                  <SemanticComment.Author as="a">
                    {comment.author.nickname}
                  </SemanticComment.Author>
                </Link>
                <SemanticComment.Metadata>
                  <div>{comment.createTime}</div>
                </SemanticComment.Metadata>
                <SemanticComment.Text>{comment.content}</SemanticComment.Text>
                <SemanticComment.Action>
                  {isAuthenticated && user === comment.author.nickname ? (
                    <Popup
                      content="delete the comment"
                      trigger={
                        <Icon
                          size="tiny"
                          onClick={() => {
                            handleCommentAction("delete", comment.id);
                          }}
                          name="trash alternate"
                        />
                      }
                    ></Popup>
                  ) : (
                    ""
                  )}
                </SemanticComment.Action>
                --------
              </SemanticComment.Content>
            </SemanticComment>
          );
        })}
      </SemanticComment.Group>

      <Form className="comment-container">
        <TextArea placeholder="留下你的评论" onChange={handleCommentChange} />
        {isAuthenticated ? (
          <Button
            size="tiny"
            attached="right"
            color="green"
            style={{ marginTop: "10px", marginLeft: "auto" }}
            onClick={() => {
              handleCommentAction("submit");
            }}
          >
            发送评论
          </Button>
        ) : (
          <div>
            {" "}
            请 <Link to="/login">登录</Link> 后评论
          </div>
        )}
      </Form>
    </Fragment>
  );
};
