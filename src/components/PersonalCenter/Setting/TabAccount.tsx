// ** React Imports
import {
  useState,
  ElementType,
  ChangeEvent,
  SyntheticEvent,
  Dispatch,
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
  const [imgSrc, setImgSrc] = useState<string>("/assets/avatar.jfif");

  const profileService = useProfileService();
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();
  const { id, userInfo } = useSelector((state: AppState) => state.auth);

  const [form, setForm] = useState<IUserInfo>({
    id: userInfo.id,
    realName: userInfo.realName == null ? "实名认证" : userInfo.realName,
    nickname: userInfo.nickname,
    gender: userInfo.gender == null ? "male" : userInfo.gender,
    birthday: userInfo.birthday,
    region: userInfo.region == null ? "中国" : userInfo.region,
    qq: userInfo.qq,
    wx: userInfo.wz,
    money: userInfo.money,
    level: userInfo.level,
    introduction:
      userInfo.introduction == null
        ? "请尽情表达自己！"
        : userInfo.introduction,
    business:
      userInfo.business == null ? "小天才工作室. Ltd." : userInfo.business,
    email: userInfo.email == null ? "" : userInfo.email,
    mobilePhoneNumber:
      userInfo.mobilePhoneNumber == null ? "" : userInfo.mobilePhoneNumber,
  });
  const handleChange =
    (prop: keyof IUserInfo) => (event: ChangeEvent<HTMLInputElement>) => {
      console.log(userInfo.id);
      setForm({ ...form, [prop]: event.target.value });
    };
  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);

      reader.readAsDataURL(files[0]);
    }
  };
  const { username } = useParams<routeProps>();

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ImgStyled src={imgSrc} alt="Profile Pic" />
              <Box>
                <ButtonStyled
                  component="label"
                  variant="contained"
                  htmlFor="account-settings-upload-image"
                >
                  上传头像
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
                  重置
                </ResetButtonStyled>
                <Typography variant="body2" sx={{ marginTop: 5 }}>
                  允许 PNG or JPEG. 最大 of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              disabled
              fullWidth
              label="用户名"
              placeholder="johnDoe"
              value={form.nickname}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled
              fullWidth
              label="实名"
              placeholder="John Doe"
              value={form.realName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="email"
              label="电子邮件"
              placeholder="zmd@example.com"
              value={form.email}
              onChange={handleChange("email")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>权限</InputLabel>
              <Select label="Role" defaultValue="user">
                <MenuItem value="admin">管理员</MenuItem>
                <MenuItem value="author">版主</MenuItem>
                <MenuItem value="editor">会员</MenuItem>
                <MenuItem value="user">会员</MenuItem>
                {/* <MenuItem value="maintainer">Maintainer</MenuItem>
                <MenuItem value="subscriber">Subscriber</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>状态</InputLabel>
              <Select label="Status" defaultValue="active">
                <MenuItem value="active">在线</MenuItem>
                <MenuItem value="inactive">隐身</MenuItem>
                <MenuItem value="pending">未知</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="工作室"
              placeholder="ABC Pvt. Ltd."
              value={form.business}
              onChange={handleChange("business")}
            />
          </Grid>

          {/* {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity="warning"
                sx={{ "& a": { fontWeight: 400 } }}
                action={
                  <IconButton
                    size="small"
                    color="inherit"
                    aria-label="close"
                    onClick={() => setOpenAlert(false)}
                  >
                    <Close fontSize="inherit" />
                  </IconButton>
                }
              >
                <AlertTitle>
                  您的电子邮件未被确认。请检查您的收件箱。
                </AlertTitle>
                <Link
                  href="/"
                  onClick={(e: SyntheticEvent) => e.preventDefault()}
                >
                  重新发送
                </Link>
              </Alert>
            </Grid>
          ) : null} */}

          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ marginRight: 3.5 }}
              onClick={() => {
                return profileService.updateUser(form).then(() => {
                  notifyDispatch(setSuccess("更新成功"));
                });
              }}
            >
              保存
            </Button>
            <Button type="reset" variant="outlined" color="secondary">
              重置
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};

export default TabAccount;
