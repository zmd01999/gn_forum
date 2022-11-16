import produce from "immer";
import React, {
  ChangeEvent,
  useEffect,
  useState,
  SyntheticEvent,
  Dispatch,
  useRef,
  useCallback,
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
import { IArticleMeta, Itag } from "../../models/types";
import { useArticleService } from "../../hooks";
import { useHistory } from "react-router";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { objectDiff } from "../../utils";
import "src/components/Home/style.css";
import { MyTab } from "src/models/types";
import { setError, setSuccess } from "src/redux/actions";
import { NotificationAction } from "src/redux/reducers/NotifyReducer";
import { useDispatch } from "react-redux";
import Md from "./Md";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

interface routeProps {
  slug: string;
}

export const ArticleEditor = () => {
  const history = useHistory();
  const { slug } = useParams<routeProps>();
  const cateList: any = history.location.state;
  const articleService = useArticleService();
  const [tagList, setTagList] = useState<Itag[]>([]);

  const [article, setArticle] = useState<IArticleMeta>({
    title: "",
    summary: "",
    category: {
      id: "",
    },
    body: {
      contentHtml: "",
      content: "",
    },
    tagName: "",
  });
  const [mapToCate, setMapToCate] = useState<string>("");

  const tags = [
    { id: "主题1", text: "Thailand" },
    { id: "主题2", text: "India" },
    { id: "主题3", text: "Vietnam" },
    { id: "主题4", text: "Turkey" },
  ];

  const [oldArticle, setOldArticle] = useState<IArticleMeta>();
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();
  const handleCreateArticle = async () => {
    try {
      let res;

      if (slug === undefined) {
        if (article.title == "") {
          notifyDispatch(setError("文章标题不能为空"));
          return;
        }
        if (article.body.contentHtml == "") {
          notifyDispatch(setError("文章内容不能为空"));
          return;
        }
        if (article.tagName == "") {
          notifyDispatch(setError("标签不能为空"));
          return;
        }
        if (article.tagName.length >= 5) {
          notifyDispatch(setError("标签不能大于5个字符长度"));
          return;
        }
        res = await articleService.createArticle(article);
        if (res.data.success) {
          notifyDispatch(setSuccess("发布成功."));
        } else {
          notifyDispatch(setError("发布失败."));
        }
        history.push("/");
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
        _.set(draft, name, name === "tags" ? value.split(",") : value);
      })
    );
  };
  const [value, setValue] = useState("Initial value");

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);
  const handleCates = (e: any) => {
    console.log(e);
    setArticle({ ...article, ["category"]: { id: e.value } });
    setMapToCate(e.name);
  };
  const [content, setContent] = useState(BraftEditor.createEditorState(null));

  // const handleTags = (e: ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.value);
  //   setArticle({
  //     ...article,
  //     ["tags"]: [
  //       {
  //         tagName: e.target.value,
  //       },
  //     ],
  //   });
  // };
  const handleBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e);
    setArticle({
      ...article,
      ["body"]: {
        content: e.target.value,
        contentHtml: article.body.contentHtml,
      },
    });
  };
  const handleBodyHtml = (e: any) => {
    console.log(e.toText());
    setArticle({
      ...article,
      ["body"]: { content: e.toText(), contentHtml: e.toHTML() },
    });
  };
  const handleChange =
    (prop: keyof IArticleMeta) =>
    (
      event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
      setArticle({ ...article, [prop]: event.target.value });
    };

  useEffect(() => {
    const retrieveSingleArticle = async () => {
      const res = await articleService.getSingleArticle(slug);

      const article: IArticleMeta = res.data.article as IArticleMeta;
      setOldArticle(article);
      setArticle(article);
    };
    const retrieveTag = async () => {
      const tagRes = await articleService.getTags();

      setTagList(tagRes.data.data);
    };
    if (slug !== undefined) {
      retrieveSingleArticle();
    }
    retrieveTag();
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
              onChange={handleChange("title")}
              value={article.title}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>简介</label>
            <input
              name="summary"
              placeholder="关于什么？"
              onChange={handleChange("summary")}
              value={article.summary}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>内容</label>
            {/* <TextArea
              name="body"
              placeholder="文章内容"
              onChange={handleBody}
              style={{ minHeight: 280 }}
              value={article.body.content}
            /> */}

            {/* <Md /> */}
            <BraftEditor
              value={article.body.contentHtml}
              onChange={(editorState) => {
                setContent(editorState);
                handleBodyHtml(editorState);
              }}
              // extendControls={extendControlsIntroduce}
            ></BraftEditor>
          </Form.Field>
          {/* <Form.Field>
            <label>分类</label>
            <input
              // disabled={slug !== undefined}
              name="category"
              placeholder="有关分类"
              onChange={handleChange("category")}
              value={mapToCate}
              required
              disabled
            />
            {cateList.map((cate: MyTab) => {
              return (
                <Label
                  as="a"
                  onClick={(event: SyntheticEvent, data: object) =>
                    handleCates(data)
                  }
                  value={cate.id}
                  name={cate.name}
                >
                  {cate.name}
                  <Icon name="delete" />
                </Label>
              );
            })}
          </Form.Field> */}
          <Form.Field>
            <label>标签</label>
            <input
              // disabled={slug !== undefined}
              name="tags"
              placeholder="帖子标签"
              onChange={handleChange("tagName")}
              value={article.tagName}
              required
            />
            {/* {tagList.map((tag) => {
              return (
                <Label
                  as="a"
                  onClick={(event: SyntheticEvent, data: object) =>
                    handleTags(data)
                  }
                  id={tag.id}
                  name={tag.tagName}
                >
                  {tag.tagName}
                  <Icon name="delete" />
                </Label>
              );
            })} */}
          </Form.Field>
          <Button attached="right" color="green" onClick={handleCreateArticle}>
            {slug === undefined ? "创建" : "编辑"} 帖子
          </Button>
        </Form>
      </div>
    </Segment>
  );
};
