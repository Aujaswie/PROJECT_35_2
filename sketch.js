var dog, happydog;
var database;
var foodS, foodStock;
var milk, milkImg;
var feed, addfood ;
var feedTime, lastFed ;
var foodObj;

function preload()
{
  dogImg = loadImage ("images/dogImg.png");
  dogHappy = loadImage ("images/dogHappy.png");
}

function setup() {
  createCanvas(1000, 1000);
  dog = createSprite (500,500,10,10);

  dog.addImage (dogImg );

  database = firebase.database();

  foodStock = database.ref('Food');
  
  foodStock.on ("value",readStock);

  foodObj = new Food ();
  

  feed = createButton ("feed the dog")
  feed.position (700,95);
  feed.mousePressed (feedDog);

  addFood = createButton ("add food");
  addFood.position (800,95);
  addFood.mousePressed (addFoods);
  
}


function draw() {  
 background (46, 139, 87);

 //if(keyWentDown(UP_ARROW)){
   //writeStock (foodS);
  // dog.addImage (dogHappy);
  // textSize (50);
  // fill ("lime");
   //stroke ("lime");
 
   //text ("dog is happy", 450 ,100);
 //}
  fedTime = database.ref ('FeedTime');
  fedTime.on ("value",function (data){
    lastFed = data.val();
  })

 foodObj.display();

  drawSprites();

}

function addFood (){
fill (255,255,254);
textSize(15);
if(lastFed>=12){
  text ("last feed : " + lastFed%12 + "PM" , 35,30);
}
else if (lastFed == 0){
  text("last feed : 12 AM",350,30);
}
else {
  text("last feed : " + lastFed + "PM" , 350,30)
}
}



function feedDog (){
  dog.addImage (dogHappy);

  foodObj.updateFoodStock (foodObj.getFoodStock()-1);
  database.ref ('/').update ({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods (){
  foodS ++;
  database.ref('/').update({
    Food:foodS
  })
}



function readStock (data){
    foodS = data.val ();
}

function writeStock (x) {

  if (x <= 0) {
    x = 0 
  }
  else {
    x= x-1
  }

  database.ref ('/').update({
    Food: x
  })
}


