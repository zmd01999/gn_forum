// ** React Imports
import {
  useState,
  ElementType,
  ChangeEvent,
  SyntheticEvent,
  Dispatch,
  MouseEvent,
  useEffect,
} from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Button, { ButtonProps } from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { IUserInfo } from "src/models/types";
import { useProfileService } from "src/hooks";
import { NotificationAction } from "src/redux/reducers/NotifyReducer";
import { setSuccess } from "src/redux/actions";
import { useSelector, useDispatch } from "react-redux";
// ** Icons Imports
import Close from "mdi-material-ui/Close";
import { AppState } from "src/redux/store";
import { getLocalStorage, updateCreppyDefaultImage } from "src/utils";
import EyeOutline from "mdi-material-ui/EyeOutline";
import KeyOutline from "mdi-material-ui/KeyOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";
import LockOpenOutline from "mdi-material-ui/LockOpenOutline";
import { useAuthService } from "src/hooks";
import { setError } from "src/redux/actions";

import SendCode from "@jiumao/rc-send-code";
import { Avatar, InputAdornment, OutlinedInput } from "@mui/material";
interface State {
  newPassword: string;
  currentPassword: string;
  showNewPassword: boolean;
  confirmNewPassword: string;
  showCurrentPassword: boolean;
  showConfirmNewPassword: boolean;
  phone: string;
  code: string;
}
const ImgStyled = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)<
  ButtonProps & { component?: ElementType; htmlFor?: string }
>(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
}));
interface routeProps {
  username: string;
}

