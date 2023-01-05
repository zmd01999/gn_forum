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


 export function  urlToBlob(file_url,cb) {

    let xhr = new XMLHttpRequest();
    let res;
    xhr.open("get", file_url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
      if (this.status == 200) {
        // if (callback) {
        // callback();

        console.log(this.response)
        const reader = new FileReader()

        reader.onload = function () {
          // console.log('reader.result', JSON.parse(reader.result));
          res =  reader.result;
          cb(JSON.parse(reader.result));

        }
        reader.readAsText(this.response);

      }
    };
     xhr.send();
  };

  export  function stringToHTML (str) {
    var dom = document.createElement('div');
    dom.innerHTML = str;
    return dom;
   
  };