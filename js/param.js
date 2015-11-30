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

function load_parameters(){

  guiui = new parameters();
	for ( i in param )
	{
		guiui[i]=param[i];
	}
  var gui = new dat.GUI();
  gui.closed=true;
  gui.add(guiui, 'template' ,
  	[
  		'Default',
  		'Network',
  		'Neural',
      'Entropy'
  	]).onChange(function  ( preset ) { console.log (this);
    this.object.activateSpawning = false ;
    this.object.deadZone         = 10    ;
    this.object.easing           = 0.9   ;
    this.object.generationTime   = 500   ;
    this.object.lifetime         = 6     ;
    this.object.lineWidth        = 3     ;
    this.object.maxEntity        = 80    ;
    this.object.minDistance      = 35    ;
    this.object.noOffScreen      = true  ;
    this.object.randomMove       = 1     ;
    this.object.showCircles      = true  ;
    this.object.showText         = false ;
    this.object.spawningGap      = 0     ;
      if( preset=='Network' )
      {
        this.object.activateSpawning=true;
        setTimeout(function(iths)
          {
            return function(){
              iths.activateSpawning=false;
            }
          }(this.object),
          15000
        )
        this.object.deadZone=100;
        this.object.easing=0.95;
        this.object.lineWidth=10;
        this.object.maxEntity=160;
        this.object.minDistance=50;
        this.object.showCircles=false;
        //this.object.sound=false;
      }else if(preset=='Neural'){
		this.object.deadZone= 204.03239703601585
        this.object.easing= 0.96
        this.object.lineWidth= 10
        this.object.minDistance= 165.4316732724453
        this.object.showCircles= false
      } else if(preset=='Entropy'){

        this.object.deadZone         = 5.51438910908151;
        this.object.easing           = 0.96;
        this.object.lineWidth        = 0.001;
        this.object.minDistance      = 66.17266930897812;
        this.object.randomMove       = 1.9;
      }
    });
  gui.add(guiui, 'fullscreen');
  gui.add(guiui, 'sound')                                    .listen();
  var Growth = gui.addFolder('Growth');
  Growth.add(guiui, 'activateSpawning' )                     .listen();
  Growth.add(guiui, 'spawningGap'   , 0, 2048 )              .listen();
  Growth.add(guiui, 'generationTime', 1, 5000 )              .listen();
  Growth.add(guiui, 'lifetime'      , 1, 15 )                .listen();
  Growth.add(guiui, 'maxEntity'     , 1, 500 )               .listen();

  var Behavior = gui.addFolder('Behavior');
  Behavior.add(guiui, 'minDistance'   , 0, 500)               .listen();
  Behavior.add(guiui, 'deadZone'      , 0, 500)               .listen();
  Behavior.add(guiui, 'easing'        , 0.0, 0.99).step(0.01) .listen();
  Behavior.add(guiui, 'noOffScreen')                          .listen();
  Behavior.add(guiui, 'randomMove'    , 0, 10).step(0.1)      .listen();

  var Display = gui.addFolder('Display');
  Display.add(guiui, 'lineWidth'     , 0, 10).step(1)        .listen();
  Display.add(guiui, 'showCircles' )                         .listen();
  Display.add(guiui, 'lowQuality')                           .listen();
  Display.add(guiui, 'showText')                             .listen();
  Display.add(guiui, 'showVignette')                         .listen();

//  gui.remember(guiui);
}
