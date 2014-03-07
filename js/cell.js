function Cell( x, y, generation ) {
  this.world = null;
  this.x = ( typeof x != "undefined" ) ? x : 0;
  this.y = ( typeof y != "undefined" ) ? y : 0;
  this.target = this;
  this.oldX = this.x;
  this.oldY = this.y;
  this.hue = Math.random() * 360;
  this.seed = Math.random();
  this.life = 0;
  this.canGenerate = false;
  this.lastgeneration = 0;
  this.moveX=0;
  this.moveY=0;
  this.dead=false;
  this.generation = generation;
}

Cell.prototype = {

  setWorld : function( world ) {
    this.world = world;
  },

  render : function() {

    var ctx = this.world.ctx;
    ctx.fillStyle = "hsl(" + this.hue + ", 90%, 50% )";
	if(this.target!=this && !this.target.dead ){
    	ctx.beginPath();
	    ctx.moveTo(this.x + this.world.centerX, this.y + this.world.centerY);
	    ctx.lineTo(this.target.x + this.world.centerX, this.target.y + this.world.centerY);
		ctx.strokeStyle="hsla(" + this.hue + ", 90%, 50%, 0.2 )";
	    ctx.lineWidth = param.lineWidth;
		ctx.stroke();
	    
	}

	var oldGlobalAlpha = ctx.globalAlpha;
    
    var alphaKindness = 0.5;
    var kindness = param.generationTime-this.life;
    if(kindness>0){
      ctx.globalAlpha = alphaKindness * kindness/param.generationTime;  
    
    grd=ctx.createRadialGradient(this.x + this.world.centerX, this.y + this.world.centerY,0,this.x + this.world.centerX, this.y + this.world.centerY,(param.minDistance + param.deadZone)*(1-ctx.globalAlpha));
    grd.addColorStop(0,"hsla(" + (this.hue+36)%360 + ", 90%, 75%, 0.5 )");
    grd.addColorStop((param.minDistance/(param.minDistance + param.deadZone)),"hsla(" + (this.hue-36)%360 + ", 90%, 75%, 1 )");
    grd.addColorStop((param.minDistance/(param.minDistance + param.deadZone))+0.01,"hsla(" + this.hue + ", 90%, 75%, 0.5 )");
    grd.addColorStop(1,"rgba(0,0,0,0)");
    ctx.fillStyle=grd;
    ctx.beginPath();
    ctx.arc( this.x + this.world.centerX, this.y + this.world.centerY, param.minDistance + param.deadZone, 0, 2 * Math.PI );
    ctx.fill();
    }
    
    
	//*
    
    

   //*/
    ctx.globalAlpha=0.5;
    ctx.fillStyle = "hsl(" + this.hue + ", 90%, "+(100-((this.life/(param.lifetime*param.generationTime*(1.5))*50)|0))+"% )";

    ctx.beginPath();
    ctx.arc( this.x + this.world.centerX, this.y + this.world.centerY, 10, 0, 2 * Math.PI );
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle="#000";
    if(this.canGenerate)
    	ctx.strokeStyle="#fff";
    ctx.stroke();

    //* Texte
    oldGlobalAlpha=ctx.globalAlpha;
    ctx.globalAlpha=1;
    var texte = this.generation;
    ctx.font="16px Arial bold";
    ctx.fillStyle = "#000";
    var offsetTextX = -8,
    	offsetTextY = 5;
    ctx.fillText(texte ,this.x + this.world.centerX + offsetTextX, this.y + this.world.centerY + offsetTextY); //*/
	

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
  	this.life++;
  	if( this.life >= param.lifetime*param.generationTime*(3-this.seed*3) ){
  		world.deleteCell(this);
  		this.dead=true;
  		return;
  	}
  	if( ( (this.life - param.generationTime /2 - (1-this.seed)*param.generationTime) |0) % param.generationTime==0
  		&& this.life-this.lastgeneration > param.generationTime 
  		&& this.life <= param.lifetime*param.generationTime )
  		this.canGenerate=true;

	if( 	this.target!=this
		&&  this.target.target==this 
		&& !this.target.dead 
		&&  this.canGenerate 
		&&  this.target.canGenerate ){
		this.canGenerate=false;
		this.lastgeneration=false
		this.target.canGenerate=false;
		this.target.lastgeneration=false;
		world.addCellqueue(new Cell((this.x + this.target.x)/2 , (this.y + this.target.y)/2, ((this.generation+this.target.generation)/2|0)+1 ));
	}
  	var direction = 0, distance=0;
  	var moveX = 0;
  	var moveY = 0;
  	var seedX = ((this.seed*777)%50)/50
    var seedY = ((this.seed*993)%50)/50
    //Random tremblote
    moveX += (Math.random()-0.5) * (seedX*4-2)*param.randomMove;// 0
    moveY += (Math.random()-0.5) * (seedY*4-2)*param.randomMove;// 1.5
    var oldTargetSeeds=[];
	    	
  	searchTarget:while(direction==0){

	    var nearestCell = this.radar(distance+.1);
	    
	    if( nearestCell === null) {
	    	break;
	    }
	    var i = oldTargetSeeds.length;
	    while(i--){
	    	if(oldTargetSeeds[i] == nearestCell.seed)
	    		break searchTarget;
	    }

		
	    oldTargetSeeds[oldTargetSeeds.length]=nearestCell.seed;
	    
	    var distance = G.distance( this.x, this.y, nearestCell.oldX, nearestCell.oldY );
		
		if( distance > param.minDistance + param.deadZone + this.seed * 10 ) direction = 1.25;
		else if( distance < param.minDistance + this.seed * 10 ) direction = -0.25;
		else continue;
		
		this.target=nearestCell;

  	}
  	
  	if(param.noOffScreen
  		&& (this.x < -this.world.width/2
  		|| this.y < -this.world.height/2
  		|| this.x > this.world.width/2
  		|| this.y > this.world.height/2)){
  		moveX += (-this.x)*0.03
  		moveY += (-this.y)*0.03
  	}

	if(direction!=0){
		moveX += ( this.target.oldX - this.x ) / distance * direction ;
		moveY += ( this.target.oldY - this.y ) / distance * direction ;
	}

	//EASING !
	moveX+=this.moveX*param.easing;
	moveY+=this.moveY*param.easing;

	this.moveX=moveX;
	this.moveY=moveY;

	this.x+=moveX;
	this.y+=moveY;

  if(this.life%10==0)
	   //this.hue = ( this.hue + ( this.target.oldHue - this.hue)/0.3+360)%360;
      this.hue = this.target.hue;

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