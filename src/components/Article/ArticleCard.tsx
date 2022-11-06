import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Popup, Image, Icon } from "semantic-ui-react";
import { useArticleService } from "../../hooks";
import { IArticle, IMyArticle } from "../../models/types";
import { updateCreppyDefaultImage } from "../../utils";
import { FavoriteButton } from "../Home/FavoriteButton";
import { FollowButton } from "../Home/FollowButton";

interface IProps {
  article: IMyArticle;
}

// TODO need to add article link
export const ArticleCard = ({ article }: IProps) => {
  const history = useHistory();

  const gotoArticle = () => {
    history.push(`/article/${article.id}`);
  };

  const gotoAuthor = () => {
    history.push(`/profile/${article.author.nickname}`);
  };

  return (
    <Fragment>
      <Card>
        <Card.Content>
          <Popup
            content={article.author.nickname}
            trigger={
              <Image
                floated="right"
                as="a"
                onClick={gotoAuthor}
                size="mini"
                src={updateCreppyDefaultImage(
                  article.author.avatar! ?? "assets/avatar.jfif"
                )}
              />
            }
          ></Popup>
          <Card.Header onClick={gotoArticle}>{article.title}</Card.Header>
          <Card.Meta onClick={gotoAuthor}>{article.author.nickname}</Card.Meta>
          <Card.Description onClick={gotoArticle}>
            {article.body}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="clock" />
            {/* Or to import a library to handle the date */}
            {new Date(article.createTime).toString().split("GMT")[0]}
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <FavoriteButton iarticle={article} />
        </Card.Content>
      </Card>
    </Fragment>
  );
};
