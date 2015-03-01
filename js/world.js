function World( canvas ) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.width = this.canvas.width;
  this.height = this.canvas.height;
  this.centerX = this.width / 2;
  this.centerY = this.height / 2;
  
  this.cells = [];
  this.deadCells = 0;

  this.ctx.fillStyle = "#eee";
  this.ctx.strokeStyle = "#09e";
  
  this.mapEvents();
  this.tickstamp=0;
  this.cellQueue = [];
}

World.prototype = {
  
  // World Related
  
  mapEvents : function() {
    var world = this;
    
    this.canvas.addEventListener( 'click', function( e ) {
      //console.log(e);
      world.addCell( new Cell( e.layerX - world.centerX, e.layerY - world.centerY, 0 ) );
    } );
  },
  
  render : function() {
    var i = this.cells.length;
    if(i==0){
      this.drawInstructions()
    }
    //this.ctx.clearRect( 0, 0, this.width, this.height );
    
    this.ctx.globalAlpha = 0.8;
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect( 0, 0, this.width, this.height );
    this.ctx.globalAlpha = 0.3;
    
    while( i-- ) {
      if(this.cells[i]!==null)
        this.cells[i].render();
    }
  },
  
  tick : function() {
    if(param.activateSpawning==true && this.tickstamp%10==0)
      world.addCell(new Cell(0, 0));

    var i = this.cells.length;
    while( i-- ) {
      if(this.cells[i]!==null)
        this.cells[i].save();
    }
    i = this.cells.length;
    while( i-- ) {
      if(this.cells[i]!==null)
        this.cells[i].tick();
    }
    this.pushQueue();
    this.tickstamp++;
  },
  
  frame : function() {
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.tick();
    this.render();
  },

  // Cell Related

  addCell : function( cell ) {
    cell.setWorld( this );
    this.cells.push( cell );
    playSound();
  },
  
  addCellqueue : function (cell){
    if(this.cells.length-this.deadCells < param.maxEntity)
      this.cellQueue[this.cellQueue.length]=cell;
  },
  
  pushQueue : function(){
    var i=this.cellQueue.length;
    while(i--){
      this.addCell(this.cellQueue[i]);
    }
    this.cellQueue=[];
  },

  deleteCell : function(cell){
    var i=this.cells.length;
    
    while(i--){
      if(this.cells[i]==cell){
        var c = this.cells[i];
        delete this.cells[i];
        this.cells[i]=null;
        this.deadCells++;
        return;
      }
    }
  },
  radar: function( reference, min ) {
    var cells = this.cells,
        i = cells.length,
        min = ( typeof min != "undefined" ) ? min : 0,
        r = null,
        d, dTemp;
    
    while( i-- ) {
      if( cells[i] !== reference && cells[i]!==null) {
        dTemp = G.distance( reference.x, reference.y, cells[i].x, cells[i].y );
        
        if( ( r === null || dTemp < d ) && dTemp >= min ) {
          r = cells[i];
          d = dTemp;
        }
      }
    }
    
    return r;
  },

  drawInstructions:function(){
    
    
    var texte = 'Click to add a cell';
    this.ctx.font="45px Calibri";
    this.ctx.textAlign = 'center';

    this.ctx.fillStyle = "#edd";
    /*var offsetTextX = -size+10,
      offsetTextY = -size;*/
    this.ctx.fillText(texte , this.centerX ,  this.centerY ); //*/

    
  }
  
}