var parameters = function() {

    this.template='Default';
    this.fullscreen=function (){
      if(canvas.webkitRequestFullScreen) {
         canvas.webkitRequestFullScreen();
      }
      else {
       canvas.mozRequestFullScreen();
      } 
    }

};
