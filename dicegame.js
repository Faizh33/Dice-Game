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
let rollTheDice = debounce(function () {
  var randomNumber = random(1, 7);

  document.querySelector(".img").setAttribute("src", "./img-dice/" + "dice" + randomNumber + ".png");

  if(gameTurn%2 === 0) {                //si gameTurn est pair             
    player1.turn = true;
    activePlayer = player1;
    activePlayer.currentScore += randomNumber;     
    current[0].textContent = player1.currentScore
  } else {                              //si gameTurn est impair 
    player2.turn = true;                        
    activePlayer = player2;
    activePlayer.currentScore += randomNumber;  
    current[1].textContent = player2.currentScore
  }

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

//Event roll the dice
rollBtn.addEventListener('click', rollTheDice);

//Function to change player
function switchPlayer() {
  if (activePlayer === player1) {
    player1.turn = false;
    activePlayer = player2;
    player2.turn = true;
    gameTurn++
  } else {
    player2.turn = false;
    activePlayer = player1;
    player1.turn = true;
    gameTurn++
  }
}