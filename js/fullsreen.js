
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}


if (isMobileDevice()) {
  elem = document.getElementById("main-slider-container");
  console.log("phone");
  } else {
    elem = document.getElementById("main-slider-container");
    console.log("comp");
  }

function openFullscreen() {
  
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }

}

function closeFullscreen() {

  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}





  // function isMobileDevice() {
  //   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  // }
  
  // // Ваш код для мобильных устройств
  // function mobileCode() {
    
  //   const fullScreenBtn = document.getElementById("full-screen-btn");
  //   const exitFullScreenBtn = document.getElementById("exit-full-btn");

  //   const mainSlider = document.getElementById("rotation");
    
  //   function openFullscreen(){
  //     requestFullScreen(mainSlider);
  //   }
  
  //   function requestFullScreen(element) {
  //     if (!document.fullscreenElement && !document.mozFullScreenElement &&
  //       !document.webkitFullscreenElement && !document.msFullscreenElement) {
  //       // If supported, request fullscreen mode
  //       if (element.requestFullscreen) {
  //           element.requestFullscreen();
  //       } else if (element.msRequestFullscreen) {
  //           element.msRequestFullscreen();
  //       } else if (element.mozRequestFullScreen) {
  //           element.mozRequestFullScreen();
  //       } else if (element.webkitRequestFullscreen) {
  //           eleme.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  //       }}
  //   }
  
  //   function exitFullScreen() {
  //     if (document.exitFullscreen) {
  //       document.exitFullscreen();
  //     } else if (document.mozCancelFullScreen) {
  //       document.mozCancelFullScreen();
  //     } else if (document.webkitExitFullscreen) {
  //       document.webkitExitFullscreen();
  //     } else if (document.msExitFullscreen) {
  //       document.msExitFullscreen();
  //     }
  //   }
  
    
  // }
  
  // // Ваш код для настольных компьютеров
  // function desktopCode() {
  //   const fullScreenBtn = document.getElementById("full-screen-btn");
    
  //   const exitFullScreenBtn = document.getElementById("exit-full-btn");
   
  //   const mainSlider = document.getElementById("main-slider-container");
    
  //   function openFullscreen(){
  //     requestFullScreen(mainSlider);
  //   }
  //   function requestFullScreen(element) {
  //     if (!document.fullscreenElement && !document.mozFullScreenElement &&
  //       !document.webkitFullscreenElement && !document.msFullscreenElement) {
  //       // If supported, request fullscreen mode
  //       if (element.requestFullscreen) {
  //           element.requestFullscreen();
  //       } else if (element.msRequestFullscreen) {
  //           element.msRequestFullscreen();
  //       } else if (element.mozRequestFullScreen) {
  //           element.mozRequestFullScreen();
  //       } else if (element.webkitRequestFullscreen) {
  //           eleme.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  //       }}
  //   }
  
  //   function exitFullScreen() {
  //     if (document.exitFullscreen) {
  //       document.exitFullscreen();
  //     } else if (document.mozCancelFullScreen) {
  //       document.mozCancelFullScreen();
  //     } else if (document.webkitExitFullscreen) {
  //       document.webkitExitFullscreen();
  //     } else if (document.msExitFullscreen) {
  //       document.msExitFullscreen();
  //     }
  //   }
  
    
  // }
  
  // // Проверяем тип устройства и запускаем соответствующий код
  // if (isMobileDevice()) {
  //   mobileCode();
  // } else {
  //   desktopCode();
  // }


 
