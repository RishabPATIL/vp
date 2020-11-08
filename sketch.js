var dog,happyDog,sadDog,database;
var foodS,foodStock;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500,500);


  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(250,350,150,150);
  dog.addImage(sadDog);
  dog.scale=0.18;
  
  

}

function draw() {
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }


  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill("Black");
  textSize(15)
  text("Press UP_arrow to feed",180,50);
  
 
  drawSprites();
}

function readStock(data){
  foodS=data.val();
}


function writeStock(x){

  if(x<=0){
    x = 0
  } else{
    x = x-1
  }

  database.ref('/').update({
    Food:x
  })
}