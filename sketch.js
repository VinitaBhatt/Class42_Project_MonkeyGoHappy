var backImage,backgr;
var player, player_running;
var stone,stoneImg,stoneGroup;
var ground,ground_img;
var banana, bananaImg,bananaGroup;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;

function preload(){
  backImage=loadImage("images/jungle.jpg");
  player_running = loadAnimation("images/Monkey_01.png","images/Monkey_02.png","images/Monkey_03.png","images/Monkey_04.png","images/Monkey_05.png","images/Monkey_06.png","images/Monkey_07.png","images/Monkey_08.png","images/Monkey_09.png","images/Monkey_10.png");
  stoneImg = loadImage("images/stone.png");
  bananaImg = loadImage("images/banana.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,360,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  stoneGroup = new Group();
  bananaGroup = new Group();
}

function draw() { 
  background(0);
 
  player.collide(ground);

  if(gameState===PLAY){
  
      if(backgr.x<100){
         backgr.x=backgr.width/2;
      }
    
      if(keyDown("space") ) {
        player.velocityY = -12;
      }
      player.velocityY = player.velocityY + 0.8;
    
      spawnStones();
      spawnBananas();

      for(var i=0; i<bananaGroup.length; i++){
        if(bananaGroup.get(i).isTouching(player)){
          bananaGroup.get(i).destroy();
          player.scale+=0.01;
          score += 10;
        
        }
      }

      if(player.isTouching(stoneGroup)){
        gameState = END;
      }
  }

  drawSprites();
  
  fill("black");
  textSize(20);
  text("Score : " + score, 100,50);

  if(gameState === END){
      stoneGroup.destroyEach();
      bananaGroup.destroyEach();
      backgr.velocityX=0;
      player.velocityY=0;
      player.visible=false;
      textSize(30);
      text("Game Over! " , 350,200);
      
  }
}

function spawnStones(){
  if(frameCount % 150 === 0){
    stone = createSprite(810,330);
    stone.addImage(stoneImg);
    stone.velocityX = -4;
    stone.scale=0.25;
    stone.lifetime=200;
    stoneGroup.add(stone);
  }
}

function spawnBananas(){
  if(frameCount % 100 === 0){
    banana = createSprite(810,200);
    banana.y = Math.round(random(150,250));
    banana.addImage(bananaImg);
    banana.velocityX = -4;
    banana.scale=0.07;
    banana.lifetime=200;
    bananaGroup.add(banana);
    player.depth = banana.depth+1;
  }
}
