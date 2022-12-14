import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import WorkCard from "../Work/WorkCard";
import { useState } from "react";
import { Pagination } from "../Home/Pagination";

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
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function MyWork() {
  const [value, setValue] = React.useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articleCount, setArticleCount] = useState<number>(1);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "auto",
        width: "auto",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="我的作品" {...a11yProps(0)} sx={{ fontSize: 16 }} />
        <Tab label="我的喜欢" {...a11yProps(1)} sx={{ fontSize: 16 }} />
        <Tab label="我的收藏" {...a11yProps(2)} sx={{ fontSize: 16 }} />
        {/* <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} /> */}
      </Tabs>
      <TabPanel value={value} index={0}>
        <WorkCard></WorkCard>
        <div className="mt-6">
          <Pagination
            count={articleCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WorkCard></WorkCard>
        <div className="mt-6">
          <Pagination
            count={articleCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        我的喜欢
        <div className="mt-6">
          <Pagination
            count={articleCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </TabPanel>
    </Box>
  );
}
