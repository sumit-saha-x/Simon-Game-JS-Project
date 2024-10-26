var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

function nextSequence(){
    userClickedPattern=[];
    level++;
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    var btnid="#"+randomChosenColour;
    $(btnid).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("#level-title").text("Level "+level);
    // console.log(gamePattern);
}

$(".btn").click(function(){
    userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var sound="sounds/"+name+".mp3"
    var audio=new Audio(sound);
    audio.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");},100);
}

$(document).keypress(function(){
    if(started==false){
        nextSequence();
        started=true;
    }
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();},1000);
        }
    }
    else{
        console.log("fail");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");},200);
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    $("#level-title").text("Game Over, Press Any Key to Restart");
}