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
                You added <a>Jenny Hess</a> to your <a>coworker</a> group.
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>

          <Feed.Event>
            <Feed.Label image="/assets/forum_1.webp" />
            <Feed.Content>
              <Feed.Date content="3 days ago" />
              <Feed.Summary>
                You added <a>Molly Malone</a> as a friend.
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>

          <Feed.Event>
            <Feed.Label image="/assets/forum_1.webp" />
            <Feed.Content>
              <Feed.Date content="4 days ago" />
              <Feed.Summary>
                You added <a>Elliot Baker</a> to your <a>musicians</a> group.
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </Card.Content>
    </Card>
  );
};
export default HotTopic;
