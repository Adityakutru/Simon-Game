
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

var highscore = 0;

$("#start-button").click(function(){
    if(!started){
        $("#level-title").text("LEVEL - "+level);
        nextSequence();
        started = true;
        $("#start-button").hide();  
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("GAME OVER, Press Restart To Replay.");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}
function nextSequence(){
    userClickedPattern = [];
    level++;
    highScore(level);
    $("#level-title").text("LEVEL - "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100); 
}
function playSound(key) {
    var audio = new Audio("sounds/" + key + ".mp3");
    audio.play();
  }
  function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    $("#start-button").show();
    $("#start-button").text("Restart");  
}

function highScore(score){
    if(score > highscore){
        highscore = score;
    }
    $(".high-score").text("Highest Score: "+ highscore);
}
