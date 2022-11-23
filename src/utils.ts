import {Dispatch} from "react";
import { IArticleMeta, IJWTPayload } from "./models/types";
import _ from "lodash";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { logoutUser } from "./redux/actions";
import { AuthAction } from "./redux/reducers/AuthReducer";

export const setLocalStorage = (key: string, token: string) => {
  
  const obj = {
    token:token,
    expire: new Date().getTime() + 1000 * 60 * 60*6
};
  localStorage.setItem(key, JSON.stringify(obj));
};

const Logout=()=> {
  const authDispatch = useDispatch<Dispatch<AuthAction>>();

  authDispatch(logoutUser());

}

export const getLocalStorage = (key: string): string | null => {

  const value = localStorage.getItem(key);
  const time = new Date().getTime();
  if (!value) {
    return null;
  }
  try {
    const obj =  JSON.parse(value);
    if (time < obj.expire) {
      return obj.token;
  } else {
    Logout();
      localStorage.removeItem("userInfo");
      return "expire";
  }
  } catch (error) {
    return null;
  }
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

// will show 10 articles in each page
export const PER_PAGE_COUNT = 6;

const isExpValid = (date: number) => {
  // timestamp in typescript will be in miliseconds format
  // epoch
  return new Date().getTime() / 1000 <= date;
};

export const getUserFromJWT = (token: string | null) => {
  if (token === null|| token==="expire") {
    return null;
  }
  const decoded = jwtDecode<IJWTPayload>(token); // Returns with the JwtPayload type
  if (!isExpValid(decoded.exp)) {
    return null;
  }
  return decoded.username;
};

/** 
 * 
 * @param limitCount 
 * Limit number of articles (default is 20):
    ?limit=20
    Offset/skip number of articles (default is 0):
    ?offset=0
 * @param offset 
 * @returns 
 */
export const pageParameter = (limitCount: number, page: number) => {
  return `limit=${limitCount}&offset=${PER_PAGE_COUNT * (page - 1)}`;
};

export const objectDiff = (a1: IArticleMeta, a2: IArticleMeta) => {
  let s = {};
  Object.entries(a1).map(([key, value]) => {
    if (_.get(a2, key) != value) {
      _.set(s, key, value);
    }
  });

  return s;
};

export const updateCreppyDefaultImage = (image: string|null) => {
  // Am I the only one that thinks default avatar is creppy ?
  // if (image === "https://static.productionready.io/images/smiley-cyrus.jpg") {
  //   return `${process.env.PUBLIC_URL}/default-avatar.jpg`;
  // }
  if(image === null || image === "NULL"||image === "") {
    return "/assets/avatar.webp";
  } else {
    return "https://"+image;
  }
};

export const  toFile= async (str:string,id:string)=> {
  const name = id + ".txt"
  const fileContent = new File([str], name, { type: 'multipart/form-data' })
   const file = new FileReader()
   file.readAsText(fileContent, 'UTF-8')
   console.log(file)
   // 文件上传传参是formdata格式
   const formdata = new FormData()
   // 模仿单文件上传给接口传参
   formdata.append('file', fileContent)
    return formdata
}
