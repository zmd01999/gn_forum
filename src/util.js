export const  paramsToFormData = (obj)=> {
    const formData = new FormData();
    Object.keys(obj).forEach((key) => {
        if (obj[key] instanceof Array) {
          obj[key].forEach((item) => {
            formData.append(key, item);
          });
          return;
        }
        formData.append(key, obj[key]);
      });
    return formData;
  };


 export function urlToBlob(file_url) {
    // let file_url =
    //   'http://obdataplatform-test.oss-cn-shenzhen.aliyuncs.com/2020_07_10/391f56b9-f4bc-408b-868b-31ea0f8b1b47.hex'
    let xhr = new XMLHttpRequest();
    xhr.open("get", file_url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
      if (this.status == 200) {
        // if (callback) {
        // callback();
        console.log(this.response)
        const reader = new FileReader()
        reader.onload = function () {
          console.log('reader.result', reader.result)
        }
        reader.readAsText(this.response);
      }
    };
    xhr.send();
  };
