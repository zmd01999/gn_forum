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
  nickName: string | null;
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
}

export interface IArticle {
  slug: string;
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

export interface IArticleMeta {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface IComment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: IProfile;
}

export interface IJWTPayload {
  id: number,
  exp: number,
  username: string
}