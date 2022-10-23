// import { Tabs } from "../Home/Tabs";
import React, { useState } from "react";
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

// import Background from "../../../public/assets/pc_bg.jpg";
interface routeProps {
  username: string;
}
export const PersonalCenter = () => {
  const { username } = useParams<routeProps>();
  const bg = {
    bgd: {
      color: "rgba(0,0,0,.05)",
      backgroundImage: `url(${"assets/pc_bg.jpg"})`,
      backgroundSize: "100%,100%",
    },
  };
  return (
    <div>
      <Header></Header>

      <Container maxWidth="lg">
        {/* <div className="h-44 px-8 flex items-end bg-gradient-to-r from-green-400 to-blue-500 relative">
          <div className="absolute bottom-8 right-8">
            <SavingsSharpIcon></SavingsSharpIcon>
            <span> 20</span>
          </div>
          <div className="py-4">
            <Stack direction="row" spacing={2}>
              <LightTooltip title={username}>
                <Badge badgeContent={"Lv3"} color="primary">
                  <Avatar
                    alt={username}
                    src={"/assets/avatar.jfif"}
                    sx={{ width: 60, height: 60 }}
                  />
                </Badge>
              </LightTooltip>

              <div>
                <Stack spacing={1.2}>
                  <span className="text-2xl font-semibold text-white">
                    {username}
                  </span>
                  <Progress></Progress>
                </Stack>
              </div>
            </Stack>
          </div>
        </div> */}
        <SwitchBar></SwitchBar>
      </Container>
    </div>
  );
};
