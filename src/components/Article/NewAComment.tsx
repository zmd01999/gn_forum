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
import { Header } from "./Header";
import BraftEditor from "braft-editor";

interface IProps {
  slug: string;
  authorId: string;
}

export const NewAComment = ({ slug, authorId }: IProps) => {
  const commentService = useCommentService();
  const [comments, setComments] = useState<IComment[]>([]);
  const [singleComment, setSingleComment] = useState<string>("");
  const loaderDispatch = useDispatch<Dispatch<LoaderAction>>();
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();
  const { isAuthenticated, userInfo } = useSelector(
    (state: AppState) => state.auth
  );

  const handleCommentChange = (data: any) => {
    setSingleComment(data.toHTML());
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
          await commentService.sendComment(slug, singleComment, authorId);
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
      {comments.map((comment) => {
        return (
          <div className="air-container flex flex-row space-x-12">
            <div className="w-1/6 leftInfo">
              <Header author={comment.author}></Header>
            </div>
            <div className="articleview-container">
              <div style={{ display: "flex" }} className="text-lg text-black">
                {`发表于${comment.createTime}`}
              </div>
              <Divider className="customDividerD" />
              <div className="h-72">
                <div
                  dangerouslySetInnerHTML={{ __html: comment.content }}
                ></div>
              </div>
              <Divider className="customDivider" />
              <div className="flex justify-between text-lg">
                <div className="text-gray-400 ">回复</div>
                <div className="text-gray-400 ">举报</div>
              </div>
            </div>
          </div>
          //   <SemanticComment>
          //     <SemanticComment.Avatar
          //       src={updateCreppyDefaultImage(comment.author.avatar ?? null)}
          //     />
          //     <SemanticComment.Content>
          //       <Link to={`/profile/${comment.author.nickname}`}>
          //         <SemanticComment.Author as="a">
          //           {comment.author.nickname}
          //         </SemanticComment.Author>
          //       </Link>
          //       <SemanticComment.Metadata>
          //         <div>{comment.createTime}</div>
          //       </SemanticComment.Metadata>
          //       <SemanticComment.Text>{comment.content}</SemanticComment.Text>
          //       <SemanticComment.Action>
          //         {isAuthenticated &&
          //         (userInfo.id === comment.author.id ||
          //           userInfo.id === authorId) ? (
          //           <Popup
          //             content="删除此评论"
          //             trigger={
          //               <Icon
          //                 size="tiny"
          //                 onClick={() => {
          //                   handleCommentAction("delete", comment.id);
          //                 }}
          //                 name="trash alternate"
          //               />
          //             }
          //           ></Popup>
          //         ) : (
          //           ""
          //         )}
          //       </SemanticComment.Action>
          //       --------
          //     </SemanticComment.Content>
          //   </SemanticComment>
        );
      })}

      <div className="air-container flex flex-row space-x-12">
        <div className="w-1/6 leftInfo">
          <Header author={userInfo}></Header>
        </div>
        <div className="comment-container border overflow-scroll">
          <BraftEditor
            value={singleComment}
            onChange={(editorState) => {
              handleCommentChange(editorState);
            }}
          ></BraftEditor>
        </div>
      </div>
      <Button
        size="large"
        color="blue"
        className="comment-button"
        onClick={() => {
          handleCommentAction("submit");
        }}
      >
        发表回复
      </Button>
    </Fragment>
  );
};
