import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Forum, Favorite, Settings, Games, Money } from "@mui/icons-material";
import { Profile } from "../Home/Profile";
import { SettingEditor } from "../Home/SettingEditor";
import VertivalBar from "./VertivalBar";

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
        <Box sx={{ p: 3 }}>
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

export default function SwitchBar() {
  const [value, setValue] = React.useState(0);
  const p: boolean = true;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            icon={<Forum />}
            iconPosition="start"
            label="论坛"
            {...a11yProps(0)}
          />
          <Tab
            icon={<Games />}
            iconPosition="start"
            label="作品"
            {...a11yProps(1)}
          />
          <Tab
            icon={<Favorite />}
            iconPosition="start"
            label="收藏"
            {...a11yProps(2)}
          />
          <Tab
            icon={<Money />}
            iconPosition="start"
            label="金币"
            {...a11yProps(3)}
          />

          <Tab
            icon={<Settings />}
            iconPosition="start"
            label="设置"
            {...a11yProps(4)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Profile isPc={p}></Profile>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <VertivalBar />
      </TabPanel>
      <TabPanel value={value} index={2}>
        收藏
      </TabPanel>
      <TabPanel value={value} index={3}>
        金币
      </TabPanel>
      <TabPanel value={value} index={4}>
        <SettingEditor />
      </TabPanel>
    </Box>
  );
}
