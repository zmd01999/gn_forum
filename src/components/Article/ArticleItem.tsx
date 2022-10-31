import React from "react";
import { Button, Icon, Image, Item, Label, Popup } from "semantic-ui-react";
import { IArticle } from "../../models/types";
import { FavoriteButton } from "../Home/FavoriteButton";
import { updateCreppyDefaultImage } from "../../utils";
import { useHistory } from "react-router-dom";

const paragraph = <Image src="/images/wireframe/short-paragraph.png" />;
interface IProps {
  article: IArticle;
}
const ArticleItem = ({ article }: IProps) => {
  const history = useHistory();

  const gotoArticle = () => {
    history.push(`/article/${article.slug}`);
  };

  const gotoAuthor = () => {
    history.push(`/profile/${article.author.username}`);
  };

  return (
    <Item>
      <Item.Image src="/assets/forum_1.webp" />

      <Item.Content>
        <Item.Header as="a" onClick={gotoArticle}>
          {article.title}
        </Item.Header>
        <Item.Meta>
          <Popup
            content={article.author.username}
            trigger={
              <Image
                floated="left"
                as="a"
                onClick={gotoAuthor}
                size="mini"
                src={updateCreppyDefaultImage(article.author.image!)}
              />
            }
          ></Popup>
          <span className="cinema" onClick={gotoAuthor}>
            {article.author.username}
          </span>
        </Item.Meta>
        <Item.Description onClick={gotoArticle}>{`${article.body.substring(
          0,
          65
        )}...`}</Item.Description>
        <Item.Extra>
          <Label>IMAX</Label>
          <Label icon="globe" content="Additional Languages" />
          <a>
            <Icon name="clock" />
            {/* Or to import a library to handle the date */}
            {new Date(article.updatedAt).toString().split("GMT")[0]}
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <FavoriteButton iarticle={article} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default ArticleItem;
