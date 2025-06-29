let gamePattern = [];
let userclickedPattern = [];
let level = 1;
let started = false;

buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence(){
    let chosenColour = buttonColours[Math.floor(Math.random() * buttonColours.length)];
    gamePattern.push(chosenColour);
    flashButton(chosenColour);
    playSound(chosenColour);
    console.log("Game pattern:", gamePattern);
};

function flashButton(chosenColour) {
    $("#" + chosenColour).fadeOut(100).fadeIn(100);
}

function playSound(chosenColour) {
    let sound = new Audio("sounds/" + chosenColour + ".mp3");
    sound.play();
}

function animatePress(userChosenColour){
    $("#" + userChosenColour).addClass("pressed");
    setTimeout(function() {
        $("#" + userChosenColour).removeClass("pressed");
    }, 100);
}

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userclickedPattern.push(userChosenColour);
    console.log(userclickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkAnswer();
});

function checkAnswer() {
    let currentIndex = userclickedPattern.length -1;

    if (userclickedPattern[currentIndex] === gamePattern[currentIndex]){
        if(userclickedPattern.at(-1) === gamePattern.at(-1)){
        console.log("Correct!");
        level++
        $("#level-title").text("level " + level)
        setTimeout(()=> nextSequence(), 1000);
    }
    }else{
        console.log("Wrong!");
    }
}

$(document).keypress(function() { 
    if(!started) {
        $("#level-title").text("level " + level)
        console.log("Key pressed, starting game");
        nextSequence();
        
        started = true;
    }
});

