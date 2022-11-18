import React, {
  Fragment,
  SyntheticEvent,
  useEffect,
  useState,
  Dispatch,
} from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Card,
  Popup,
  Image,
  Icon,
  Button,
  Header,
  Modal,
  Label,
} from "semantic-ui-react";
import { useArticleService } from "../../hooks";
import { IArticle, IMyArticle } from "../../models/types";
import { updateCreppyDefaultImage } from "../../utils";
import { FavoriteButton } from "../Home/FavoriteButton";
import { FollowButton } from "../Home/FollowButton";
import { useDispatch } from "react-redux";
import { setSuccess, setError } from "src/redux/actions";
import { NotificationAction } from "../../redux/reducers/NotifyReducer";

interface IProps {
  article: IMyArticle;
  like?: boolean;
  isWeight?: boolean;
}

// TODO need to add article link
export const ArticleCard = ({ article, like, isWeight }: IProps) => {
  const history = useHistory();

  const gotoArticle = () => {
    history.push(`/article/${article.id}`);
  };

  const gotoAuthor = () => {
    history.push(`/profile/${article.author.nickname}`);
  };
  const [open, setOpen] = useState(false);
  const articleService = useArticleService();
  const notifyDiapatch = useDispatch<Dispatch<NotificationAction>>();
  const [weight, setWeight] = useState(article.weight);
  const handleDelete = async (e: any) => {
    console.log(e);
    const res = await articleService.deleteArticle(e.value);
    if (res.data.success) {
      notifyDiapatch(setSuccess("成功删除文章."));
    } else {
      notifyDiapatch(setError("删除失败."));
    }
    setOpen(false);
    window.location.reload();
  };

  const handleW = async (e: any) => {
    const w: number = weight == 0 ? 1 : 0;
    setWeight(w);
    await articleService.weightArticle({ id: e.value, weight: w });
  };

  return (
    <Fragment>
      <Card>
        <Card.Content>
          {isWeight ? (
            <Label
              color={weight == 0 ? "grey" : "violet"}
              basic={weight == 0 ? true : false}
              floating
              circular
              value={article.id}
              onClick={(event: SyntheticEvent, data: object) => {
                handleW(data);
              }}
            >
              {weight == 0 ? "置顶" : "已置顶"}
            </Label>
          ) : (
            <></>
          )}

          <Popup
            content={article.author.nickname}
            trigger={
              <Image
                floated="right"
                as="a"
                // onClick={gotoAuthor}
                size="mini"
                src={updateCreppyDefaultImage(
                  article.author.avatar! ?? "assets/avatar.jfif"
                )}
              />
            }
          ></Popup>
          <Card.Header onClick={gotoArticle}>{article.title}</Card.Header>
          <Card.Meta>{article.author.nickname}</Card.Meta>
          <Card.Description onClick={gotoArticle}>
            {`${article.body.content.substring(0, 64)}...`}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="clock" />
            {/* Or to import a library to handle the date */}
            {new Date(article.createTime).toString().split("GMT")[0]}
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {like == undefined ? (
            <Modal
              closeIcon
              open={open}
              trigger={<Icon name="delete" className="float-right mx-auto" />}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
            >
              <Header icon="archive" content="删帖" />
              <Modal.Content>
                <p>确定要删除该帖子吗？删除后将不可恢复！</p>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  color="red"
                  value={article.id}
                  onClick={(event: SyntheticEvent, data: object) =>
                    handleDelete(data)
                  }
                >
                  <Icon name="remove" /> 是
                </Button>
                <Button color="green" onClick={() => setOpen(false)}>
                  <Icon name="checkmark" /> 否
                </Button>
              </Modal.Actions>
            </Modal>
          ) : (
            <></>
          )}
          <FavoriteButton iarticle={article} />
        </Card.Content>
      </Card>
    </Fragment>
  );
};
