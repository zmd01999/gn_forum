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
  body: {content:string};
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
  category:{
    id:string;
    avatar:string;
    description:string;
    categoryName:string;
  };
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
  category:string;
  body: string;
  tags: string[];
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
}

export interface IJWTPayload {
  id: number,
  exp: number,
  username: string
}