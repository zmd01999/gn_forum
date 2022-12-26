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
    return this.api.post(`article/deleteArticle`,{id:slug});
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
    return this.api.get(`article/detail/${slug}`);
  }

  public favoriteArticle(slug: string) {
    return this.api.post(`article/zan/`,{id:slug});
  }

  public unfavoriteArticle(slug: string) {
    return this.api.post(`article/popZan`,{id:slug});
  }

  public followArticle(slug: string) {
    return this.api.post(`article/follow`,{id:slug});
  }

  public unfollowArticle(slug: string) {
    return this.api.post(`article/removeArticleFollow`,{id:slug});
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

  public getMyArticle(paras:{page:number,userId:string}) {
    return this.api.post(`article/myArticle`,{page:paras.page,pageSize:PER_PAGE_COUNT,userId:paras.userId});
  }

  public getTFArticle(paras:{page:number,thumbs?:number,follow?:number}) {
    return this.api.post(`article/getArticle`,{page:paras.page,pageSize:PER_PAGE_COUNT,thumbs:paras.thumbs,follow:paras.follow});

  }
  public getTopArticle(paras:{page:number,thumbs?:number,follow?:number,limit?:number,}) {
    return this.api.post(`article/topArticle`,{page:paras.page,pageSize:PER_PAGE_COUNT,limit:paras.limit,thumbs:paras.thumbs,follow:paras.follow});

  }
  public getLastWeightArticle(paras:{page:number,thumbs?:number,follow?:number}) {
    return this.api.post(`article/lastWeight`,{page:paras.page,pageSize:PER_PAGE_COUNT,thumbs:paras.thumbs,follow:paras.follow});

  }
  public getLastCommentArticle(paras:{page:number,thumbs?:number,follow?:number}) {
    return this.api.post(`article/lastCommentArticle`,{page:paras.page,pageSize:PER_PAGE_COUNT,thumbs:paras.thumbs,follow:paras.follow});

  }
  public getLastPublish(paras:{page:number,thumbs?:number,follow?:number}) {
    return this.api.post(`article/lastPublish`,{page:paras.page,pageSize:PER_PAGE_COUNT,thumbs:paras.thumbs,follow:paras.follow});

  }

  public getCheckArticle(paras:{page:number}) {
    return this.api.post("article/checkArticle", {page:paras.page,pageSize:PER_PAGE_COUNT})
  }
  public searchArticle(paras:{page:number, title:string}) {
    return this.api.post("article/searchArticle", {page:paras.page,pageSize:PER_PAGE_COUNT,title:paras.title})
  }



  public cloudData(json:FormData) {
    return this.api.post("article/cosUpload",json,true);
  }

  public weightArticle(paras:{id:string, weight:number}) {
    return this.api.post("article/weightArticle",{id:paras.id,isWeight:paras.weight});
  }

  public getFans(paras:{page:number}) {
    return this.api.post("user/findFans", {page:paras.page,pageSize:PER_PAGE_COUNT})

  }

  public getFollow(paras:{page:number}) {
    return this.api.post("user/myFollow", {page:paras.page,pageSize:PER_PAGE_COUNT})

  }

}
