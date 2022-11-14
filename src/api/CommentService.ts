import { IComment, IProfile } from "../models/types";
import { ApiService } from "./ApiService";

export class CommentService {
  api: ApiService<IComment>;

  constructor() {
    this.api = new ApiService<IComment>();
  }

  public sendComment(slug: string, content: string,toAuthorId?:string) {
    return this.api.post(`comments/create`, {
        articleId:slug,
        content: content,
        toAuthorId:toAuthorId,
    });
  }

  public getComments(slug: string) {
    return this.api.get(`comments/article/${slug}`);
  }

  public deleteComment(slug: string, id: string) {
    return this.api.delete(`articles/${slug}/comments/${id}`);
  }
}
