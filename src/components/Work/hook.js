
//scratch全屏

document.addEventListener("scratchFullScreen", function (e) {
    window.launchIntoFullscreen(document.getElementById("player"));
  });
  //scratch退出全屏
  document.addEventListener("scratchUnFullScreen", function (e) {
    window.exitFullscreen();
  });
  document.addEventListener("scratchInit", function (e) {
    var p = document.getElementById("player");
    var s = p.contentDocument.getElementById("scratch");
    s.addEventListener("click", () => {
      p.focus();
    });
})

const launchIntoFullscreen = (element) => {
    return window.launchIntoFullscreen = function(element) {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      }
}

const exitFullscreen = () => {

  //退出全屏
  window.exitFullscreen = function() {
    if (window.document.exitFullscreen) {
      window.document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      window.document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      window.document.webkitExitFullscreen();
    }
  }
}
const isFullscreen = () => {

  //是否全屏
  window.isFullscreen = function(){
    return document.fullscreenElement    ||
           document.msFullscreenElement  ||
           document.mozFullScreenElement ||
           document.webkitFullscreenElement || false;
  }
  
}
export const launch = ()=>{
    launchIntoFullscreen(document.getElementById("player"))
}

export const exitF =()=> {
    exitFullscreen()
}

export const isFull =()=> {
    isFullscreen()
}
