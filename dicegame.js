const rollBtn = document.getElementById('rollDiceBtn');
let current = document.getElementsByClassName('currentScore');
const holdBtn = document.getElementById('hold-btn');
let total = document.getElementsByClassName('totalScore');
const newGameBtn = document.getElementById('newGameBtn');
const dot = document.getElementsByClassName('bi-dot');
const applauseSound = document.getElementById('applauseSound');
const newGameSound = document.getElementById('newGameSound');
const holdSound = document.getElementById('holdSound');
const loseSound = document.getElementById('loseSound');
const rollDiceSound = document.getElementById('rollDiceSound');
let playerText = document.getElementsByClassName('player');
let styleBtns = document.getElementsByClassName('butn');
let winPop = document.getElementById('modal-win');
let winPopText = document.getElementById('modalText');
let rulesPop = document.getElementById('modal-rules');

//Create players class
class Players {
  constructor(name, currentScore, totalScore, win) {
    this.name = name
    this.currentScore = currentScore
    this.totalScore = totalScore
    this.win = false
  }
}  

//Create each player
let player1 = new Players('player1', 0, 0, false);
let player2 = new Players('player2', 0, 0, false);

//Start Game
let gameTurn = 0;

//Initialize active player
let activePlayer;

//Style CSS player
cssPlayer();

//To roll the dice
let rollTheDice = debounce(function () {
  var randomNumber = random(1, 7);
  rollDiceSound.play();
  document.querySelector(".img").setAttribute("src", "./img-dice/" + "dice" + randomNumber + ".png");

  //Initialization game
  if(gameTurn%2 === 0) {  //if gameTurn is even            
    activePlayer = player1;
    activePlayer.currentScore += randomNumber;     
    current[0].textContent = player1.currentScore;
  } else {   //if gameTurn is odd                      
    activePlayer = player2;
    activePlayer.currentScore += randomNumber;  
    current[1].textContent = player2.currentScore;
  }

  //If dice = 1
  if(randomNumber === 1 && gameTurn%2 === 0) {
    loseSound.play();
    player1.currentScore = 0;
    current[0].textContent = player1.currentScore;
    switchPlayer();
    cssPlayer()
  } else if (randomNumber === 1 && gameTurn%2 !== 0) {
    cssPlayer();
    loseSound.play();
    player2.currentScore = 0;
    current[1].textContent = player2.currentScore;
    switchPlayer();
    cssPlayer()
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
    gameTurn++;
  } else {
    player2.turn = false;
    activePlayer = player1;
    gameTurn++;
  }
}

//function to add total score
let hold = debounce (function (e){
  holdSound.play()

  if(gameTurn%2 === 0) {
    player1.totalScore += player1.currentScore;
    total[0].textContent = player1.totalScore;
    player1.currentScore = 0;
    current[0].textContent = player1.currentScore
    switchPlayer()
    cssPlayer()
  } else {
    player2.totalScore += player2.currentScore;
    total[1].textContent = player2.totalScore;
    player2.currentScore = 0;
    current[1].textContent = player2.currentScore
    switchPlayer()
    cssPlayer()
  }

    //if the player reaches 100 points
    if(player1.totalScore >= 100) {
      player1.win = true;
    } else if (player2.totalScore >= 100) {
      player2.win = true;
    }
    //Animations
    if(player1.totalScore >= 100 || player2.totalScore >= 100) {
      applauseSound.play()
      //Confetti animation
      for (let index = 0; index < (Math.floor(Math.random() * 20) + 10); index++) {
        confetti({ 
          origin: {
            x: Math.random() - 0.2,
            y: Math.random() - 0.2
          },
        })
      }
      //Open Pop-up
      winPop.style.display = 'block'
      //Winner text
      if (player1.win === true) {
        winPopText.textContent =  `PARTIE GAGNÉ !!
        La partie a été remporté par le joueur 1 avec ${player1.totalScore} points.
        Pour jouer une nouvelle partie, cliquez sur New Game.
        `;
      } else if (player2.win === true) {
        winPopText.textContent = `PARTIE GAGNÉ !!
        La partie a été remporté par le joueur 2 avec ${player2.totalScore} points.
        Pour jouer une nouvelle partie, cliquez sur New Game.
        `;
      }
      //Close Pop-up
      document.getElementById('modal-close1').addEventListener('click', function(e) {
        winPop.style.display = 'none'
      })
      //Restart game
    rollBtn.removeEventListener('click', rollTheDice);
    holdBtn.removeEventListener('click', hold);
    dot[0].style.opacity = 0;
    dot[1].style.opacity = 0;
    }
}, 300)

//event function hold()
holdBtn.addEventListener('click', hold)

//Function new game
function newGame() {
  newGameSound.play();
  player1 = new Players('player1', 0, 0);
  player2 = new Players('player2', 0, 0);
  gameTurn = 0;
  current[0].textContent = 0;
  current[1].textContent = 0;
  total[0].textContent = 0;
  total[1].textContent = 0;
  dot[0].style.opacity = 0;
  player1.win = false;
  player2.win = false;
  cssPlayer();
  rollBtn.addEventListener('click', rollTheDice);
  holdBtn.addEventListener('click', hold);
}

//Function confirm new game
function confirmRestart() {
  if (confirm("Êtes-vous sûr(e)s de vouloir redémarrer la partie?")) {
    newGame();
  }
}

//Event newGame
newGameBtn.addEventListener('click', confirmRestart)

//Function css player
function cssPlayer() {
  if(gameTurn%2 === 0) {
    dot[0].style.opacity = 1;
    dot[1].style.opacity = 0;
    playerText[0].style.fontWeight = 600;
    playerText[1].style.fontWeight = 400;
    playerText[0].style.opacity = 1;
    playerText[1].style.opacity = 0.25;
    body.style.background = 'linear-gradient(90deg, #edf1f1 50%, white 50%)';
    for (let styleBtn of styleBtns) {
      styleBtn.style.background = "#edf1f1";
    }
  } else {
    dot[0].style.opacity = 0;
    dot[1].style.opacity = 1;
    playerText[0].style.fontWeight = 400;
    playerText[1].style.fontWeight = 600;
    playerText[0].style.opacity = 0.25;
    playerText[1].style.opacity = 1;
    body.style.background = 'linear-gradient(90deg, white 50%, #edf1f1 50%)';
    for (let styleBtn of styleBtns) {
      styleBtn.style.background = "white";
  }
  }
}

//Open game rules
document.getElementById('btn-rules').addEventListener('click', function(e) {
  rulesPop.style.display = 'block'
})

//Close game rules
document.getElementById('modal-close2').addEventListener('click', function(e) {
  rulesPop.style.display = 'none'
})