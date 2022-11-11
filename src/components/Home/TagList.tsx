import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  SyntheticEvent,
  useEffect,
} from "react";
import {
  Card,
  Label,
  SemanticCOLORS,
  Statistic,
  Button,
  Image,
  Grid,
  Divider,
  Segment,
} from "semantic-ui-react";
import { NotificationAction } from "../../redux/reducers/NotifyReducer";
import { setWarning } from "../../redux/actions";
import "./style.css";
import HotTopic from "../BaseUtils/HotTopic";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/redux/store";
import { useHistory } from "react-router";
import { MyTab } from "src/models/types";
import { getLocalStorage } from "src/utils";

interface IProps {
  tags: {
    id: string;
    tagName: string;
    avatar: string;
  }[];
  tab?: string;
  currentTag: string | undefined;
  setCurrentTag: Dispatch<SetStateAction<string | undefined>>;
  userInfo: any;
  cateList: MyTab[];
}

export const TagList = ({
  tags,
  tab,
  currentTag,
  setCurrentTag,
  userInfo,
  cateList,
}: IProps) => {
  const colors = [
    "red",
    "orange",
    "yellow",
    "olive",
    "green",
    "blue",
    "purplepink",
    "brown",
    "grey",
  ];

  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();

  const handleTagClick = (_: SyntheticEvent, data: object) => {
    const newTag = (data as any).children;
    if (tab !== "0") {
      // not support yet
      // we may not want to handle tab part is tag, logic will be complex
      notifyDispatch(setWarning("标签筛选只在全部选项下生效"));
      return;
    }
    if (newTag === currentTag) {
      // disable current tag ansd set it to undefined
      setCurrentTag(undefined);
    } else {
      setCurrentTag(newTag);
    }
  };
  const { isAuthenticated } = useSelector((state: AppState) => state.auth);
  const history = useHistory();
  const userInfoLocal: any = getLocalStorage("userInfo");

  return (
    <Fragment>
      <div className="mt-10 mb-8">
        {console.log(userInfo)}

        {isAuthenticated ||
        (userInfoLocal !== null && userInfoLocal !== "expire") ? (
          <Card.Group>
            <Card>
              <Card.Content>
                <Image floated="right" size="mini" src="/assets/avatar.webp" />
                <Card.Header>{userInfoLocal!.nickname ?? ""}</Card.Header>
                <Card.Meta>
                  {`${userInfoLocal.introduction.substring(0, 8)}...`}
                </Card.Meta>
                <Card.Description>
                  <Grid columns={3} divided>
                    <Grid.Column>
                      <span>1</span>
                      <span>收藏</span>
                    </Grid.Column>

                    <Grid.Column verticalAlign="middle">
                      <span>2</span>
                      <span>关注</span>
                    </Grid.Column>
                    <Grid.Column verticalAlign="middle">
                      <span>3</span>
                      <span>喜欢</span>
                    </Grid.Column>
                  </Grid>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button
                    basic
                    color="green"
                    onClick={() =>
                      history.push({
                        pathname: "/article/edit",
                        state: cateList,
                      })
                    }
                  >
                    发帖
                  </Button>
                  {/* <Button basic color="red">
                    Decline
                  </Button> */}
                </div>
              </Card.Content>
            </Card>
            <Card fluid color="orange" header="领取今日登录奖励" />
          </Card.Group>
        ) : (
          <Card
            href="/login"
            header="游客"
            meta="Friend"
            description="未登录？想要进一步体验那就点击注册/登录吧!"
          />
        )}
      </div>

      <div className="mb-8">
        <Statistic label="TOP热度榜" value={tags.length} />
        <br />
        {tags.map(({ id, tagName, avatar }) => {
          return (
            <Label
              key={tagName}
              as="a"
              color={tagName === currentTag ? "black" : "grey"}
              horizontal
              onClick={handleTagClick}
            >
              {tagName}
            </Label>
          );
        })}
      </div>

      <br />
      <div>
        <HotTopic></HotTopic>
      </div>
    </Fragment>
  );
};
