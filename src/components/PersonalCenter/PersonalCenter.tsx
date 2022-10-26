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

export const PersonalCenter = () => {
  return (
    <div>
      <Header></Header>

      <Container maxWidth="lg">
        <SwitchBar></SwitchBar>
      </Container>
    </div>
  );
};
