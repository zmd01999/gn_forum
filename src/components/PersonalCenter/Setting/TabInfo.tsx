// ** React Imports
import { forwardRef, useState, ChangeEvent, Dispatch } from "react";

// ** MUI Imports
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import RadioGroup from "@mui/material/RadioGroup";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "src/redux/store";
import { useProfileService } from "src/hooks";
import { NotificationAction } from "src/redux/reducers/NotifyReducer";
import { setSuccess } from "src/redux/actions";
// ** Third Party Imports
// import DatePicker from "react-datepicker";

// ** Styled Components
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import { ProfileService } from "src/api/ProfileService";
import { IUserInfo } from "src/models/types";
import { SelectChangeEvent } from "@mui/material/Select";

// interface State {
//   introduction: string;

// }
interface userForm {
  id: any;
  introduction: string;
}

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label="Birth Date" fullWidth {...props} />;
});

const TabInfo = () => {
  const { id, userInfo } = useSelector((state: AppState) => state.auth);
  // ** State
  const [date, setDate] = useState<Date | null | undefined>(null);

  const [form, setForm] = useState<IUserInfo>({
    id: userInfo.id,
    realName: userInfo.realName,
    nickname: userInfo.nickName,
    gender: userInfo.gender == null ? "male" : userInfo.gender,
    birthday: userInfo.birthday,
    region: userInfo.region == null ? "Chain" : userInfo.region,
    qq: userInfo.qq,
    wx: userInfo.wz,
    money: userInfo.money,
    level: userInfo.level,
    introduction:
      userInfo.introduction == null
        ? "请尽情表达自己！"
        : userInfo.introduction,
    business: userInfo.business,
    email: userInfo.email == null ? "" : userInfo.email,
    mobilePhoneNumber:
      userInfo.mobilePhoneNumber == null ? "" : userInfo.mobilePhoneNumber,
  });
  const profileService = useProfileService();
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();

  const handleChange =
    (prop: keyof IUserInfo) => (event: ChangeEvent<HTMLInputElement>) => {
      console.log(userInfo.id);
      setForm({ ...form, [prop]: event.target.value });
    };

  const handleChangeRegin = (event: SelectChangeEvent) => {
    setForm({ ...form, ["region"]: event.target.value });
  };

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8 }}>
            <TextField
              fullWidth
              multiline
              label="个人简介"
              minRows={2}
              placeholder="Bio"
              value={form.introduction}
              onChange={handleChange("introduction")}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <DatePickerWrapper>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                id="account-settings-date"
                placeholderText="MM-DD-YYYY"
                customInput={<CustomInput />}
                onChange={(date: Date) => setDate(date)}
              />
            </DatePickerWrapper>
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <TextField
              disabled
              fullWidth
              type="number"
              label="电话号码"
              placeholder="(0832) 456-7890"
              value={form.mobilePhoneNumber}
              onChange={handleChange("mobilePhoneNumber")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="个人网站"
              placeholder="https://example.com/"
              defaultValue="https://themeselection.com/"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>国家</InputLabel>
              <Select
                label="Country"
                defaultValue="Chain"
                value={form.region}
                onChange={handleChangeRegin}
              >
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="UK">UK</MenuItem>
                <MenuItem value="Chain">中国</MenuItem>
                <MenuItem value="Germany">Germany</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="form-layouts-separator-multiple-select-label">
                语言
              </InputLabel>
              <Select
                multiple
                defaultValue={["Chinese"]}
                id="account-settings-multiple-select"
                labelId="account-settings-multiple-select-label"
                input={
                  <OutlinedInput
                    label="Languages"
                    id="select-multiple-language"
                  />
                }
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="French">French</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                <MenuItem value="Portuguese">Portuguese</MenuItem>
                <MenuItem value="Italian">Italian</MenuItem>
                <MenuItem value="German">German</MenuItem>
                <MenuItem value="Chinese">简体中文</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel sx={{ fontSize: "0.875rem" }}>性别</FormLabel>
              <RadioGroup
                row
                // defaultValue="male"
                aria-label="gender"
                name="account-settings-info-radio"
                value={form.gender}
                onChange={handleChange("gender")}
              >
                <FormControlLabel value="male" label="男" control={<Radio />} />
                <FormControlLabel
                  value="female"
                  label="女"
                  control={<Radio />}
                />
                <FormControlLabel
                  value="other"
                  label="其他"
                  control={<Radio />}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
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
            <Button
              type="reset"
              variant="outlined"
              color="secondary"
              onClick={() => setDate(null)}
            >
              重置
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};

export default TabInfo;
