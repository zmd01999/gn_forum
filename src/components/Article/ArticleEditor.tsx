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
  Dropdown,
} from "semantic-ui-react";
import { IArticleMeta, Itag } from "../../models/types";
import { useArticleService } from "../../hooks";
import { useHistory } from "react-router";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { getLocalStorage, objectDiff, toFile } from "../../utils";
import "src/components/Home/style.css";
import { MyTab } from "src/models/types";
import { setError, setSuccess } from "src/redux/actions";
import { NotificationAction } from "src/redux/reducers/NotifyReducer";
import { useDispatch } from "react-redux";
import Md from "./Md";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import { paramsToFormData } from "src/util";
import { color } from "@mui/system";
import "./editor.css";

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
  const [tagList, setTagList] = useState<Itag[]>([
    { id: "1", tagName: "Scratch", avatar: "" },
    { id: "2", tagName: "Python", avatar: "" },
    { id: "3", tagName: "技术交流", avatar: "" },
    { id: "4", tagName: "教程", avatar: "" },
    { id: "5", tagName: "创客", avatar: "" },
    { id: "6", tagName: "杂谈", avatar: "" },
    { id: "7", tagName: "其他", avatar: "" },
  ]);
  const user: any = getLocalStorage("userInfo");
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
  const [options, setOptions] = useState([{ key: "", text: "", value: "" }]);
  const [flag, setFlag] = useState(0);

  const [currentValues, setCurrentValues] = useState<string>();

  const handleAddition = (event: SyntheticEvent, data: any) => {
    console.log("handleAddition");
    if (options.length > 3 || data.value.length > 5) {
      return;
    }
    console.log(data);
    setOptions([
      ...options,
      { key: data.value, text: data.value, value: data.value },
    ]);
  };

  const handleChangeCV = (event: SyntheticEvent, data: any) => {
    if (data.value.length > 3 || data.value[data.length - 1].length > 5) {
      return;
    }
    console.log("changeCV");

    console.log(data.value);
    setCurrentValues(data.value);
  };
  const [oldArticle, setOldArticle] = useState<IArticleMeta>();
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();
  const handleCreateArticle = async () => {
    try {
      let creatRes;

      if (slug === undefined) {
        if (article.title == "") {
          notifyDispatch(setError("文章标题不能为空"));
          return;
        }
        if (article.title.length > 50) {
          notifyDispatch(setError("文章标题太长"));
          return;
        }
        if (article.body.contentHtml == "") {
          notifyDispatch(setError("文章内容不能为空"));
          return;
        }
        if (article.tagName == "") {
          notifyDispatch(setError("必选标签不能为空"));
          return;
        }
        if (article.tagName.length > 10) {
          notifyDispatch(setError("标签过长"));
          return;
        }
        const file: FormData = await toFile(
          JSON.stringify(article.body.contentHtml),
          user.id + article.title
        );
        articleService.cloudData(file).then((res) => {
          if (res.data.success) {
            handleBody2Html("https://" + res.data.data);
            console.log(article.body.content);
            setFlag(1);
          }
        });
      } else {
        // based on api we will only update with changed value, the tricky part here is
        // users may change the value back and forth, value remains unchanged finally. That's
        // why we use `objectDiff` method to find the difference, in real(?) practice we
        // choose to put with the whole body
        // res = await articleService.updateArticle(
        //   slug,
        //   objectDiff(article, oldArticle!)
        // );
      }
      // history.push(`/article/${res.data.article.slug}`);
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

  const handleTags = (e: any) => {
    const name: string = e.name;
    setArticle({
      ...article,
      ["tagName"]: name,
    });
  };
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
    setArticle({
      ...article,
      ["body"]: { content: e.toText(), contentHtml: e.toHTML() },
    });
  };
  const handleBody2Html = (e: any) => {
    setArticle({
      ...article,
      ["body"]: { content: e, contentHtml: article.body.contentHtml },
    });

    console.log(article.body.content);
  };
  const handleChange =
    (prop: keyof IArticleMeta) =>
    (
      event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
      if (prop == "title" || prop == "summary") {
        if (prop == "title") {
          if (event.target.value.length < 30) {
            setArticle({ ...article, [prop]: event.target.value });
          } else {
            setArticle({
              ...article,
              [prop]: event.target.value.substring(0, 30),
            });
          }
        } else {
          if (event.target.value.length < 200) {
            setArticle({ ...article, [prop]: event.target.value });
          } else {
            setArticle({
              ...article,
              [prop]: event.target.value.substring(0, 200),
            });
          }
        }
      } else {
        setArticle({ ...article, [prop]: event.target.value });
      }
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
    // retrieveTag();
  }, []);

  useEffect(() => {
    console.log(article.body);
    if (flag == 1) {
      articleService.createArticle(article).then((res) => {
        if (res.data.success) {
          notifyDispatch(setSuccess("发布成功."));
        } else {
          notifyDispatch(setError(res.data.msg));
        }
        history.push("/");
      });
    }
  }, [flag]);

  return (
    <Segment placeholder>
      <Header icon>
        {/* <Icon name="comment alternate outline" />
        机器人交流圣地 */}
      </Header>
      <div>
        <Form>
          <div className="float-left w-2/5">
            <Form.Field>
              <label>标题</label>
              <div className="flex flex-row space-x-4">
                <input
                  name="title"
                  placeholder="文章标题"
                  onChange={handleChange("title")}
                  value={article.title}
                  required
                  className="blackBorder"
                />
                <div className="w-2/5 my-auto	">
                  {" "}
                  {`还可输入${30 - article.title.length}个字符`}
                </div>
              </div>
            </Form.Field>
          </div>
          <div className="float-left w-5/6">
            <Form.Field>
              <label>简介</label>
              <div className="flex flex-row space-x-4">
                <input
                  name="summary"
                  placeholder="关于什么？"
                  onChange={handleChange("summary")}
                  value={article.summary}
                  required
                  className="blackBorder"
                />
                <div className="w-1/6 my-auto	">
                  {" "}
                  {`还可输入${200 - article.summary.length}个字符`}
                </div>
              </div>
            </Form.Field>
          </div>

          <div
            style={{ minHeight: "40rem", color: "black", fontWeight: "700" }}
            className="mb-24"
          >
            <Form.Field className="minheight">
              <label>内容</label>
              {/* <TextArea
              name="body"
              placeholder="文章内容"
              onChange={handleBody}
              style={{ minHeight: 280 }}
              value={article.body.content}
            /> */}

              {/* <Md /> */}
              <div className=".editor-container border overflow-y-scroll overflow-x-hidden blackBorder">
                <BraftEditor
                  value={article.body.contentHtml}
                  onChange={(editorState) => {
                    setContent(editorState);
                    handleBodyHtml(editorState);
                  }}
                  // extendControls={extendControlsIntroduce}
                ></BraftEditor>
              </div>
            </Form.Field>
          </div>
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
            <div className="flex flex-row justify-between">
              <div className="w-1/2">
                <input
                  // disabled={slug !== undefined}
                  name="tags"
                  placeholder="帖子标签"
                  onChange={handleChange("tagName")}
                  value={article.tagName}
                  required
                  className="blackBorder"
                  disabled
                />
              </div>

              <div className="w-2/5 ml-10">
                {" "}
                <Dropdown
                  options={options}
                  placeholder="添加自定义标签"
                  search
                  selection
                  fluid
                  multiple
                  allowAdditions
                  value={currentValues}
                  onAddItem={handleAddition}
                  onChange={handleChangeCV}
                  style={{ borderColor: "black" }}
                />
              </div>
            </div>

            <div className="space-x-4 my-8">
              {tagList.map((tag) => {
                return (
                  <Label
                    className="mlabel"
                    as="a"
                    onClick={(event: SyntheticEvent, data: object) =>
                      handleTags(data)
                    }
                    id={tag.id}
                    name={tag.tagName}
                  >
                    {tag.tagName}
                  </Label>
                );
              })}
            </div>
          </Form.Field>
          <div className="float-left mt-8">
            <Button onClick={handleCreateArticle} className="buttonC">
              发表帖子
            </Button>
          </div>
        </Form>
      </div>
    </Segment>
  );
};
