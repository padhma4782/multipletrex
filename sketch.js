var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
//trex is a array
var trex1,trex2,trex_running, trex_collided;
var trex1I, trex2I
var form, player, game;
var ground,invisibleground1,invisibleground2;
var obstacle,obstacleI, obstaclesGroup;
var player1score=0;
var player2score=0;

function preload(){
  //trex1I = loadImage("images/Dino1.jpg")
  //trex2I = loadImage("images/Dino2.jpg")
  trex_running = loadAnimation("images/trex_1.png","images/trex_2.png","images/trex_3.png");
  
  groundI = loadImage("images/ground2.png");
  obstacleI= loadImage("images/obstacle1.png");
}

function setup(){
  canvas = createCanvas(800,800);
  database = firebase.database();

  game = new Game();
  game.getState();
  game.start();

  obstaclesGroup = createGroup();
}

function draw(){
  //console.log("GameState"+gameState)
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
    text("PLAYER1 SCORE:"+ player1score, 500,50);
    text("PLAYER2 SCORE:"+ player2score, 500,100);
  }
  /*if(gameState === 2){
    game.end();
  }*/
}
