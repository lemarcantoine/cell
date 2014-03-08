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
  this.canGenerate = param.generationTime*3/2;
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
    var kindness = param.generationTime/3-this.life;
    if(kindness>0){
      ctx.globalAlpha = alphaKindness * kindness/param.generationTime;  
    
    var grd=ctx.createRadialGradient(this.x + this.world.centerX, this.y + this.world.centerY,0,this.x + this.world.centerX, this.y + this.world.centerY,(param.minDistance + param.deadZone)*(1-ctx.globalAlpha));
    grd.addColorStop(0,"hsla(" + (this.hue+36)%360 + ", 90%, 75%, 1 )");
    //grd.addColorStop((param.minDistance/(param.minDistance + param.deadZone)),"hsla(" + (this.hue-36)%360 + ", 90%, 75%, 1 )");
    //grd.addColorStop((param.minDistance/(param.minDistance + param.deadZone))+0.01,"hsla(" + this.hue + ", 90%, 75%, 0.5 )");
    grd.addColorStop(1,"rgba(0,0,0,0)");
    ctx.fillStyle=grd;
    ctx.beginPath();
    ctx.arc( this.x + this.world.centerX, this.y + this.world.centerY, param.minDistance + param.deadZone, 0, 2 * Math.PI );
    ctx.fill();
    }
    
    
	//*
    
    

   //*/
    var size = param.minDistance/2*((param.generationTime*2)-this.canGenerate)/param.generationTime/2,
    light = (100-((this.life/(param.lifetime*param.generationTime*(1.5))*50)|0));
    ctx.globalAlpha=0.5;
    
    var grd = ctx.createRadialGradient(this.x + this.world.centerX, this.y + this.world.centerY, 0, this.x + this.world.centerX, this.y + this.world.centerY, size);
    
    grd.addColorStop(0,"hsla(" + this.hue + ",     100%,    "+(light+50*2)/3+"%, 1 )");
    grd.addColorStop(0.3,"hsla(" + (this.hue) + ", 100%,     "+light+"%, 0.1 )");
    grd.addColorStop(0.5,"hsla(" + (this.hue) + ", 100%,  0%, 0 )");
    if(param.showCircles)
      grd.addColorStop(1,"hsla(" + (this.hue) + ", 75%,  "+light+"%, 0.3 )");
    else
      grd.addColorStop(1,"hsla("+this.hue+",80%,"+light+"%, 0)");
    ctx.fillStyle=grd;


    ctx.beginPath();
    ctx.arc( this.x + this.world.centerX, this.y + this.world.centerY, size, 0, 2 * Math.PI );
    ctx.fill();
    //ctx.lineWidth = 1;
    //ctx.strokeStyle="rgba(150,150,150,0.5)";
    
    //ctx.stroke();

    //* Texte
    if(param.showText){
    oldGlobalAlpha=ctx.globalAlpha;
    var texte = this.generation;
    ctx.font="10px Arial Bold";
    ctx.fillStyle = "#ddd";
    var offsetTextX = -size+10,
      offsetTextY = -size;
    ctx.fillText(texte ,this.x + this.world.centerX + offsetTextX, this.y + this.world.centerY + offsetTextY); //*/
    ctx.globalAlpha=ctx.globalAlpha;

    }
           



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
  	if( this.life <= param.lifetime*param.generationTime && this.canGenerate!=0 )
  		this.canGenerate--;

	if( 	this.target!=this
		&&  this.target.target==this 
		&& !this.target.dead 
		&&  this.canGenerate==0 
		&&  this.target.canGenerate==0 ){
		this.canGenerate=param.generationTime;
		this.target.canGenerate=param.generationTime;
		world.addCellqueue(new Cell(this.x , this.y, ((this.generation+this.target.generation)/2|0)+1 ));
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