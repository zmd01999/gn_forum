import React, { useEffect, useState } from "react";
import { Card, Feed, Icon } from "semantic-ui-react";
import { useArticleService } from "src/hooks";
import { IMyArticle } from "src/models/types";

const HotTopic = () => {
  const articleService = useArticleService();
  const [articleList, setArticleList] = useState<IMyArticle[]>([]);

  useEffect(() => {
    let articleRes;
    const retrieve = async () => {
      articleRes = await articleService.getTopArticle({
        page: 1,
        limit: 5,
      });
      setArticleList(articleRes.data.data.voList);
    };
    retrieve();
  }, []);
  return (
    <Card>
      <Card.Content>
        <Card.Header>热门话题</Card.Header>
      </Card.Content>
      <Card.Content>
        <Feed>
          {articleList.map((article: IMyArticle) => {
            return (
              <Feed.Event>
                <Feed.Label image="/assets/forum_1.webp" />
                <Feed.Content>
                  <Feed.Date
                    children={
                      <p>
                        <Icon name="hotjar"></Icon>
                        {`热度${article.thumbsCounts + 4}`}
                      </p>
                    }
                  />
                  <Feed.Summary>
                    <a href={`/article/${article.id}`}>{`${article.title}:`}</a>
                    {`${article.summary}`}
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            );
          })}
          {/* <Feed.Event>
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
          </Feed.Event> */}
        </Feed>
      </Card.Content>
    </Card>
  );
};
export default HotTopic;
