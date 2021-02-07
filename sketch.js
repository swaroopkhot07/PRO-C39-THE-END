var PLAY = 1;
var END = 0;
var gameState = PLAY;
var background,backgroundImg;
var fighter,fighterImg;
var helicopter,helicopterImg;
var missileImg;
var ground,groundImg;
var cloudImg;
var gameOverImg;
var helicopterGroup;
var missileGroup; 
var missile2,missile2Img;
var cloudsGroup;
var score;
var wonImg;


function preload(){
backgroundImg=loadImage("background.png");
fighterImg=loadImage("jet.png");
helicopterImg=loadImage("helicopter.png");
missileImg=loadImage("missile.png");
missile2Img=loadImage("missile2.png");
groundImg=loadImage("ground.png"); 
cloudImg=loadImage("cloud.png");
gameOverImg=loadImage("gameOver.png");
wonImg=loadImage("won.png");
}

function setup() {
createCanvas(displayWidth,displayHeight-110);

score=0;  

fighter=createSprite(70,100);
fighter.addImage(fighterImg);
fighter.scale=0.4;




gameOver=createSprite(70,100);
gameOver.addImage(gameOverImg);

won=createSprite(70,100);
won.addImage(wonImg);
  

missileGroup=new Group();
cloudsGroup=new Group();
helicopterGroup=new Group();
missile2Group=new Group();
}

function draw() {
  background(backgroundImg);

  

  // release arrow when enter key is pressed
  if (keyDown("enter")) {
    createMissile2();
    
  }

  if (missile2Group.isTouching(helicopterGroup)) {
    helicopterGroup.destroyEach();
    missile2Group.destroyEach();
    score=score+10;
  }
  
  if(gameState===PLAY){
    gameOver.visible = false;
    won.visible=false;
   if(keyDown("space")){
    fighter.velocityY=-5;
   }
   if(keyDown("up_Arrow")){
    fighter.velocityY=-11;
   }
   

  
    
  fighter.velocityY=fighter.velocityY+0.8;  
  gameOver.visible=false; 
  won.visible=false;
  
  
  if(score===10){
    won.visible=true;
    helicopterGroup.destroyEach;
    missileGroup.destroyEach;
    fighter.velocityY=0;
  }
   
  if(missileGroup.isTouching(fighter)){
   gameState = END; 
  }

  if(helicopterGroup.isTouching(fighter)){
    gameState = END; 
   }
    
  missile();
  spawnClouds();
  helicopter();
  
  }else if(gameState===END){
    gameOver.visible=true;
    won.visible=false;
    missileGroup.velocityX=0;
    cloudsGroup.velocityX=0;
    helicopterGroup.velocityX=0;
    
  }

  drawSprites();
  camera.x=fighter.x;
  stroke("green");
  textSize(20);
  fill("yellow");
  text("Score: "+ score, 90,20);
  stroke("yellow");
  textSize(20);
  fill("blue");
  text("To Control The Fighter Jet Plane Press 'Space Bar'",displayWidth-1469,displayHeight-229);
  stroke("yellow");
  textSize(20);
  fill("Green");
  text("To Control The Fighter Jet Plane Fast Press 'Up Arrow'",displayWidth-1469,689);
  stroke("blue");
  textSize(20);
  fill("green");
  text("To Destroy The Helicopters Press ' Enter ' To Release Missiles From Fighter Jet Plane" ,displayWidth-1469,displayHeight-200);
}

function missile(){
 if(World.frameCount%80===0){
 var missile=createSprite(width-5,200,50,50);
  missile.addImage(missileImg);
  missile.scale=0.2; 
  missile.y=Math.round(random(10,350));
  missile.velocityX=-9;
  missile.lifetime=300;
   
  missileGroup.add(missile);
  }
  
 
}

function spawnClouds(){
 
  if(frameCount % 60===0){
    var cloud=createSprite(width-5,600,20,20);
    cloud.addImage(cloudImg);
    cloud.scale=0.5;
    cloud.y=Math.round(random(100,220));
    cloud.velocityX=-5;
    cloud.lifetime=300;
    
    cloudsGroup.add(cloud);
  } 
}

function helicopter(){
 
  if(frameCount % 300===0){
    var helicopter=createSprite(width-5,1000,50,50);
    helicopter.addImage(helicopterImg);
    helicopter.scale=0.5;
    helicopter.y=Math.round(random(100,220));
    helicopter.velocityX=-6;
    helicopter.lifetime=300;
    helicopter.scale=0.2;
    
    helicopterGroup.add(helicopter);
  } 
}

// Creating  arrows for bow
 function createMissile2() {

  var missile2= createSprite(400, 100, 5, 10);
  missile2.addImage(missile2Img);
  missile2.x = 130;
  missile2.y=fighter.y;
  missile2.velocityX = 5;
  missile2.lifetime = 1536;
  missile2.scale = 0.2;
  missile2Group.add(missile2);
   
}