import { IComment, IProfile } from "../models/types";
import { ApiService } from "./ApiService";

export class CommentService {
  api: ApiService<IComment>;

  constructor() {
    this.api = new ApiService<IComment>();
  }

  public sendComment(slug: string, content: string,toAuthorId?:string,parent?:string,toUserId?:string) {
    return this.api.post(`comments/create`, {
        articleId:slug,
        content: content,
        toAuthorId:toAuthorId,
        parent:parent,
        toUserId:toUserId
    });
  }

  public getComments(slug: string) {
    return this.api.get(`comments/article/${slug}`);
  }

  public deleteComment(slug: string, id: string) {
    return this.api.post(`comments/deleteComment`,{id:id});
  }

  public thumbComment(slug: string) {
    return this.api.post("comments/thumbComment",{id:slug})
  }
}
