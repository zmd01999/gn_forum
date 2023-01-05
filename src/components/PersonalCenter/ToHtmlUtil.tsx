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
import { getLocalStorage, objectDiff, toFile, toFileURL } from "../../utils";
import "src/components/Home/style.css";
import { MyTab } from "src/models/types";
import { setError, setSuccess } from "src/redux/actions";
import { NotificationAction } from "src/redux/reducers/NotifyReducer";
import { useDispatch } from "react-redux";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import { paramsToFormData } from "src/util";
import { color } from "@mui/system";

interface routeProps {
  slug: string;
}

export const ToHtmlUtil = () => {
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
  const [url1, setUrl1] = useState<File>();
  const [url2, setUrl2] = useState<File>();
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
        const file = await toFileURL(
          JSON.stringify(article.body.contentHtml),
          user.id + article.title
        );
        file.onload = (e: any) => {
          let a = document.createElement("a");
          a.download = user.id + Date() + ".txt";
          a.href = e.target.result;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };
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
      ["body"]: { content: article.body.content, contentHtml: e },
    });
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
  const onChange1 = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      //   reader.onload = () => setImgSrc(reader.result as string);

      reader.readAsDataURL(files[0]);
      const formdata = new FormData();
      // 模仿单文件上传给接口传参
      formdata.append("file", files[0]);
      setUrl1(files[0]);
    }
  };

  const onChange2 = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      //   reader.onload = () => setImgSrc(reader.result as string);

      reader.readAsDataURL(files[0]);
      const formdata = new FormData();
      // 模仿单文件上传给接口传参
      formdata.append("file", files[0]);
      setUrl2(files[0]);
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

  return (
    <Segment placeholder style={{ width: "83rem" }}>
      <Header icon></Header>
      <div>
        <Form>
          <div
            style={{ minHeight: "40rem", color: "black", fontWeight: "700" }}
            className="mb-24"
          >
            <Form.Field className="minheight">
              <label>内容</label>
              <div className=".editor-container border overflow-y-scroll overflow-x-hidden blackBorder">
                <BraftEditor
                  value={article.body.contentHtml}
                  onChange={(editorState) => {
                    setContent(editorState);
                    handleBodyHtml(editorState);
                  }}
                ></BraftEditor>
              </div>
            </Form.Field>
          </div>

          <div className="float-right mt-8">
            <Button onClick={handleCreateArticle} className="buttonC">
              转为HTML
            </Button>
          </div>
        </Form>
      </div>
      <div>
        上传文章正文
        <input
          type="file"
          onChange={onChange1}
          accept=".zip"
          id="account-settings-upload-image"
        />
      </div>
      <div>
        上传文章信息
        <input
          type="file"
          onChange={onChange2}
          accept=".zip"
          id="account-settings-upload-image"
        />
      </div>
      <Button
        onClick={async () => {
          const formData1 = new FormData();

          formData1.append("fileFirst", url1 ?? "s");
          formData1.append("fileSec", url2 ?? "s");

          console.log(formData1.get("file"));
          await articleService
            .batchUpdate({
              fileFirst: formData1,
            })
            .then((res) => {
              if (res.data.success) {
                notifyDispatch(setSuccess("上传成功"));
                return;
              }
            });
        }}
      >
        提交
      </Button>
    </Segment>
  );
};
