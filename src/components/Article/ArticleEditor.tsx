import produce from "immer";
import React, {
  ChangeEvent,
  Fragment,
  useEffect,
  useState,
  SyntheticEvent,
} from "react";
import {
  Button,
  Form,
  TextArea,
  Segment,
  Header,
  Icon,
  Label,
} from "semantic-ui-react";
import { IArticleMeta } from "../../models/types";
import { useArticleService } from "../../hooks";
import { useHistory } from "react-router";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { objectDiff } from "../../utils";
import "src/components/Home/style.css";

interface routeProps {
  slug: string;
}

export const ArticleEditor = () => {
  const { slug } = useParams<routeProps>();
  const articleService = useArticleService();
  const history = useHistory();
  const [article, setArticle] = useState<IArticleMeta>({
    title: "",
    description: "",
    body: "",
    tagList: [],
  });
  const tags = [
    { id: "主题1", text: "Thailand" },
    { id: "主题2", text: "India" },
    { id: "主题3", text: "Vietnam" },
    { id: "主题4", text: "Turkey" },
  ];

  const [oldArticle, setOldArticle] = useState<IArticleMeta>();

  const handleCreateArticle = async () => {
    try {
      let res;
      if (slug === undefined) {
        res = await articleService.createArticle(article);
      } else {
        // based on api we will only update with changed value, the tricky part here is
        // users may change the value back and forth, value remains unchanged finally. That's
        // why we use `objectDiff` method to find the difference, in real(?) practice we
        // choose to put with the whole body
        res = await articleService.updateArticle(
          slug,
          objectDiff(article, oldArticle!)
        );
      }
      history.push(`/article/${res.data.article.slug}`);
    } catch (error) {}
  };

  const handleUpdateField = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setArticle(
      produce(article, (draft) => {
        _.set(draft, name, name === "tagList" ? value.split(",") : value);
      })
    );
  };

  const handleTags = (e: any) => {
    setArticle({ ...e, ["tagList"]: e.value });
  };

  useEffect(() => {
    const retrieveSingleArticle = async () => {
      const res = await articleService.getSingleArticle(slug);
      const article: IArticleMeta = res.data.article as IArticleMeta;
      setOldArticle(article);
      setArticle(article);
    };

    if (slug !== undefined) {
      retrieveSingleArticle();
    }
  }, []);

  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="comment alternate outline" />
        机器人交流圣地
      </Header>

      <div>
        <Form>
          <Form.Field width={6}>
            <label>标题</label>
            <input
              name="title"
              placeholder="文章标题"
              onChange={handleUpdateField}
              value={article.title}
              required
            />
          </Form.Field>

          <Form.Field>
            <label>简介</label>
            <input
              name="description"
              placeholder="关于什么？"
              onChange={handleUpdateField}
              value={article.description}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>内容</label>
            <TextArea
              name="body"
              placeholder="文章内容"
              onChange={handleUpdateField}
              style={{ minHeight: 280 }}
              value={article.body}
            />
          </Form.Field>
          <Form.Field>
            <label>标签</label>
            <input
              // disabled={slug !== undefined}
              name="tagList"
              placeholder="有关主题"
              // onChange={handleUpdateField}
              value={article.tagList}
              required
              disabled
            />
            {tags.map(({ id, text }) => {
              return (
                <Label
                  as="a"
                  onClick={(event: SyntheticEvent, data: object) =>
                    handleTags(data)
                  }
                  value={id}
                >
                  {id}
                  <Icon name="delete" />
                </Label>
              );
            })}
          </Form.Field>
          <Button attached="right" color="green" onClick={handleCreateArticle}>
            {slug === undefined ? "创建" : "编辑"} 帖子
          </Button>
        </Form>
      </div>
    </Segment>
  );
};
