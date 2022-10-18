import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/joy/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Fingerprint } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface Pwd {
  oldPassword: string;
  newPassword: string;
  showPassword: boolean;
}

export const PwdDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState<Pwd>({
    showPassword: false,
    oldPassword: "",
    newPassword: "",
  });
  const handleChange =
    (prop: keyof Pwd) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        size="large"
        startIcon={<Fingerprint />}
        onClick={handleClickOpen}
      >
        修改密码
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>修改密码</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please enter your password here. We will send updates occasionally.
          </DialogContentText>
          <TextField
            label="原密码"
            placeholder="Type in here…"
            required
            type={values.showPassword ? "text" : "password"}
            onChange={handleChange("oldPassword")}
            endDecorator={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <TextField
            label="新密码"
            placeholder="Type in here…"
            required
            type={values.showPassword ? "text" : "password"}
            onChange={handleChange("newPassword")}
            endDecorator={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleClose}>修改</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
