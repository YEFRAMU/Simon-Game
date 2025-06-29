let gamePattern = [];

buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence(){
    let chosenColour = buttonColours[Math.floor(Math.random() * buttonColours.length)];
    gamePattern.push(chosenColour);
    flashButton(chosenColour);
    playSound(chosenColour);
    console.log("Game pattern:", gamePattern);
    console.log("Next color:", chosenColour);
};

function flashButton(chosenColour) {
    console.log("Flashing button:", chosenColour);
    $("#" + chosenColour).fadeOut(100).fadeIn(100);
}

function playSound(chosenColour) {
    let sound = new Audio("sounds/" + chosenColour + ".mp3");
    sound.play();
}

nextSequence();