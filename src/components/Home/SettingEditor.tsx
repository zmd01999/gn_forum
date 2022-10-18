import React, {
  ChangeEvent,
  Dispatch,
  Fragment,
  useEffect,
  useState,
} from "react";
import { useAuthService } from "../../hooks";
import { IProfile, ISettingUser, IUser } from "../../models/types";
import _ from "lodash";
import produce from "immer";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoaderAction } from "../../redux/reducers/LoaderReducer";
import {
  clearLoading,
  logoutUser,
  setError,
  setLoading,
  setSuccess,
} from "../../redux/actions";
import { removeLocalStorage } from "../../utils";
import { NotificationAction } from "../../redux/reducers/NotifyReducer";
import { AuthAction } from "../../redux/reducers/AuthReducer";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import FormControl from "@mui/joy/FormControl";
import {
  Textarea,
  FormHelperText,
  FormLabel,
  Chip,
  TextField,
  Box,
} from "@mui/joy";
import { Button, Divider, Stack } from "@mui/material";
import { Aod, Email } from "@mui/icons-material";
import { PwdDialog } from "../PersonalCenter/PwdDialog";

export const SettingEditor = () => {
  const [user, setUser] = useState<ISettingUser>({
    email: "",
    username: "",
    bio: "",
    password: "",
    image: "",
  });

  const authService = useAuthService();
  const history = useHistory();
  const loaderDiapatch = useDispatch<Dispatch<LoaderAction>>();
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();
  const authDispatch = useDispatch<Dispatch<AuthAction>>();

  const retrieveCurrentUser = async () => {
    const res = await authService.getCurrrentUser();
    // // not with strict type ,should find one way to improve it
    // Object.entries(res.data.user).forEach(([key, value]) => {
    //   if (Object.keys(user).includes(key)) {
    //     _.set(settingUser, key, value);
    //   }
    // });
    let settingUser = _.pick(res.data.user, Object.keys(user));
    _.set(settingUser, "password", "");
    setUser(settingUser as ISettingUser);
  };

  useEffect(() => {
    retrieveCurrentUser();
  }, []);

  const handleUpdateField = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    switch (name) {
      default:
        setUser(
          produce(user, (draft) => {
            _.set(draft, name, value);
          })
        );
        break;
    }
  };

  const handleUpdateSettings = async () => {
    try {
      loaderDiapatch(setLoading("update user"));

      let payload: object = _.clone(user);
      if (user.password === "") {
        payload = _.omit(payload, "password");
      }
      const res = await authService.updateUser(payload);

      notifyDispatch(
        setSuccess("You settings have been updated successfully.")
      );
      await retrieveCurrentUser();
      history.go(0);
    } catch (error) {
      notifyDispatch(setError(error.data.errors));
    } finally {
      loaderDiapatch(clearLoading());
    }
  };

  const handleLogout = () => {
    notifyDispatch(setSuccess("You have loged out successfully !"));
    authDispatch(logoutUser());
    removeLocalStorage("token");
    history.push("/");
  };

  return (
    <div>
      <div className="absolute top-0 right-0 ">
        <PwdDialog></PwdDialog>
      </div>

      {/* <Form>
          <Form.Field width={6}>
            <label>Profile</label>
            <input
              name="profile"
              placeholder="URL of profile picture"
              onChange={handleUpdateField}
              value={user.image}
            />
          </Form.Field>
          <Form.Field>
            <label>Username</label>
            <input
              name="username"
              onChange={handleUpdateField}
              value={user.username}
            />
          </Form.Field>
          <Form.Field>
            <label>Short bio about you</label>
            <TextArea
              name="bio"
              onChange={handleUpdateField}
              style={{ minHeight: 100 }}
              value={user.bio}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              name="email"
              onChange={handleUpdateField}
              value={user.email}
            />
          </Form.Field>
          <Form.Field>
            <label>New Password</label>
            <input
              name="password"
              onChange={handleUpdateField}
              value={user.password}
            />
          </Form.Field>
          <Button attached="right" color="green" onClick={handleUpdateSettings}>
            Update Setting
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button attached="right" color="grey" onClick={handleLogout}>
            Logout
          </Button>
        </Form> */}
      <Stack direction="column" spacing={2} width={2 / 5} sx={{ mx: "auto" }}>
        <FormControl>
          <TextField
            label="昵称"
            defaultValue={user.username}
            onChange={handleUpdateField}
            startDecorator={<PersonRoundedIcon />}
            endDecorator={
              <Chip size="sm" variant="soft">
                New stuff
              </Chip>
            }
          />
          <TextField
            disabled
            label="手机号"
            defaultValue="13982837435."
            startDecorator={<Aod />}
            endDecorator={<CheckIcon />}
          />
          <TextField
            label="邮件"
            defaultValue={user.email}
            onChange={handleUpdateField}
            startDecorator={<Email />}
            endDecorator={<CheckIcon />}
          />
          <TextField
            label="手机号"
            placeholder="13982837435."
            onChange={handleUpdateField}
            startDecorator={<EditIcon />}
            endDecorator={<CheckIcon />}
          />

          <FormLabel>个性签名</FormLabel>
          <Textarea
            defaultValue={user.bio}
            minRows={2}
            onChange={handleUpdateField}
          />
          <FormHelperText>This is a helper text.</FormHelperText>
        </FormControl>
        <Divider variant="middle" />
        <Button variant="contained" onClick={handleUpdateSettings}>
          保存
        </Button>
        <Button onClick={handleLogout}>登出</Button>
      </Stack>
    </div>
  );
};
