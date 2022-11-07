import { IArticleMeta } from "./models/types";
import { objectDiff } from "./utils";

test("object diff", () => {
  const a1: IArticleMeta = {
    title: "title1",
    summary: "description1",
    category:{id:"1"},
    body: {
      content:"body1",
      contentHtml:"",
    },
    tags: [{
      id:"1",
      tagName:"aa",
      avatar:"",
    },]
  };
  const a2: IArticleMeta = {
    title: "title1",
    summary: "description",
    category:{id:"1"},
    body: {
      content:"body1",
      contentHtml:"",
    },
    tags: [{
      id:"1",
      tagName:"aa",
      avatar:"",
    },]
  };

  // since a1.title === a2.title so we don't want field that are never changed appear
  expect(objectDiff(a1, a2)).toEqual({
    description: "description1",
    body: "body1",
    tags: ["aa", "bb", "cc"],
  });
});
