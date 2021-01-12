//Create variables here
var dog, happyDog,food,foodStock,dogImage;
var database,foodS;
var lastFed, fedTime, addFood,feed,foodObj;
function preload()
{
  //load images here
  dogImage=loadImage('images/dogImg.png');
  happyDog=loadImage('images/dogImg1.png');

}

function setup() {
	createCanvas(700, 800);
  database = firebase.database();
  createCanvas(500, 500);
  foodObj = new Food();
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImage);
  dog.scale=0.2

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  
  Feed = createButton('Feed the dog');
  Feed.position(500,100);
  Feed.mousePressed(feedDog);

 
  addFood = createButton("Add Food");
  addFood.position(400,100);
  addFood.mousePressed(addFoods);

}

function draw() {  

  background(46,139,87)
  foodObj.display();
 
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
lastFed=data.val();
  })
 

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed :"+lastFed%12+"PM", 350,30)
  }else if(lastFed===0){
    text("Last Feed : 12 AM",350,30)
  }else{
    text("Last Feed : "+ lastFed + "AM",350,30)
  }
  
    drawSprites();
    textSize(22);
    fill("yellow");
    text("Remaining food "+foodS,160,150); 
    

  
  }
  function feedDog(){
    dog.addImage(happyDog)
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
  }
  
  function readStock(data){
    foodS=data.val();
    foodObj.updateFoodStock(foodS);
  }
  // function writeStock(x){
  //   if(x<=0){
  //    x=0;
  //   }else{
  //     x=x-1;
  //   }
  //   database.ref('/').update({
  //     'Food':x
  //   })
  // }

  function addFoods(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  }
  //add styles here




