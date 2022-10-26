let rollBtn = document.getElementById('rollDiceBtn');
let current = document.getElementsByClassName('currentScore')



//Create players class
class Players {
  constructor(name, currentScore, totalScore, turn, win) {
    this.name = name
    this.currentScore = currentScore
    this.totalScore = totalScore
    this.turn = false
    this.win = false
  }
}  

//Create each player
let player1 = new Players('player1', 0, 0, false, false);
let player2 = new Players('player2', 0, 0, false, false);

//Start Game
let gameTurn = 0;

//Initialize active player
let activePlayer;

//Function random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//To roll the dice
let rollTheDice = debounce(function (e) {
        var randomNumber = random(1, 7);

        document.querySelector(".img").setAttribute("src", "./img-dice/" + "dice" + randomNumber + ".png");

        if(gameTurn === 0) {
            player1.turn = true;
            activePlayer = player1;
            activePlayer.currentScore += randomNumber;
            addCurrentScore()
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

//Event roll the dice
rollBtn.addEventListener('click', rollTheDice);

//Function add current score
function addCurrentScore() {
  if (activePlayer = player1) {
    current[0].textContent = player1.currentScore
  } else {
    current[1].textContent = player2.currentScore
  }
}

