var gamePattern = [];
var userClickedPattern = [];
var level = 0;


function nextSequence(event) {
  userClickedPattern = [];
  level++;
  $(document).off("keypress");
  $("h1").text("level "+level);
  var buttonColors = ["red", "blue", "green", "yellow"];
  var randomNumber = Math.floor(4 * Math.random());
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
}



//Function to play sound based on chosen color
function playSound(chosenColor) {
  var audio = new Audio("sounds/"+chosenColor+".mp3");
  audio.play();

}


//Function to show animation
function animatePress(color) {
  $("#"+color).addClass("pressed");
  setTimeout(function(){
    $("#"+color).removeClass("pressed");
  },100);
}



$(document).on("keypress",nextSequence);

$(".btn").on("click",function (event){
  var userClickedColor = event.currentTarget.id
  $("#"+userClickedColor).fadeOut(100).fadeIn(100);
  animatePress(userClickedColor);
  userClickedPattern.push(userClickedColor);
  playSound(userClickedColor);
  checkAnswer();
});

function checkAnswer() {
  array2 = gamePattern;
  array1 = userClickedPattern;

  if(array1.length === array2.length && array1.every(function(value, index) { return value === array2[index]}))
  {
    setTimeout(nextSequence,1000);
    console.log("correct Answer");
  }
  else if(array1.every(function(value, index) { return value === array2[index]}))
  {
      console.log("partially correct answer");
  }
  else
  {
    console.log("Wrong Answer!");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press any key to restart!");
    
    startOver();
  }
}


function startOver() {
  level = 0;
  gamePattern = [];
  $(document).on("keypress",nextSequence);
}
