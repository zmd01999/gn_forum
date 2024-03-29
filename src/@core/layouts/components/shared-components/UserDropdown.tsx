// ** React Imports
import {
  useState,
  SyntheticEvent,
  Fragment,
  ChangeEvent,
  Dispatch,
} from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** MUI Imports
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

// ** Icons Imports
import CogOutline from "mdi-material-ui/CogOutline";
import CurrencyUsd from "mdi-material-ui/CurrencyUsd";
import EmailOutline from "mdi-material-ui/EmailOutline";
import LogoutVariant from "mdi-material-ui/LogoutVariant";
import AccountOutline from "mdi-material-ui/AccountOutline";
import MessageOutline from "mdi-material-ui/MessageOutline";
import HelpCircleOutline from "mdi-material-ui/HelpCircleOutline";
import { Label } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getLocalStorage,
  removeLocalStorage,
  updateCreppyDefaultImage,
} from "src/utils";
import { logoutUser, setSuccess } from "src/redux/actions";
import { AuthAction } from "src/redux/reducers/AuthReducer";
import { NotificationAction } from "src/redux/reducers/NotifyReducer";
import { useSelector } from "react-redux";

// ** Styled Components
const BadgeContentSpan = styled("span")(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

interface user {
  name?: string;
}

const UserDropdown = (props: user) => {
  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  // ** Hooks
  const router = useRouter();

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url);
    }
    setAnchorEl(null);
  };
  const userInfo: any = getLocalStorage("userInfo");
  const styles = {
    py: 2,
    px: 4,
    width: "100%",
    display: "flex",
    alignItems: "center",
    color: "text.primary",
    textDecoration: "none",
    "& svg": {
      fontSize: "1.375rem",
      color: "text.secondary",
    },
  };

  const history = useHistory();
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();
  const authDispatch = useDispatch<Dispatch<AuthAction>>();
  const handleLogout = () => {
    notifyDispatch(setSuccess("您已成功注销!"));
    authDispatch(logoutUser());
    removeLocalStorage("token");
    removeLocalStorage("userInfo");
    history.push("/");
  };
  return (
    <Fragment>
      {/* <Badge
        overlap="circular"
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: "pointer" }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        style={{ zIndex: 0 }}
      >

        <Avatar
          alt="John Doe"
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src={updateCreppyDefaultImage(userInfo.avatar)}
        />
      </Badge> */}
      <Badge
        badgeContent={userInfo.checkMessage}
        color="warning"
        style={{ zIndex: 0 }}
      >
        <Avatar
          alt="John Doe"
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src={updateCreppyDefaultImage(userInfo.avatar)}
        />{" "}
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ "& .MuiMenu-paper": { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Badge
              overlap="circular"
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Avatar
                alt="John Doe"
                src={updateCreppyDefaultImage(userInfo.avatar)}
                sx={{ width: "2.5rem", height: "2.5rem" }}
              />
            </Badge>
            <Box
              sx={{
                display: "flex",
                marginLeft: 3,
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>
                {userInfo.nickname ?? "用户"}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "0.8rem", color: "text.disabled" }}
              >
                {userInfo.administrators == 2 ? "管理员" : "用户"}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem
          sx={{ p: 0 }}
          onClick={() => {
            history.push(`/pcenter/${userInfo.nickname}`);
            handleDropdownClose();
          }}
        >
          <Box sx={styles}>
            <AccountOutline sx={{ marginRight: 2 }} />
            个人中心
          </Box>
        </MenuItem>
        <MenuItem
          sx={{ p: 0 }}
          onClick={() => {
            history.push(`/msgcenter/${userInfo.id}`);
            handleDropdownClose();
          }}
        >
          <Box sx={styles}>
            <MessageOutline sx={{ marginRight: 2 }} />
            未读消息<Label color="teal">{userInfo.checkMessage}</Label>
          </Box>
        </MenuItem>
        {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <AccountOutline sx={{ marginRight: 2 }} />
            个人资料
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <EmailOutline sx={{ marginRight: 2 }} />
            Inbox
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <MessageOutline sx={{ marginRight: 2 }} />
            Chat
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <CogOutline sx={{ marginRight: 2 }} />
            Settings
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <CurrencyUsd sx={{ marginRight: 2 }} />
            Pricing
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <HelpCircleOutline sx={{ marginRight: 2 }} />
            FAQ
          </Box>
        </MenuItem>
        <Divider /> */}
        <MenuItem sx={{ p: 0 }} onClick={handleLogout}>
          <Box sx={styles}>
            <LogoutVariant
              sx={{
                marginRight: 2,
                fontSize: "1.375rem",
                color: "text.secondary",
              }}
            />
            注销
          </Box>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default UserDropdown;
