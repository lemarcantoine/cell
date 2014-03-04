function World( canvas ) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.width = this.canvas.width;
  this.height = this.canvas.height;
  this.centerX = this.width / 2;
  this.centerY = this.height / 2;
  
  this.cells = [];
  
  this.ctx.fillStyle = "#eee";
  this.ctx.strokeStyle = "#09e";
  
  this.mapEvents();
}

World.prototype = {
  
  // World Related
  
  mapEvents : function() {
    var world = this;
    
    this.canvas.addEventListener( 'click', function( e ) {
      //console.log(e);
      world.addCell( new Cell( e.layerX - world.centerX, e.layerY - world.centerY ) );
    } );
  },
  
  render : function() {
    var i = this.cells.length;
    
    //this.ctx.clearRect( 0, 0, this.width, this.height );
    
    this.ctx.globalAlpha = 0.1;
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect( 0, 0, this.width, this.height );
    this.ctx.globalAlpha = 0.1;
    
    while( i-- ) {
      this.cells[i].render();
    }
  },
  
  tick : function() {
    var i = this.cells.length;
    while( i-- ) {
      this.cells[i].save();
    }
    i = this.cells.length;
    while( i-- ) {
      this.cells[i].tick();
    }
  },
  
  frame : function() {
    this.tick();
    this.render();
  },

  // Cell Related

  addCell : function( cell ) {
    cell.setWorld( this );
    this.cells.push( cell );
  },
  
  radar: function( reference, min ) {
    var cells = this.cells,
        i = cells.length,
        min = ( typeof min != "undefined" ) ? min : 0,
        r = null,
        d, dTemp;
    
    while( i-- ) {
      if( cells[i] !== reference ) {
        dTemp = G.distance( reference.x, reference.y, cells[i].x, cells[i].y );
        
        if( ( r === null || dTemp < d ) && dTemp >= min ) {
          r = cells[i];
          d = dTemp;
        }
      }
    }
    
    return r;
  }
  
}