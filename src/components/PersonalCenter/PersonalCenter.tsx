import { Layout, Button, DatePicker, Space, version } from "antd";
import { Tabs } from "../Home/Tabs";
import React, { useState } from "react";
import { Container, Avatar, Stack } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
// import Background from "../../../public/assets/pc_bg.jpg";
export const PersonalCenter = () => {
  const { Header, Footer, Sider, Content } = Layout;

  const TABS = {
    article: "文章",
    work: "作品",
  };
  const [currentTab, setCurrentTab] = useState<string>("作品");

  const bg = {
    bgd: {
      color: "rgba(0,0,0,.05)",
      backgroundImage: `url(${"assets/pc_bg.jpg"})`,
      backgroundSize: "100%,100%",
    },
  };
  return (
    <div>
      <Container maxWidth="md">
        <div className="h-24 bg-cyan-500 flex items-end" style={bg.bgd}>
          <div className="py-4">
            <Stack direction="row" spacing={2}>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
              <h1>我的名字</h1>
            </Stack>
          </div>
        </div>
        <Tabs tabs={TABS} setCurrentTab={setCurrentTab} />
        <h1>testsetsetes</h1>
        <button className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
          Click me
        </button>
      </Container>
    </div>
  );
};
