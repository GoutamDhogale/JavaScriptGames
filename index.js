
//game variable and constant
let inputDir = {x:0,y:0}; //initially snake is on constant state it is direction object
// let foodSound=new Audio('');
// let gameOverSound=new Audio('');
// let moveSound=new Audio('');
// let musicSound=new Audio('');
let speed=5;
let score=0;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
]
food={
    x:6,y:7
};

//function game loop for animation
function main(ctime){
    window.requestAnimationFrame(main);//cal function again and again
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
   
}
function isCollide(snake){
    //if snake colid it self
   for (let i = 1; i < snakeArr.length; i++) {
       if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
        return true;
       }
    }
    //wall hit
       if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
            return true;
       }
   
}
function gameEngine(){
    //part1:update snake variable arry of location
    if(isCollide(snakeArr)){
        //gameOverSound.play();
        //musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game over.press any key play again");
        snakeArr=[ {x:13,y:15}];
       // musicSound.paly();
       score=0;




    }
    //if you have eaten a food increment score and reganarate a food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        // foodSound.play();
        score += 1;
        if(score>highscore){
            highscoreval=score;
            localStorage.setItem("highscore",JSON.stringify(highscoreval));
            HighscoreBox.innerHTML="HighScore:"+highscoreval;
        }
        scoreBox.innerHTML="Score :" + score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //moveing snake
  for (let i = snakeArr.length-2; i>=0; i--){
  
    snakeArr[i+1] = {...snakeArr[i]}; //destructuring

  }
  snakeArr[0].x +=inputDir.x;
  snakeArr[0].y +=inputDir.y;

      
  


    //part2:Displat snake and food
    //display snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
       
        
        
        board.appendChild(snakeElement);
    });
    //part2:render the snake and food
    //display food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}






//main logic 
let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscoreval=0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval))
}
else{
    highscoreval=JSON.parse(highscore);
    HighscoreBox.innerHTML="HighScore:"+highscore;
}
window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
inputDir={x:0,y:1}//start
// moveSound.play();
switch (e.key) {
    case "ArrowUp":
        console.log("ArrowUp");
        inputDir.x=0;
        inputDir.y=-1;
        break;
        
    case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        
    case "ArrowLeft":
        console.log("ArrowLeft");
        inputDir.x=-1;
        inputDir.y=0;    //direction 
        break;
        
    case "ArrowRight":
        console.log("ArrowRight");
        inputDir.x=1;
        inputDir.y=0;
        break;
        

    default:
        break;
}
});
