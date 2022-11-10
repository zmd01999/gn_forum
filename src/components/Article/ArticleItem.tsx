import React, { Dispatch } from "react";
import { Button, Icon, Image, Item, Label, Popup } from "semantic-ui-react";
import { IMyArticle } from "../../models/types";
import { FavoriteButton } from "../Home/FavoriteButton";
import { FollowArtButton } from "src/components/Home/FollowArtButton";
import { updateCreppyDefaultImage } from "../../utils";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setWarning } from "../../redux/actions";
import { AppState } from "../../redux/store";
import { NotificationAction } from "../../redux/reducers/NotifyReducer";

const paragraph = <Image src="/images/wireframe/short-paragraph.png" />;
interface IProps {
  article: IMyArticle;
}
const ArticleItem = ({ article }: IProps) => {
  const history = useHistory();
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();
  const { isAuthenticated } = useSelector((state: AppState) => state.auth);

  const gotoArticle = () => {
    if (!isAuthenticated) {
      notifyDispatch(setWarning("你需要先登录"));
      history.push("/login");
      return;
    }
    history.push(`/article/${article.id}`);
  };

  const gotoAuthor = () => {
    history.push(`/profile/${article.author.nickname}`);
  };

  return (
    <Item>
      <Item.Image size="tiny" src="/assets/forum_1.webp" />

      <Item.Content>
        <Item.Header as="a" onClick={gotoArticle}>
          {article.title}
        </Item.Header>
        <Item.Meta>
          <Popup
            content={article.author.nickname}
            trigger={
              <Image
                floated="left"
                as="a"
                // onClick={gotoAuthor}
                size="mini"
                src={updateCreppyDefaultImage(article.author.avatar!)}
              />
            }
          ></Popup>
          <span className="cinema">{article.author.nickname}</span>
        </Item.Meta>
        <Item.Description
          onClick={gotoArticle}
        >{`${article.body.content.substring(0, 65)}...`}</Item.Description>
        <Item.Extra>
          {/* {article.tags.map((tag) => {
            return <Label>{tagName}</Label>;
          })} */}
          <Label>{article.tagName}</Label>
          {/* <Label>IMAX</Label>
          <Label icon="globe" content="Additional Languages" /> */}
          <a>
            <Icon name="clock" />
            {/* Or to import a library to handle the date */}
            {new Date(article.createTime).toString().split("GMT")[0]}
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <FavoriteButton iarticle={article} />
          <FollowArtButton iarticle={article} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default ArticleItem;
