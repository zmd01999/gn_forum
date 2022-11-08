import React, { Component, Dispatch, FC, Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser, loadUserInfo, logoutUser } from "./redux/actions";
import { AuthAction } from "./redux/reducers/AuthReducer";
import { getLocalStorage, getUserFromJWT } from "./utils";

interface props {
  Comp: FC;
}

// GuardProuter is only used to judge whether user has log in currently
// TODO : we may want to add a `isRequired` param so users can be redirected
// to log page directly
export const GuardRouter = ({ Comp }: props) => {
  const authDispatch = useDispatch<Dispatch<AuthAction>>();

  useEffect(() => {
    const user = getUserFromJWT(getLocalStorage("token"));
    const userInfo: any = getLocalStorage("userInfo");
    if (userInfo !== null) authDispatch(loadUserInfo(userInfo));
    if (user !== null) {
      authDispatch(loadUser(user, userInfo.id));
    } else {
      authDispatch(logoutUser());
    }
  }, []);

  return <Comp />;
};
