import { IComment, IProfile } from "../models/types";
import { ApiService } from "./ApiService";

export class CommentService {
  api: ApiService<IComment>;

  constructor() {
    this.api = new ApiService<IComment>();
  }

  public sendComment(slug: string, content: string) {
    return this.api.post(`article/publish`, {
        articleId:slug,
        content: content,
    });
  }

  public getComments(slug: string) {
    return this.api.get(`comments/article/${slug}`);
  }

  public deleteComment(slug: string, id: string) {
    return this.api.delete(`articles/${slug}/comments/${id}`);
  }
}
