import { IProject } from "src/models/types";
import { PROJECT_PER_PAGE_COUNT } from "src/utils";
import { ApiService } from "./ApiService";

export class ProjectService {
    api: ApiService<IProject>;
  
    constructor() {
      this.api = new ApiService<IProject>();
    }
  
  
    public getProject(slug: string) {
      return this.api.get(`project/detail/${slug}`);
    }
  
    public listProject(paras:{page:number}) {
      return this.api.post(`project/listArticle`,{page:paras.page, pageSize:PROJECT_PER_PAGE_COUNT, project:1});
    }

    
  public getTFProject(paras:{page:number,thumbs?:number,follow?:number}) {
    return this.api.post(`project/getArticle`,{page:paras.page,pageSize:PROJECT_PER_PAGE_COUNT,thumbs:paras.thumbs,follow:paras.follow, project:1});
  }

  public getCateProject(paras:{page:number,categoryId:string}) {
    return this.api.post(`project/view`,{page:paras.page, pageSize:PROJECT_PER_PAGE_COUNT, project:1,categoryId:paras.categoryId});
  }

  public searchProject(paras:{page:number, title:string}) {
    return this.api.post("project/searchArticle", {page:paras.page,pageSize:PROJECT_PER_PAGE_COUNT,title:paras.title,project:1})
  }
  public getMyProject(paras:{page:number,userId:string}) {
    return this.api.post(`project/myArticle`,{page:paras.page,pageSize:PROJECT_PER_PAGE_COUNT,project:1,userId:paras.userId});
  }

  public getTopProject(paras:{page:number,thumbs?:number,follow?:number,limit?:number,}) {
    return this.api.post(`project/topArticle`,{page:paras.page,pageSize:PROJECT_PER_PAGE_COUNT,limit:paras.limit,thumbs:paras.thumbs,follow:paras.follow,project:1});
  }

  public getWeekProject(paras:{page:number}) {
    return this.api.post(`project/weekProject`,{page:paras.page,pageSize:PROJECT_PER_PAGE_COUNT});
  }
  public favoriteProject(slug: string) {
    return this.api.post(`project/zan/`,{id:slug});
  }

  public unfavoriteProject(slug: string) {
    return this.api.post(`project/popZan`,{id:slug});
  }

  public getRecom() {
    return this.api.get(`project/random/1`);
  }

  public deleteProject(slug: string) {
    return this.api.post(`project/deleteArticle`,{id:slug});
  }
  }