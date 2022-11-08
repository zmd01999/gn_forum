import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Card,
  Popup,
  Image,
  Icon,
  Button,
  Header,
  Modal,
} from "semantic-ui-react";
import { useArticleService } from "../../hooks";
import { IArticle, ILikeArticle, IMyArticle } from "../../models/types";
import { updateCreppyDefaultImage } from "../../utils";
import { FavoriteButton } from "../Home/FavoriteButton";
import { FollowButton } from "../Home/FollowButton";

interface IProps {
  article: ILikeArticle;
}

// TODO need to add article link
export const ArticleLikeCard = ({ article }: IProps) => {
  const history = useHistory();

  const gotoArticle = () => {
    history.push(`/article/${article.id}`);
  };

  const gotoAuthor = () => {
    history.push(`/profile/${article.authorId}`);
  };
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Card>
        <Card.Content>
          <Popup
            // content={article.author.nickname}
            trigger={
              <Image
                floated="right"
                as="a"
                onClick={gotoAuthor}
                size="mini"
                src={updateCreppyDefaultImage("assets/avatar.jfif")}
              />
            }
          ></Popup>
          <Card.Header onClick={gotoArticle}>{article.title}</Card.Header>
          {/* <Card.Meta onClick={gotoAuthor}>{article.author.nickname}</Card.Meta> */}
          <Card.Description onClick={gotoArticle}>
            {article.summary}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="clock" />
            {/* Or to import a library to handle the date */}
            {new Date(article.createTime).toString().split("GMT")[0]}
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {/* <FavoriteButton iarticle={article} /> */}
          <Modal
            closeIcon
            open={open}
            trigger={<Icon name="delete" className="float-right" />}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Header icon="archive" content="取消" />
            <Modal.Content>
              <p>取消点赞吗？</p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={() => setOpen(false)}>
                <Icon name="remove" /> 是
              </Button>
              <Button color="green" onClick={() => setOpen(false)}>
                <Icon name="checkmark" /> 否
              </Button>
            </Modal.Actions>
          </Modal>
        </Card.Content>
      </Card>
    </Fragment>
  );
};
