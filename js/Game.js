class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0)
    {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
   //put sprites here for trex/ground object
   ground= createSprite(400,600,800,100);
   ground.addImage("ground",groundI)
   ground.velocityX=-4;
   trex1 = createSprite(300,600)
   //trex1.addImage("trex1",trex1I)
   trex1.addAnimation("running", trex_running);
   trex1.scale=0.2;
   trex2 = createSprite(300,750)
  // trex2.addImage("trex2",trex2I)
   trex2.addAnimation("running", trex_running);
   trex2.scale=0.2;
   //trex = [trex1,trex2]
   
   invisibleground1= createSprite(400,650,800,10);
   invisibleground2= createSprite(400,780,800,10);
   invisibleground1.visible=false;
   invisibleground2.visible=false;
   trex1.collide(invisibleground1);
   trex2.collide(invisibleground2);
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
   
   if(allPlayers!=undefined){
     var j=0;
      for(var i in allPlayers){
        console.log(i);
       if (j===0){
          player1score=allPlayers[i].score;
        }
        else if (j===1){
          player2score=allPlayers[i].score;
        }
        j=j+1;
      }
    }

   
    if(ground.x<0)
    {
      ground.x=ground.width/2;
    }
    this.spawnObstacles();
    
    
  
    if(keyDown("space"))
    {
      if( player.index===1)
      {
        
      console.log("inside jump if block")
      
      trex1.velocityY=-12;
      }
      else if( player.index===2)
      {

      console.log("inside jump if block")
      
      trex2.velocityY=-12;
      }
    }
      if( player.index===1)
      {
        player1score = player1score + Math.round(getFrameRate()/60);
        player.score= player1score;
        player.update();
      console.log("gravity1")
      
      trex1.velocityY= trex1.velocityY+0.5;
      }
      else if( player.index===2)
      {
        player2score = player2score + Math.round(getFrameRate()/60);
        player.score= player2score;
        player.update();

        console.log("gravity2")
        trex2.velocityY=trex2.velocityY+0.5;
      }
      if(obstaclesGroup.isTouching(trex1) || obstaclesGroup.isTouching(trex2))
      {
        console.log("GAME OVER")
        text("GAME OVER",200,200);
        trex1.velocityY=0;
        trex2.velocityY=0;
        ground.velocityX = 0;
        obstaclesGroup.setVelocityXEach(0);
        gameState=2;

      }
      trex1.collide(invisibleground1);
      trex2.collide(invisibleground2);
        drawSprites()
  }

  spawnObstacles(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(800,750,10,40);
     // obstacle.velocityX = -(6 + score/100);
      obstacle.velocityX = -6;
      var randypos = Math.round(random(550,800));
      obstacle.y= randypos;
       //generate random obstacles
       var rand = Math.round(random(1,6));
       obstacle.addImage("obstacleimg",obstacleI);
       
      
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.5;
       obstacle.lifetime = 133;
       trex1.depth=obstacle.depth+1;
       trex2.depth=obstacle.depth+1;
      
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
    }
   }
    end(){
      
    }
}