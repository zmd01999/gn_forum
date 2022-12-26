// ** React Imports
import {
  ChangeEvent,
  MouseEvent,
  ReactNode,
  useState,
  Dispatch,
  forwardRef,
  Fragment,
} from "react";

// ** Next Imports
// import Link from "next/link";
import { useRouter } from "next/router";

// ** MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
import MuiCard, { CardProps } from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import MuiFormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";

// ** Icons Imports
import Google from "mdi-material-ui/Google";
import Github from "mdi-material-ui/Github";
import Wechat from "mdi-material-ui/Wechat";
import Phone from "mdi-material-ui/Phone";

import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";

// ** Configs
import themeConfig from "../../configs/themeConfig";

// ** Layout Import
import BlankLayout from "../../@core/layouts/BlankLayout";

// ** Demo Imports
import FooterIllustrationsV1 from "./FooterIllustration";

import { useAuthService } from "../../hooks";
import { useHistory } from "react-router";
import { NotificationAction } from "../../redux/reducers/NotifyReducer";
import { AuthAction } from "../../redux/reducers/AuthReducer";
import {
  loadUser,
  setError,
  setSuccess,
  loadUserInfo,
} from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import "./Login.css";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface State {
  username: string;
  password: string;
  showPassword: boolean;
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up("sm")]: { width: "32rem" },
}));

const LinkStyled = styled("a")(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(
  ({ theme }) => ({
    "& .MuiFormControlLabel-label": {
      fontSize: "0.875rem",
      color: theme.palette.text.secondary,
    },
  })
);

export const LgCard = () => {
  // ** State
  const [values, setValues] = useState<State>({
    username: "",
    password: "",
    showPassword: false,
  });

  const [phone, setPhone] = useState<string>("");
  const [code, setCode] = useState<string>("");

  // ** Hook
  const theme = useTheme();
  const router = useRouter();
  const authService = useAuthService();
  const history = useHistory();
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();
  const authDispatch = useDispatch<Dispatch<AuthAction>>();
  const [checked, setChecked] = useState(false);

  const handleCheckChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handlePhone = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleCode = (event: ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (values.username == "" || values.password == "") {
      notifyDispatch(setError("请填写完整账号和密码"));
      return;
    }
    if (!checked) {
      notifyDispatch(setError("请同意隐私协议"));
      return;
    }
    try {
      const res = await authService.login(values.username, values.password);
      // need type strickt check to know returned object is whether a
      console.log(res.data);
      if (res.success) {
        authDispatch(loadUser(res.data.nickname, res.data.id));
        authDispatch(loadUserInfo(res.data));

        history.push(`/`);
        notifyDispatch(setSuccess("登录成功."));
      } else {
        notifyDispatch(setError(res.msg));
      }
    } catch (error: any) {
      notifyDispatch(setError(error.data.errors));
    }
  };

  const handleSubmitSms = async (event: any) => {
    event.preventDefault();
    if (phone == "" || code == "") {
      notifyDispatch(setError("请填入验证码和手机号"));
      return;
    }
    try {
      const res = await authService.loginSms(phone, code);
      // need type strickt check to know returned object is whether a
      if (res.success) {
        authDispatch(loadUser(res.data.nickname, res.data.id));
        authDispatch(loadUserInfo(res.data));

        history.push(`/pcenter/${res.data.nickname}`);
        notifyDispatch(setSuccess("登录成功."));
      } else {
        notifyDispatch(setError(res.msg));
      }
    } catch (error: any) {
      notifyDispatch(setError(error.data.errors));
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box className="content-center " sx={{ mx: "auto" }}>
      <Card sx={{ zIndex: 1, mx: "auto" }} className="bg">
        <CardContent
          sx={{ padding: (theme) => `${theme.spacing(2, 2, 2)} !important` }}
        >
          <Box
            sx={{
              mb: 1,
              display: "flex",
              //   alignItems: "center",
              //   justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                lineHeight: 1,
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: "1.5rem !important",
              }}
              className="text-white mt-4"
            >
              趣代码世界
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, marginBottom: 1.5 }}
              className="text-white"
            >
              —— 青 少 年 编 程 学 习 交 流 平 台
            </Typography>
          </Box>
          <form
            noValidate
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}
          >
            <TextField
              autoFocus
              fullWidth
              id="email"
              label="手机/邮箱"
              value={values.username}
              sx={{ marginBottom: 4, borderRadius: 5 }}
              onChange={handleChange("username")}
              className="bgInput"
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="auth-login-password">密码</InputLabel>
              <OutlinedInput
                label="Password"
                value={values.password}
                id="auth-login-password"
                onChange={handleChange("password")}
                type={values.showPassword ? "text" : "password"}
                defaultValue="aaaaaaaa"
                className="bgInput"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label="toggle password visibility"
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{
                mt: "1rem",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={handleCheckChange} />
                }
                label={
                  <Fragment>
                    <span>同意</span>
                    <a href="/privacy/1">
                      <LinkStyled>用户协议、</LinkStyled>
                    </a>
                    <a href="/privacy/2">
                      <LinkStyled>隐私协议、</LinkStyled>
                    </a>
                    <a href="/privacy/3">
                      <LinkStyled>儿童隐私政策</LinkStyled>
                    </a>
                  </Fragment>
                }
              />
            </Box>
            {/* <Box
              sx={{
                mb: 4,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel control={<Checkbox />} label="记住密码" />
              <Link to="/">
                <LinkStyled onClick={(e) => e.preventDefault()}>
                  忘记密码？
                </LinkStyled>
              </Link>
            </Box> */}
            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{ marginBottom: 5 }}
              onClick={handleSubmit}
              className="lgB mt-6"
            >
              登录
            </Button>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
              className="bottom"
            >
              <Typography variant="body2" sx={{ marginRight: 2 }}>
                <Link to="/register">
                  <LinkStyled>注册账号</LinkStyled>
                </Link>{" "}
              </Typography>
              <Typography variant="body2">
                <Link to="/register">
                  <LinkStyled>忘记密码？</LinkStyled>
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