const TabAccount = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState<boolean>(true);

  const profileService = useProfileService();
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();
  const { id } = useSelector((state: AppState) => state.auth);
  const userInfo: any = getLocalStorage("userInfo");

  const [imgSrc, setImgSrc] = useState<string>(
    updateCreppyDefaultImage(userInfo.avatar)
  );
  const [form, setForm] = useState<IUserInfo>({
    id: userInfo.id,
    realName: userInfo.realName == null ? "????????????" : userInfo.realName,
    nickname: userInfo.nickname,
    gender: userInfo.gender == null ? "male" : userInfo.gender,
    birthday: userInfo.birthday,
    region: userInfo.region == null ? "??????" : userInfo.region,
    qq: userInfo.qq,
    wx: userInfo.wx,
    money: userInfo.money,
    level: userInfo.level,
    introduction:
      userInfo.introduction == null
        ? "????????????????????????"
        : userInfo.introduction,
    business:
      userInfo.business == null ? "??????????????????. Ltd." : userInfo.business,
    email: userInfo.email == null ? "" : userInfo.email,
    mobilePhoneNumber:
      userInfo.mobilePhoneNumber == null ? "" : userInfo.mobilePhoneNumber,
    avatar: userInfo.avatar,
  });
  const handleChange =
    (prop: keyof IUserInfo) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [prop]: event.target.value });
    };
  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);

      reader.readAsDataURL(files[0]);
      const formdata = new FormData();
      // ????????????????????????????????????
      formdata.append("file", files[0]);
      profileService.updateAvartar(formdata).then((res) => {
        if (res.data.success) {
          setForm({ ...form, ["avatar"]: res.data.data });
          notifyDispatch(setSuccess("???????????????????????????"));
        }
      });
    }
  };
  const { username } = useParams<routeProps>();

  // ** States
  const [values, setValues] = useState<State>({
    newPassword: "",
    currentPassword: "",
    phone: "",
    code: "",
    showNewPassword: false,
    confirmNewPassword: "",
    showCurrentPassword: false,
    showConfirmNewPassword: false,
  });

  // Handle Current Password
  const handleCurrentPasswordChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword });
  };
  const handleMouseDownCurrentPassword = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const getDateGap = () => {
    var t1 = userInfo.updateName;
    var dateBegin = new Date(t1.replace(/-/g, "/"));
    const now = new Date();
    var dateDiff = now.getTime() - dateBegin.getTime(); //?????????????????????
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //?????????????????????
    return dayDiff;
  };
  // Handle New Password
  const handleNewPasswordChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };
  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleClickShowConfirmNewPassword = () => {
    setValues({
      ...values,
      showConfirmNewPassword: !values.showConfirmNewPassword,
    });
  };
  const handleMouseDownConfirmNewPassword = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {}, []);
  const authService = useAuthService();
  return (
    <div className="flex flex-row" style={{ width: "75rem" }}>
      <div>
        <CardContent>
          <form>
            <Box sx={{ display: "flex", alignItems: "center", mb: "5" }}>
              <ImgStyled src={imgSrc} alt="Profile Pic" />
              <Box>
                <ButtonStyled
                  component="label"
                  variant="contained"
                  htmlFor="account-settings-upload-image"
                >
                  ????????????
                  <input
                    hidden
                    type="file"
                    onChange={onChange}
                    accept="image/png, image/jpeg"
                    id="account-settings-upload-image"
                  />
                </ButtonStyled>
                <ResetButtonStyled
                  color="error"
                  variant="outlined"
                  onClick={() => setImgSrc("/assets/1.png")}
                >
                  ??????
                </ResetButtonStyled>
                <Typography variant="body2" sx={{ marginTop: 5 }}>
                  ?????? PNG or JPEG. ?????? of 800K.
                </Typography>
              </Box>
            </Box>
            <TextField
              disabled={getDateGap() > 30 ? false : true}
              fullWidth
              label="?????????"
              placeholder="johnDoe"
              onChange={handleChange("nickname")}
              value={
                getDateGap() > 30
                  ? form.nickname
                  : form.nickname + "     60???????????????"
              }
              style={{ marginBottom: "2rem", marginTop: "3rem" }}
            />
            <TextField
              fullWidth
              multiline
              label="????????????"
              minRows={2}
              placeholder="Bio"
              value={form.introduction}
              onChange={handleChange("introduction")}
              style={{ marginBottom: "2rem" }}
            />
            <TextField
              fullWidth
              label="??????"
              placeholder="123456789"
              value={form.mobilePhoneNumber}
              onChange={handleChange("mobilePhoneNumber")}
              style={{ marginBottom: "2rem" }}
            />
            <TextField
              fullWidth
              type="email"
              label="????????????"
              placeholder="zmd@example.com"
              value={form.email}
              onChange={handleChange("email")}
              style={{ marginBottom: "2rem" }}
            />
            <Button
              variant="contained"
              sx={{ marginRight: 3.5 }}
              onClick={() => {
                return profileService.updateUser(form).then(() => {
                  notifyDispatch(setSuccess("????????????"));
                });
              }}
            >
              ??????
            </Button>
          </form>
        </CardContent>
      </div>
      <div style={{ paddingLeft: "4rem" }}>
        <form>
          <CardContent sx={{ paddingBottom: 0 }}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="account-settings-current-password">
                        ?????????
                      </InputLabel>
                      <OutlinedInput
                        label="Current Password"
                        value={values.currentPassword}
                        id="account-settings-current-password"
                        type={values.showCurrentPassword ? "text" : "password"}
                        onChange={handleCurrentPasswordChange(
                          "currentPassword"
                        )}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              aria-label="toggle password visibility"
                              onClick={handleClickShowCurrentPassword}
                              onMouseDown={handleMouseDownCurrentPassword}
                            >
                              {values.showCurrentPassword ? (
                                <EyeOutline />
                              ) : (
                                <EyeOffOutline />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="phone"
                      label="??????"
                      value={values.phone}
                      onChange={handleNewPasswordChange("phone")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="standard-code">?????????</InputLabel>
                      <OutlinedInput
                        id="standard-code"
                        value={values.code}
                        onChange={handleNewPasswordChange("code")}
                        endAdornment={
                          <InputAdornment position="end">
                            <SendCode
                              onCaptcha={() => {
                                if (values.phone.length < 11) {
                                  notifyDispatch(
                                    setError("???????????????????????????")
                                  );
                                  return true;
                                } else if (values.phone != userInfo.phone) {
                                  notifyDispatch(
                                    setError("???????????????????????????")
                                  );
                                  return true;
                                }
                                return authService.verifyCode(values.phone);
                              }}
                            />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="account-settings-new-password">
                        ?????????
                      </InputLabel>
                      <OutlinedInput
                        label="New Password"
                        value={values.newPassword}
                        id="account-settings-new-password"
                        onChange={handleNewPasswordChange("newPassword")}
                        type={values.showNewPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={handleClickShowNewPassword}
                              aria-label="toggle password visibility"
                              onMouseDown={handleMouseDownNewPassword}
                            >
                              {values.showNewPassword ? (
                                <EyeOutline />
                              ) : (
                                <EyeOffOutline />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="account-settings-confirm-new-password">
                        ???????????????
                      </InputLabel>
                      <OutlinedInput
                        label="Confirm New Password"
                        value={values.confirmNewPassword}
                        id="account-settings-confirm-new-password"
                        type={
                          values.showConfirmNewPassword ? "text" : "password"
                        }
                        onChange={handleConfirmNewPasswordChange(
                          "confirmNewPassword"
                        )}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmNewPassword}
                              onMouseDown={handleMouseDownConfirmNewPassword}
                            >
                              {values.showConfirmNewPassword ? (
                                <EyeOutline />
                              ) : (
                                <EyeOffOutline />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>

          <CardContent>
            <Box sx={{ mt: 11 }}>
              <Button
                variant="contained"
                sx={{ marginRight: 3.5 }}
                onClick={() => {
                  if (values.confirmNewPassword != values.newPassword) {
                    notifyDispatch(setError("?????????????????????"));
                    return;
                  }
                  if (values.phone != userInfo.phone) {
                    notifyDispatch(setError("???????????????????????????"));
                    return;
                  }
                  return authService
                    .updatePwd(
                      id,
                      values.currentPassword,
                      values.newPassword,
                      values.phone,
                      values.code
                    )
                    .then(() => {
                      notifyDispatch(setSuccess("????????????"));
                    });
                }}
              >
                ??????
              </Button>
              <Button
                type="reset"
                variant="outlined"
                color="secondary"
                onClick={() =>
                  setValues({
                    ...values,
                    currentPassword: "",
                    newPassword: "",
                    confirmNewPassword: "",
                  })
                }
              >
                ??????
              </Button>
            </Box>
          </CardContent>
        </form>
      </div>
    </div>
  );
};

export default TabAccount;
