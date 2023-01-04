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
import Header from "src/components/BaseUtils/tre/GetStartedLight";
import NvBar from "src/components/BaseUtils/tre/NvBar";
import { getLocalStorage, setLocalStorage } from "src/utils";
import { useProfileService } from "src/hooks";
import MyTab from "./MyTab";

export const PersonalCenter = () => {
  const profileService = useProfileService();
  const [tabV, setTabV] = useState(0);
  useEffect(() => {
    const retrieve = async () => {
      const user: any = getLocalStorage("userInfo");
      if (user != null) {
        const id = user.id;
        const res = await profileService.getUser(id);
        setLocalStorage("userInfo", res.data);
      }
    };
    retrieve();
  }, []);

  return (
    <div>
      <Header setTabV={setTabV}></Header>

      <Container maxWidth="xl">
        {/* <SwitchBar></SwitchBar> */}
        <MyTab V={tabV} setTabV={setTabV}></MyTab>
      </Container>
    </div>
  );
};
