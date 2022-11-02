import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  SyntheticEvent,
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
interface IProps {
  tags: string[];
  tab?: string;
  currentTag: string | undefined;
  setCurrentTag: Dispatch<SetStateAction<string | undefined>>;
}

export const TagList = ({ tags, tab, currentTag, setCurrentTag }: IProps) => {
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
    if (tab === "feed") {
      // not support yet
      // we may not want to handle tab part is tag, logic will be complex
      notifyDispatch(
        setWarning("tag select only works for global feed currently.")
      );
      return;
    }
    if (newTag === currentTag) {
      // disable current tag ansd set it to undefined
      setCurrentTag(undefined);
    } else {
      setCurrentTag(newTag);
    }
  };
  const isAuthenticated = true;
  // const { userInfo } = useSelector((state: AppState) => state.auth);
  const history = useHistory();

  return (
    <Fragment>
      <div className="mt-10 mb-8">
        {isAuthenticated ? (
          <Card.Group>
            <Card>
              <Card.Content>
                <Image floated="right" size="mini" src="/assets/avatar.jfif" />
                <Card.Header>{"用户"}</Card.Header>
                <Card.Meta>Friends of Elliot</Card.Meta>
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
                    onClick={() => history.push("/article/edit")}
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
        {tags.map((tag) => {
          return (
            <Label
              key={tag}
              as="a"
              color={tag === currentTag ? "black" : "grey"}
              horizontal
              onClick={handleTagClick}
            >
              {tag}
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
