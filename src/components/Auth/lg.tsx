// ** React Imports
import {
  ChangeEvent,
  MouseEvent,
  ReactNode,
  useState,
  Dispatch,
  forwardRef,
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
import { loadUser, setError, setSuccess } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import SendCode from "@jiumao/rc-send-code";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";

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

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState<State>({
    // username: "aaaaaaaa@aaa.com",
    // password: "aaaaaaaa",
    username: "13982737615",
    password: "123456",
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
    try {
      const res = await authService.login(values.username, values.password);
      // need type strickt check to know returned object is whether a
      authDispatch(loadUser(res.username, res.id));
      history.push(`/pcenter/${res.username}`);
      notifyDispatch(setSuccess("Login Successfully."));
    } catch (error: any) {
      notifyDispatch(setError(error.data.errors));
    }
  };

  const handleSubmitSms = async (event: any) => {
    event.preventDefault();
    try {
      const res = await authService.loginSms(phone, code);
      // need type strickt check to know returned object is whether a
      authDispatch(loadUser(res.username, res.id));
      history.push(`/pcenter/${res.username}`);
      notifyDispatch(setSuccess("Login Successfully."));
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
    <Box className="content-center" sx={{ mx: "auto" }}>
      <Card sx={{ zIndex: 1, mx: "auto" }}>
        <CardContent
          sx={{ padding: (theme) => `${theme.spacing(2, 3, 2)} !important` }}
        >
          <Box
            sx={{
              mb: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width={35}
              height={29}
              version="1.1"
              viewBox="0 0 30 23"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Artboard" transform="translate(-95.000000, -51.000000)">
                  <g id="logo" transform="translate(95.000000, 50.000000)">
                    <path
                      id="Combined-Shape"
                      fill={theme.palette.primary.main}
                      d="M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z"
                    />
                    <polygon
                      id="Rectangle"
                      opacity="0.077704"
                      fill={theme.palette.common.black}
                      points="0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646"
                    />
                    <polygon
                      id="Rectangle"
                      opacity="0.077704"
                      fill={theme.palette.common.black}
                      points="0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162"
                    />
                    <polygon
                      id="Rectangle"
                      opacity="0.077704"
                      fill={theme.palette.common.black}
                      points="22.7419355 8.58870968 30 12.7417372 30 16.9537453"
                      transform="translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) "
                    />
                    <polygon
                      id="Rectangle"
                      opacity="0.077704"
                      fill={theme.palette.common.black}
                      points="22.7419355 8.58870968 30 12.6409734 30 15.2601969"
                      transform="translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) "
                    />
                    <path
                      id="Rectangle"
                      fillOpacity="0.15"
                      fill={theme.palette.common.white}
                      d="M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z"
                    />
                    <path
                      id="Rectangle"
                      fillOpacity="0.35"
                      fill={theme.palette.common.white}
                      transform="translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) "
                      d="M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z"
                    />
                  </g>
                </g>
              </g>
            </svg>
            <Typography
              variant="h6"
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: "1.5rem !important",
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, marginBottom: 1.5 }}
            >
              欢迎来到 {themeConfig.templateName}! 👋🏻
            </Typography>
            <Typography variant="body2">请登录您的账号开启旅途</Typography>
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
              sx={{ marginBottom: 4 }}
              onChange={handleChange("username")}
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
            </Box>
            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{ marginBottom: 7 }}
              onClick={handleSubmit}
            >
              登录
            </Button>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Typography variant="body2" sx={{ marginRight: 2 }}>
                新用户？
              </Typography>
              <Typography variant="body2">
                <Link to="/register">
                  <LinkStyled>创建一个账号</LinkStyled>
                </Link>
              </Typography>
            </Box>
            <Divider sx={{ my: 3 }}>or</Divider>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton component="a" onClick={handleClickOpen}>
                <Phone sx={{ color: "#497ce2" }} />
              </IconButton>
              <Link to="/">
                <IconButton
                  component="a"
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  <Wechat sx={{ color: "#1da1f2" }} />
                </IconButton>
              </Link>
              <Link to="/">
                <IconButton
                  component="a"
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  <Github
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === "light"
                          ? "#272727"
                          : theme.palette.grey[300],
                    }}
                  />
                </IconButton>
              </Link>
              <Link to="/">
                <IconButton
                  component="a"
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  <Google sx={{ color: "#db4437" }} />
                </IconButton>
              </Link>

              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"短信验证登录"}</DialogTitle>
                <DialogContent>
                  <Stack>
                    <FormControl
                      sx={{ m: 2, width: "30ch" }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="standard-phone">手机号码</InputLabel>
                      <Input
                        id="standard-phone"
                        value={phone}
                        onChange={handlePhone}
                        endAdornment={
                          <InputAdornment position="end">
                            <SendCode
                              onCaptcha={() => {
                                return authService.verifyLCode(phone);
                              }}
                            />
                          </InputAdornment>
                        }
                      />
                    </FormControl>

                    <FormControl
                      sx={{ m: 2, width: "30ch" }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="standard-verify">验证码</InputLabel>
                      <Input
                        id="standard-verify"
                        value={code}
                        onChange={handleCode}
                      />
                    </FormControl>
                  </Stack>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>取消</Button>
                  <Button onClick={handleSubmitSms}>登录</Button>
                </DialogActions>
              </Dialog>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  );
};

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default LoginPage;
