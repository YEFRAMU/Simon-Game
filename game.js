let gamePattern = [];
let userclickedPattern = [];
let level = 1;
let started = false;

buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
    userclickedPattern = [];

    let chosenColour =
        buttonColours[Math.floor(Math.random() * buttonColours.length)];
    gamePattern.push(chosenColour);
    flashButton(chosenColour);
    playSound(chosenColour);
    console.log("Game pattern:", gamePattern);
}

function startOver() {
    gamePattern = [];
    userclickedPattern = [];
    level = 1;
    started = false;
}

function flashButton(chosenColour) {
    $("#" + chosenColour)
        .fadeOut(100)
        .fadeIn(100);
}

function playSound(chosenColour) {
    let sound = new Audio("sounds/" + chosenColour + ".mp3");
    sound.play();
}

function animatePress(userChosenColour) {
    $("#" + userChosenColour).addClass("pressed");
    setTimeout(function () {
        $("#" + userChosenColour).removeClass("pressed");
    }, 100);
}

function animateGameover() {
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
}

$(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    userclickedPattern.push(userChosenColour);
    console.log(userclickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userclickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userclickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userclickedPattern.length === gamePattern.length) {
            console.log("Correct!");
            level++;
            $("#level-title").text("level " + level);
            setTimeout(() => nextSequence(), 1000);
        }
    } else {
        console.log("Wrong!");
        animateGameover();
        startOver();
    }
}

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("level " + level);
        console.log("Key pressed, starting game");
        nextSequence();
        started = true;
    }
});
