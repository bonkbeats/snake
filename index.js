const gameBoard = document.querySelector("#gameBoard");

const ctx=gameBoard.getContext("2d");
const scoreText =document.querySelector("#scoreText");
const reset=document.querySelector("#reset");

const gameWidth=gameBoard.width;
const gameHeight=gameBoard.height;

const boardBackground = "white";
const snakeColor ="green";
const snakeBorder="black";
const foodColor="red"
const unitSize=25;
let running = false;
let xVelocity = unitSize;
let yVelocity=0;
let foodX;
let foodY;
let score = 0;
let snake =[
   {x:unitSize*4,y:0},
   {x:unitSize*3,y:0},
   {x:unitSize*2,y:0},
   {x:unitSize,y:0},
   {x:0,y:0}
];

window.addEventListener("keydown",changeDirection);
reset.addEventListener("click",resetGame)

gameStart();


function createFood(){
   function randomFood(min ,max){
      const randNum=Math.round((Math.random()*(max-min) + min)/unitSize)* unitSize;
      return randNum;
   }
   foodX=randomFood(0,gameWidth-unitSize);
  
   foodY=randomFood(0,gameWidth-unitSize);



};

function gameStart(){
   running=true;
   scoreText.textContent=score;
   createFood();
   drawfood();
   nextTick()
   
    
}
function nextTick(){
   if(running){
      setTimeout(()=>{
         clearBoard();
         drawfood();
         moveSnake();
         drawSnake();
         checkGameOver();
         nextTick();
      }, 75);

   }else{
      displayGameOver();
   }
}
function clearBoard(){
   ctx.fillStyle=boardBackground;
   ctx.fillRect(0,0,gameWidth,gameHeight)

}
function drawSnake(){
   ctx.fillStyle = snakeColor;
   ctx.strokeStyle = snakeBorder;
   snake.forEach(snakePart =>{
      ctx.fillRect(snakePart.x, snakePart.y,unitSize,unitSize)
      ctx.strokeRect(snakePart.x, snakePart.y,unitSize,unitSize)
   })

}

function moveSnake(){
   const head ={
      x: snake[0].x + xVelocity,
      y: snake[0].y + yVelocity
   };

   snake.unshift(head);
   
   if(snake[0].x == foodX && snake[0].y == foodY) {
      score+=1;
      scoreText.textContent =score;
      if(score>1){

      
      }
      createFood();

   }else{
      snake.pop();
   }

}
function changeDirection(event){
   const keyPressed =event.keyCode;

   const L=37;
   const U=38;
   const R=39;
   const D=40;

   const goingUp =(yVelocity == -unitSize);
   const goingDown =(yVelocity == unitSize);
   const goingRight =(xVelocity == unitSize);
   const goingLeft =(xVelocity == -unitSize);


   switch(true){
      case(keyPressed==L && !goingRight):
      xVelocity=-unitSize;
      yVelocity=0;
      break;

      case(keyPressed==U && !goingDown):
      xVelocity=0;
      yVelocity=-unitSize;
      break;

      case(keyPressed==R && !goingLeft):
      xVelocity=unitSize;
      yVelocity=0;
      break;

      case(keyPressed==D&& !goingUp):
      xVelocity=0;;
      yVelocity=unitSize;
      break;
   }



   

};

function drawfood(){
   ctx.fillStyle=foodColor;
   ctx.fillRect(foodX,foodY,unitSize,unitSize)
}

function checkGameOver(){
   switch(true){
      case(snake[0].x <0):
      running = false;
      break;

      case(snake[0].x >=gameWidth):
      running = false;
      break;
      
      case(snake[0].y<0):
      running = false;
      break;

      case(snake[0].y >=gameHeight):
      running = false;
      break;
   }

for (let i = 0; i < snake.length; i++) {
   if(snake[i].x == snake[0].x && snake[i].y == snake[0].Y){
      running= false;
   }
   
}
   
}

function displayGameOver(){
   ctx.font ="30px MV Boil";
   ctx.fillStyle ="black";
   ctx.textAlign = "center";

   if(score <= 7){
      ctx.fillText("THALA FOR A REASONS", gameWidth/2,gameHeight/2);

   } else if (score<=10 && score>=5){
      ctx.fillText("tum se na ho paiga", gameWidth/2,gameHeight/2);
   }else if (score<5){
      ctx.fillText("u are gay", gameWidth/2,gameHeight/2);
   }else if (score<=15&& score>10){
      ctx.fillText("gaameover niggas", gameWidth/2,gameHeight/2);
   }else if (score>16){
      ctx.fillText("padhai likhai kar le bsdk", gameWidth/2,gameHeight/2);
   }
  

   running=false

}


function resetGame(){
   score=0;
   xVelocity=unitSize;
   yVelocity-0;

   snake =[
      {x:unitSize*4,y:0},
      {x:unitSize*3,y:0},
      {x:unitSize*2,y:0},
      {x:unitSize,y:0},
      {x:0,y:0}
   ];
   gameStart();
};