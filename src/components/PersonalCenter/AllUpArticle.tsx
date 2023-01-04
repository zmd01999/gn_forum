import { ChangeEvent } from "react";

export const AllUpArticle = () => {
  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      //   reader.onload = () => setImgSrc(reader.result as string);

      reader.readAsDataURL(files[0]);
      const formdata = new FormData();
      // 模仿单文件上传给接口传参
      formdata.append("file", files[0]);
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
      上传文件
      <input
        type="file"
        onChange={onChange}
        accept=".txt"
        id="account-settings-upload-image"
      />
    </div>
  );
};
