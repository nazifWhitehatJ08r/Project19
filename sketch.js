var obstacleGroup, obstacle_Img; 
var bg, backImage;
var bananaImage, foodGroup;
var groundImg, ground;

var player, player_running;
var score = 0;
var gameOver;

function preload(){
  backImage = loadImage("jungle.jpg")
  player_running =
  loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacle_Img = loadImage("stone.png");
  
}

function setup() {
  createCanvas(800, 400);
  
  bg = createSprite(0,0,800,400);
  bg.addImage(backImage);
  bg.scale = 1.5;
  bg.velocityX = -4;
  bg.x = bg.width/2;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
}

function draw() {
  
  if(ground.x < 0){
   ground.x = ground.width/2;  
     }
  
  if(bg.x < 100){
    bg.x = bg.width/2;  
     }

  if(foodGroup.isTouching(player)){
     foodGroup.destroyEach();
    score = score + 2;
    }
  
    switch(score){
       case 10: player.scale = 0.12
             break
       case 20: player.scale = 0.14
             break        
       case 30: player.scale = 0.16
             break
       case 40: player.scale = 0.18
             break 
       default: break;
    }
    
      if(keyDown("space") ){
         player.velocityY = -12;
       }
      player.velocityY = player.velocityY + 0.8;
      
      player.collide(ground);
  
      spawnFood();
      spawnObstacles();
  
      if(obstacleGroup.isTouching(player)){
        player.scale = 0.08;
      }


  drawSprites();

    stroke("white");
    textSize(20);
    fill("white");
    text("Score: "+score, 500,50);

}

  function spawnFood(){
    if(frameCount % 80 === 0) {
      var banana = createSprite(800,350,10,40);
      banana.y = random(120,300);
      banana.addImage(bananaImage);
      banana.scale = 0.05;
      banana.velocityX = -5;
      
      banana.lifetime = 300;
      player.depth = banana.depth + 1;
      
      foodGroup.add(banana);
    
    }
  }

  function spawnObstacles(){
    if(frameCount % 100 === 0) {
      var obstacle = createSprite(800,350,10,40);
      obstacle.velocityX = -5;
      obstacle.addImage(obstacle_Img);
      
      obstacle.scale = 0.2;
      obstacle.lifetime = 300;
      
      obstacleGroup.add(obstacle);
      
    }
  }