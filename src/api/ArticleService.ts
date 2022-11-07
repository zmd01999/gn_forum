import { IArticle, IArticleMeta } from "../models/types";
import { pageParameter, PER_PAGE_COUNT } from "../utils";
import { ApiService } from "./ApiService";
import _ from "lodash";

export class ArticleService {
  api: ApiService<IArticle>;

  constructor() {
    this.api = new ApiService<IArticle>();
  }

  public createArticle(article: IArticleMeta) {
    return this.api.post(`article/publish`, article);
  }

  public updateArticle(slug: string, article: object) {
    return this.api.put(`articles/${slug}`,article);
  }

  public deleteArticle(slug: string) {
    return this.api.delete(`articles/${slug}`);
  }

  // public getArticles(paras:{page: number, tag?: string, 
  //   favorited?: string,author?: string}) {
  //   let parameter = "";
    
  //   if (paras.tag !== undefined) {
  //     parameter += `tag=${paras.tag}`;
  //   }
  //   if (paras.favorited !== undefined) {
  //     parameter += `&favorited=${paras.favorited}`;
  //   }
  //   if (paras.author !==undefined) {
  //     parameter += `&author=${paras.author}`;
  //   }
  //   return this.api.get(
  //     `articles?${parameter}&${pageParameter(PER_PAGE_COUNT,paras.page)}`
  //   );
  // }

  public getArticles(paras:{page: number, tag?: string, 
    favorited?: string,author?: string,}) {
      
    return this.api.post(
      `article/listArticle?`,{page:paras.page,pageSize:PER_PAGE_COUNT}
    );
  }
  public getFeed(page:number) {
    return this.api.get(`articles/feed?${pageParameter(PER_PAGE_COUNT, page)}`)
  }

  public getSingleArticle(slug: string) {
    return this.api.get(`article/${slug}`);
  }

  public favoriteArticle(slug: string) {
    return this.api.post(`articles/${slug}/favorite`);
  }

  public unfavoriteArticle(slug: string) {
    return this.api.delete(`articles/${slug}/favorite`);
  }

  // public getTags() {
  //   return this.api.get("tags");
  // }
  public getTags() {
    return this.api.get("tags/getAllTag");
  }

  public getCategory() {
    return this.api.get("category/findAllCategory");
  }
  public getCategoryById(paras:{id : string,page:number}) {
    return this.api.post(`article/view/`,{categoryId:paras.id,page:paras.page,pageSize:PER_PAGE_COUNT});
  }

  public getMyArticle(paras:{page:number}) {
    return this.api.post(`article/myArticle`,{page:paras.page,pageSize:PER_PAGE_COUNT});
  }

  public getTFArticle(paras:{page:number,thumbs?:number,follow?:number}) {
    return this.api.post(`user/getArticle`,{page:paras.page,pageSize:PER_PAGE_COUNT,thumbs:paras.thumbs,follow:paras.follow});

  }
}
