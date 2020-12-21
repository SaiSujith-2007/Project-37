//Create variables here
var dog, happyDog, dogImg, happyImg;
var foodS, foodStock;
var database;
var feed, addFood;
var feedTime, lastFed;
var foodObj;
var readState;
var bedroomImage, gardenImage, washroomImage;
var gameState=0;
var time;

function preload() {
  //load images here
  dogImg=loadImage("dogImg.png");
  happyImg=loadImage("dogImg1.png");
  bedroomImage=loadImage("virtual pet images/Bed Room.png");
  gardenImage=loadImage("virtual pet images/Garden.png");
  washroomImage=loadImage("virtual pet images/Wash Room.png");
}

function setup() {
  createCanvas(windowWidth,displayHeight);
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
  dog=createSprite(200,200,20,20);
  dog.addImage(dogImg);
  dog.scale=0.3;

  foodObj=new Food();
  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  })
}


function draw() {  
  background(4,139,87);

  fill(255,255,254);
  textSize(15);
  feedTime=database.ref('feedTime');
  feedTime.on("value",function(data){
    lastFed=data.val();
  })
  if(lastFed>=12){
    text("Last Feed : "+lastFed%12+"PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+lastFed+"AM",350,30);
  }
  time=hour();
  if(time==(lastFed+1)){
   update("playing");
   foodObj.garden();
  }else if(time==(lastFed+2)){
    update("sleeping");
    foodObj.bedroom();
  }else if(time>=(lastFed+2)&&time<=(lastFed+4)){
    update("bathing");
    foodObj.washroom();
  }else{
    update("hungry");
    foodObj.display();
  }
  

  
  
  if(gameState!="hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(dogImg);
  }
  
  drawSprites();
  fill("white");
  textSize(20);
  stroke("black");

  text("Food Remaining:"+foodS,300,200)
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//Function to write values in DB
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour(),
    gameState:"hungry"
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
    
  })
}