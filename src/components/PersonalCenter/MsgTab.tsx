import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { Box, Card, Tab } from "@mui/material";
import {
  Forum,
  Favorite,
  Settings,
  Games,
  Money,
  Star,
  Help,
  People,
} from "@mui/icons-material";
import { SettingEditor } from "../Home/SettingEditor";
import MyWork from "./MyWork";
import MyArticle from "./MyArticle";
import MySetting from "./MySetting";
import MyMessage from "./MyMessage";
import { MyHelp } from "./MyHelp";
import { MyFollow } from "./MyFollow";
import ProfileDetail from "./ProfileDetail";
import { IUserInfo } from "src/models/types";
import MsgDetail from "./MsgDetail";
// import { Tab } from "semantic-ui-react";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// const panes = [
//   {
//     menuItem: "我的作品",
//     render: () => <Tab.Pane attached={false} >Tab 3 Content </Tab.Pane>,
//   },
//   {
//     menuItem: "我的帖子",
//     render: () => <Tab.Pane attached={false}> Tab 3 Content </Tab.Pane>,
//   },
//   {
//     menuItem: "喜欢",
//     render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
//   },
// ];
interface Props {
  profile: IUserInfo;
}

export default function MsgTab({ profile }: Props) {
  const [value, setValue] = React.useState(0);
  const p: boolean = true;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      {/* <Tab
        menu={{ secondary: true, pointing: true, vertical: false }}
        panes={panes}
        renderActiveOnly={false}
      /> */}

      <Box sx={{ width: "100%", hight: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", display: "none" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            orientation="vertical"
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider", fontSize: 16 }}
            variant="scrollable"
          >
            <Tab
              icon={<Forum />}
              iconPosition="start"
              label="论坛"
              {...a11yProps(0)}
              sx={{
                fontSize: 16,
                border: 1,
                borderColor: "primary.main",
                p: 1,
              }}
            />
            <Tab
              icon={<Games />}
              iconPosition="start"
              label="作品"
              {...a11yProps(1)}
              sx={{ fontSize: 16, border: 1 }}
            />
            <Tab
              icon={<Star />}
              iconPosition="start"
              label="消息"
              sx={{ fontSize: 16, border: 1 }}
              {...a11yProps(2)}
            />
            <Tab
              icon={<People />}
              iconPosition="start"
              label="我的关注"
              sx={{ fontSize: 16, border: 1 }}
              {...a11yProps(3)}
            />
            <Tab
              icon={<Settings />}
              iconPosition="start"
              label="设置"
              {...a11yProps(4)}
              sx={{ fontSize: 16, border: 1 }}
            />
            <Tab
              icon={<Help />}
              iconPosition="start"
              label="帮助"
              {...a11yProps(5)}
              sx={{ fontSize: 16, border: 1 }}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <MsgDetail profile={profile}></MsgDetail>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MyWork />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MyMessage />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <MyFollow />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <MySetting></MySetting>
        </TabPanel>
        <TabPanel value={value} index={5}>
          <MyHelp></MyHelp>
        </TabPanel>
      </Box>
    </div>
  );
}
