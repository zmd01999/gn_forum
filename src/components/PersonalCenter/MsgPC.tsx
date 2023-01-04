// import { Tabs } from "../Home/Tabs";
import React, { useEffect, useState } from "react";
import { Container, Avatar, Stack, Badge, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { deepPurple } from "@mui/material/colors";
import SwitchBar from "./SwitchBar";
import Progress from "./Progress";
import SavingsSharpIcon from "@mui/icons-material/SavingsSharp";
import { LightTooltip } from "../BaseUtils/ToolTips";
import Card from "@mui/material/Card";
import Header from "src/components/BaseUtils/tre/ProfileHead";
import NvBar from "src/components/BaseUtils/tre/NvBar";
import { getLocalStorage, setLocalStorage } from "src/utils";
import { useProfileService } from "src/hooks";
import MyTab from "./MyTab";
import ProfileTab from "./ProfileTab";
import { IUserInfo } from "src/models/types";
import MsgTab from "./MsgTab";
interface routeProps {
  slug: string;
}
export const MsgPC = () => {
  const profileService = useProfileService();
  let { slug } = useParams<routeProps>();
  const [profile, setProfile] = useState<IUserInfo>();
  useEffect(() => {
    const retrieve = async () => {
      const user: any = getLocalStorage("userInfo");
      if (user != null) {
        const id = user.id;
        const res = await profileService.getUser(id);
        setLocalStorage("userInfo", res.data);
      }

      const res2 = await profileService.homepage(slug);
      console.log(res2.data.data);
      setProfile(res2.data.data);
    };
    retrieve();
  }, []);

  return (
    <div>
      <Header profile={profile} isMsg={true}></Header>

      <Container maxWidth="xl">
        {profile ? <MsgTab profile={profile}></MsgTab> : <></>}
      </Container>
    </div>
  );
};
