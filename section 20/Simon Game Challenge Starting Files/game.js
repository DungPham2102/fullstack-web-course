var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = 0;
var level = 0;

//detect when a keyboard has been pressed for the first time to start the game
$(document).keydown(function(){
    //if the game has not start so start the game
    if(started===0){
        nextSequence();
        started = 1;
    }
})

//game running in this command
//detect which button has been click
$(".btn").click(function(event){
    //create a var that contains the id of the button you clicked
    var userChosenColour = event.target.id;

    //add your clicked button to the clicked button
    userClickedPattern.push(userChosenColour);

    //flash that button
    flashClick(userChosenColour);

    //make a sound of that button
    makeSound(userChosenColour);

    //add animation to the user's clicked button
    animatePress(userChosenColour);

    //check after each click in the button
    checkAnswer(userClickedPattern.length-1);
})

//we check the user answer in this function
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        //if the user correct all the gamePattern, increase the level to 1 after 1 second
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
            nextSequence();
            }, 1000);
        }
    }else{
        //when the user answer wrong
        makeSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }  
}

function nextSequence(){


    //each time this function called, the level of the game is increase to 1 and the userClickedPattern array will reset
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    //create a random number
    var randomNumber = Math.floor(Math.random() * 4);

    //create a random color base on randomNumber
    var randomChosenColour = buttonColours[randomNumber];

    //add the color to the gamePattern aka result
    gamePattern.push(randomChosenColour);
    
    //make a button flash
    flashClick(randomChosenColour);

    //make sound
    makeSound(randomChosenColour);
}

//restart the game
function startOver(){
    level = 0;
    started = 0;
    gamePattern = [];
}


//this function flash a button when clicked
function flashClick(randomChosenColour){
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
}

//this function makea sound when you click a button
function makeSound(randomChosenColour){
    var sound = new Audio("./sounds/" + randomChosenColour + ".mp3");
    sound.play();
}

//this function add animation to the user's clicked button
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


