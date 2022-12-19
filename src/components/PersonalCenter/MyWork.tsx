import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { WorkCard } from "../Work/WorkCard";
import { useEffect, useState, Dispatch } from "react";
import { Pagination } from "../Home/Pagination";
import { useProjectService } from "src/hooks";
import { IProject } from "src/models/types";
import { useDispatch } from "react-redux";
import { LoaderAction } from "src/redux/reducers/LoaderReducer";
import { clearLoading, setLoading } from "../../redux/actions";

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
  const [projectCount, setProjectCount] = useState<number>(1);
  const projectService = useProjectService();
  const loaderDiapatch = useDispatch<Dispatch<LoaderAction>>();

  const [projectList, setProjectList] = useState<IProject[]>([]);

  const retrievePublishedProject = async () => {
    return projectService.listProject({ page: currentPage });
  };

  const retrieveFavoritedProject = async () => {
    return projectService.getTFProject({
      page: currentPage,
      thumbs: 1,
    });
  };
  const retrieveFollowProject = async () => {
    return projectService.getTFProject({
      page: currentPage,
      follow: 1,
    });
  };

  const retrieveProjects = async () => {
    let res;
    switch (value) {
      case 0:
        res = await retrievePublishedProject();
        setProjectList(res.data.data.voList);
        setProjectCount(res.data.data.total);
        break;
      case 1:
        res = await retrieveFavoritedProject();
        // setArticleLikeList(res.data.data.articles);
        // setArticleLikeCount(res.data.data.total);
        break;
      case 2:
        res = await retrieveFollowProject();
    }

    setProjectList(res.data.data.voList);
    setProjectCount(res.data.data.total);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    const loadAllData = async () => {
      loaderDiapatch(setLoading("请等待"));
      await Promise.all([retrieveProjects()]);
      loaderDiapatch(clearLoading());
    };
    loadAllData();
    window.scrollTo(0, 0);
  }, [currentPage, value]);

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
        <div className="grid grid-cols-3 gap-12">
          {projectList.map((project) => {
            return <WorkCard project={project}></WorkCard>;
          })}
        </div>
        <div className="mt-6">
          <Pagination
            count={projectCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div className="grid grid-cols-4 gap-4">
          {projectList.map((project) => {
            return <WorkCard project={project}></WorkCard>;
          })}
        </div>

        <div className="mt-6">
          <Pagination
            count={projectCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="grid grid-cols-3 gap-12">
          {projectList.map((project) => {
            return <WorkCard project={project}></WorkCard>;
          })}
        </div>
        <div className="mt-6">
          <Pagination
            count={projectCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </TabPanel>
    </Box>
  );
}
