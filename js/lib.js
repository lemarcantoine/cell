// http://paulirish.com/2011/requestanimationframe-for-smart-animating/

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

// Geometry

var G = {

  distance : function( x1, y1, x2, y2 ) {
    return Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
  },
  
  angleTo : function( x1, y1, x2, y2 ) {
    return Math.atan2( y2-y1, x2-x1 );
  }

};