function Cell( x, y ) {
  this.world = null;
  this.x = ( typeof x != "undefined" ) ? x : 0;
  this.y = ( typeof y != "undefined" ) ? y : 0;
  this.target = this;
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
    if(this.target!=this){
    	ctx.beginPath();
	    ctx.moveTo(this.x + this.world.centerX, this.y + this.world.centerY);
	    ctx.lineTo(this.target.x + this.world.centerX, this.target.y + this.world.centerY);
		ctx.strokeStyle="hsl(" + this.hue + ", 90%, 75% )";
	    ctx.lineWidth = param.lineWidth;
		ctx.stroke();
	    ctx.font="8px Arial";
	    var distance = G.distance( this.x, this.y, this.target.x, this.target.y ) | 0;
	    var offsetTextX = -10,
	    	offsetTextY = -13;
	    ctx.fillText(distance,this.x + this.world.centerX + offsetTextX, this.y + this.world.centerY + offsetTextY);
	}

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
  	var direction = 0, distance=0;
  	var seedX = ((this.seed*777)%50)/50
    var seedY = ((this.seed*993)%50)/50
    //Random tremblote
    this.x += (Math.random()-0.5) * (seedX)*2;// 0
    this.y += (Math.random()-0.5) * (seedY)*2;// 1.5
    var oldTargetSeeds=[];
	    	
  	while(direction==0){

	    var nearestCell = this.radar(distance+.1);
	    
	    if( nearestCell === null) {
	    	return;
	    }
	    var i = oldTargetSeeds.length;
	    while(i--){
	    	if(oldTargetSeeds[i] == nearestCell.seed)
	    		return;
	    }

		
	    oldTargetSeeds[oldTargetSeeds.length]=nearestCell.seed;
	    
	    var distance = G.distance( this.x, this.y, nearestCell.oldX, nearestCell.oldY );
		
		if( distance > param.minDistance + param.deadZone + this.seed * 10 ) direction = 1;
		else if( distance < param.minDistance + this.seed * 10 ) direction = -1;
		else continue;


		if(distance!=0){
			this.x += ( nearestCell.oldX - this.x ) / distance * direction ;
			this.y += ( nearestCell.oldY - this.y ) / distance * direction ;
		}
		
		this.target=nearestCell;

  	}
    	this.hue += ( ( nearestCell.oldHue - this.hue)/nearestCell.oldHue + 360 ) % 360;

    
    
    

    /*
    var angle = G.angleTo( this.x, this.y, nearestCell.x, nearestCell.y ) -Math.PI/2,
        distance = G.distance( this.x, this.y, nearestCell.x, nearestCell.y ),
        direction = -1;
        
    if( distance > 40 ) direction = 1;
    
    this.x += Math.sin( angle ) * direction;
    this.y += -Math.cos( angle ) * direction;
    */
    
    


   }

}