// Team xoxo :: Stella Oh, Constance Chen, Winnie Huang, Helena Williams
// SoftDev
// P3: ArRESTed Development, JuSt in Time
// 2021-04-21

const computerCircle = document.querySelector(".computer-circle");
const userCircle = document.querySelector(".user-circle");
const btnMatch = document.getElementById("btn-match");

const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");

const redValue = document.querySelector(".color-details .red-value");
const greenValue = document.querySelector(".color-details .green-value");
const blueValue = document.querySelector(".color-details .blue-value");

const decrement = document.querySelectorAll(".decrement");
const increment = document.querySelectorAll(".increment");

const decrementSlide = document.querySelectorAll(".decrement-slide");
const incrementSlide = document.querySelectorAll(".increment-slide");

const slideColorInfo = document.querySelector(".slide-colorinfo");

const scoreText = document.querySelector(".score-text");

const endGame = document.getElementById("btn-end-game");
const colorToMatch = document.querySelector(".color-to-match");
const resetBtn = document.getElementById("reset");


// Initialize

function init() {
  let r = Math.floor(Math.random() * 255) + 1;
  let g = Math.floor(Math.random() * 255) + 1;
  let b = Math.floor(Math.random() * 255) + 1;

  computerColor = "<span class='red-color'>Red: " + r + ",</span> <span class='green-color'>Green: " + g + ",</span> <span class='blue-color'>Blue: " + b + "</span>";

  computerCircle.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";

  userCircle.style.backgroundColor = "rgb(0, 0, 0)";

  btnMatch.style.pointerEvents = "auto";
}

init();

// Decrement the color

for (let i = 0; i < decrement.length; i++) {
  decrement[i].addEventListener("click", function (e) {
    decrement[i].parentElement.nextSibling.nextSibling.firstElementChild.nextSibling.nextSibling.value -= 1;
    changeColor();
  })
}



// Increment the color

for (let i = 0; i < increment.length; i++) {
  increment[i].addEventListener("click", function (e) {
    let slider = increment[i].parentElement.nextSibling.nextSibling.firstElementChild.nextSibling.nextSibling;
    newValue = parseInt(slider.value) + 1;
    slider.value = newValue;
    changeColor();
  })
}



function decrementColor(color) {
  return color - 1;
}

// Change the user color

function changeColor() {
  userCircle.style.backgroundColor = "rgb(" + red.value + ", " + green.value + ", " + blue.value + ")";
  redValue.innerHTML = red.value;
  greenValue.innerHTML = green.value;
  blueValue.innerHTML = blue.value;
  slideColorInfo.innerHTML = "Red: " + red.value + ", Green: " + green.value + ", Blue: " + blue.value;
}

// Click handler for match button

btnMatch.addEventListener("click", function () {
  let userColor = userCircle.style.backgroundColor;
  let computerColor = computerCircle.style.backgroundColor;

  let rgbColorUser =
    userColor.substring(userColor.indexOf('(') + 1, userColor.lastIndexOf(')')).split(/,\s*/);
  let rgbColorComputer = computerColor.substring(computerColor.indexOf('(') + 1, computerColor.lastIndexOf(')')).split(/,\s*/);

  console.log(rgbColorUser);
  console.log(rgbColorComputer);

  calculateScore(rgbColorUser, rgbColorComputer);

})

// Calculate the score

function calculateScore(userColor, PCColor) {

  if (isNaN(parseInt(userColor[0]))) {
    userColor = [0, 0, 0];
    let score = calculateDifference(userColor, PCColor);
    scoreText.innerHTML = "You are off by " + score;
  } else {

    calculateDifference(userColor, PCColor);
    let score = calculateDifference(userColor, PCColor);
    if (score == 0) {
      scoreText.innerHTML = "You Won!! Colors Match!";
    } else {
      scoreText.innerHTML = "You are off by " + score;
    }
  }
}

// Calculate the difference

function calculateDifference(userColor, PCColor) {
  let rScore = Math.abs(parseInt(PCColor[0] - parseInt(userColor[0])));
  let gScore = Math.abs(parseInt(PCColor[1] - parseInt(userColor[1])));
  let bScore = Math.abs(parseInt(PCColor[2] - parseInt(userColor[2])));

  return parseInt(rScore) + parseInt(gScore) + parseInt(bScore);
}

// Cheat

endGame.addEventListener("click", function () {
  colorToMatch.style.visibility = "visible";
  colorToMatch.innerHTML = computerColor;
  endGame.classList.add("cheated");
  btnMatch.style.pointerEvents = "none";
  scoreText.innerHTML = "Press the Reset Button to start a new game";
})


// Reset the game

resetBtn.addEventListener("click", function () {
  location.reload();
})