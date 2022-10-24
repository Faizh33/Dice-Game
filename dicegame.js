let newGameBtn = document.getElementById('newGameBtn')
let rollBtn = document.getElementById('rollDiceBtn')
let holdBtn = document.getElementById('holdBtn')
let total = document.getElementsByClassName('totalScore')
let current = document.getElementsByClassName('currentScore')


//Create class for players
class Players {
  constructor(name, currentScore, totalScore, turn, winner) {
    this.name = name;
    this.currentScore = currentScore;
    this.totalScore = totalScore;
    this.turn = false;
    this.winner = false
  }
}

//Create each player
let player1 = new Players(player1, 0, 0, false, false)
let player2 = new Players(player2, 0, 0, false, false)

// Declaration active player
let activePlayer;

// Roll the dice
let rollTheDice = debounce(function (e) {
  let randomNumber = random(1, 7)
    document.querySelector(".img").setAttribute("src",
  "./img-dice/dice" + randomNumber + ".png")
    if (randomNumber == 1) {
      activePlayer.currentScore = 0
      switchPlayer()
    } else {
      addCurrentScore()
    }
}, 500)

      // FUNCTIONS

//Function random for the dice
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//Fonction debounce
function debounce(callback, delay) {
  var timer;
  return function () {
    var args = arguments;
    var context = this;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, delay)
  }
}

// Function to switch between player
function switchPlayer() {
  if (activePlayer == player1) {
    activePlayer = player2;
    player2.turn = true;
  } else {
    activePlayer = player1;
    player1.turn = true;
  }
} 

//function to add current score to active player
function addCurrentScore() {
  if (activePlayer == player1) {
    current[0].textContent += randomNumber
  } else {
    current[1].textContent += randomNumber
  }
}

    //EVENT

//Event RollTheDice
rollBtn.addEventListener('click', rollTheDice)


//function to add current score to your total score if you click on "hold".
/*function hold() {
  if (activePlayer == player1) {
    total[0].textContent += current[0]
    current[0].textContent = 0
    switchPlayer()
  } else {
    total[1].textContent += current[1]
    current[1].textContent = 0
    switchPlayer()
  }
}

//Event hold
holdBtn.addEventListener('click', hold)



//Function for New Game 
function newGame() {
    current.textContent = 0;
    total.textContent = 0;
    activePlayer = player1;
}

//Event New Game
newGameBtn.addEventListener('click', newGame) */