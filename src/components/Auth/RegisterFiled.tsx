// ** React Imports
import {
  useState,
  Fragment,
  ChangeEvent,
  MouseEvent,
  ReactNode,
  Dispatch,
} from "react";

// ** Next Imports
// import Link from "next/link";

// ** MUI Components
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";

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
import Twitter from "mdi-material-ui/Twitter";
import Facebook from "mdi-material-ui/Facebook";
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";

// ** Configs
import themeConfig from "src/configs/themeConfig";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Demo Imports
import FooterIllustrationsV1 from "./FooterIllustration";

import { useAuthService } from "../../hooks";
import { useHistory } from "react-router";
import { NotificationAction } from "../../redux/reducers/NotifyReducer";
import { AuthAction } from "../../redux/reducers/AuthReducer";
import { loadUser, setError, setSuccess } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

interface RFormlProps {
  children?: React.ReactNode;
  value: string;
}

interface State {
  username: string;
  email: string;
  password: string;
  busyness?: string;
  showPassword: boolean;
}
export const RForm = (props: RFormlProps) => {
  const { children, value, ...other } = props;
  const [values, setValues] = useState<State>({
    username: "",
    email: "",
    password: "",
    busyness: "1238723765435",
    showPassword: false,
  });

  // ** Hook
  const theme = useTheme();
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

  const handleSubmit = () => {
    const registerUser = async () => {
      try {
        const res = await authService.register(
          values.username,
          values.email,
          values.password
        );
        authDispatch(loadUser(res));
        history.push("/");
        notifyDispatch(setSuccess("User Register successfully."));
      } catch (error) {
        notifyDispatch(setError(error.data.errors));
      }
    };

    registerUser();
  };
  const LinkStyled = styled("a")(({ theme }) => ({
    fontSize: "0.875rem",
    textDecoration: "none",
    color: theme.palette.primary.main,
  }));
  const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(
    ({ theme }) => ({
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(2),
      "& .MuiFormControlLabel-label": {
        fontSize: "0.875rem",
        color: theme.palette.text.secondary,
      },
    })
  );

  return (
    <>
      {value == "company" ? (
        <form
          noValidate
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          <TextField
            autoFocus
            fullWidth
            id="username"
            label="用户名"
            value={values.username}
            onChange={handleChange("username")}
            sx={{ marginBottom: 4 }}
          />
          <TextField
            fullWidth
            type="email"
            label="邮箱"
            value={values.email}
            onChange={handleChange("email")}
            sx={{ marginBottom: 4 }}
          />
          {/* {value === "conpany" && <Typography>{children}</Typography>} */}
          <TextField
            fullWidth
            label="营业执照编号"
            value={values.busyness}
            onChange={handleChange("busyness")}
            sx={{ marginBottom: 4 }}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="auth-register-password">密码</InputLabel>
            <OutlinedInput
              label="Password"
              value={values.password}
              id="auth-register-password"
              onChange={handleChange("password")}
              type={values.showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    aria-label="toggle password visibility"
                  >
                    {values.showPassword ? (
                      <EyeOutline fontSize="small" />
                    ) : (
                      <EyeOffOutline fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Fragment>
                <span>I agree to </span>
                <Link to="/">
                  <LinkStyled
                    onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                  >
                    privacy policy & terms
                  </LinkStyled>
                </Link>
              </Fragment>
            }
          />
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{ marginBottom: 7 }}
            onClick={handleSubmit}
          >
            注册
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
              已有账号?
            </Typography>
            <Typography variant="body2">
              <Link to="/login">
                <LinkStyled>去登录</LinkStyled>
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
            <Link to="/">
              <IconButton
                component="a"
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                <Facebook sx={{ color: "#497ce2" }} />
              </IconButton>
            </Link>
            <Link to="/">
              <IconButton
                component="a"
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                <Twitter sx={{ color: "#1da1f2" }} />
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
          </Box>
        </form>
      ) : (
        <form
          noValidate
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          <TextField
            autoFocus
            fullWidth
            id="username"
            label="用户名"
            value={values.username}
            onChange={handleChange("username")}
            sx={{ marginBottom: 4 }}
          />
          <TextField
            fullWidth
            type="email"
            label="邮箱"
            value={values.email}
            onChange={handleChange("email")}
            sx={{ marginBottom: 4 }}
          />
          {/* {value === "conpany" && <Typography>{children}</Typography>} */}

          <FormControl fullWidth>
            <InputLabel htmlFor="auth-register-password">密码</InputLabel>
            <OutlinedInput
              label="Password"
              value={values.password}
              id="auth-register-password"
              onChange={handleChange("password")}
              type={values.showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    aria-label="toggle password visibility"
                  >
                    {values.showPassword ? (
                      <EyeOutline fontSize="small" />
                    ) : (
                      <EyeOffOutline fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Fragment>
                <span>I agree to </span>
                <Link to="/">
                  <LinkStyled
                    onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                  >
                    privacy policy & terms
                  </LinkStyled>
                </Link>
              </Fragment>
            }
          />
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{ marginBottom: 7 }}
            onClick={handleSubmit}
          >
            注册
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
              已有账号?
            </Typography>
            <Typography variant="body2">
              <Link to="/login">
                <LinkStyled>去登录</LinkStyled>
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
            <Link to="/">
              <IconButton
                component="a"
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                <Facebook sx={{ color: "#497ce2" }} />
              </IconButton>
            </Link>
            <Link to="/">
              <IconButton
                component="a"
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                <Twitter sx={{ color: "#1da1f2" }} />
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
          </Box>
        </form>
      )}
    </>
  );
};
