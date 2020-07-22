
var dogImg, happyDog, database, foodS, foodStock, lastFed, foodObj, feed, addFood, lastFed;
var dogInput, enterName, dogName = 'not yet decided';

function preload()
{
  dogImg = loadImage('images/dogImg.png')
  dogHappy = loadImage('images/dogImg1.png')
  milk = loadImage('images/Milk.png')
}

function setup() {
  createCanvas(1000, 1000);

  database = firebase.database();

  foodObj = new Food();

  dog = createSprite(400, 250, 5, 5);
  dog.addImage(dogImg);

  foodStock = database.ref('Food');
  foodStock.on('value', readStock);
  
  feed = createButton('Feed the dog')
  feed.position(700, 95)
  feed.mousePressed(feedDog);

  addFood = createButton('Add Food')
  addFood.position(800, 95)
  addFood.mousePressed(addFoods);

  enterName = createButton('Enter Dog Name')
  enterName.position(1050, 350);
  enterName.mousePressed(enterDogName);

  dogInput = createInput('Dog Name');
  dogInput.position(1050, 300)


}

function draw() { 
  console.log(dogName)
  background(46, 139, 87);

  foodObj.display();

  drawSprites();

  stroke(20)
  textSize(50)
  fill('black');
  textSize(30)
  text('food: ' + foodS, 600, 200)
  text('The name of your dog is: ' + dogName, 450, 100);

  fedTime = database.ref('FeedTime');
  fedTime.on('value', function(data){
    lastFed = data.val();
  })

  fill(255, 255, 254);
  textSize(15);

  if(lastFed >= 12){
    text('Last Fed: ' + lastFed % 12 + ' PM', 350, 30)
  } else if(lastFed === 0){
    text('Last Fed: 12 AM', 350, 30)
  } else {
    text('Last Fed: ' + lastFed + ' AM', 350, 30)
  }

}

function readStock(data){
  foodS = data.val()
}

function writeStock(x){

  if (x <= 0){
    x = 0;
    dog.addImage(dogImg)
  } else {
    x -= 1;
  }
  
  database.ref('/').update({
    Food:x
  })

}

function feedDog(){
  dog.addImage(dogHappy);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })

  if(foodS < 0){
    foodS = 0;
    dog.addImage(dogImg)
  } 
}

function addFoods(){
  foodS ++;
  foodObj.updateFoodStock(foodS);

  database.ref('/').update({
    Food: foodS
  })
}

function enterDogName(){
  dogName = dogInput.value()
}