import { ChangeEvent, Dispatch, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { useProfileService, useProjectService } from "src/hooks";
import { setError, setSuccess } from "src/redux/actions";
import { NotificationAction } from "src/redux/reducers/NotifyReducer";

export const AllUpWork = () => {
  const [url1, setUrl1] = useState<FormData>();
  const [url2, setUrl2] = useState<FormData>();
  const [url3, setUrl3] = useState<FormData>();
  const [url11, setUrl11] = useState<string>("");
  const [url22, setUrl22] = useState<string>("");
  const [url33, setUrl33] = useState<string>("");
  const projectService = useProjectService();
  const profileService = useProfileService();
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      // reader.onload = () => setUrl1(reader.result as string);

      reader.readAsDataURL(files[0]);
      const formdata = new FormData();
      // 模仿单文件上传给接口传参

      formdata.append("file", files[0]);
      setUrl1(formdata);
      //   profileService.updateAvartar(formdata).then((res) => {
      //     if (res.data.success) {
      //       setForm({ ...form, ["avatar"]: res.data.data });
      //       notifyDispatch(setSuccess("确认上传请点击保存"));
      //     }
      //   });
    }
  };
  const onChange2 = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      //   reader.onload = () => setImgSrc(reader.result as string);

      reader.readAsDataURL(files[0]);
      const formdata = new FormData();
      // 模仿单文件上传给接口传参
      formdata.append("file", files[0]);
      setUrl2(formdata);

      //   profileService.updateAvartar(formdata).then((res) => {
      //     if (res.data.success) {
      //       setForm({ ...form, ["avatar"]: res.data.data });
      //       notifyDispatch(setSuccess("确认上传请点击保存"));
      //     }
      //   });
    }
  };
  const onChange3 = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      //   reader.onload = () => setImgSrc(reader.result as string);

      reader.readAsDataURL(files[0]);
      const formdata = new FormData();
      // 模仿单文件上传给接口传参
      formdata.append("file", files[0]);
      setUrl3(formdata);

      //   profileService.updateAvartar(formdata).then((res) => {
      //     if (res.data.success) {
      //       setForm({ ...form, ["avatar"]: res.data.data });
      //       notifyDispatch(setSuccess("确认上传请点击保存"));
      //     }
      //   });
    }
  };

  return (
    <div>
      <div>
        {" "}
        上传封面
        <input
          type="file"
          onChange={onChange}
          accept="image/png,image/jpg,.zip"
          id="account-settings-upload-image"
        />
      </div>

      <div>
        {" "}
        上传Scratch文件
        <input
          type="file"
          onChange={onChange2}
          accept=".sb2,.sb3,.zip"
          id="account-settings-upload-image"
        />
      </div>
      <div>
        {" "}
        上传描述文件
        <input
          type="file"
          onChange={onChange3}
          accept=".txt,.zip"
          id="account-settings-upload-image"
        />
      </div>
      <Button
        onClick={async () => {
          //   const res1 = await profileService.updateAvartar(url1);
          //   const res2 = await profileService.updateAvartar(url2);
          //   const res3 = await profileService.updateAvartar(url3);
          //   setUrl22(res1.data.data);
          //   setUrl11(res2.data.data);
          //   setUrl33(res3.data.data);

          //   if (url22 == "" || url11 == "" || url33 == "") {
          //     notifyDispatch(setError("上传失败"));

          //     return;
          //   }
          await projectService
            .batchUpdate({
              fileFirst: url2 ?? new FormData(),
              fileSecond: url1 ?? new FormData(),
              fileThird: url3 ?? new FormData(),
            })
            .then((res) => {
              if (res.data.success) {
                notifyDispatch(setSuccess("上传成功"));
                return;
              }
            });
        }}
      >
        提交
      </Button>
    </div>
  );
};
