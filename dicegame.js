let rollBtn = document.getElementById('rollDiceBtn');
let current = document.getElementsByClassName('currentScore');
let holdBtn = document.getElementById('hold-btn');
let total = document.getElementsByClassName('totalScore');
let newGameBtn = document.getElementById('newGameBtn');


//Create players class
class Players {
  constructor(name, currentScore, totalScore, win) {
    this.name = name
    this.currentScore = currentScore
    this.totalScore = totalScore
  }
}  

//Create each player
let player1 = new Players('player1', 0, 0);
let player2 = new Players('player2', 0, 0);

//Start Game
let gameTurn = 0;

//Initialize active player
let activePlayer;

//To roll the dice
let rollTheDice = debounce(function () {
  var randomNumber = random(1, 7);

  document.querySelector(".img").setAttribute("src", "./img-dice/" + "dice" + randomNumber + ".png");

  //Initialization game
  if(gameTurn%2 === 0) {                //si gameTurn est pair             
    activePlayer = player1;
    activePlayer.currentScore += randomNumber;     
    current[0].textContent = player1.currentScore
  } else {                              //si gameTurn est impair                     
    activePlayer = player2;
    activePlayer.currentScore += randomNumber;  
    current[1].textContent = player2.currentScore
  }

  //If dice = 1
  if(randomNumber === 1 && gameTurn%2 === 0) {
    player1.currentScore = 0;
    current[0].textContent = player1.currentScore
    switchPlayer()
  } else if (randomNumber === 1 && gameTurn%2 !== 0) {
    player2.currentScore = 0;
    current[1].textContent = player2.currentScore
    switchPlayer()
  }

}, 500)

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

//Function random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//Event roll the dice
rollBtn.addEventListener('click', rollTheDice);

//Function to change player
function switchPlayer() {
  if (activePlayer === player1) {
    player1.turn = false;
    activePlayer = player2;
    gameTurn++
  } else {
    player2.turn = false;
    activePlayer = player1;
    gameTurn++
  }
}

//function to add total score
let hold = debounce (function (e){
  if(gameTurn%2 === 0) {
    player1.totalScore += player1.currentScore;
    total[0].textContent = player1.totalScore;
    player1.currentScore = 0;
    current[0].textContent = player1.currentScore
    switchPlayer()
  } else {
    player2.totalScore += player2.currentScore;
    total[1].textContent = player2.totalScore;
    player2.currentScore = 0;
    current[1].textContent = player2.currentScore
    switchPlayer()
  }

    //if the player reaches 100 points
    if(player1.totalScore >= 100 || player2.totalScore >= 100) {
      rollBtn.removeEventListener('click', rollTheDice);
      holdBtn.removeEventListener('click', rollTheDice)
    }
}, 300)

//event function hold()
holdBtn.addEventListener('click', hold)

//Function new game
function newGame() {
  player1 = new Players('player1', 0, 0);
  player2 = new Players('player2', 0, 0);
  gameTurn = 0;
  current[0].textContent = 0;
  current[1].textContent = 0;
  total[0].textContent = 0;
  total[1].textContent = 0;
}

//Function confirm new game
function confirmRestart() {
  if (confirm("Êtes-vous sûr(e)s de vouloir redémarrer la partie?")) {
    newGame();
  }
}

//Event newGame
newGameBtn.addEventListener('click', confirmRestart)

