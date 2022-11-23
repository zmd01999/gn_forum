// ** React Imports
import { ChangeEvent, MouseEvent, useState, Dispatch } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

// ** Icons Imports
import EyeOutline from "mdi-material-ui/EyeOutline";
import KeyOutline from "mdi-material-ui/KeyOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";
import LockOpenOutline from "mdi-material-ui/LockOpenOutline";
import { useAuthService } from "src/hooks";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "src/redux/store";
import TextField from "@mui/material/TextField";
import { loadUser, setError, setSuccess } from "src/redux/actions";
import { NotificationAction } from "src/redux/reducers/NotifyReducer";

import SendCode from "@jiumao/rc-send-code";
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

const TabSecurity = () => {
  const { id } = useSelector((state: AppState) => state.auth);
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();

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

  const authService = useAuthService();
  return (
    <form>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="account-settings-current-password">
                    原密码
                  </InputLabel>
                  <OutlinedInput
                    label="Current Password"
                    value={values.currentPassword}
                    id="account-settings-current-password"
                    type={values.showCurrentPassword ? "text" : "password"}
                    onChange={handleCurrentPasswordChange("currentPassword")}
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
                  label="手机"
                  value={values.phone}
                  onChange={handleNewPasswordChange("phone")}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="standard-code">验证码</InputLabel>
                  <OutlinedInput
                    id="standard-code"
                    value={values.code}
                    onChange={handleNewPasswordChange("code")}
                    endAdornment={
                      <InputAdornment position="end">
                        <SendCode
                          onCaptcha={() => {
                            if (values.phone.length < 11) {
                              notifyDispatch(setError("请填写正确的手机号"));
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
                    新密码
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
                    确认新密码
                  </InputLabel>
                  <OutlinedInput
                    label="Confirm New Password"
                    value={values.confirmNewPassword}
                    id="account-settings-confirm-new-password"
                    type={values.showConfirmNewPassword ? "text" : "password"}
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

          <Grid
            item
            sm={6}
            xs={12}
            sx={{
              display: "flex",
              marginTop: [7.5, 2.5],
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              width={183}
              alt="avatar"
              height={256}
              src="/assets/pages/pose-m-1.png"
            />
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ margin: 1 }} />

      <CardContent>
        <Box sx={{ mt: 1.75, display: "flex", alignItems: "center" }}>
          <KeyOutline sx={{ marginRight: 3 }} />
          <Typography variant="h6">多重认证</Typography>
        </Box>

        <Box sx={{ mt: 5.75, display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              maxWidth: 368,
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar
              variant="rounded"
              sx={{
                width: 48,
                height: 48,
                color: "common.white",
                backgroundColor: "primary.main",
              }}
            >
              <LockOpenOutline sx={{ fontSize: "1.75rem" }} />
            </Avatar>
            <Typography
              sx={{ fontWeight: 600, marginTop: 3.5, marginBottom: 3.5 }}
            >
              双因素认证还未被启用
            </Typography>
            <Typography variant="body2">
              双因素认证为您的账户增加了一个额外的安全层，需要的不仅仅是一个密码来登录。了解更多。
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 11 }}>
          <Button
            variant="contained"
            sx={{ marginRight: 3.5 }}
            onClick={() => {
              if (values.confirmNewPassword != values.newPassword) {
                notifyDispatch(setError("两次密码不一致"));
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
                  notifyDispatch(setSuccess("更改成功"));
                });
            }}
          >
            保存
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
            重置
          </Button>
        </Box>
      </CardContent>
    </form>
  );
};
export default TabSecurity;
