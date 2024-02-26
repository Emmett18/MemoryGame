let startBtn = document.getElementById("start-button");
const homeBtn = document.getElementById("home-button");
startBtn.addEventListener("click", startGame);
homeBtn.addEventListener("click", home);
const gameContainer = document.getElementById("game");

let cardsFlipped = 0;
let firstGuess = null;
let firstCard = null;
let noClicking = false;
let currentScore = 0;
let bestScore = parseInt(localStorage.getItem("local-best"));
document.getElementById("best-score").innerText = bestScore;

function DealCards() {
  clearCards();
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
}

function clearCards() {
  currentScore = 0;
  cardsFlipped = 0;
  setScore(0);
  while (gameContainer.firstChild) {
    gameContainer.firstChild.remove();
  }
}

function home() {
  if (noClicking) return;
  startBtn.innerText = "Start!";
  clearCards();
}

function startGame() {
  if (noClicking) return;
  startBtn.innerText = "Restart";
  DealCards();
}

function youWin() {
  noClicking = true;
  if (currentScore < bestScore) {
    bestScore = currentScore;
    localStorage.setItem("local-best", bestScore);
    document.getElementById("best-score").innerText = bestScore;
  }
  setTimeout(function () {
    noClicking = false;
    home();
  }, 3000);
}

function setScore(newScore) {
  document.getElementById("current-score").innerText = newScore;
}

// TODO: Implement this function!
function handleCardClick(e) {
  if (noClicking) return;
  e.target.removeEventListener("click", handleCardClick);
  currentScore++;
  setScore(currentScore);
  cardsFlipped++;

  if (cardsFlipped % 2) {
    firstGuess = e.target.classList.value.split(" ");
    firstCard = e.target;
    firstCard.style.backgroundColor = firstGuess[0];
  } else {
    let secondGuess = e.target.classList.value.split(" ");
    e.target.style.backgroundColor = secondGuess[0];
    if (firstGuess[0] == secondGuess[0]) {
      if (cardsFlipped == 10) youWin();
    } else {
      noClicking = true;
      setTimeout(function () {
        cardsFlipped -= 2;
        e.target.style.backgroundColor = "white";
        firstCard.style.backgroundColor = "white";
        e.target.addEventListener("click", handleCardClick);
        firstCard.addEventListener("click", handleCardClick);
        noClicking = false;
      }, 1000);
    }
  }
}

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let i = 0;
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    i++;
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add(i);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
