export type IError = string[];

export type messageType = "success" | "error" | "warning" | "info" | "" | null;

export enum Mode {
  Create = "CREATE",
  Edit = "EDIT",
}

export interface IUser {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface ISettingUser extends Omit<IUser, "token"> {
  password: string;
}

export interface IRegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface IProfile {
  username: string;
  bio: string | null;
  image: string | null;
  following: boolean;
}

export interface IUserInfo {
  id: string;
  realName: string | null;
  nickname: string;
  gender: string | null;
  birthday: string | null;
  region: string | undefined;
  qq: string | null;
  wx: string | null;
  money: string | null;
  level: string | null;
  // username: string | null;
  // bio: string | null;
  // image: string | null;
  // following: boolean | null;
  introduction: string | null;
  business: string | null;
  email: string | null;
  mobilePhoneNumber: string | null;
  avatar?:string;
  growthValue?:string|null;
  articleNum?:number;
  projectNum?:number;
  fans?:string; 
  administrators?:number;
}

export interface IProject {
  id:string;
  title: string;
  summary: string;
  avatar:string;
  body: {content:string, contentHtml:string};
  tags: {                    
    id: string,
    tagName: string,
    avatar: string
}[];
  createTime: Date | string;
  commentCounts:number;
  weight:number;
  author:IUserInfo;
  viewCounts: number;
  thumbsCounts: number;
  isZan:number;
  isFollow:number;
  category:{
    id:string;
    avatar:string;
    description:string;
    name:string;
  };
  tagName?:string;
  noCheck?:string;
  copyright?:string;
  description?:string;
}

export interface IArticle {
  slug: string;
  id?:string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
  favorited: boolean;
  favoritesCount: number;
  author: IProfile;
}
export interface IMyArticle {
  id:string;
  title: string;
  summary: string;
  body: {content:string, contentHtml:string};
  tags: {                    
    id: string,
    tagName: string,
    avatar: string
}[];
  createTime: Date | string;
  commentCounts:number;
  weight:number;
  author:IUserInfo;
  viewCounts: number;
  thumbsCounts: number;
  isZan:number;
  isFollow:number;
  category:{
    id:string;
    avatar:string;
    description:string;
    categoryName:string;
  };
  tagName?:string;
  noCheck?:string;
}

export interface IMsg {
  id: string;
  fromUser: string;
  toUser: string;
  content:string;
  createTime: string;
  updateTime: string;
  status: string;
  conversation: string;
}

export interface ILikeArticle {
authorId:string;
bodyId: string;
categoryId: number;
commentCounts: number;
createTime: Date | string;
deleted: number;
id: string;
summary: string;
thumbsCounts: number;
title: string;
viewCounts: number;
weight: number;
}

// export interface IArticleMeta {
//   title: string;
//   description: string;
//   body: string;
//   tagList: string[];
// }
export interface IArticleMeta {
  title: string;
  summary: string;
  category:{
    id:string;
  };
  body: {
    contentHtml : string;
    content : string;
  };
  tagName:string;
}

export interface Itag {
  id: string;
  tagName: string;
  avatar: string;
}

export interface MyTab {
  id: string;
  avatar: string;
  name: string;
  description: string;
  createTime: string | Date;
  status: string;
}
// export interface IComment {
//   id: number;
//   createdAt: Date;
//   updatedAt: Date;
//   body: string;
//   author: IProfile;
// }

export interface IComment {
  id: string;
  content: string;
  childrens: [];
  createTime:Date | string;
  level:number;
  toUser:string;
  body: string;
  author: IUserInfo;
  isThumbs?:number;
}

export interface IJWTPayload {
  id: number,
  exp: number,
  username: string
}