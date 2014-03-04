function Cell( x, y ) {
  this.world = null;
  this.x = ( typeof x != "undefined" ) ? x : 0;
  this.y = ( typeof y != "undefined" ) ? y : 0;
  this.oldX = this.x;
  this.oldY = this.y;
  this.hue = Math.random() * 360;
  this.seed = Math.random();
}

Cell.prototype = {

  setWorld : function( world ) {
    this.world = world;
  },

  render : function() {
    var ctx = this.world.ctx;
    
    ctx.fillStyle = "hsl(" + this.hue + ", 90%, 50% )";
    
    ctx.beginPath();
    ctx.arc( this.x + this.world.centerX, this.y + this.world.centerY, 10, 0, 2 * Math.PI );
    ctx.fill();
  },
  
  radar : function( min ) {
    return this.world.radar( this, min );
  },
  
  save : function() {
    this.oldX = this.x;
    this.oldY = this.y;
    this.oldHue = this.hue;
  },
  
  tick : function() {
    var nearestCell = this.radar();
    
    if( nearestCell === null ) return;
    /*
    var angle = G.angleTo( this.x, this.y, nearestCell.x, nearestCell.y ) -Math.PI/2,
        distance = G.distance( this.x, this.y, nearestCell.x, nearestCell.y ),
        direction = -1;
        
    if( distance > 40 ) direction = 1;
    
    this.x += Math.sin( angle ) * direction;
    this.y += -Math.cos( angle ) * direction;
    */
    
    var distance = G.distance( this.x, this.y, nearestCell.oldX, nearestCell.oldY ),
        direction = -1;
    if( distance > 20 + this.seed * 10 ) direction = 1;
    
    this.hue = ( nearestCell.oldHue - this.hue + 360 ) % 360;
    
    this.x += (nearestCell.oldX - this.x) / distance * direction + Math.random() * this.seed * 2 - 1;
    this.y += (nearestCell.oldY - this.y) / distance * direction + Math.random() * this.seed * 2 - 1;
    
  }

}