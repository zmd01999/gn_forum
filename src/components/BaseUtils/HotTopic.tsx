import React from "react";
import { Card, Feed } from "semantic-ui-react";

const HotTopic = () => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>热门话题</Card.Header>
      </Card.Content>
      <Card.Content>
        <Feed>
          <Feed.Event>
            <Feed.Label image="/assets/forum_1.webp" />
            <Feed.Content>
              <Feed.Date content="1 day ago" />
              <Feed.Summary>
                我的 <a>单臂机器人</a> 怎么 可以 动起来.
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>

          <Feed.Event>
            <Feed.Label image="/assets/forum_1.webp" />
            <Feed.Content>
              <Feed.Date content="3 days ago" />
              <Feed.Summary>
                这个 <a>程序</a> 需要怎么调试.
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>

          <Feed.Event>
            <Feed.Label image="/assets/forum_1.webp" />
            <Feed.Content>
              <Feed.Date content="4 days ago" />
              <Feed.Summary>
                最劲爆的 <a>机器人</a> 无人能敌.
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </Card.Content>
    </Card>
  );
};
export default HotTopic;
