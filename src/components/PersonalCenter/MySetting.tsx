// ** React Imports
import { SyntheticEvent, useState, useEffect, Dispatch } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { styled } from "@mui/material/styles";
import MuiTab, { TabProps } from "@mui/material/Tab";

// ** Icons Imports
import AccountOutline from "mdi-material-ui/AccountOutline";
import LockOpenOutline from "mdi-material-ui/LockOpenOutline";
import InformationOutline from "mdi-material-ui/InformationOutline";

// ** Demo Tabs Imports
import TabInfo from "./Setting/TabInfo";
import TabAccount from "./Setting/TabAccount";
import TabSecurity from "./Setting/TabSecurity";
import { IUserInfo } from "../../models/types";
import { useProfileService } from "../../hooks";

import { useSelector, useDispatch } from "react-redux";
import { loadUserInfo, setError, setSuccess } from "src/redux/actions";
import { AppState } from "src/redux/store";
import { AuthAction } from "src/redux/reducers/AuthReducer";
import { setLocalStorage } from "src/utils";

// ** Third Party Styles Imports
// import "react-datepicker/dist/react-datepicker.css";

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    minWidth: 100,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 67,
  },
}));

const TabName = styled("span")(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: "0.875rem",
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState<string>("account");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [profile, setProfile] = useState<IUserInfo>();
  const profileService = useProfileService();
  const authDispatch = useDispatch<Dispatch<AuthAction>>();

  const { id } = useSelector((state: AppState) => state.auth);

  const retrieveProfile = async () => {
    const res = await profileService.getUser(id);

    setProfile(res.data);
    console.log(res.data);
    authDispatch(loadUserInfo(res.data));
    setLocalStorage("userInfo", res.data);

    return true;
  };

  useEffect(() => {
    const loadAllData = async () => {
      await Promise.all([retrieveProfile()]);
    };
    loadAllData();
    window.scrollTo(0, 0);
  }, [value]);

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="account-settings tabs"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value="account"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccountOutline />
                <TabName>账号</TabName>
              </Box>
            }
          />
          <Tab
            value="security"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LockOpenOutline />
                <TabName>隐私</TabName>
              </Box>
            }
          />
          <Tab
            value="info"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <InformationOutline />
                <TabName>信息</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value="account">
          <TabAccount />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="security">
          <TabSecurity />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="info">
          <TabInfo />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

export default AccountSettings;
